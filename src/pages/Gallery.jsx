// RECONSTRUCTED — masonry структурата и lightbox-ът са по оригиналния фрагмент;
// списъкът с изображения е от реалните файлове в src/NailsAcademy/Gallery на репозиторито.
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";

const RAW = "https://raw.githubusercontent.com/gmilev09/NailsAcademy/main/src/NailsAcademy/Gallery";

const imageFiles = [
  "viber_image_2026-04-23_13-40-57-131.jpg",
  "e1aaf6e9-032d-456a-97df-636ec298749f.jpg",
  "a65b7d91-e3b1-42ba-a98e-7184a22c878b.jpg",
  "587504285_18048329723675195_6197362676033051046_n.jpg",
  "viber_image_2026-04-23_13-38-29-918.jpg",
  "12779591-3cf1-4d68-abc5-4b9abd7a5670.jpg",
  "18ba628e-8a04-4b9e-b432-10b6b2c8e45e.jpg",
  "1a628a78-465b-4af1-abec-9f9127f6cda9.jpg",
  "1b5f7468-c341-42a3-9525-d79513056d1f.jpg",
  "1dcae7bb-6074-4f1a-9e22-fd1bc098a055.jpg",
  "24e6fabc-9cac-4585-8500-4e277e0f1739.jpg",
  "258373387-105845445258740-6646872728964521253-n.jpg",
  "258382105-105854808591137-8481806728798514483-n.jpg",
  "258384318-105852518591366-5290592204321149399-n.jpg",
  "258397093-105849925258292-2200470297065060521-n.jpg",
  "258405558-105852005258084-4226010845577433639-n.jpg",
  "258457483-105854031924548-2292339568805999732-n.jpg",
  "258470754-105853311924620-5228187720907141976-n.jpg",
  "258485917-105852801924671-3250341266998586301-n.jpg",
  "258558742-105849218591696-9138844759808013988-n.jpg",
  "258615794-105851095258175-44783706752791787-n.jpg",
  "263902421-117499347426683-8723268371839043654-n.jpg",
  "471147077-610201628156450-8111398269010871634-n.jpg",
  "471188084_611016031408343_4644402612634271318_n.jpg",
  "472248704_619798720530074_5608259177382265833_n.jpg",
];

const galleryItems = imageFiles.map((file, index) => ({
  id: index + 1,
  image_url: `${RAW}/${file}`,
  title: "",
}));

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const filteredItems = galleryItems;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (item, index) => setLightboxIndex(index);
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
          <p className="text-gray-500 max-w-xl mx-auto">Работи на нашите курсисти и на екипа на ARTAYA Nails Academy</p>
        </motion.div>

        <div className="px-6 pb-24">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="break-inside-avoid group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => openLightbox(item, index)}
              >
                <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-sm hover:shadow-xl transition-all">
                  <img src={item.image_url} alt={item.title || `Маникюр ${index + 1}`} loading="lazy" decoding="async" className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  {item.title && (
                    <p className="text-white font-medium text-xs italic">{item.title}</p>
                  )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }}
              aria-label="Предишна"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); stepLightbox(1); }}
              aria-label="Следваща"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.img
              key={filteredItems[lightboxIndex].id}
              src={filteredItems[lightboxIndex].image_url}
              alt={filteredItems[lightboxIndex].title || `Маникюр ${lightboxIndex + 1}`}
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
