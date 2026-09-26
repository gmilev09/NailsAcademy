// RECONSTRUCTED (част от оригинала не беше достъпна при преноса) — градиентната CTA секция с автентичния текст.
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { GraduationCap, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function CTASection() {
  const { isAuthenticated } = useAuth();
  const enrollPath = isAuthenticated ? "/Enroll" : "/auth?mode=signup";

  return (
    <section className="relative overflow-hidden py-24">
      {/* Декоративни елементи */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-500 to-rose-500" />
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GraduationCap className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Започнете вашето пътуване</span>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
          Готови ли сте да станете
          <span className="block font-semibold">професионалист?</span>
        </h2>

        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Запишете се днес и направете първата стъпка към успешна кариера в маникюра. 
          Ограничен брой места за предстоящите курсове.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={enrollPath}>
            <Button className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-8 py-6 text-lg font-semibold shadow-lg">
              Запиши се за курс
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to="/Contact">
            <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg bg-transparent">
              <Phone className="w-5 h-5 mr-2" />
              Свържете се с нас
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
