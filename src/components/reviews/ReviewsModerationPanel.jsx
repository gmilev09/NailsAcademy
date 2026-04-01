import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("bg-BG");
}

export default function ReviewsModerationPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [canModerate, setCanModerate] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [pendingActionId, setPendingActionId] = useState(null);

  const pendingReviews = useMemo(() => reviews.filter((review) => review.status === "pending"), [reviews]);

  const loadPendingReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/reviews?status=pending");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Неуспешно зареждане на отзиви.");
      }

      setCanModerate(Boolean(data?.canModerate));
      setReviews(Array.isArray(data?.reviews) ? data.reviews : []);
    } catch (error) {
      setCanModerate(false);
      setReviews([]);
      toast.error(error?.message || "Проблем при зареждане на модерацията.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingReviews();
  }, []);

  const handleModerate = async (id, action) => {
    try {
      setPendingActionId(id);
      const response = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Неуспешна модерация.");
      }

      toast.success(action === "approve" ? "Отзивът е одобрен." : "Отзивът е отказан.");
      setReviews((current) => current.filter((review) => review.id !== id));
    } catch (error) {
      toast.error(error?.message || "Проблем при модерацията.");
    } finally {
      setPendingActionId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-500">Зареждане на модерация...</p>
      </div>
    );
  }

  if (!canModerate) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-rose-200 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Модерация на отзиви</h3>
        <p className="text-sm text-gray-500">Чакащи за одобрение: {pendingReviews.length}</p>
      </div>

      {!pendingReviews.length ? (
        <p className="text-sm text-gray-500">Няма чакащи отзиви.</p>
      ) : (
        <div className="space-y-3">
          {pendingReviews.map((review) => (
            <div key={review.id} className="rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="font-medium text-gray-900 text-sm">{review.author_name}</p>
                <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{review.comment}</p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => handleModerate(review.id, "approve")}
                  disabled={pendingActionId === review.id}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {pendingActionId === review.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  Одобри
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleModerate(review.id, "reject")}
                  disabled={pendingActionId === review.id}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  {pendingActionId === review.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                  Откажи
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
