import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Images } from "lucide-react";
import { Link } from "react-router-dom";

// Тук са твоите снимки. По-късно ще можеш да ги сменяш лесно през панела.
const galleryImages = [
  { url: "https://images.unsplash.com", span: "col-span-2 row-span-2" },
  { url: "https://images.unsplash.com", span: "" },
  { url: "https://images.unsplash.com", span: "" },
  { url: "https://images.unsplash.com", span: "" },
  { url: "https://images.unsplash.com", span: "" }
];

export default function GalleryPreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-pink-50/50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/50 rounded-full mb-6">
              <Images className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600">Нашето портфолио</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900">
              <span className="font-semibold text-rose-500">Галерия</span> с маникюри
            </h2>
          </div>
          <Link to="/Gallery" className="mt-6 md:mt-0">
            <Button 
              variant="ghost" 
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-full"
            >
              Виж цялата галерия
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-2xl ${image.span} group cursor-pointer`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img 
                src={image.url}
                alt={`Nail art ${index + 1}`}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${image.span ? 'h-full min-h-[300px]' : 'h-48 md:h-56'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
