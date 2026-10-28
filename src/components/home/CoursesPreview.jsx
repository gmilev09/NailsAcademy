import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GraduationCap, Clock, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { courses } from "@/data/courses";
import { useAuth } from "@/lib/AuthContext";

const levelColors = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-blue-100 text-blue-700",
  advanced: "bg-purple-100 text-purple-700"
};

const levelLabels = {
  beginner: "Начинаещи",
  intermediate: "Средно ниво",
  advanced: "Напреднали"
};

/* Колко карти се виждат едновременно: 1 на мобилно, 3 на md+ */
function usePerView() {
  const getPerView = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches ? 3 : 1;
  const [perView, setPerView] = useState(getPerView);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => setPerView(mql.matches ? 3 : 1);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return perView;
}

export default function CoursesPreview() {
  const featuredCourses = courses.slice(0, 3);
  const { isAuthenticated } = useAuth();

  const perView = usePerView();
  const maxIndex = Math.max(0, featuredCourses.length - perView);
  const [index, setIndex] = useState(0);

  // При resize (мобилно <-> десктоп) държим индекса в граници
  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const goTo = (next) => setIndex(Math.min(Math.max(next, 0), maxIndex));
  const canNavigate = maxIndex > 0;

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full mb-6">
            <GraduationCap className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-medium text-rose-600">Нашите курсове</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Професионално <span className="font-semibold text-rose-500">обучение</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            От основи за начинаещи до напреднали техники - намерете идеалния курс за старт или развитие на кариерата ви
          </p>
        </motion.div>

        {/* Слайдер: 1 карта на мобилно / 3 на десктоп. Сменя се само ръчно със стрелките. */}
        <motion.div
          className="relative mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden -mx-1.5">
            <div
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${(index * 100) / perView}%)` }}
            >
              {featuredCourses.map((course) => (
                <div key={course.id} className="w-full md:w-1/3 shrink-0 px-1.5">
                  <div className="group relative overflow-hidden rounded-3xl bg-gray-50 p-2 h-full border border-gray-100">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Link to={`/courses/${course.slug}`}>
                        <img src={course.image_url} alt={course.title} loading="lazy" decoding="async" className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
                      </Link>
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={`${levelColors[course.level]} border-0`}>{levelLabels[course.level]}</Badge>
                        {course.certificate && <Badge className="bg-white/90 text-rose-500 border-0"><Award className="w-3 h-3 mr-1" />Сертификат</Badge>}
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-2xl font-bold text-white">
                          {`€${course.price}`}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link to={`/courses/${course.slug}`} className="hover:text-rose-500 transition-colors">
                          {course.title}
                        </Link>
                      </h3>
                      <p className="text-gray-500 mb-4">{course.short_description}</p>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{course.duration}</span></div>
                      </div>
                      <Link to={isAuthenticated ? `/Enroll?course=${encodeURIComponent(course.title)}` : "/auth?mode=signup"}>
                        <Button className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full">
                          Запиши се
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Стрелки — само когато има какво да се превърта (мобилна версия) */}
          {canNavigate && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label="Предишен курс"
                className="absolute left-1 top-28 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white/95 text-gray-900 shadow-xl backdrop-blur transition-all hover:scale-110 hover:bg-white disabled:opacity-35 disabled:hover:scale-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index === maxIndex}
                aria-label="Следващ курс"
                className="absolute right-1 top-28 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-rose-100 bg-white/95 text-gray-900 shadow-xl backdrop-blur transition-all hover:scale-110 hover:bg-white disabled:opacity-35 disabled:hover:scale-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Точки-индикатори */}
              <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    type="button"
                    onClick={() => goTo(dotIndex)}
                    aria-label={`Към курс ${dotIndex + 1}`}
                    className={`h-1.5 rounded-full transition-all ${dotIndex === index ? "w-8 bg-rose-400" : "w-2 bg-rose-200 hover:bg-rose-300"}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link
            to="/Courses"
            className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-10 py-3 text-base font-semibold text-rose-500 transition-colors hover:bg-rose-50 md:text-2xl"
          >
            Виж всички курсове→
          </Link>
        </div>
      </div>
    </section>
  );
}
