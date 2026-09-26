// RECONSTRUCTED wrapper — съдържанието е автентично (от оригиналния файл).
import { motion } from "framer-motion";
import { Clock, ShieldCheck, FileText } from "lucide-react";

export default function Returns() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Връщане и <span className="font-semibold text-rose-500">рекламация</span>
          </h1>
          <p className="text-gray-500 text-lg">Условия за връщане на продукти и гаранционно обслужване</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-pink-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="prose prose-rose max-w-none space-y-8 text-gray-600 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <p className="flex items-center gap-3 mb-3 text-rose-600 font-bold italic">
                    <Clock className="w-5 h-5" /> Срок за връщане
                  </p>
                  <p className="text-sm">Имате право да върнете закупена стока в рамките на 14 дни от датата на получаване.</p>
                </div>
                <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100">
                  <p className="flex items-center gap-3 mb-3 text-rose-600 font-bold italic">
                    <ShieldCheck className="w-5 h-5" /> Гаранция
                  </p>
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
        </motion.div>
      </div>
    </div>
  );
}
