import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { ShoppingBag, ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import { toast } from "sonner";

// Твоите оригинални продукти (записани директно в кода)
const productsData = [
  { id: 1, name: "Професионална електрическа пила", price: "150", description: "Професионална електрическа пила - 65W: 35000RPM.", image_url: "https://i.postimg.cc/4xmS2bxf/Ekranna-snimka-2026-03-01-210524.png" },
  { id: 2, name: "LED/UV лампа 4", price: "27.9", description: "UV/LED лампа с 45 диода", image_url: "https://i.postimg.cc/8cj36h3d/Ekranna-snimka-2026-03-01-204502.png" , image_url_2: "https://i.postimg.cc/VvphBJPf/Ekranna-snimka-2026-03-01-204526.png" },
  { id: 3, name: "Прахоуловител", price: "99.9", description: " Безчетков прахоуловител за маникюр с мощен двоен турбо вентилатор", image_url: "https://ae01.alicdn.com/kf/S2ed36052861f4496ac755dd36c049c15F.jpg", image_url_2: "https://ae01.alicdn.com/kf/Sb0d0265f910b4c3c81e060724b925f4cn.jpg",  image_url_3: "https://ae01.alicdn.com/kf/S91b63083317d445c8290b4c0238a858bx.jpg"  },
  { id: 4, name: "Дървени пили", price: "5", description: "Висококачествени пили.", image_url: "https://images.unsplash.com" }
];

function AddToCartButton({ product, user }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!user) {
      toast.error("Моля, влезте в акаунта си, за да поръчате!");
      return;
    }
    setAdded(true);
    toast.success(`${product.name} е добавен в количката!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.button
      onClick={handleAdd}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        added ? "bg-green-500 text-white" : "bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600"
      }`}
      whileTap={{ scale: 0.92 }}
    >
      {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      {added ? "Добавено!" : "Добави"}
    </motion.button>
  );
}

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [user, setUser] = useState(null); // Тук по-късно ще добавим системата за акаунти
  const intervalRef = useRef(null);

  const visibleCount = 4;
  const maxIndex = Math.max(0, productsData.length - visibleCount);

  const next = useCallback(() => {
    setCurrentIndex(i => (i >= maxIndex ? 0 : i + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex(i => (i <= 0 ? maxIndex : i - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isPaused && productsData.length > 1) {
      intervalRef.current = setInterval(next, 3500);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, next]);

  const displayProducts = productsData.slice(currentIndex, currentIndex + 4);

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-pink-50/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/50 rounded-full mb-4">
            <ShoppingBag className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-600">Магазин</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Най-желаните <span className="font-semibold text-rose-500">продукти</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Качествени продукти за професионален маникюр</p>
        </motion.div>

        <div className="relative">
          {productsData.length > 4 && (
            <>
              <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 transition-colors"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
              <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 transition-colors"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
            <AnimatePresence mode="popLayout">
              {displayProducts.map((product, idx) => (
                <motion.div
                  key={`${product.id}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <div className="relative h-48 bg-gray-100">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">{product.name}</h3>
                    <p className="text-gray-400 text-xs mb-3 line-clamp-1">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-rose-500">€{product.price}</span>
                      <AddToCartButton product={product} user={user} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
