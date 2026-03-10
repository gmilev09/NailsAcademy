import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { GraduationCap, ArrowRight, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-100/20 to-rose-100/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-pink-100 shadow-sm mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <GraduationCap className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-gray-600">Професионално обучение за нокти</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-gray-900 mb-6">
              <span className="block">Nails</span>
              <span className="block font-semibold bg-gradient-to-r from-rose-400 via-pink-400 to-rose-500 bg-clip-text text-transparent">
                Academy
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-6 max-w-lg">
              Стартирайте кариерата си в маникюра. Учете от експерти в индустрията и получете сертификат с нашите професионални курсове.
            </p>

            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-rose-500" />
                </div>
                <span className="text-sm text-gray-600">Сертифицирани курсове</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-rose-500" />
                </div>
                <span className="text-sm text-gray-600">Експертен инструктор</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/Courses">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-pink-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-300/50"
                >
                  Разгледай курсове
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/Enroll">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-200 hover:border-rose-300 px-8 py-6 text-base rounded-full transition-all duration-300 hover:bg-rose-50"
                >
                  Запиши се сега
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-pink-200 rounded-[3rem] rotate-6 scale-95" />
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
                alt="Обучение по маникюр"
                className="relative rounded-[3rem] shadow-2xl w-full object-cover h-[550px]"
              />
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-pink-100"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Следващ курс</p>
                    <p className="font-semibold text-gray-900">Започва скоро</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-pink-100"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-rose-500">10+</p>
                  <p className="text-xs text-gray-500">Години опит</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
