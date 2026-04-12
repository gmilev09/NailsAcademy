import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

export default async (req) => {
  const store = getStore({ name: "enrollments", consistency: "strong" });
  const user = await getUser();

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { student_name, email, phone, course_title, course_price, course_duration, message } = body;
    if (!student_name || !phone || !course_title) {
      return Response.json(
        { error: "Missing required fields: student_name, phone, course_title" },
        { status: 400 }
      );
    }

    const id = `enr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const enrollment = {
      id,
      user_id: user?.id || null,
      student_name: String(student_name).trim(),
      email: String(user?.email || email || "").trim(),
      phone: String(phone).trim(),
      course_title: String(course_title).trim(),
      course_price: Number(course_price) || 0,
      course_duration: String(course_duration || "").trim(),
      message: String(message || "").trim(),
      status: "new",
      created_at: new Date().toISOString(),
    };

    await store.setJSON(id, enrollment);

    return Response.json({ success: true, enrollment }, { status: 201 });
  }

  if (req.method === "GET") {
    if (!user || !user.confirmedAt) {
      return Response.json({ error: "Authentication required" }, { status: 401 });
    }

    const { blobs } = await store.list();
    const enrollments = await Promise.all(blobs.map((blob) => store.get(blob.key, { type: "json" })));
    const currentUserEnrollments = enrollments.filter((enrollment) => enrollment?.user_id === user.id);

    return Response.json({ enrollments: currentUserEnrollments });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config = {
  path: "/api/enrollments",
};
