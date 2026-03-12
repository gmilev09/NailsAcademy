import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { GraduationCap, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-500 to-rose-500" />
      
      {/* Декоративни елементи */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Enroll">
              <Button 
                size="lg"
                className="bg-white text-rose-500 hover:bg-gray-50 rounded-full px-10 py-6 text-base shadow-xl shadow-rose-900/20 transition-all duration-300 hover:shadow-2xl"
              >
                Запиши се сега
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/Courses">
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-6 text-base backdrop-blur-sm"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Виж график
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
