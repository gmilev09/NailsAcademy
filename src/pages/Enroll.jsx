import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Clock, GraduationCap, Users, Award, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

// Твоите актуални курсове за избор във формата
const courses = [
  {
    id: 1,
    title: "Базов курс по маникюр,педикюр и ноктопластика",
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
  { id: 3, title: "Изграждане с горни форми", price: 220, duration: "2 дни", image_url: "https://images.unsplash.com", description: "Съвременно удължаване." }
];

export default function Enroll() {
  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    phone: "",
    course_title: "",
    message: ""
  });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCourseSelect = (value) => {
    const course = courses.find(c => c.title === value);
    setSelectedCourse(course);
    setFormData(prev => ({ ...prev, course_title: value }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Симулация за Netlify
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Заявката Ви е изпратена успешно!");
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 container mx-auto px-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4 italic">Заявката е приета!</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Ще се свържем с Вас до 24 часа за потвърждение на Вашето място в Nails Academy.</p>
          <Button onClick={() => window.location.href = "/"} className="bg-rose-500 text-white rounded-full px-10 py-6">Към началото</Button>
        </motion.div>
      </div>
    );
  }

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
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-pink-50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-8 italic">Информация за курсиста</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Пълно име *</Label>
                  <Input placeholder="Вашето име" value={formData.student_name} onChange={(e) => handleChange("student_name", e.target.value)} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required className="rounded-xl" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Телефонен номер *</Label>
                  <Input placeholder="+359..." value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Изберете курс *</Label>
                  <Select onValueChange={handleCourseSelect} required>
                    <SelectTrigger className="rounded-xl"><SelectValue placeholder="Изберете курс" /></SelectTrigger>
                    <SelectContent>
                      {courses.map((c) => <SelectItem key={c.id} value={c.title}>{c.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Разкажете ни за Вашите цели</Label>
                <Textarea placeholder="Защо искате този курс?" value={formData.message} onChange={(e) => handleChange("message", e.target.value)} className="rounded-xl min-h-[120px]" />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full py-7 text-lg font-bold shadow-lg">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <><GraduationCap className="mr-2 w-5 h-5" /> Изпрати заявка</>}
              </Button>
            </div>
          </motion.form>

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
