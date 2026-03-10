import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <FileText className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Правна информация</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Общи <span className="font-semibold text-rose-500">условия</span>
            </h1>
          </motion.div>

          <motion.div 
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-pink-50 prose prose-gray max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>1. Общи положения</h2>
            <p>
              Настоящите Общи условия уреждат отношенията между Nails Academy и 
              потребителите на нашите услуги, включително курсове и продукти от онлайн магазина.
            </p>

            <h2>2. Записване за курсове</h2>
            <p>
              При записване за курс, курсистът се задължава да:
            </p>
            <ul>
              <li>Предостави вярна и актуална информация</li>
              <li>Заплати таксата за курса в договорените срокове</li>
              <li>Спазва правилата за провеждане на обучението</li>
              <li>Посещава редовно занятията</li>
            </ul>

            <h2>3. Плащания и възстановяване</h2>
            <p>
              Плащането за курсове може да се извърши на място или по банков път. 
              При отказ от курс преди началото му, се възстановява 80% от заплатената сума. 
              След започване на курса, таксата не се възстановява.
            </p>

            <h2>4. Поръчки от магазина</h2>
            <p>
              При поръчка на продукти:
            </p>
            <ul>
              <li>Цените са в български лева и включват ДДС</li>
              <li>Доставката се извършва до посочен адрес</li>
              <li>Срокът за доставка е до 5 работни дни</li>
              <li>Имате право на връщане в 14-дневен срок при ненарушена опаковка</li>
            </ul>

            <h2>5. Сертификати</h2>
            <p>
              Сертификат се издава при успешно завършване на курса и покриване на 
              изискванията за присъствие и практически умения.
            </p>

            <h2>6. Интелектуална собственост</h2>
            <p>
              Всички материали, предоставени по време на курсовете, са собственост на 
              Nails Academy и не могат да бъдат разпространявани без писмено съгласие.
            </p>

            <h2>7. Ограничение на отговорността</h2>
            <p>
              Nails Academy не носи отговорност за резултати, постигнати от курсисти 
              след завършване на обучението, тъй като те зависят от индивидуалните усилия.
            </p>

            <h2>8. Изменения</h2>
            <p>
              Запазваме си правото да променяме тези условия. Промените влизат в сила 
              от момента на публикуването им на сайта.
            </p>

            <p className="text-sm text-gray-500 mt-8">
              Последна актуализация: {new Date().toLocaleDateString('bg-BG')}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
