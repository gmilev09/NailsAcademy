import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { ShoppingBag, ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import { toast } from "sonner";

const products = [
  { id: 1, name: "Професионална електрическа пила", price: "185", description: "Висока мощност за маникюр.", image_url: "https://images.unsplash.com" },
  { id: 2, name: "LED/UV лампа 48W", price: "45", description: "Бързо изпичане на гел.", image_url: "https://images.unsplash.com" }
];

function AddToCartButton({ product, user }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!user) {
      toast.error("Моля, влезте в акаунта си, за да поръчате!");
      // Тук по-късно ще сложим: window.location.href = "/login";
      return;
    }
    setAdded(true);
    toast.success(`${product.name} е добавен!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.button
      onClick={handleAdd}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
        added ? "bg-green-500 text-white" : "bg-rose-500 text-white"
      }`}
    >
      {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      {added ? "Добавено!" : "Добави"}
    </motion.button>
  );
}

export default function FeaturedProducts() {
  const [user, setUser] = useState(null); // Тук ще се пази логнатият клиент
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-20 bg-pink-50/30">
      <div className="container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/50 rounded-full mb-4">
          <ShoppingBag className="w-4 h-4 text-rose-500" />
          <span className="text-sm font-medium text-rose-600">Магазин</span>
        </div>
        <h2 className="text-4xl font-light mb-12">Най-желаните <span className="font-semibold text-rose-500">продукти</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50">
              <img src={product.image_url} alt={product.name} className="h-40 w-full object-cover rounded-xl mb-4" />
              <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-rose-500">€{product.price}</span>
                <AddToCartButton product={product} user={user} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
