import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const REVIEWS_STORE = { name: "reviews", consistency: "strong" };
const DEFAULT_ADMIN_EMAIL = "bozhinova.nails.academy@gmail.com";
const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function normalizeText(value, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function normalizeRating(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 5;
  return Math.max(1, Math.min(5, Math.round(parsed)));
}

function normalizeIsoDate(value) {
  const text = normalizeText(value, 64);
  if (!text) return "";
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function normalizeStoredReview(rawReview, fallbackId = "") {
  if (!rawReview || typeof rawReview !== "object") return null;

  const id = normalizeText(rawReview.id || fallbackId, 160);
  if (!id) return null;

  const author_name = normalizeText(rawReview.author_name ?? rawReview.authorName, 120);
  const comment = normalizeText(rawReview.comment ?? rawReview.message, 2000);
  const course_title = normalizeText(rawReview.course_title ?? rawReview.courseTitle, 160);
  const author_image = normalizeText(rawReview.author_image ?? rawReview.authorImage, 1000);

  if (!author_name || !comment) return null;

  const rawStatus = normalizeText(rawReview.status, 24).toLowerCase();
  let status = "pending";
  if (["pending", "approved", "rejected"].includes(rawStatus)) {
    status = rawStatus;
  } else if (rawReview.approved === true) {
    status = "approved";
  }

  const created_at = normalizeIsoDate(rawReview.created_at ?? rawReview.createdAt) || new Date().toISOString();
  const approved_at = normalizeIsoDate(rawReview.approved_at ?? rawReview.approvedAt) || null;
  const rejected_at = normalizeIsoDate(rawReview.rejected_at ?? rawReview.rejectedAt) || null;
  const moderated_by = normalizeText(rawReview.moderated_by ?? rawReview.moderatedBy, 320) || null;

  return {
    id,
    author_name,
    rating: normalizeRating(rawReview.rating),
    comment,
    course_title,
    author_image,
    status,
    created_at,
    approved_at,
    rejected_at,
    moderated_by,
  };
}

function parseAllowedModerators() {
  const envValue = Netlify.env.get("REVIEW_MODERATOR_EMAILS") || "";
  const emails = envValue
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (!emails.length) {
    emails.push(DEFAULT_ADMIN_EMAIL.toLowerCase());
  }

  return new Set(emails);
}

function isModerator(user) {
  if (!user?.email || !user?.confirmedAt) return false;
  const moderators = parseAllowedModerators();
  return moderators.has(String(user.email).toLowerCase());
}

async function sendReviewNotification(review) {
  const resendApiKey = Netlify.env.get("RESEND_API_KEY");
  if (!resendApiKey) {
    return;
  }

  const toEmail = Netlify.env.get("REVIEW_NOTIFICATION_TO") || DEFAULT_ADMIN_EMAIL;
  const fromEmail = Netlify.env.get("REVIEW_NOTIFICATION_FROM") || DEFAULT_FROM_EMAIL;

  const payload = {
    from: fromEmail,
    to: [toEmail],
    subject: `Нов отзив от ${review.author_name}`,
    text: [
      "Получен е нов отзив, който чака модерация.",
      "",
      `Име: ${review.author_name}`,
      `Оценка: ${review.rating}/5`,
      `Курс: ${review.course_title || "не е посочен"}`,
      "",
      "Коментар:",
      review.comment,
      "",
      `ID: ${review.id}`,
      `Създадено: ${review.created_at}`,
    ].join("\n"),
  };

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
    throw new Error(`Resend API error (${response.status}): ${errorText}`);
  }
}

async function listReviews(store) {
  const { blobs } = await store.list();
  const reviews = await Promise.all(
    blobs.map(async (blob) => {
      const rawReview = await store.get(blob.key, { type: "json" });
      return normalizeStoredReview(rawReview, blob.key);
    })
  );

  return reviews.filter(Boolean);
}

export default async (req, context) => {
  const store = getStore(REVIEWS_STORE);

  if (req.method === "POST") {
    const body = await req.json();

    const author_name = normalizeText(body?.author_name, 120);
    const comment = normalizeText(body?.comment, 2000);
    const course_title = normalizeText(body?.course_title, 160);
    const author_image = normalizeText(body?.author_image, 1000);
    const rating = normalizeRating(body?.rating);

    if (!author_name || !comment || !Number.isFinite(rating)) {
      return jsonResponse({ error: "Missing required fields: author_name, comment, rating" }, 400);
    }

    const id = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const review = {
      id,
      author_name,
      rating,
      comment,
      course_title,
      author_image,
      status: "pending",
      created_at: new Date().toISOString(),
      approved_at: null,
      rejected_at: null,
      moderated_by: null,
    };

    await store.setJSON(id, review);
    context.waitUntil(
      sendReviewNotification(review).catch((error) => {
        console.error("Failed to send review notification email:", error);
      })
    );

    return jsonResponse({ success: true, review }, 201);
  }

  if (req.method === "GET") {
    const url = new URL(req.url);
    const requestedStatus = normalizeText(url.searchParams.get("status") || "", 32).toLowerCase();
    const user = await getUser();
    const canModerate = isModerator(user);
    const reviews = await listReviews(store);

    if (!canModerate) {
      const approved = reviews
        .filter((review) => review.status === "approved")
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      return jsonResponse({ reviews: approved, canModerate: false });
    }

    const filtered = requestedStatus
      ? reviews.filter((review) => review.status === requestedStatus)
      : reviews;

    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return jsonResponse({ reviews: filtered, canModerate: true });
  }

  if (req.method === "PATCH") {
    const user = await getUser();
    if (!isModerator(user)) {
      return jsonResponse({ error: "Forbidden" }, 403);
    }

    const body = await req.json();
    const id = normalizeText(body?.id, 120);
    const action = normalizeText(body?.action, 24).toLowerCase();

    if (!id || !["approve", "reject"].includes(action)) {
      return jsonResponse({ error: "Missing required fields: id, action(approve|reject)" }, 400);
    }

    const storedReview = await store.get(id, { type: "json" });
    const review = normalizeStoredReview(storedReview, id);
    if (!review) {
      return jsonResponse({ error: "Review not found" }, 404);
    }

    const now = new Date().toISOString();
    const nextReview = {
      ...review,
      status: action === "approve" ? "approved" : "rejected",
      approved_at: action === "approve" ? now : null,
      rejected_at: action === "reject" ? now : null,
      moderated_by: user.email || null,
    };

    await store.setJSON(id, nextReview);
    return jsonResponse({ success: true, review: nextReview });
  }

  return jsonResponse({ error: "Method not allowed" }, 405);
};

export const config = {
  path: "/api/reviews",
};
