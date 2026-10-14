import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";

const RAW = "https://raw.githubusercontent.com/gmilev09/NailsAcademy/main/src/NailsAcademy/Gallery";

/* Папките в репото са с кирилица, затова пътищата се кодират. */
const MANICURE_DIR = "%D0%9C%D0%B0%D0%BD%D0%B8%D0%BA%D1%8E%D1%80";
const PEDICURE_DIR = "%D0%9F%D0%B5%D0%B4%D0%B8%D0%BA%D1%8E%D1%80";

/* Снимки от src/NailsAcademy/Gallery/Маникюр */
const manicureFiles = [
  "viber_image_2026-10-12_21-24-01-108.jpg",
  "viber_image_2026-10-12_21-24-02-982.jpg",
  "viber_image_2026-10-12_21-24-03-907.jpg",
  "viber_image_2026-10-12_21-24-04-154.jpg",
  "viber_image_2026-10-12_21-24-04-363.jpg",
  "viber_image_2026-10-12_21-24-04-794.jpg",
  "viber_image_2026-10-12_21-24-05-016.jpg",
];

/* Снимки от src/NailsAcademy/Gallery/Педикюр */
const pedicureFiles = [
  "viber_image_2026-10-12_21-24-04-585.jpg",
];

const galleryItems = [
  ...manicureFiles.map((file, index) => ({
    id: `m-${index + 1}`,
    image_url: `${RAW}/${MANICURE_DIR}/${file}`,
    category: "manicure",
    title: "Маникюр",
  })),
  ...pedicureFiles.map((file, index) => ({
    id: `p-${index + 1}`,
    image_url: `${RAW}/${PEDICURE_DIR}/${file}`,
    category: "pedicure",
    title: "Педикюр",
  })),
];

const categories = [
  { value: "all", label: "Всички" },
  { value: "manicure", label: "Маникюр" },
  { value: "pedicure", label: "Педикюр" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // При смяна на категорията затваряме отворения lightbox.
  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (item) => setLightboxIndex(filteredItems.indexOf(item));
  const closeLightbox = () => setLightboxIndex(null);

  const stepLightbox = useCallback(
    (delta) => {
      setLightboxIndex((current) => {
        if (current === null) return current;
        const next = (current + delta + filteredItems.length) % filteredItems.length;
        return next;
      });
    },
    [filteredItems.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") stepLightbox(1);
      if (event.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, stepLightbox]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
            <Images className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-medium text-rose-600 uppercase">Нашето портфолио</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 italic">
            Галерия с <span className="font-semibold text-rose-500">маникюри</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Работи на нашите курсисти и на екипа на ARTAYA Nails Academy
          </p>
        </motion.div>

        {/* Филтри по категория */}
        <section className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                activeCategory === cat.value
                  ? "bg-rose-500 text-white shadow-md hover:bg-rose-600"
                  : "bg-white text-gray-600 border border-gray-100 hover:bg-rose-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </section>

        {/* Снимки */}
        <section>
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 italic text-gray-400">
              Няма снимки в тази категория.
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="break-inside-avoid group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: index * 0.03 }}
                    onClick={() => openLightbox(item)}
                  >
                    <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-sm hover:shadow-xl transition-all">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-medium text-xs italic">{item.title}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Затвори"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }}
              aria-label="Предишна"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); stepLightbox(1); }}
              aria-label="Следваща"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {lightboxIndex + 1} / {filteredItems.length}
              <span className="mx-2 opacity-50">·</span>
              {filteredItems[lightboxIndex].title}
            </div>

            <motion.img
              key={filteredItems[lightboxIndex].id}
              src={filteredItems[lightboxIndex].image_url}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
