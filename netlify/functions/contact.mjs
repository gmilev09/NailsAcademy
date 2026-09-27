import { getStore } from "@netlify/blobs";

const CONTACT_STORE = { name: "contact_messages", consistency: "strong" };
const DEFAULT_ADMIN_EMAIL = "bozhinova.nails.academy@gmail.com";
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

function sanitizeText(value, maxLength = 2000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

async function sendContactNotification(message) {
  const resendApiKey = Netlify.env.get("RESEND_API_KEY");

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not configured. Email notifications will not be sent. To enable email notifications, add your Resend API key to your environment variables.");
    return { success: false, reason: "RESEND_API_KEY not configured" };
  }

  const toEmail = Netlify.env.get("CONTACT_NOTIFICATION_TO") || DEFAULT_ADMIN_EMAIL;
  const fromEmail = Netlify.env.get("CONTACT_NOTIFICATION_FROM") || DEFAULT_FROM_EMAIL;

  const payload = {
    from: fromEmail,
    to: [toEmail],
    subject: `Ново контактно съобщение: ${message.subject || "Без тема"}`,
    text: [
      "Получено е ново съобщение от контактната форма.",
      "",
      `Име: ${message.name}`,
      `Имейл: ${message.email}`,
      `Тема: ${message.subject || "Без тема"}`,
      "",
      "Съобщение:",
      message.message,
      "",
      `ID: ${message.id}`,
      `Създадено: ${message.created_at}`,
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

    console.log("Contact notification email sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Failed to send contact notification email:", error.message);
    return { success: false, reason: error.message };
  }
}

export default async (req, context) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = sanitizeText(body.name, 120);
  const email = sanitizeText(body.email, 180);
  const subject = sanitizeText(body.subject, 200);
  const messageText = sanitizeText(body.message, 5000);

  if (!name || !email || !messageText) {
    return Response.json({ error: "Missing required fields: name, email, message" }, { status: 400 });
  }

  const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const record = {
    id,
    name,
    email,
    subject,
    message: messageText,
    created_at: new Date().toISOString(),
    status: "new",
  };

  try {
    const store = getStore(CONTACT_STORE);
    await store.setJSON(id, record);

    // Try to send email notification (non-blocking)
    context.waitUntil(
      sendContactNotification(record).catch((error) => {
        console.error("Unexpected error in email notification:", error);
      })
    );

    return Response.json({ success: true, message: { id: record.id } }, { status: 201 });
  } catch (error) {
    console.error("Error storing contact message:", error);
    return Response.json(
      { error: "Failed to store message", details: error.message },
      { status: 500 }
    );
  }
};

export const config = {
  path: "/api/contact",
};
