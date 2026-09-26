// RECONSTRUCTED от readability-фрагмента на оригинала (структурата на секциите е 1:1,
// куриерските тарифи са примерни — постави оригиналния файл за точни цени).
import { motion } from "framer-motion";
import { Truck, Building2, Home, CheckCircle } from "lucide-react";

const couriers = [
  {
    name: "Еконт",
    logo: "🚚",
    description: "Бърза и надеждна доставка до всяка точка на България с Еконт Express.",
    toOffice: "€5.00",
    toAddress: "€7.00",
  },
  {
    name: "Спиди",
    logo: "📦",
    description: "Доставка със Спиди до офис, автомат или личен адрес с проследяване.",
    toOffice: "€5.00",
    toAddress: "€7.00",
  },
];

export default function Shipping() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50/30 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
            <Truck className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-medium text-rose-600">Информация за доставка</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Доставка и <span className="font-semibold text-rose-500">куриери</span>
          </h1>
        </motion.div>

        <div className="px-6 pb-24 space-y-8">

          {/* Срокове */}
          <motion.div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-rose-50/50 rounded-2xl p-6 text-center border border-rose-100">
                <p className="text-3xl font-bold text-rose-500 mb-1 italic">5–7</p>
                <p className="text-gray-900 font-bold text-sm">работни дни</p>
                <p className="text-xs text-gray-400 mt-2 italic text-center">стандартна доставка</p>
              </div>
              <div className="bg-pink-50/50 rounded-2xl p-6 text-center border border-pink-100">
                <p className="text-lg font-bold text-rose-500 mb-1 italic">до 16:00 ч.</p>
                <p className="text-gray-900 font-bold text-sm">обработка</p>
                <p className="text-xs text-gray-400 mt-2 italic text-center">заявки до 16ч. тръгват днес</p>
              </div>
              <div className="bg-rose-50/50 rounded-2xl p-6 text-center border border-rose-100">
                <p className="text-lg font-bold text-rose-500 mb-1 italic">SMS / Viber</p>
                <p className="text-gray-900 font-bold text-sm">известяване</p>
                <p className="text-xs text-gray-400 mt-2 italic text-center">следете пратката лесно</p>
              </div>
            </div>
          </motion.div>

          {/* Куриери */}
          <motion.div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

            <div className="grid md:grid-cols-2 gap-6">
              {couriers.map((courier) => (
                <div key={courier.name} className="border border-gray-100 rounded-3xl p-6 hover:border-rose-200 transition-all hover:shadow-md group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{courier.logo}</span>
                    <h3 className="text-xl font-bold text-gray-900 italic">{courier.name}</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 italic leading-relaxed">{courier.description}</p>
                  <div className="space-y-3">
                    <p className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-600 font-medium">
                        <Building2 className="w-4 h-4 text-rose-400" /> До офис/автомат
                      </span>
                      <span className="font-bold text-rose-500">{courier.toOffice}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-gray-600 font-medium">
                        <Home className="w-4 h-4 text-rose-400" /> До адрес
                      </span>
                      <span className="font-bold text-rose-500">{courier.toAddress}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 flex items-center justify-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-green-700 font-bold italic">🎉 Безплатна доставка при поръчки над 50€!</p>
            </div>
          </motion.div>

          {/* Начини на доставка */}
          <motion.div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <Building2 className="w-6 h-6 text-rose-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 italic">До офис / автомат</h4>
                  <p className="text-gray-500 text-sm italic text-left">Изберете най-удобния офис или автомат на Еконт или Спиди. Получавате SMS/Viber известие при пристигане на пратката.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <Home className="w-6 h-6 text-rose-400 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 italic">До адрес</h4>
                  <p className="text-gray-500 text-sm italic text-left">Доставка директно до Вашия адрес. Куриерът ще Ви се обади преди пристигане. Имате право на „преглед и тест" преди плащане.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Преглед и тест */}
          <motion.div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-8 text-white shadow-xl shadow-rose-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-white/80" />
              <h2 className="text-2xl font-bold italic">Задължителна опция „Преглед и тест"</h2>
            </p>
            <p className="text-white/90 leading-relaxed italic">
              При доставка с наложен платеж имате право да прегледате стоката преди да платите. Nails Academy гарантира Вашето право на преглед. Ако продуктът не отговаря на очакванията Ви, можете да откажете приемането му.
            </p>
          </motion.div>

          {/* Известяване */}
          <motion.div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: "📱", title: "SMS известяване", desc: "Получавате SMS при изпращане и пристигане" },
                { icon: "💬", title: "Viber известяване", desc: "Допълнително известяване чрез Viber" },
                { icon: "🔍", title: "Проследяване", desc: "Следете статуса в реално време онлайн" },
                { icon: "📞", title: "Обаждане", desc: "При доставка до адрес куриерът звъни" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 italic">{item.title}</h4>
                    <p className="text-xs text-gray-500 italic text-left">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
