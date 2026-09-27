import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const DEFAULT_ADMIN_EMAIL = "bozhinova.nails.academy@gmail.com";
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

function sanitizeText(value, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

async function sendEnrollmentNotification(enrollment) {
  const resendApiKey = Netlify.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured. Email notifications will not be sent. To enable email notifications, add your Resend API key to your environment variables.");
    return { success: false, reason: "RESEND_API_KEY not configured" };
  }

  const toEmail = Netlify.env.get("ENROLLMENT_NOTIFICATION_TO") || DEFAULT_ADMIN_EMAIL;
  const fromEmail = Netlify.env.get("ENROLLMENT_NOTIFICATION_FROM") || DEFAULT_FROM_EMAIL;

  const payload = {
    from: fromEmail,
    to: [toEmail],
    subject: `Ново записване: ${enrollment.student_name}`,
    text: [
      "Получена е нова заявка за записване.",
      "",
      `ID: ${enrollment.id}`,
      `Име: ${enrollment.student_name}`,
      `Имейл: ${enrollment.email || "няма"}`,
      `Телефон: ${enrollment.phone}`,
      "",
      `Курс: ${enrollment.course_title}`,
      `Цена: ${enrollment.course_price}`,
      `Продължителност: ${enrollment.course_duration || "не е посочена"}`,
      "",
      "Съобщение:",
      enrollment.message || "няма",
      "",
      `Създадено: ${enrollment.created_at}`,
    ].join("\n"),
  };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Resend API error (${response.status}):`, errorText);
      return { success: false, reason: `Resend API error: ${response.status}` };
    }

    console.log("Enrollment notification email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Failed to send enrollment notification email:", error.message);
    return { success: false, reason: error.message };
  }
}

export default async (req, context) => {
  const store = getStore({ name: "enrollments", consistency: "strong" });
  const user = await getUser();

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const student_name = sanitizeText(body.student_name || body.name, 120);
    const email = sanitizeText(user?.email || body.email, 180);
    const phone = sanitizeText(body.phone, 60);
    const course_title = sanitizeText(body.course_title, 200);
    const course_duration = sanitizeText(body.course_duration, 200);
    const message = sanitizeText(body.message, 5000);
    const course_price = String(body.course_price || "0");

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
      student_name,
      email,
      phone,
      course_title,
      course_price,
      course_duration,
      message,
      status: "new",
      created_at: new Date().toISOString(),
    };

    try {
      await store.setJSON(id, enrollment);

      // Try to send email notification (non-blocking)
      context.waitUntil(
        sendEnrollmentNotification(enrollment).catch((error) => {
          console.error("Unexpected error in email notification:", error);
        })
      );

      return Response.json({ success: true, enrollment }, { status: 201 });
    } catch (error) {
      console.error("Error storing enrollment:", error);
      return Response.json(
        { error: "Failed to store enrollment", details: error.message },
        { status: 500 }
      );
    }
  }

  if (req.method === "GET") {
    if (!user || !user.confirmedAt) {
      return Response.json({ error: "Authentication required" }, { status: 401 });
    }

    try {
      const { blobs } = await store.list();
      const enrollments = await Promise.all(blobs.map((blob) => store.get(blob.key, { type: "json" })));
      const currentUserEnrollments = enrollments.filter((enrollment) => enrollment?.user_id === user.id);

      return Response.json({ enrollments: currentUserEnrollments });
    } catch (error) {
      console.error("Error retrieving enrollments:", error);
      return Response.json(
        { error: "Failed to retrieve enrollments", details: error.message },
        { status: 500 }
      );
    }
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
};

export const config = {
  path: "/api/enrollments",
};
