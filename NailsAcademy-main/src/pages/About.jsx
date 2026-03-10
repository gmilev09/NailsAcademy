import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Award, Users, GraduationCap, Sparkles, Star, ArrowRight, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewsList from "@/components/reviews/ReviewsList";

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
                За <span className="font-semibold text-rose-500">Nails Academy</span>
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Създадена от страст към прецизността и уважение към професията, Nails Academy повече от десетилетие развива стандарта в сферата на маникюра, педикюра и ноктопластиката.
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
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
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
                src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80"
                alt="Nail service"
                className="rounded-3xl shadow-xl w-full object-cover h-[450px]" />

            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full mb-6">
                <Award className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium text-rose-600">Нашата мисия</span>
              </div>
              <h2 className="text-4xl font-light text-gray-900 mb-6">
                Създаваме <span className="font-semibold text-rose-500">красота</span> и 
                <span className="font-semibold text-rose-500"> възможности</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Днес Nails Academy е пространство, в което се изграждат стабилни професионални основи, усъвършенстват се модерни техники и се формира увереност, прецизност и професионално мислене.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                Освен висок клас салонни услуги, академията предлага сертифицирани обучения, насочени към бъдещи и практикуващи специалисти, които искат да се отличават с качество, устойчивост и стил. Нашата мисия не е просто да създаваме красиви нокти — нашата мисия е да създаваме професионалисти.
              </p>
              <Link to={createPageUrl("Enroll")}>
                <Button className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full px-8 shadow-lg shadow-pink-200/50">
                  Запишете се за курс
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 mb-6">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Отзиви</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Какво казват <span className="font-semibold text-rose-500">нашите клиенти</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReviewsList />
            </div>
            <div className="lg:col-span-1">
              <ReviewForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
              Готови ли сте да изпитате <span className="font-semibold">съвършенство?</span>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Ако искате да започнете кариерата си като маникюрист , ние сме тук за вас.


            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Enroll")}>
                <Button size="lg" className="bg-white text-rose-500 hover:bg-gray-50 rounded-full px-10 shadow-xl">
                  Запишете се
                </Button>
              </Link>
              <Link to={createPageUrl("Courses")}>
                <Button variant="outline" size="lg" className="bg-background text-stone-950 px-10 text-sm font-medium capitalize rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:text-accent-foreground h-10 border-2 border-white/30 hover:bg-white/10">
                  Виж курсове
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>);

}
