import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { ShoppingBag, Plus, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { shopProducts } from "../data/products";
import { addProductToCart } from "@/lib/cart";

// Галерия за малките карти в магазина
function ProductImageGallery({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [product.image_url, product.image_url_2, product.image_url_3].filter(Boolean);
  
  return (
    <div className="relative h-56 bg-gray-50 group overflow-hidden">
      <img 
        src={images[currentIndex] || "https://images.unsplash.com"} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {!product.in_stock && (
        <Badge className="absolute top-3 right-3 bg-gray-500 text-white border-0">Изчерпан</Badge>
      )}
      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(i => i === 0 ? images.length - 1 : i - 1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(i => i === images.length - 1 ? 0 : i + 1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </>
      )}
    </div>
  );
}

const categories = [
  { value: "all", label: "Всички" },
  { value: "електроуреди", label: "Електроуреди" },
  { value: "инструменти_пили", label: "Инструменти и пили" },
  { value: "четки", label: "Четки" },
  { value: "аксесоари", label: "Аксесоари" },
  { value: "масажни_свещи", label: "Масажни свещи AYA" },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedProductId, setAddedProductId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = shopProducts
    .filter(p => activeCategory === "all" || p.category === activeCategory)
    .filter(p => searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddToCart = async (product) => {
    try {
      await addProductToCart(product);
      setAddedProductId(product.id);
      toast.success(`${product.name} е добавен в количката!`);
      setTimeout(() => setAddedProductId((current) => (current === product.id ? null : current)), 2000);
    } catch {
      toast.error("Възникна проблем при добавяне в количката.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
            <ShoppingBag className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-medium text-rose-600 uppercase">Магазин Nails Academy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 italic">
            Продукти за <span className="font-semibold text-rose-500">маникюр</span>
          </h1>
        </motion.div>

        {/* Search Bar */}
        <section className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Търсене на продукти..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 rounded-full border-gray-100 bg-white/80 backdrop-blur-sm focus:border-rose-300 py-6"
            />
          </div>
        </section>

        {/* Category Filters */}
        <section className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all ${activeCategory === cat.value ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-white hover:bg-rose-50 border-gray-100"}`}
              onClick={() => setActiveCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </section>

        {/* Products Grid */}
        <section>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 italic text-gray-400">Няма намерени продукти.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-50 flex flex-col group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/ProductDetail?id=${product.id}`}>
                    <ProductImageGallery product={product} />
                  </Link>
                  <div className="p-6 flex flex-col flex-1">
                    <Link to={`/ProductDetail?id=${product.id}`}>
                      <h3 className="font-bold text-gray-900 mb-2 hover:text-rose-500 transition-colors italic">{product.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 italic">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-2xl font-bold text-rose-500 italic">€{product.price}</span>
                      <Button
                        size="sm"
                        className={`rounded-full px-4 ${
                          addedProductId === product.id
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-rose-500 text-white hover:bg-rose-600"
                        }`}
                        disabled={!product.in_stock}
                        onClick={() => handleAddToCart(product)}
                      >
                        {addedProductId === product.id ? "✔ Добавено!" : <><Plus className="w-4 h-4 mr-1" /> Добави</>}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
