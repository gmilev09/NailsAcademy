import { motion } from "framer-motion";
import { RefreshCcw, ShieldCheck, Clock, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Returns() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <Link to="/">
            <button className="flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-colors mb-8 font-medium">
              <ArrowLeft className="w-4 h-4" />
              Назад към началото
            </button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-pink-50"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-500">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 italic">Политика за връщане</h1>
            </div>

            <div className="prose prose-rose max-w-none space-y-8 text-gray-600 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <div className="flex items-center gap-3 mb-3 text-rose-600 font-bold italic">
                    <Clock className="w-5 h-5" /> Срок за връщане
                  </div>
                  <p className="text-sm">Имате право да върнете закупена стока в рамките на 14 дни от датата на получаване.</p>
                </div>
                <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <div className="flex items-center gap-3 mb-3 text-rose-600 font-bold italic">
                    <ShieldCheck className="w-5 h-5" /> Гаранция
                  </div>
                  <p className="text-sm">Всички технически уреди (лампи, пили) имат 24 месеца гаранция към Nails Academy.</p>
                </div>
              </div>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 italic flex items-center gap-2">
                  <FileText className="w-5 h-5 text-rose-400" /> Условия за връщане
                </h2>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>Продуктът трябва да бъде в оригиналната си опаковка и без следи от употреба.</li>
                  <li>Козметични продукти (лакове, гелове), които са отваряни, не подлежат на връщане от хигиенни съображения.</li>
                  <li>Разходите за транспорт при връщане са за сметка на клиента, освен в случаите на дефектна стока.</li>
                </ul>
              </section>

              <section className="pt-8 border-t border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 italic">Процедура за рекламация</h2>
                <p>
                  За да започнете процес по връщане или рекламация, моля свържете се с нас на телефон 
                  <span className="font-bold text-rose-500"> +359 89 5737470 </span> 
                  или ни пишете на <span className="font-bold text-rose-500"> bozhinova.nails.academy@gmail.com</span>.
                </p>
              </section>
            </div>

            <p className="mt-12 text-sm text-gray-400 italic text-center border-t pt-8">
              Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
