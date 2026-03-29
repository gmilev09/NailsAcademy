import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ArrowRight, Award, CheckCircle, Clock, Users } from "lucide-react";
import { getCourseBySlug } from "../data/courses";

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
  const course = getCourseBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/40 to-white pt-36 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Курсът не беше открит</h1>
          <p className="text-gray-500 mb-8">Възможно е линкът да е стар или курсът да е преместен.</p>
          <Link to="/Courses">
            <Button className="bg-rose-500 text-white rounded-full">Към всички курсове</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 to-white pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <img src={course.image_url} alt={course.title} className="w-full rounded-3xl h-[340px] object-cover shadow-lg mb-6" />
            <div className="flex gap-2 mb-4">
              <Badge className={levelColors[course.level]}>{levelLabels[course.level]}</Badge>
              {course.certificate && <Badge className="bg-white text-rose-500 border-none">Сертификат</Badge>}
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">{course.title}</h1>
            <p className="text-lg text-gray-600 mb-8">{course.short_description}</p>
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">{course.description}</div>
          </div>

          <aside className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-50 sticky top-32">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">Информация за курса</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4 text-rose-500" />Продължителност</span>
                  <span className="font-semibold text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-2"><Users className="w-4 h-4 text-rose-500" />Група</span>
                  <span className="font-semibold text-gray-900">
                    {course.max_students ? `Максимум ${course.max_students}` : "Индивидуално"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-2"><Award className="w-4 h-4 text-rose-500" />Сертификат</span>
                  <span className="font-semibold text-gray-900">{course.certificate ? "Да" : "Не"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-rose-500" />Цена</span>
                  <span className="font-semibold text-rose-500 text-xl">{`€${course.price}`}</span>
                </div>
              </div>

              <Link to={`/Enroll?course=${encodeURIComponent(course.title)}`}>
                <Button className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full">
                  Запиши се без акаунт
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/Courses" className="mt-4 block text-center text-sm text-rose-500 hover:text-rose-600">
                Назад към всички курсове
              </Link>
            </div>
          </aside>
        </motion.div>
      </div>
    </div>
  );
}
