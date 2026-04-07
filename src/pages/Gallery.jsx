import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";

import img1 from "../NailsAcademy/Gallery/258373387-105845445258740-6646872728964521253-n.jpg";
import img2 from "../NailsAcademy/Gallery/258382105-105854808591137-8481806728798514483-n.jpg";
import img3 from "../NailsAcademy/Gallery/258384318-105852518591366-5290592204321149399-n.jpg";
import img4 from "../NailsAcademy/Gallery/258397093-105849925258292-2200470297065060521-n.jpg";
import img5 from "../NailsAcademy/Gallery/258405558-105852005258084-4226010845577433639-n.jpg";
import img6 from "../NailsAcademy/Gallery/258457483-105854031924548-2292339568805999732-n.jpg";
import img7 from "../NailsAcademy/Gallery/258470754-105853311924620-5228187720907141976-n.jpg";
import img8 from "../NailsAcademy/Gallery/258485917-105852801924671-3250341266998586301-n.jpg";
import img9 from "../NailsAcademy/Gallery/258558742-105849218591696-9138844759808013988-n.jpg";
import img10 from "../NailsAcademy/Gallery/258615794-105851095258175-44783706752791787-n.jpg";
import img11 from "../NailsAcademy/Gallery/263902421-117499347426683-8723268371839043654-n.jpg";
import img12 from "../NailsAcademy/Gallery/471147077-610201628156450-8111398269010871634-n.jpg";
import img13 from "../NailsAcademy/Gallery/471188084_611016031408343_4644402612634271318_n.jpg";
import img14 from "../NailsAcademy/Gallery/472248704_619798720530074_5608259127382265833_n.jpg";
import img15 from "../NailsAcademy/Gallery/472255776_620429253800354_3345317363692821482_n.jpg";
import img16 from "../NailsAcademy/Gallery/472256950_620429400467006_4770444369874331077_n.jpg";
import img17 from "../NailsAcademy/Gallery/472359432_619815443861735_4239270986900913185_n.jpg";
import img18 from "../NailsAcademy/Gallery/472391424_620429390467007_1058566023368138993_n.jpg";
import img19 from "../NailsAcademy/Gallery/587504285_18048329723675195_6197362676033051046_n.jpg";
import img22 from "../NailsAcademy/Gallery/1a628a78-465b-4af1-abec-9f9127f6cda9.jpg";
import img23 from "../NailsAcademy/Gallery/1b5f7468-c341-42a3-9525-d79513056d1f.jpg";
import img24 from "../NailsAcademy/Gallery/1dcae7bb-6074-4f1a-9e22-fd1bc098a055.jpg";
import img25 from "../NailsAcademy/Gallery/24e6fabc-9cac-4585-8500-4e277e0f1739.jpg";
import img26 from "../NailsAcademy/Gallery/500a2540-318c-4242-9686-384c3f130e16.jpg";
import img27 from "../NailsAcademy/Gallery/7fbc9099-8f0d-4a95-8323-33ef3778d1e3.jpg";
import img28 from "../NailsAcademy/Gallery/8a8af2f6-3af7-4950-b66f-70d011c7eb7c.jpg";
import img29 from "../NailsAcademy/Gallery/98313308-68ac-46f6-abc3-47ef12564f58.jpg";
import img31 from "../NailsAcademy/Gallery/a65b7d91-e3b1-42ba-a98e-7184a22c878b.jpg";
import img32 from "../NailsAcademy/Gallery/b5d0c5d5-21d8-4882-b828-c7dbce8cd66c.jpg";
import img33 from "../NailsAcademy/Gallery/c97fd50d-de3c-450a-9937-2d975001c3bc.jpg";
import img34 from "../NailsAcademy/Gallery/decd5a90-38f2-4855-acaf-179e3bfbe306.jpg";
import img35 from "../NailsAcademy/Gallery/e1aaf6e9-032d-456a-97df-636ec298749f.jpg";

const categories = [
  { value: "all", label: "Всички" },
  { value: "manicure", label: "Маникюр" },
  { value: "pedicure", label: "Педикюр" },
];

const initialGalleryItems = [
  { id: 1, category: "manicure", title: "Гел лак котешко око", image_url: img1 },
  { id: 2, category: "manicure", title: "", image_url: img2 },
  { id: 3, category: "manicure", title: "Изграждане с гел", image_url: img3 },
  { id: 4, category: "manicure", title: "Работа на курсист по време на базово обучение", image_url: img4 },
  { id: 5, category: "manicure", title: "Класическо червено с арт декорация", image_url: img5 },
  { id: 6, category: "manicure", title: "", image_url: img6 },
  { id: 7, category: "manicure", title: "Арт дизайн", image_url: img7 },
  { id: 8, category: "manicure", title: "Гел лак с геометричен дизайн", image_url: img8 },
  { id: 9, category: "manicure", title: "Елегантен маникюр", image_url: img9 },
  { id: 10, category: "manicure", title: "Арт маникюр", image_url: img10 },
  { id: 11, category: "manicure", title: "Работа на курсист по време на базово обучение", image_url: img11 },
  { id: 12, category: "manicure", title: "Гел лак с вграден дизайн", image_url: img12 },
  { id: 13, category: "manicure", title: "Гел лак с нежен зимен дизайн", image_url: img13 },
  { id: 14, category: "manicure", title: "Модерен маникюр", image_url: img14 },
  { id: 15, category: "manicure", title: "Арт дизайн", image_url: img15 },
  { id: 16, category: "manicure", title: "", image_url: img16 },
  { id: 17, category: "manicure", title: "Работа на наш курсист по време на базово обучение", image_url: img17 },
  { id: 18, category: "manicure", title: "Работа на наш курсист по време на базово обучение", image_url: img18 },
  { id: 19, category: "manicure", title: "Работа на наш курсист по време на базово обучение", image_url: img19 },
  { id: 22, category: "manicure", title: "Изграждане с горни форми и вградени дизайни", image_url: img22 },
  { id: 23, category: "manicure", title: "Работа на наш курсист по време на базово обучение", image_url: img23 },
  { id: 24, category: "manicure", title: "Изграждане с горни форми", image_url: img24 },
  { id: 25, category: "manicure", title: "", image_url: img25 },
  { id: 26, category: "manicure", title: "Изграждане с горни форми", image_url: img26 },
  { id: 27, category: "manicure", title: "Арт дизайн", image_url: img27 },
  { id: 28, category: "manicure", title: "Нежен френски маникюр", image_url: img28 },
  { id: 29, category: "manicure", title: "", image_url: img29 },
  { id: 31, category: "manicure", title: "Работа на наш курсист по време на базово обучение", image_url: img31 },
  { id: 32, category: "manicure", title: "Работа на наш курсист по време на базово обучение", image_url: img32 },
  { id: 33, category: "manicure", title: "Класически червен маникюр с арт дизайн", image_url: img33 },
  { id: 34, category: "manicure", title: "Работа на наш курсист по време на базово обучение", image_url: img34 },
  { id: 35, category: "manicure", title: "Работа на наш курсист по време на базово обучение", image_url: img35 },
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
            
            <motion.div className="relative max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
               <motion.img src={selectedImage.image_url} alt={selectedImage.title} className="max-w-full max-h-[92vh] mx-auto object-contain rounded-2xl shadow-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} />
               {selectedImage.title && <p className="text-white text-center mt-6 text-xl italic font-light">{selectedImage.title}</p>}
            </motion.div>
            
            <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full" onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}><ChevronRight className="w-8 h-8" /></Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
