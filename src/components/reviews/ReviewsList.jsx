import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
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

export default function ReviewsList() {
  const [reviews, setReviews] = useState(fallbackReviews);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <p className="text-sm text-gray-500">Зареждане на отзиви...</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star}
                className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} 
              />
            ))}
          </div>
          <p className="text-gray-600 mb-4 italic text-sm">"{review.comment}"</p>
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
        </motion.div>
      ))}
    </div>
  );
}
