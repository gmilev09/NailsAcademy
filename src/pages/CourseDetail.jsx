// RECONSTRUCTED от достъпната част на оригинала (инфо-панелът е вербатим по съдържание).
import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Clock, GraduationCap, Users, Award, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { courses } from "../data/courses";
import { useAuth } from "@/lib/AuthContext";

const levelColors = {
  beginner: "bg-green-100 text-green-700 border-green-200",
  intermediate: "bg-blue-100 text-blue-700 border-blue-200",
  advanced: "bg-purple-100 text-purple-700 border-purple-200",
};

const levelLabels = {
  beginner: "Начинаещи",
  intermediate: "Средно ниво",
  advanced: "Надграждащи",
};

export default function CourseDetail() {
  const { slug } = useParams();
  const { isAuthenticated } = useAuth();

  const course = useMemo(() => courses.find((item) => item.slug === slug), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white pt-40 pb-24 px-6 text-center">
        <h1 className="text-3xl font-light text-gray-900 mb-4">Курсът не е намерен</h1>
        <p className="text-gray-500 mb-8">Възможно е адресът да е променен.</p>
        <Link to="/Courses">
          <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Всички курсове
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white pt-28 pb-24">
      <div className="container mx-auto px-6">
        <Link to="/Courses" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад към курсовете
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-pink-100 shadow-sm">
              <img
                src={course.image_url}
                alt={course.title}
                className="w-full object-cover aspect-[4/3]"
                decoding="async"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={levelColors[course.level]}>{levelLabels[course.level]}</Badge>
                {course.certificate && (
                  <Badge className="bg-white text-rose-500 border-none italic">Сертификат</Badge>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 mt-6">
              <div className="space-y-3 text-sm mb-6">
                <p className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4 text-rose-500" />Продължителност</span>
                  <span className="font-semibold text-gray-900">{course.duration}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2"><Users className="w-4 h-4 text-rose-500" />Група</span>
                  <span className="font-semibold text-gray-900">
                    {course.max_students ? `Максимум ${course.max_students}` : "Индивидуално"}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2"><Award className="w-4 h-4 text-rose-500" />Сертификат</span>
                  <span className="font-semibold text-gray-900">{course.certificate ? "Да" : "Не"}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-gray-500 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-rose-500" />Цена</span>
                  <span className="font-semibold text-rose-500 text-xl">{`€${course.price}`}</span>
                </p>
              </div>

              <Link to={isAuthenticated ? `/Enroll?course=${encodeURIComponent(course.title)}` : "/auth?mode=signup"}>
                <Button className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full py-6 text-lg">
                  Запиши се
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <GraduationCap className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600 uppercase">{course.category === "manicure" ? "Базов курс" : "Надграждащ курс"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-6 italic leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-10">{course.short_description}</p>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50">
              <div className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px] md:text-base">
                {course.description}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
