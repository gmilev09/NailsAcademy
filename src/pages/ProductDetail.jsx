import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ShoppingBag, ChevronLeft, ChevronRight, Plus, ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ProductDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Вземаме ID от линка
  const params = new URLSearchParams(location.search);
  const productId = params.get("id");

  // Примерни данни за продукта (зареждат се веднага без сървър)
  const product = {
    id: productId || "1",
    name: "Професионална електрическа",
    price: 150,
    category: "Оборудване",
    in_stock: true,
    description: "Висококачествена електрическа пила с ниски нива на шум и вибрации. \n\nПодходяща както за начинаещи, така и за напреднали професионалисти. Ергономичен дизайн и LCD дисплей за лесен контрол на оборотите.",
    image_url: "https://i.postimg.cc/4xmS2bxf/Ekranna-snimka-2026-03-01-210524.png",
  };

  const images = [product.image_url, product.image_url_2, product.image_url_3].filter(Boolean);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    setAdded(true);
    toast.success("Продуктът е добавен в количката!");
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-white">
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад към магазина
          </button>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-square group border border-pink-100 shadow-sm">
                {images.length > 0 ? (
                  <img
                    src={images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-20 h-20 text-gray-200" />
                  </div>
                )}
                {!product.in_stock && (
                  <Badge className="absolute top-4 right-4 bg-gray-500 text-white">Изчерпан</Badge>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(i => i === 0 ? images.length - 1 : i - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(i => i === images.length - 1 ? 0 : i + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shadow-sm ${i === currentImageIndex ? 'border-rose-400 scale-105' : 'border-transparent opacity-70'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              {product.category && (
                <Badge className="w-fit mb-4 bg-rose-100 text-rose-600 border-0 px-3 py-1 font-medium">{product.category}</Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 italic leading-tight">{product.name}</h1>
              <p className="text-4xl font-bold text-rose-500 mb-8 italic">€{product.price}</p>

              {product.description && (
                <p className="text-gray-600 leading-relaxed mb-10 whitespace-pre-line text-lg italic">{product.description}</p>
              )}

              <div className="mt-auto space-y-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock}
                  className={`w-full rounded-full py-8 text-lg font-bold transition-all shadow-lg ${
                    added
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 shadow-rose-100'
                  } text-white`}
                >
                  {added ? (
                    <><Check className="w-6 h-6 mr-2" />Добавено!</>
                  ) : (
                    <><Plus className="w-6 h-6 mr-2" />{product.in_stock ? "Добави в количката" : "Изчерпан"}</>
                  )}
                </Button>
                <Link to="/Cart">
                  <Button variant="outline" className="w-full rounded-full py-8 text-base border-rose-100 text-rose-500 hover:bg-rose-50">
                    Виж количката
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
