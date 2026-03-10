import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Твоите реални отзиви (запазени точно както са в дизайна ти)
const reviews = [
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
