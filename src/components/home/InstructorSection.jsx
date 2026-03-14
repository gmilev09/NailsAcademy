import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Gift, GraduationCap, UserRoundCheck } from "lucide-react";

const highlights = [
  {
    title: "Акредитирани сертификати",
    description: "Получете признати в индустрията сертификати при завършване на всеки курс",
    icon: GraduationCap,
  },
  {
    title: "Експертен инструктор",
    description: "Учете от опитен професионалист с 10+ години опит в индустрията",
    icon: UserRoundCheck,
  },
  {
    title: "Практическо обучение",
    description: "Практикувайте с реални клиенти под ръководството на нашия експертен екип",
    icon: BookOpen,
  },
  {
    title: "Кариерна подкрепа",
    description: "Съдействие за намиране на работа и бизнес менторство за завършилите",
    icon: Gift,
  },
];

const outcomes = [
  "Пълна професионална подготовка",
  "Разширена програма с модерни техники",
  "Индивидуален подход",
  "Работа с професионални материали и реални модели",
  "Подкрепа след завършване на обучението",
  "Сертификат",
  "Подарък комплект професионални инструменти",
];

export default function InstructorSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8FA] py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(237,241,247,0.85)_1px,transparent_1px)] bg-[length:34px_34px] opacity-45" />
      <div className="container mx-auto px-6">
        <div className="relative z-10 grid items-start gap-10 lg:grid-cols-[1.1fr_0.95fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-rose-100 px-5 py-2 text-sm font-semibold text-rose-600">
              <GraduationCap className="h-4 w-4" />
              Защо да изберете нас
            </div>

            <h2 className="mb-6 text-3xl font-light leading-tight text-slate-800 md:text-5xl">
              Вашият път към <span className="font-semibold text-rose-500">успеха</span>
            </h2>
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              В Nails Academy не просто преподаваме техники за нокти – ние изграждаме кариери. Нашите цялостни програми съчетават теория, практика и бизнес умения, за да ви подготвим за успех в beauty индустрията.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-2xl/none font-semibold text-slate-900 md:text-3xl/none">
                        {item.title}
                      </h3>
                      <p className="text-lg/normal text-slate-600 md:text-xl/normal">
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          <motion.aside
            className="rounded-[2rem] bg-gradient-to-br from-[#FF6F95] to-[#E74E95] p-6 text-white shadow-[0_16px_44px_rgba(231,78,149,0.35)] md:p-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h3 className="mb-6 text-2xl font-semibold md:text-4xl">Какво ще получите:</h3>
            <ul className="space-y-4 text-lg md:text-2xl">
              {outcomes.map((outcome, index) => (
                <motion.li
                  key={outcome}
                  className="flex items-start gap-3 leading-snug"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-rose-100 md:h-7 md:w-7" />
                  <span>{outcome}</span>
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
