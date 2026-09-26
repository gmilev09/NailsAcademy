import { motion } from "framer-motion";
import { BookOpen, Check, Gift, GraduationCap, UserRoundCheck } from "lucide-react";

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

const easeOut = [0.22, 1, 0.36, 1];

export default function InstructorSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF7F5] via-white to-pink-50/40 py-20 md:py-28">
      {/* Фин точков узорец */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.06)_1px,transparent_1px)] bg-[length:30px_30px]" />
      {/* Гигантски декоративен текст на фона */}
      <span className="pointer-events-none select-none absolute -right-10 top-1/2 -translate-y-1/2 font-display italic text-[11rem] leading-none text-rose-500/[0.045] hidden lg:block">
        Artaya
      </span>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* ЛЯВО — номерирана пътека */}
          <div>
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: easeOut }}
            >
              <span className="h-px w-12 bg-gradient-to-r from-rose-400 to-transparent" />
              <span className="text-[11px] uppercase tracking-[0.32em] text-rose-500 font-semibold">
                Защо да изберете нас
              </span>
            </motion.div>

            <motion.h2
              className="mb-7 text-4xl font-light leading-tight text-slate-900 md:text-[3.4rem] md:leading-[1.08]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
            >
              Вашият път към{" "}
              <span className="font-semibold italic bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                успеха
              </span>
            </motion.h2>

            <motion.p
              className="mb-12 max-w-2xl text-lg leading-relaxed text-slate-600"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.16, ease: easeOut }}
            >
              В ARTAYA Nails Academy не просто преподаваме техники за маникюр – ние изграждаме кариери.
              Нашите цялостни програми съчетават теория, практика и бизнес умения, за да ви подготвим
              за успех в бюти индустрията.
            </motion.p>

            <div className="max-w-2xl">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    className="group relative flex items-start gap-5 sm:gap-7 border-t border-rose-100 py-7 last:border-b"
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.55, delay: index * 0.1, ease: easeOut }}
                  >
                    {/* Номер на стъпката */}
                    <span className="font-display text-sm italic text-rose-400/90 pt-1 w-8 shrink-0 select-none">
                      /{String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Икона */}
                    <div className="relative shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-sm border border-rose-100 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-rose-400 group-hover:to-pink-500 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-rose-200 group-hover:-rotate-3">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Текст */}
                    <div className="transition-transform duration-300 group-hover:translate-x-1">
                      <h3 className="mb-1.5 text-xl font-semibold text-slate-900 md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ДЯСНО — премиум градиентна карта */}
          <motion.div
            className="relative lg:mt-16"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12, ease: easeOut }}
          >
            {/* Контурен плейт за дълбочина */}
            <div className="absolute -inset-3 rounded-[2.4rem] border border-rose-300/50 rotate-[1.3deg]" />
            <div className="absolute -inset-3 rounded-[2.4rem] border border-pink-200/70 -rotate-[1deg]" />

            <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#FF6F95] via-[#F06090] to-[#DE3D8E] p-8 md:p-12 text-white shadow-[0_24px_60px_-12px_rgba(222,61,142,0.45)]">
              {/* Декоративни сияния */}
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-rose-300/25 blur-3xl" />
              {/* Деликатен пръстен */}
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-white/25" />
              <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-white/15" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <span className="h-px w-10 bg-white/50" />
                  <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-white/90">
                    Вашият резултат
                  </span>
                </div>

                <h3 className="font-display mb-9 text-3xl font-semibold italic md:text-4xl">
                  Какво ще получите:
                </h3>

                <ul className="space-y-4">
                  {outcomes.map((outcome, index) => (
                    <motion.li
                      key={outcome}
                      className="flex items-start gap-3.5"
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ delay: 0.15 + index * 0.07, duration: 0.45, ease: easeOut }}
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/50 backdrop-blur-sm">
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                      </span>
                      <span className="text-[15px] leading-snug text-white/95 md:text-lg">
                        {outcome}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 flex items-center gap-4 border-t border-white/25 pt-7">
                  <GraduationCap className="h-8 w-8 text-white/70 shrink-0" />
                  <p className="font-display italic text-lg md:text-xl text-white/95 leading-snug">
                    Сертификат, признат в индустрията
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
