import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

const heroImage = "https://raw.githubusercontent.com/gmilev09/NailsAcademy/main/src/NailsAcademy/Salon/884c3f0c-fa89-4cc0-8dd4-346ae9fec656.jpg";

const heroStats = [
  { value: "10+", label: "години опит" },
  { value: "500+", label: "доволни клиенти" },
  { value: "4", label: "курсови програми" },
];

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  const enrollNowPath = isAuthenticated ? "/Enroll" : "/auth?mode=signup";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FDF7F5]">
      {/* Меки светлинни петна */}
      <div className="absolute -top-32 -left-32 w-[34rem] h-[34rem] bg-rose-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-24 w-[38rem] h-[38rem] bg-pink-100/40 rounded-full blur-3xl" />
      {/* Вертикална деликатна линия */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-200/40 to-transparent hidden xl:block" />

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">
          {/* Текст */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-9"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="h-px w-12 sm:w-16 bg-gradient-to-r from-rose-400 to-transparent" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-rose-500 font-semibold">
                Професионално обучение за маникюр · Петрич
              </span>
            </motion.div>

            <motion.h1
              className="text-[13vw] sm:text-7xl xl:text-[5.4rem] font-light text-gray-900 leading-[1.02] tracking-tight mb-2"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
            >
              ARTAYA
              <span className="block font-semibold italic bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent pb-3">
                Nails Academy
              </span>
            </motion.h1>

            <motion.div
              className="h-px w-24 bg-gradient-to-r from-rose-400 to-transparent mb-7"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />

            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-9 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
            >
              Стартирайте кариерата си в маникюра. Учете от експерти в индустрията
              и излезте с реални умения и сертификат от нашите професионални курсове.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32 }}
            >
              <Link to="/Courses">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-8 py-6 text-base rounded-full shadow-lg shadow-pink-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-300/50 hover:-translate-y-0.5"
                >
                  Разгледай курсове
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={enrollNowPath}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 hover:border-rose-300 px-8 py-6 text-base rounded-full transition-all duration-300 hover:bg-rose-50 bg-white/60 backdrop-blur"
                >
                  Запиши се сега
                </Button>
              </Link>
            </motion.div>

            {/* Редакционен ред със статистика */}
            <motion.div
              className="flex items-center gap-8 sm:gap-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42 }}
            >
              {heroStats.map((stat, index) => (
                <div key={stat.label} className="flex items-center gap-8 sm:gap-10">
                  {index > 0 && <span className="h-10 w-px bg-rose-200/80" />}
                  <div>
                    <p className="font-display text-3xl sm:text-4xl font-semibold text-gray-900 leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Изображение в аркова рамка */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
          >
            <div className="relative max-w-[27rem] mx-auto">
              {/* Контурна рамка */}
              <div className="absolute -inset-4 border border-rose-200 rounded-t-[13rem] rounded-b-[2.5rem] rotate-[1.5deg]" />
              <div className="absolute -inset-4 border border-pink-100 rounded-t-[13rem] rounded-b-[2.5rem] -rotate-[1.2deg]" />

              <div className="relative overflow-hidden rounded-t-[12rem] rounded-b-[2.5rem] shadow-2xl shadow-rose-200/40 bg-rose-100">
                <motion.img
                  src={heroImage}
                  alt="Обучение по маникюр"
                  width={500}
                  height={640}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full object-cover h-[34rem]"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/10 via-transparent to-transparent" />
              </div>

              {/* Плаваща карта — следващ курс */}
              <motion.div
                className="absolute -bottom-7 -left-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 pr-6 shadow-xl border border-pink-100"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-gray-400 font-medium">Следващ курс</p>
                    <p className="font-display font-semibold text-gray-900">Започва скоро</p>
                  </div>
                </div>
              </motion.div>

              {/* Плаващ знак — опит */}
              <motion.div
                className="absolute -top-5 -right-6 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-pink-100 text-center"
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="font-display text-3xl font-semibold text-rose-500 leading-none">10+</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400 mt-1">години опит</p>
                <Sparkles className="w-3.5 h-3.5 text-rose-300 mx-auto mt-1.5" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
