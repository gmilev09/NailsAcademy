import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Clock, GraduationCap, Users, Award, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";

// Твоите актуални курсове за избор във формата
const courses = [
  {
    id: 1,
    title: "Базов курс по маникюр, педикюр и ноктопластика",
    price: 1300,
    duration: "80 учебни работни часа",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/1622aebbd_attygi3AwRXqaCZMpSwhgA-8ixNB8vVeAmf12KHyOcY0CQ.jpg",
    description: `Този курс е създаден за хора, които искат не просто сертификат, а реална професионална подготовка и стабилен старт в бюти индустрията.
Работим в малки групи до 2 курсисти, а за желаещите организираме и индивидуални обучения с изцяло персонализирана програма. Независимо от формата, подходът към всеки курсист е индивидуален - според темпото, нивото и целите му.
Графикът е гъвкав.

Теоретична подготовка - силната основа на всеки професионалист
Обучението включва задълбочена и структурирана теория, която изгражда професионално мислене и сигурност в работата:
• Анатомия и структура на нокътя
• Заболявания по ноктите - разпознаване, причини, противопоказания и насоки
• Хигиена, стерилизация и безопасност в салонна среда
• Запознаване с материалите - състав, химични характеристики и правилен избор
• Правилна подготовка на нокътната плочка
• Често срещани грешки и как да ги избегнем
• Консултация с клиент и изграждане на доверие
• Бизнес модул:
  • Създаване на бизнес план
  • Ценообразуване на услугите
  • Изграждане на личен бранд
  • Стартиране и развитие в салон или самостоятелна практика

Практическа подготовка - реални умения за реална работа
✔ Маникюр - класически, комбиниран и апаратен
✔ Педикюр
✔ Изграждане с гел
✔ Работа с хартиени форми
✔ Ноктопластика и правилна архитектура
✔ Корекции и поддръжка
✔ Модул Бързи салонни декорации
✔ Практика върху реални модели
Всички материали по време на обучението са подсигурени.

Допълнителни предимства
Подарък комплект професионални инструменти
Подкрепа и насоки след завършване на курса
Сертификат за успешно преминато обучение

Това обучение ви подготвя не просто да правите красиви нокти, а да работите уверено, безопасно и професионално.
Ако искате знания, практика, сигурност и реален старт в професията - този курс е за вас.
Местата са ограничени. Свържете се с нас и запазете своето място още днес.`,
    max_students: 2
  },
  {
    id: 2,
    title: "Комбиниран маникюр",
    price: 180,
    duration: "20 учебни часа",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/fa1312ba1_attO0HSrdtIgmvZjcIGW5OHzCiwuDtzIMapjbzRHgMEuF4.jpg",
    max_students: 2,
    description: `Надграждащо обучение по комбиниран маникюр
Прецизност. Контрол. Съвършен резултат.
Продължителност: 20 учебни часа

Това надграждащо обучение е създадено за маникюристи, които искат да усъвършенстват техниката си, да работят по-чисто, по-безопасно и с по-дълготраен резултат. Курсът е фокусиран върху детайла, правилния подбор на инструменти и контрола във всяка стъпка от работния процес.

Ако вече работите с комбиниран маникюр, но търсите повече увереност, по-малко грешки и по-високо качество, това обучение е за вас.

Какво ще усвоите:
Техника и контрол
• Задълбочен анализ на комбинирания маникюр
• Правилен подбор и използване на фрези
• Контрол на натиск, ъгъл и скорост
• Безопасна и ефективна работа с електрическа пила
• Работа без порязвания и без изтъняване на плочката

Работа с кутикулата - професионално ниво
• Дълбока и прецизна обработка на кутикулата
• Чиста линия без накъсване и травми
• Подготовка за дълбоко лакиране под кутикул
• Техники за минимално израстване и дълготраен ефект

Често срещани грешки и тяхното коригиране
• Защо резултатът не е чист
• Как да избегнете напуквания и зачервявания
• Работа при проблемна кожа и чувствителни клиенти
• Анализ и корекция на индивидуалните грешки на курсистите

Практика и резултат
Обучението е силно практическо и насочено към реалната работа в салон. Работи се стъпка по стъпка с постоянна обратна връзка и индивидуален подход.

След обучението ще:
✔ работите по-бързо и по-чисто
✔ имате по-добър контрол и сигурност
✔ постигате професионален и дълготраен резултат

За кого е подходящо обучението?
• Маникюристи с базови познания по комбиниран маникюр
• Професионалисти, които искат по-високо ниво на работа
• Хора, които търсят усъвършенстване, а не просто сертификат

Това обучение не добавя просто техника - то променя начина ви на работа.
20 учебни часа.
Максимум 2-ма курсисти.`
  },
    {
    id: 3,
    title: "Изграждане с горни форми",
    price: 130,
    duration: "10 учебни часа",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/637fe9b35_attmRG1nC8ozJ_HT5ii5lWHpExNOB0bBMV0mxHJGk1kAZA.jpg",
    max_students: 2,
    description: `Надграждащо обучение – Изграждане с горни форми
Бързина. Симетрия. Контрол на архитектурата.
Продължителност: 1 ден

 Това обучение е създадено за маникюристи, които искат да работят по-бързо, по-прецизно и с минимално пилене, без компромис в здравината и архитектурата на нокътя.
Горните форми не са просто „по-бърз метод". Те са система за контрол на материала, дебелината и симетрията - когато се използват правилно.

 ⸻

 Какво получавате:
✔ Интензивно еднодневно обучение
✔ Практическа работа под индивидуален контрол
✔ Подарък комплект горни форми
✔ Професионални насоки за по-бърза салонна работа

 Какво ще усвоите:

 Архитектура и структура
• Правилен избор и напасване на горни форми
• Контрол на апекс и стрес зона
• Баланс и правилна дебелина на материала
• Изграждане без излишно натрупване

 Работа с материала
• Подбор на подходящ гел според техниката
• Количество и разпределение на продукта
• Предотвратяване на отлепвания и въздушни джобове
• Минимално пилене и чиста линия

 Тънкости и професионални детайли
• Перфектна C-крива
• Работа при различни типове нокътни плочки
• Корекция на изкривени или проблемни нокти
• Избягване на най-честите грешки

 ⸻

 Практическа част
Обучението е силно практически насочено, с детайлен анализ на всяка стъпка. Работи се под постоянно наблюдение и с индивидуален подход, за да се изгради реален контрол върху техниката.

 ⸻

 След обучението ще можете:
✔ Да изграждате бързо и симетрично
✔ Да постигате стабилна и балансирана архитектура
✔ Да намалите времето за работа без компромис в качеството
✔ Да работите уверено и професионално

 ⸻

 За кого е подходящ курсът?
• Маникюристи с опит в изграждането с гел
• Професионалисти, които искат да оптимизират времето си
• Специалисти, които търсят по-високо ниво на контрол и чистота

 ⸻

 Горните форми са инструмент.
Професионализмът е в ръцете, които ги използват.
Фокус върху детайла.
Резултат, който впечатлява.`
  },
  {
    id: 4,
    title: "Работа с гел",
    price: 250,
    duration: "20 учебни часа",
    image_url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697ccaab3e4993397f9cee62/fa1312ba1_attO0HSrdtIgmvZjcIGW5OHzCiwuDtzIMapjbzRHgMEuF4.jpg",
    max_students: 2,
    description: `Надграждащ курс: Работа с гел, корекции и усъвършенстване на техниката
    
    Тънкости. Контрол. Съвършена архитектура.
    
    Този курс е създаден за маникюристи, които вече работят с гел, но искат да излязат на по-високо професионално ниво. Ако срещате проблеми като повдигане на материала, счупвания, нестабилна архитектура или неравна повърхност – тук ще научите причините и точните решения.
    
    Обучението надгражда базовите умения и изгражда техническа прецизност, контрол върху продукта и професионално мислене при изграждането.
    
    ⸻
    
    Какво ще усвоите:
    
    Анализ и коригиране на грешки 
    • Причини за отлепване и повдигане 
    • Работа при проблемна нокътна плочка 
    • Предотвратяване на счупвания 
    • Правилна подготовка и адхезия 
    • Контрол на дебелината и разпределението на материала
    
    Архитектура и баланс 
    • Правилно изграждане на апекс 
    • Баланс и натоварване в различни дължини 
    • Работа с различни форми 
    • Укрепване на слаби и проблемни нокти 
    • Корекции и поддръжка без компромис в здравината
    
    Работа с гел – професионално ниво 
    • Видове гелове и правилен избор според случая 
    • Контрол на консистенцията и самонивелирането 
    • Прецизно изпиляване за идеална форма 
    • Минимизиране на времето за работа без загуба на качество
    
   ⸻
   
   Тънкости и професионални тайни
   
   В този модул ще разкрием практични техники, които не се намират в стандартните обучения: 
   • Как да изграждате тънко, но стабилно 
   • Как да работите чисто и да намалите нуждата от агресивно пилене 
   • Как да предвидите проблем преди да се появи 
   • Как да създадете дълготраен резултат, който клиентът усеща
   
   ⸻
   
   За кого е подходящ курсът? 
   • Маникюристи с базови умения, които искат надграждане 
   • Професионалисти, които срещат повтарящи се технически проблеми 
   • Хора, които искат по-голяма сигурност и по-високо качество на услугата си
   
   ⸻
   
   Резултатът
   
   След обучението ще работите с повече увереност, контрол и професионализъм. Ще разбирате материала, а не просто ще го използвате. Ще знаете как да анализирате всеки нокът и да вземете правилното техническо решение.
   
   Защото истинският професионалист не просто изгражда – той създава стабилна архитектура с мисъл и стратегия.
   
   Надградете уменията си. Работете по-чисто. По-бързо. По-професионално.`
  }
];

const normalizeCourseTitle = (value) =>
  (value || "")
    .toLowerCase()
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();

export default function Enroll() {
  const [searchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const courseFromQuery = searchParams.get("course");
    if (!courseFromQuery) return;

    const normalizedCourseFromQuery = normalizeCourseTitle(courseFromQuery);
    const matchedCourse = courses.find(
      (course) => normalizeCourseTitle(course.title) === normalizedCourseFromQuery
    );

    if (matchedCourse) {
      setSelectedCourse(matchedCourse);
    }
  }, [searchParams]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <GraduationCap className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Започнете вашето пътуване</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 italic">
              Запишете се <span className="font-semibold text-rose-500">сега</span>
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">Изберете курс и се свържете с нас по телефона, за да запазите Вашето място.</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Course selection & Contact */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-pink-50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-8 italic">Изберете курс</h2>
            <div className="space-y-4 mb-10">
              {courses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => handleCourseSelect(course)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedCourse?.id === course.id
                      ? "border-rose-400 bg-rose-50/50 shadow-md"
                      : "border-gray-100 hover:border-rose-200 hover:bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{course.duration}</p>
                    </div>
                    <span className="text-lg font-bold text-rose-500">€{course.price}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-500 mb-6">За записване, моля свържете се с нас по телефона:</p>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full py-7 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow"
              >
                <a href="tel:+359895737470">
                  <Phone className="mr-3 w-5 h-5" />
                  Свържете се с нас
                </a>
              </Button>
              <p className="text-sm text-gray-400 mt-3">+359 89 5737470</p>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            {selectedCourse ? (
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-50 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Детайли за курса</h3>
                <img src={selectedCourse.image_url} alt={selectedCourse.title} className="w-full h-40 object-cover rounded-2xl mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2 italic">{selectedCourse.title}</h4>
                 <p className="text-sm text-gray-600 whitespace-pre-line max-h-56 overflow-y-auto pr-1 mb-4">{selectedCourse.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm"><span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4 text-rose-500" /> Срок</span><span className="font-bold">{selectedCourse.duration}</span></div>
                                  <div className="flex justify-between text-sm"><span className="text-gray-500 flex items-center gap-2"><Users className="w-4 h-4 text-rose-500" /> Група</span><span className="font-bold">{selectedCourse.max_students ? `Максимум ${selectedCourse.max_students}` : "Индивидуално"}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500 flex items-center gap-2"><Award className="w-4 h-4 text-rose-500" /> Диплома</span><Badge className="bg-green-100 text-green-700 border-0">Включена</Badge></div>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="text-gray-500">Цена</span>
                  <span className="text-2xl font-bold text-rose-500">€{selectedCourse.price}</span>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50/50 rounded-3xl p-8 text-center border-2 border-dashed border-rose-200">
                <GraduationCap className="w-12 h-12 text-rose-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">Изберете курс</h3>
                <p className="text-gray-500 text-sm">Детайлите за Вашето обучение ще се появят тук.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
