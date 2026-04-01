import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const REVIEWS_STORE = { name: "reviews", consistency: "strong" };
const DEFAULT_ADMIN_EMAIL = "bozhinova.nails.academy@gmail.com";

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function normalizeText(value, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
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

async function listReviews(store) {
  const { blobs } = await store.list();
  const reviews = await Promise.all(blobs.map((blob) => store.get(blob.key, { type: "json" })));
  return reviews.filter(Boolean);
}

export default async (req) => {
  const store = getStore(REVIEWS_STORE);

  if (req.method === "POST") {
    const body = await req.json();

    const author_name = normalizeText(body?.author_name, 120);
    const comment = normalizeText(body?.comment, 2000);
    const course_title = normalizeText(body?.course_title, 160);
    const author_image = normalizeText(body?.author_image, 1000);
    const rating = Math.max(1, Math.min(5, Number(body?.rating) || 0));

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

    const review = await store.get(id, { type: "json" });
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
