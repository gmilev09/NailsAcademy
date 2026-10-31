import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { Heart, Award, Users, GraduationCap, ArrowRight, MessageSquare, X, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ReviewForm from "@/components/reviews/ReviewForm";
import ReviewsList from "@/components/reviews/ReviewsList";
import ReviewsModerationPanel from "@/components/reviews/ReviewsModerationPanel";
import { useAuth } from "@/lib/AuthContext";

const RAW = "https://raw.githubusercontent.com/gmilev09/NailsAcademy/main/src/NailsAcademy";
const GALLERY_DIR = `${RAW}/Gallery/%D0%9C%D0%B0%D0%BD%D0%B8%D0%BA%D1%8E%D1%80`;

const aboutMissionImage = `${RAW}/Salon/viber_image_2026-10-12_22-14-56-069.jpg`;
const aboutHeroImage = `${RAW}/%D0%97%D0%B0%20%D0%BC%D0%B5%D0%BD/viber_image_2026-10-12_22-32-40-379.jpg`;

/*
 * Снимки на салона. За нова снимка добави още един обект в този масив.
 * src може да бъде GitHub raw адрес или локален адрес от public/.
 */
/*
 * Снимки на салона — от src/NailsAcademy/Salon.
 * За нова снимка добави още един обект в този масив.
 */
const salonImages = [
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-14-55-841.jpg`,
    alt: "Интериорът на ARTAYA Nails Academy",
    caption: "Пространство, създадено за прецизност",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-14-55-933.jpg`,
    alt: "Работна зона в ARTAYA Nails Academy",
    caption: "Професионално оборудвани работни места",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-14-55-980.jpg`,
    alt: "Детайл от салона на ARTAYA",
    caption: "Всеки детайл е част от преживяването",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-14-56-022.jpg`,
    alt: "Атмосфера от ARTAYA",
    caption: "Съвременна естетика и уют",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-14-56-069.jpg`,
    alt: "Пространството на ARTAYA Nails Academy",
    caption: "Място за обучение, творчество и развитие",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-14-56-116.jpg`,
    alt: "Работен момент от ARTAYA",
    caption: "Вдъхновение и професионализъм във всяка процедура",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-14-56-177.jpg`,
    alt: "Професионална среда в ARTAYA",
    caption: "Прецизност, качество и съвременен стил",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-14-59-627.jpg`,
    alt: "Маникюрна зона в ARTAYA",
    caption: "Място, в което уменията се превръщат в увереност",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-15-03-330.jpg`,
    alt: "Салонът на ARTAYA Nails Academy",
    caption: "Академия и салон в едно вдъхновяващо пространство",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-15-09-093.jpg`,
    alt: "Комфорт в ARTAYA",
    caption: "Комфорт за курсистите и клиентите",
  },
  {
    src: `${RAW}/Salon/viber_image_2026-10-12_22-15-21-028.jpg`,
    alt: "Уют в ARTAYA Nails Academy",
    caption: "Красотата започва от добре обмислените детайли",
  },
  {
    src: `${RAW}/Salon/4688f69d-6212-4324-818b-1fb5d9ef678e.jpg`,
    alt: "ARTAYA Salon",
    caption: "Салон, в който професията се превръща в изкуство",
  },
];

/*
 * Завършили курсисти — лични колекции от снимки на всяка курсистка.
 * За нова курсистка: добави нов обект с името ѝ и снимките ѝ (папката трябва да е
 * качена в src/NailsAcademy/Курсисти/{Име}).
 */
const STUDENTS_DIR = `${RAW}/%D0%9A%D1%83%D1%80%D1%81%D0%B8%D1%81%D1%82%D0%B8`;
const NEW_STUDENTS_DIR = `${STUDENTS_DIR}/%D0%BD%D0%BE%D0%B2%D0%B8%20%D0%BF%D0%BE%D0%BF%D1%8A%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F`;

const graduateStudents = [
  {
    id: "maria",
    name: "Завършил курсист",
    role: "Випуск на ARTAYA",
    photos: [
      `${STUDENTS_DIR}/%D0%9C%D0%B0%D1%80%D0%B8%D1%8F/viber_image_2026-10-11_13-15-32-626.jpg`,
      `${STUDENTS_DIR}/%D0%9C%D0%B0%D1%80%D0%B8%D1%8F/viber_image_2026-10-11_13-15-51-842.jpg`,
      `${STUDENTS_DIR}/%D0%9C%D0%B0%D1%80%D0%B8%D1%8F/viber_image_2026-10-11_13-16-11-493.jpg`,
    ],
  },
  {
    id: "slavyanka",
    name: "Завършил курсист",
    role: "Випуск на ARTAYA",
    photos: [
      `${STUDENTS_DIR}/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D0%BA%D0%B0/2026-10-06.jpg`,
      `${STUDENTS_DIR}/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D0%BA%D0%B0/2026-10-06%20(1).jpg`,
      `${STUDENTS_DIR}/%D0%A1%D0%BB%D0%B0%D0%B2%D1%8F%D0%BD%D0%BA%D0%B0/2026-10-06%20(2).jpg`,
    ],
  },
  {
    id: "novi-popalneniya",
    name: "Завършил курсист",
    role: "Випуск на ARTAYA",
    photos: [
      `${NEW_STUDENTS_DIR}/viber_image_2026-10-30_09-19-04-595.jpg`,
      `${NEW_STUDENTS_DIR}/viber_image_2026-10-30_09-19-05-242.jpg`,
      `${NEW_STUDENTS_DIR}/viber_image_2026-10-30_09-19-05-454.jpg`,
      `${NEW_STUDENTS_DIR}/viber_image_2026-10-30_09-19-04-809.jpg`,
      `${NEW_STUDENTS_DIR}/viber_image_2026-10-30_09-19-05-032.jpg`,
    ],
    videos: [`${NEW_STUDENTS_DIR}/IMG_0026.MOV`],
  },
];

/* Плосък списък с всички медии (снимки + видеа) за lightbox-а.
   Пази типа на всяка медия и началния индекс на всеки курсист. */
const graduateMedia = [];
const graduateStartIndex = {};
graduateStudents.forEach((student) => {
  graduateStartIndex[student.id] = graduateMedia.length;
  student.photos.forEach((src) => graduateMedia.push({ src, type: "image", studentId: student.id }));
  (student.videos || []).forEach((src) => graduateMedia.push({ src, type: "video", studentId: student.id }));
});

const stats = [
{ icon: Users, value: "500+", label: "Доволни клиенти" },
{ icon: Award, value: "10+", label: "Години опит" },
{ icon: GraduationCap, value: "100+", label: "Завършили курсисти" },
{ icon: Heart, value: "4", label: "Курсови програми" }];

export default function About() {
  const { isAuthenticated } = useAuth();
  const enrollNowPath = isAuthenticated ? createPageUrl("Enroll") : "/auth?mode=signup";
  const [lightbox, setLightbox] = useState(null);
  const [gradLightbox, setGradLightbox] = useState(null);
  const [salonIndex, setSalonIndex] = useState(0);
  const [isSalonPaused, setIsSalonPaused] = useState(false);
  const [isSalonStripPaused, setIsSalonStripPaused] = useState(false);
  const salonTrackRef = useRef(null);
  const salonOffsetRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Основната снимка се сменя автоматично, освен когато потребителят е над нея.
  useEffect(() => {
    if (isSalonPaused) return;
    const interval = setInterval(() => {
      setSalonIndex((current) => (current + 1) % salonImages.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isSalonPaused]);

  // Непрекъснато движение на малкия колаж под основния слайдер.
  useAnimationFrame((_, delta) => {
    const track = salonTrackRef.current;
    if (!track || isSalonStripPaused) return;

    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;

    const dt = Math.min(delta, 100) / 1000;
    salonOffsetRef.current = (salonOffsetRef.current + 34 * dt) % halfWidth;
    track.style.transform = `translate3d(${-salonOffsetRef.current}px, 0, 0)`;
  });

  const changeSalonImage = (direction) => {
    setSalonIndex((current) =>
      (current + direction + salonImages.length) % salonImages.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ЗА МЕН — Мария Божинова */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">

            {/* Снимка */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}>

              <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full blur-3xl opacity-60" />
              <div className="absolute -inset-2.5 rounded-[2.2rem] border border-rose-200 rotate-[1.4deg] pointer-events-none" />
              <div className="absolute -inset-2.5 rounded-[2.2rem] border border-pink-100 -rotate-[1.1deg] pointer-events-none" />
              <img
                src={aboutHeroImage}
                alt="Мария Божинова — основател на ARTAYA Nails Academy"
                className="relative rounded-[2rem] shadow-2xl w-full h-[600px] object-cover" />

            </motion.div>

            {/* Текст */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>

              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-rose-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-500">
                  Основател на ARTAYA
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-light text-gray-900 mb-2 leading-tight">
                Мария <span className="font-semibold italic bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Божинова</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-light mb-8">
                Основател и главен преподавател на ARTAYA Nails Academy
              </p>

              {/* Скролиращо поле с биографията */}
              <div className="relative">
                <div
                  className="max-h-[300px] md:max-h-[340px] overflow-y-auto pr-5 space-y-4 text-[15px] md:text-base text-gray-600 leading-[1.75]
                    [&::-webkit-scrollbar]:w-[3px]
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-rose-200
                    [&::-webkit-scrollbar-thumb]:transition-colors
                    hover:[&::-webkit-scrollbar-thumb]:bg-rose-400"
                >
                  <p>
                    За мен маникюрът никога не е бил просто професия. Още от самото начало го избрах със страст, хъс и непрестанно желание да се развивам, да откривам нови техники и да усъвършенствам работата си. Вярвам, че истинското майсторство се изгражда с постоянство, знания и отношение към всеки детайл.
                  </p>
                  <p>
                    Днес съм маникюрист и преподавател с втора степен на професионална квалификация, автор на собствени обучения и техники и основател на ARTAYA Nails Academy - пространство, създадено с ясна мисия: да превръща таланта в професионални умения, а желанието за развитие - в реални възможности.
                  </p>
                  <p>
                    В обучението си съчетавам професионален опит, задълбочена теоретична подготовка и интензивна практика. За мен е важно курсистите не просто да усвоят дадена техника, а да разберат логиката зад нея, да развият собствено мислене и да се научат да вземат уверени решения в реална работна среда.
                  </p>
                  <p>
                    Вярвам в индивидуалния подход, високите стандарти и смелостта да излизаме извън познатото. Затова насърчавам курсистите си да задават въпроси, да търсят решения и никога да не се задоволяват с посредственото.
                  </p>
                  <p>
                    ARTAYA е продължение на моя професионален път и философията ми за развитие. Място, в което знанията се споделят, уменията се изграждат с практика, а амбицията получава посока.
                  </p>
                </div>

                {/* Индикация за скролване — изчезва при долу */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>

              {/* Цитат — отделен акцент извън скрола */}
              <blockquote className="mt-7 border-l-4 border-rose-400 pl-5 py-2">
                <p className="font-display text-lg md:text-xl italic text-gray-700 leading-snug">
                  Защото най-голямото удовлетворение за един преподавател не е просто да предаде знания, а да види как човекът срещу него израства, открива потенциала си и уверено прави първите си стъпки като професионалист.
                </p>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) =>
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}>

                <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-rose-500" />
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* САЛОНЪТ — голяма визуална галерия */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-rose-50/20 to-white py-24 md:py-32">
        <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-rose-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-pink-100/40 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            className="mb-14 grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-gradient-to-r from-rose-400 to-transparent" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-500">
                  ARTAYA Salon
                </span>
              </div>
              <h2 className="max-w-3xl text-4xl font-light leading-tight text-gray-900 md:text-6xl">
                Пространство, създадено за
                <span className="block font-semibold italic text-rose-500">прецизност и вдъхновение</span>
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-gray-500 lg:justify-self-end">
              Светлина, спокойствие и професионална среда във всеки детайл. Салонът на
              ARTAYA е мястото, в което обучението, творчеството и грижата за клиента се
              срещат в една завършена атмосфера.
            </p>
          </motion.div>

          {/* Голям основен слайдер */}
          <motion.div
            className="group relative overflow-hidden rounded-[2.5rem] bg-gray-100 shadow-[0_28px_75px_-24px_rgba(190,24,93,0.35)]"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.08 }}
            onMouseEnter={() => setIsSalonPaused(true)}
            onMouseLeave={() => setIsSalonPaused(false)}
          >
            <div className="relative h-[31rem] sm:h-[38rem] lg:h-[46rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={salonImages[salonIndex].src}
                  src={salonImages[salonIndex].src}
                  alt={salonImages[salonIndex].alt}
                  className="absolute inset-0 h-full w-full cursor-zoom-in object-cover object-center"
                  initial={{ opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setLightbox({ type: "image", src: salonImages[salonIndex].src })}
                />
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/75 via-transparent to-gray-900/10" />

              {/* Винаги видими стрелки */}
              <button
                type="button"
                onClick={() => changeSalonImage(-1)}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-gray-900 shadow-xl backdrop-blur transition-all hover:scale-110 hover:bg-white md:left-8 md:h-14 md:w-14"
                aria-label="Предишна снимка"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => changeSalonImage(1)}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-gray-900 shadow-xl backdrop-blur transition-all hover:scale-110 hover:bg-white md:right-8 md:h-14 md:w-14"
                aria-label="Следваща снимка"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-5 p-6 text-white md:p-10">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
                    ARTAYA Nails Academy · Петрич
                  </p>
                  <p className="font-display max-w-2xl text-2xl font-semibold italic md:text-4xl">
                    {salonImages[salonIndex].caption}
                  </p>
                </div>
                <p className="font-display hidden shrink-0 text-xl italic text-white/85 sm:block">
                  {String(salonIndex + 1).padStart(2, "0")} / {String(salonImages.length).padStart(2, "0")}
                </p>
              </div>

              {/* Индикатори */}
              <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 gap-2">
                {salonImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setSalonIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${index === salonIndex ? "w-9 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
                    aria-label={`Снимка ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Автоматично движещ се малък колаж */}
        <div
          className="relative mt-12 overflow-hidden py-4"
          onMouseEnter={() => setIsSalonStripPaused(true)}
          onMouseLeave={() => setIsSalonStripPaused(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-32" />
          <div ref={salonTrackRef} className="flex w-max will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6">
                {salonImages.map((image, index) => (
                  <button
                    key={`${copy}-${image.src}`}
                    type="button"
                    onClick={() => setSalonIndex(index)}
                    className="group relative h-40 w-60 shrink-0 overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-transform hover:-translate-y-1 md:h-52 md:w-80"
                    aria-label={`Покажи ${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎓 ЗАВЪРШИЛИ КУРСИСТИ — graduate spotlight */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-white via-rose-50/40 to-pink-50/40">
        {/* Декоративни мъгли на фона */}
        <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-24 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl" />
        {/* Гигантски контурен текст на фона */}
        <span className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display italic text-[14rem] md:text-[20rem] leading-none text-rose-500/[0.04] whitespace-nowrap">
          Grads
        </span>

        <div className="container relative z-10 mx-auto px-6">
          {/* Header */}
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-7 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-gradient-to-l from-rose-400 to-transparent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-rose-500">
                Нашите курсисти
              </span>
              <span className="h-px w-12 bg-gradient-to-r from-rose-400 to-transparent" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-light text-gray-900 mb-5">
              Гордостта на{" "}
              <span className="font-semibold italic bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                ARTAYA
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Техните ръце вече творят. Посрещнете нашите завършили курсисти.
            </p>
          </motion.div>

          {/* Spotlight карти */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-10 max-w-6xl mx-auto">
            {graduateStudents.map((student, studentIndex) => (
              <motion.article
                key={student.id}
                className="relative"
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: studentIndex * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Номинален номер */}
                <span className="font-display absolute -top-5 right-4 z-0 text-6xl md:text-7xl font-semibold italic text-rose-200/70 select-none">
                  /{String(studentIndex + 1).padStart(2, "0")}
                </span>

                {/* Интерактивно тесте от снимки */}
                <button
                  type="button"
                  onClick={() => setGradLightbox(graduateStartIndex[student.id] + 1)}
                  className="group relative block w-full h-72 sm:h-80 outline-none"
                  aria-label="Виж снимките на завършил курсист"
                >
                  {/* Рамка за дълбочина */}
                  <div className="absolute inset-x-6 -bottom-3 h-24 rounded-full bg-rose-500/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />

                  {/* Лява снимка */}
                  <motion.div
                    className="absolute left-[7%] top-[14%] w-[46%] z-[1] origin-bottom-left rotate-[-8deg] transition-all duration-500 ease-out group-hover:rotate-[-15deg] group-hover:left-[1%]"
                    initial={{ opacity: 0, x: -30, rotate: -16 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + studentIndex * 0.15 }}
                  >
                    <img
                      src={student.photos[0]}
                      alt={`${student.name} — снимка 1`}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[3/4] object-cover rounded-xl border-4 border-white shadow-xl"
                    />
                  </motion.div>

                  {/* Дясна снимка */}
                  <motion.div
                    className="absolute right-[7%] top-[20%] w-[46%] z-[2] origin-bottom-right rotate-[8deg] transition-all duration-500 ease-out group-hover:rotate-[15deg] group-hover:right-[1%]"
                    initial={{ opacity: 0, x: 30, rotate: 16 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.42 + studentIndex * 0.15 }}
                  >
                    <img
                      src={student.photos[2]}
                      alt={`${student.name} — снимка 3`}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[3/4] object-cover rounded-xl border-4 border-white shadow-xl"
                    />
                  </motion.div>

                  {/* Централна снимка — отгоре */}
                  <motion.div
                    className="absolute left-1/2 top-[4%] w-[54%] z-[3] -translate-x-1/2 rotate-[2deg] transition-all duration-500 ease-out group-hover:-translate-y-3"
                    initial={{ opacity: 0, y: 34, rotate: 6 }}
                    whileInView={{ opacity: 1, x: "-50%", y: 0, rotate: 2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.2 + studentIndex * 0.15 }}
                  >
                    <img
                      src={student.photos[1]}
                      alt={`${student.name} — снимка 2`}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[3/4] object-cover rounded-xl border-4 border-white shadow-2xl"
                    />
                    {/* Бадж с брой медии (снимки + видеа) */}
                    <span className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rose-400 to-pink-500 text-white text-xs font-bold shadow-lg ring-2 ring-white">
                      {student.photos.length + (student.videos ? student.videos.length : 0)}
                    </span>
                  </motion.div>
                </button>

                {/* Етикет — без лични имена */}
                <div className="relative z-10 -mt-2 text-center">
                  <p className="inline-flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-px w-6 bg-rose-300" />
                    <span className="text-rose-500 font-medium">{student.role}</span>
                    <span className="h-px w-6 bg-rose-300" />
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Долна бележка за видеа */}
          <motion.p
            className="mt-16 md:mt-20 text-center text-sm text-gray-400 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Video className="w-4 h-4 text-rose-300" />
            Видео моменти от обучението гледайте в нашия
            <a
              href="https://www.instagram.com/artaya_nails_academy?igsh=MTdrdGxzeXNnaGJ6Zg=="
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rose-500 hover:text-rose-600 underline underline-offset-4"
            >
              Instagram
            </a>
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <img
                src={aboutMissionImage}
                alt="Nail service"
                className="rounded-3xl shadow-xl w-full object-cover h-[450px]" />

            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
                <Heart className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium text-rose-600">Нашата мисия</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Повече от <span className="font-semibold text-rose-500">обучение</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Нашата мисия е да издигаме стандарта в маникюрната индустрия, като предаваме функционални знания, прецизна техника и професионално отношение към всеки детайл.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Вяраме, че успешният маникюрист се изгражда с търпение, качествено обучение и менторство. Затова всяка програма е проектирана да даде реална подготовка – от хигиена и теория до работа с клиенти и изграждане на собствен бизнес.
              </p>
              <Link to={enrollNowPath}>
                <button className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all">
                  Запиши се за курс
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <MessageSquare className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Отзиви</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Какво казват <span className="font-semibold text-rose-500">нашите курсисти</span>
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto mb-16">
            <ReviewsList />
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <ReviewsModerationPanel />
          </div>

          <ReviewForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center bg-gradient-to-br from-rose-400 via-pink-500 to-rose-500 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
                Готови ли сте да <span className="font-semibold">започнете?</span>
              </h2>
              <p className="text-white/85 text-lg max-w-2xl mx-auto mb-10">
                Присъединете се към стотиците доволни курсисти и направете първата стъпка към професията на мечтите си.
              </p>
              <Link to={enrollNowPath}>
                <button className="bg-white text-rose-600 hover:bg-rose-50 rounded-full px-10 py-6 text-lg font-semibold shadow-lg transition-all">
                  Запиши се сега
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox за курсистите с навигация — снимки и видеа */}
      <AnimatePresence>
        {gradLightbox !== null && graduateMedia[gradLightbox] && (
          <motion.div
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGradLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              onClick={() => setGradLightbox(null)}
              aria-label="Затвори"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setGradLightbox((c) => (c - 1 + graduateMedia.length) % graduateMedia.length);
              }}
              aria-label="Предишна"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setGradLightbox((c) => (c + 1) % graduateMedia.length);
              }}
              aria-label="Следваща"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm z-10">
              <span className="font-display italic text-rose-300">Завършил курсист</span>
              <span className="mx-2 opacity-50">·</span>
              {gradLightbox + 1} / {graduateMedia.length}
            </div>

            {graduateMedia[gradLightbox].type === "video" ? (
              <motion.div
                key={graduateMedia[gradLightbox].src}
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={graduateMedia[gradLightbox].src}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
                />
              </motion.div>
            ) : (
              <motion.img
                key={graduateMedia[gradLightbox].src}
                src={graduateMedia[gradLightbox].src}
                alt="Завършил курсист на ARTAYA"
                className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Затвори"
          >
            <X className="w-6 h-6" />
          </button>
          {lightbox.type === "image" ? (
            <img
              src={lightbox.src}
              alt={lightbox.name || "Преглед"}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={lightbox.src}
              controls
              autoPlay
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
