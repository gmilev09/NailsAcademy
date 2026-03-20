import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore({ name: "enrollments", consistency: "strong" });

  if (req.method === "POST") {
    const body = await req.json();

    const { student_name, email, phone, course_title, message } = body;
    if (!student_name || !email || !phone || !course_title) {
      return Response.json(
        { error: "Missing required fields: student_name, email, phone, course_title" },
        { status: 400 }
      );
    }

    const id = `enr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const enrollment = {
      id,
      student_name,
      email,
      phone,
      course_title,
      message: message || "",
      status: "new",
      created_at: new Date().toISOString(),
    };

    await store.setJSON(id, enrollment);

    return Response.json({ success: true, enrollment }, { status: 201 });
  }

  if (req.method === "GET") {
    const { blobs } = await store.list();
    const enrollments = await Promise.all(
      blobs.map((blob) => store.get(blob.key, { type: "json" }))
    );

    return Response.json({ enrollments });
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config = {
  path: "/api/enrollments",
};
