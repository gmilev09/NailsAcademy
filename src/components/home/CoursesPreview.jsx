import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, GraduationCap, Clock, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

// Твоите данни за курсовете (запазени точно)
const featuredCourses = [
  {
    id: 1,
    title: "Базов курс по маникюр",
    description: "Всичко необходимо за старт в професията - анатомия, хигиена и лакиране.",
    price: "230",
    duration: "5 дни",
    level: "beginner",
    image_url: "https://images.unsplash.com",
    certificate: true
  },
  {
    id: 2,
    title: "Комбиниран маникюр",
    description: "Работа с апарат и ножичка за перфектно почистване на кутикулата.",
    price: "128",
    duration: "2 дни",
    level: "intermediate",
    image_url: "https://images.unsplash.com",
    certificate: true
  }
];

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

export default function CoursesPreview() {
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
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredCourses.map((course, index) => (
            <motion.div key={course.id} className="group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.15 }}>
              <div className="relative overflow-hidden rounded-3xl bg-gray-50 p-2 h-full border border-gray-100">
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={course.image_url} alt={course.title} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`${levelColors[course.level]} border-0`}>{levelLabels[course.level]}</Badge>
                    {course.certificate && <Badge className="bg-white/90 text-rose-500 border-0"><Award className="w-3 h-3 mr-1" />Сертификат</Badge>}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-2xl font-bold text-white">€{course.price}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-500 mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{course.duration}</span></div>
                  </div>
                  <Link to="/Enroll">
                    <Button className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full">Запиши се</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
