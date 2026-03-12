import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";

const categories = [
  { value: "all", label: "Всички" },
  { value: "manicure", label: "Маникюр" },
  { value: "pedicure", label: "Педикюр" },
  { value: "nail_art", label: "Nail Art" },
  { value: "gel", label: "Гел" },
];

// Твоите реални снимки (зареждат се веднага)
const initialGalleryItems = [
  { id: 1, category: "manicure", title: "Класически червен маникюр", image_url: "https://images.unsplash.com" },
  { id: 2, category: "manicure", title: "Нюд дизайн", image_url: "https://images.unsplash.com" },
  { id: 3, category: "gel", title: "Изграждане с гел", image_url: "https://images.unsplash.com" },
  { id: 4, category: "nail_art", title: "Ръчно рисувани декорации", image_url: "https://images.unsplash.com" },
  { id: 5, category: "pedicure", title: "Професионален педикюр", image_url: "https://images.unsplash.com" },
  { id: 6, category: "manicure", title: "Френски маникюр", image_url: "https://images.unsplash.com" }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = activeCategory === "all" 
    ? initialGalleryItems 
    : initialGalleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === "next" 
      ? (selectedIndex + 1) % filteredItems.length
      : (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6 mx-auto">
            <Images className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-medium text-rose-600 uppercase tracking-widest">Портфолио 2026</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 italic">
            Галерия с <span className="font-semibold text-rose-500">маникюри</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Вдъхновете се от нашите най-нови дизайни и техники.</p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="container mx-auto flex justify-center">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-white border border-gray-100 p-1 rounded-full flex flex-wrap justify-center h-auto gap-1">
              {categories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value} className="rounded-full px-5 py-2 data-[state=active]:bg-rose-500 data-[state=active]:text-white transition-all">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-24">
        <div className="container mx-auto">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredItems.map((item, index) => (
              <motion.div key={item.id} className="break-inside-avoid group cursor-pointer" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} onClick={() => openLightbox(item, index)}>
                <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-sm hover:shadow-xl transition-all">
                  <img src={item.image_url} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-medium text-xs italic">{item.title}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox}>
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full" onClick={closeLightbox}><X className="w-6 h-6" /></Button>
            <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full" onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}><ChevronLeft className="w-8 h-8" /></Button>
            
            <motion.div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
               <img src={selectedImage.image_url} alt={selectedImage.title} className="max-w-full max-h-[80vh] mx-auto object-contain rounded-2xl shadow-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} />
               {selectedImage.title && <p className="text-white text-center mt-6 text-xl italic font-light">{selectedImage.title}</p>}
            </motion.div>
            
            <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full" onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}><ChevronRight className="w-8 h-8" /></Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
