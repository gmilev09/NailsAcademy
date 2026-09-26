// NOTE: Първата част е вербатим от репозиторито; секциите "Отзиви" и CTA в края са
// реконструирани (оригиналният файл е 14KB). Изображенията сочат към GitHub raw.
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Award, Users, GraduationCap, Sparkles, Star, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewsList from "@/components/reviews/ReviewsList";
import ReviewsModerationPanel from "@/components/reviews/ReviewsModerationPanel";
import { useAuth } from "@/lib/AuthContext";

const aboutMissionImage = "https://raw.githubusercontent.com/gmilev09/NailsAcademy/main/src/NailsAcademy/Salon/viber_image_2026-03-31_20-45-23-923.jpg";
const aboutHeroImage = "https://raw.githubusercontent.com/gmilev09/NailsAcademy/main/src/NailsAcademy/Salon/884c3f0c-fa89-4cc0-8dd4-346ae9fec656.jpg";

const stats = [
{ icon: Users, value: "500+", label: "Доволни клиенти" },
{ icon: Award, value: "10+", label: "Години опит" },
{ icon: Heart, value: "4", label: "Курсови програми" }];


const values = [
{
  title: "Съвършенство",
  description: "Стремим се към перфекция във всеки маникюр, използвайки само първокласни продукти и техники.",
  icon: Star
},
{
  title: "Образование",
  description: "Споделянето на знания е нашата страст. Обучаваме следващото поколение nail артисти.",
  icon: GraduationCap
},
{
  title: "Грижа",
  description: "Вашият комфорт и удовлетворение са наш приоритет. Отнасяме се към всеки клиент като към семейство.",
  icon: Heart
},
{
  title: "Иновации",
  description: "Винаги сме в крак с най-новите тенденции, техники и технологии в маникюра.",
  icon: Sparkles
}];


export default function About() {
  const { isAuthenticated } = useAuth();
  const enrollNowPath = isAuthenticated ? createPageUrl("Enroll") : "/auth?mode=signup";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/80615c5bd_IMG_0420.jpg')`, backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium text-rose-600">Нашата история</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">
                За <span className="font-semibold text-rose-500">ARTAYA Academy</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Създадена от страст към прецизността и уважение към професията, ARTAYA Nails Academy повече от десетилетие развива стандарта в сферата на маникюра, педикюра и ноктопластиката.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Ние не сме просто салон. Ние сме обучителен център, изграден върху реален практически опит, високи професионални изисквания и ясно разбиране за нуждите на съвременния салонен бизнес.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                В основата на академията стои едно убеждение – истинската увереност идва от качествено усвоени умения и безкомпромисна техника. Затова създадохме програми, които съчетават задълбочена теория, структурирана практика и работа по реални казуси от ежедневието на професионалиста.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}>

              <div className="absolute -top-6 -right-6 w-64 h-64 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-40" />
              <img
                src={aboutHeroImage}
                alt="Nails Academy team"
                className="relative rounded-3xl shadow-2xl w-full object-cover h-[500px]" />

            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) =>
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}>

                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-rose-500" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 mb-6">
              <Star className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Нашите ценности</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Какво ни <span className="font-semibold text-rose-500">движи</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) =>
            <motion.div
              key={value.title}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}>

                <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed">{value.description}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <img
                src={aboutMissionImage}
                alt="Nail service"
                className="rounded-3xl shadow-xl w-full object-cover h-[450px]" />

            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium text-rose-600">Нашата мисия</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Повече от <span className="font-semibold text-rose-500">обучение</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Нашата мисия е да издигаме стандарта в маникюрната индустрия, като предаваме функционални знания, прецизна техника и професионално отношение към всеки детайл.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Вяраме, че успешният маникюрист се изгражда с търпение, качествено обучение и менторство. Затова всяка програма е проектирана да даде реална подготовка – от хигиена и теория до работа с клиенти и изграждане на собствен бизнес.
              </p>
              <Link to={enrollNowPath}>
                <Button className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full px-8 py-6 text-base">
                  Запиши се за курс
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Отзиви</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Какво казват <span className="font-semibold text-rose-500">нашите курсисти</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto mb-16">
            <ReviewsList />
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <ReviewsModerationPanel />
          </div>

          <ReviewForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center bg-gradient-to-br from-rose-400 via-pink-500 to-rose-500 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
                Готови ли сте да <span className="font-semibold">започнете?</span>
              </h2>
              <p className="text-white/85 text-lg max-w-2xl mx-auto mb-10">
                Присъединете се към стотиците доволни курсисти и направете първата стъпка към професията на мечтите си.
              </p>
              <Link to={enrollNowPath}>
                <Button className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-10 py-6 text-lg font-semibold shadow-lg">
                  Запиши се сега
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
