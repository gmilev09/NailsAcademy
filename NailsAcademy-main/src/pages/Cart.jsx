import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Cart() {
  const [user, setUser] = useState(null);
  // Временно състояние за демонстрация, докато свържем новата база данни
  const [cartItems, setCartItems] = useState([
    { id: 1, product_name: "Професионална електрическа пила", product_price: 185, quantity: 1, product_image: "https://images.unsplash.com" }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Симулация на логнат потребител за преглед
    setUser({ email: "guest@example.com" });
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success("Продуктът е премахнат от количката");
  };

  const total = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-rose-50/20 pt-32 px-6 text-center">
        <ShoppingCart className="w-16 h-16 text-rose-300 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Моля, влезте в акаунта си</h1>
        <Link to="/">
          <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8">
            <LogIn className="w-4 h-4 mr-2" /> Вход
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/30 to-rose-50/20">
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Вашата <span className="font-semibold text-rose-500">количка</span>
            </h1>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div className="text-center py-16 bg-white rounded-3xl shadow-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ShoppingCart className="w-16 h-16 text-rose-200 mx-auto mb-4" />
              <h3 className="text-xl text-gray-600 mb-2">Количката е празна</h3>
              <Link to="/Shop">
                <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8">Към магазина</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <motion.div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                      <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.product_name}</h3>
                      <p className="text-rose-500 font-semibold">€{item.product_price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="w-4 h-4" /></Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="w-4 h-4" /></Button>
                    </div>
                    <Button size="icon" variant="ghost" className="text-gray-400 hover:text-red-500" onClick={() => removeItem(item.id)}><Trash2 className="w-5 h-5" /></Button>
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-32">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Обобщение</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-500"><span>Продукти</span><span>€{total.toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-500"><span>Доставка</span><span>{total >= 50 ? "Безплатна" : "€5.00"}</span></div>
                    <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
                      <span>Общо</span><span className="text-rose-500">€{(total + (total >= 50 ? 0 : 5)).toFixed(2)}</span>
                    </div>
                  </div>
                  <Link to="/Checkout">
                    <Button className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full">
                      Поръчай <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
