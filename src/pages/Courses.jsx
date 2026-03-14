import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Clock, GraduationCap, Award, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { value: "all", label: "Всички курсове" },
  { value: "manicure", label: "Базови" },
 { value: "advanced", label: "Напреднали" },
];

const levels = [
  { value: "all", label: "Всички нива" },
  { value: "beginner", label: "Начинаещи" },
  { value: "intermediate", label: "Средно ниво" },
  { value: "advanced", label: "Напреднали" },
];

const levelColors = {
  beginner: "bg-green-100 text-green-700 border-green-200",
  intermediate: "bg-blue-100 text-blue-700 border-blue-200",
  advanced: "bg-purple-100 text-purple-700 border-purple-200",
};

const levelLabels = {
  beginner: "Начинаещи",
  intermediate: "Средно ниво",
  advanced: "Напреднали",
};

// Твоите реални курсове (зареждат се веднага)
const initialCourses = [
  { 
    id: 1, 
    title: "Базов курс по маникюр,педикюр и ноктопластика",
    category: "manicure", 
    level: "beginner", 
    price: 1300, 
    duration: "80 учебни работни часа",
    certificate: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/1622aebbd_attygi3AwRXqaCZMpSwhgA-8ixNB8vVeAmf12KHyOcY0CQ.jpg"
  },
  { 
    id: 2, 
    title: "Комбиниран маникюр", 
    category: "advanced", 
     level: "advanced",  
    price: 250, 
     duration: "20 учебни часа",
    certificate: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/fa1312ba1_attO0HSrdtIgmvZjcIGW5OHzCiwuDtzIMapjbzRHgMEuF4.jpg"
  },
  { 
    id: 3,
    title: "Изграждане с горни форми",
    category: "advanced",
    level: "intermediate",
    price: 130,
    duration: "10 учебни часа",
    certificate: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/637fe9b35_attmRG1nC8ozJ_HT5ii5lWHpExNOB0bBMV0mxHJGk1kAZA.jpg"
  },
  { 
    id: 4,
    title: "Работа гел",
    category: "advanced",
    level: "advanced",
    price: 250,
    duration: "20 учебни часа",
    certificate: true,
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/fa659ac98_attIQDVOiwZWSFwUUrTJ8noxCY4qkQ1Ml_xATQ-ixFgJq8.jpg"
  }
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCourses = initialCourses.filter(course => {
    const categoryMatch = activeCategory === "all" || course.category === activeCategory;
    const levelMatch = activeLevel === "all" || course.level === activeLevel;
    return categoryMatch && levelMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <GraduationCap className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600 uppercase">Обучение</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 text-center">
              Нашите <span className="font-semibold text-rose-500 italic">курсове</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="container mx-auto space-y-6">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="bg-white border border-gray-100 p-1 rounded-full flex flex-wrap justify-center h-auto gap-2">
              {categories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value} className="rounded-full px-6 py-2 data-[state=active]:bg-rose-500 data-[state=active]:text-white">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="flex justify-center">
            <Tabs value={activeLevel} onValueChange={setActiveLevel}>
              <TabsList className="bg-gray-50 p-1 rounded-full flex gap-1">
                {levels.map((level) => (
                  <TabsTrigger key={level.value} value={level.value} className="rounded-full px-4 py-1 text-sm data-[state=active]:bg-white shadow-sm">
                    {level.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div key={course.id} className="group" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <div className="bg-white rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all border border-gray-50 flex flex-col h-full">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={levelColors[course.level]}>{levelLabels[course.level]}</Badge>
                      {course.certificate && <Badge className="bg-white text-rose-500 border-none italic">Сертификат</Badge>}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 italic">{course.title}</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-500 gap-2"><Clock className="w-4 h-4 text-rose-400" /> Продължителност: {course.duration}</div>
                      <div className="flex items-center text-sm text-gray-500 gap-2"><CheckCircle className="w-4 h-4 text-rose-400" /> Индивидуален подход</div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-2xl font-bold text-rose-500">€{course.price}</span>
                      <Link to={`/Enroll?course=${encodeURIComponent(course.title)}`}>
                        <Button className="bg-rose-500 text-white rounded-full">Запиши се <ArrowRight className="ml-2 w-4 h-4" /></Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
