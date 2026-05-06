import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { toast } from "sonner";

const fallbackReviews = [
  {
    id: 1,
    author_name: "Мария П.",
    rating: 5,
    comment: "Изключително доволна съм от базовия курс! Инструкторката обяснява всичко много подробно.",
    course_title: "Базов курс",
    author_image: null
  },
  {
    id: 2,
    author_name: "Елена Г.",
    rating: 5,
    comment: "Препоръчвам Nails Academy на всеки, който иска да започне професионално в тази сфера.",
    course_title: "Комбиниран маникюр",
    author_image: null
  }
];

const PAGE_SIZE = 2;

function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
          />
        ))}
      </div>
      <p className="text-gray-600 mb-4 italic text-sm flex-1">"{review.comment}"</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {review.author_image ? (
            <img src={review.author_image} alt={review.author_name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <span className="text-rose-500 font-medium text-xs">{review.author_name.charAt(0)}</span>
            </div>
          )}
          <p className="font-medium text-gray-900 text-sm">{review.author_name}</p>
        </div>
        {review.course_title && (
          <span className="text-[10px] text-rose-500 bg-rose-50 px-2 py-1 rounded-full uppercase font-bold tracking-wider">
            {review.course_title}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ReviewsList() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const loadApprovedReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Неуспешно зареждане на отзиви.");
        }

        if (!isMounted) return;
        const loadedReviews = Array.isArray(data?.reviews) ? data.reviews : [];
        setReviews(loadedReviews.length ? loadedReviews : fallbackReviews);
      } catch (error) {
        if (!isMounted) return;
        setReviews(fallbackReviews);
        toast.error(error?.message || "Проблем при зареждането на отзивите.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadApprovedReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [totalPages, page]);

  const currentReviews = useMemo(() => {
    const start = page * PAGE_SIZE;
    return reviews.slice(start, start + PAGE_SIZE);
  }, [reviews, page]);

  const goTo = (next) => {
    setDirection(next > page ? 1 : -1);
    setPage(((next % totalPages) + totalPages) % totalPages);
  };

  const handlePrev = () => goTo(page - 1);
  const handleNext = () => goTo(page + 1);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Зареждане на отзиви...</p>;
  }

  const canPaginate = reviews.length > PAGE_SIZE;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {currentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {canPaginate && (
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Предишни отзиви"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-rose-500 hover:border-rose-200 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Страница ${idx + 1}`}
                onClick={() => goTo(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === page ? "w-6 bg-rose-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Следващи отзиви"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-rose-500 hover:border-rose-200 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
