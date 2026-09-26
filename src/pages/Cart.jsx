// RECONSTRUCTED от оригиналния фрагмент (структурата на картите и обобщението е 1:1).
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, LogIn } from "lucide-react";
import { toast } from "sonner";
import { getCartItems, updateCartItemQuantity, removeCartItem } from "@/lib/cart";
import { useAuth } from "@/lib/AuthContext";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5;

function formatItemName(name) {
  return String(name || "").trim();
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);
  const { isAuthenticated, navigateToLogin } = useAuth();
  const navigate = useNavigate();

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const items = await getCartItems();
      setCartItems(items);
      setNeedsLogin(false);
    } catch {
      setCartItems([]);
      setNeedsLogin(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [isAuthenticated]);

  const handleUpdateQuantity = async (item, delta) => {
    try {
      const newQuantity = item.quantity + delta;
      await updateCartItemQuantity(item.id, newQuantity);
      await loadItems();
    } catch {
      toast.error("Проблем при обновяване на количката.");
    }
  };

  const handleRemove = async (item) => {
    try {
      await removeCartItem(item.id);
      toast.success("Продуктът е премахнат от количката.");
      await loadItems();
    } catch {
      toast.error("Проблем при премахване на продукта.");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.product_price) * item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-40 pb-24 px-6 text-center text-gray-500">
        Зареждане на количката...
      </div>
    );
  }

  if (needsLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-40 pb-24 px-6">
        <div className="container mx-auto max-w-md text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-9 h-9 text-rose-500" />
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            Влезте в <span className="font-semibold text-rose-500">профила си</span>
          </h1>
          <p className="text-gray-500 mb-8">За да видите количката си, е необходимо да влезете в акаунта си.</p>
          <Button
            onClick={navigateToLogin}
            className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-10 py-6"
          >
            Вход / Регистрация
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
            <ShoppingBag className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-medium text-rose-600 uppercase">Вашата количка</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 italic">
            Количка ({cartItems.length})
          </h1>
        </motion.div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-9 h-9 text-rose-300" />
            </div>
            <p className="text-gray-500 mb-8 text-lg">Количката ви е празна.</p>
            <Link to="/Shop">
              <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8 py-6">
                Разгледай магазина
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <motion.div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                      <img src={item.product_image} alt={formatItemName(item.product_name)} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{formatItemName(item.product_name)}</h3>
                      <p className="text-rose-500 font-semibold">€{item.product_price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-rose-100 text-gray-600 flex items-center justify-center transition-colors"
                        aria-label="Намали"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item, 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-rose-100 text-gray-600 flex items-center justify-center transition-colors"
                        aria-label="Увеличи"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item)}
                      className="text-gray-300 hover:text-rose-500 transition-colors p-2"
                      aria-label="Премахни"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-32">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Обобщение</h3>
                  <div className="space-y-3 mb-6">
                    <p className="flex justify-between text-sm text-gray-600"><span>Продукти</span><span>€{total.toFixed(2)}</span></p>
                    <p className="flex justify-between text-sm text-gray-600"><span>Доставка</span><span>{total >= FREE_SHIPPING_THRESHOLD ? "Безплатна" : "€5.00"}</span></p>
                    <p className="flex justify-between font-semibold text-gray-900 border-t pt-3"><span>Общо</span><span className="text-rose-500">€{(total + (total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST)).toFixed(2)}</span></p>
                  </div>
                  {total < FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs text-rose-500 mb-4">
                      Още €{(FREE_SHIPPING_THRESHOLD - total).toFixed(2)} за безплатна доставка!
                    </p>
                  )}
                  <Button
                    className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full py-6"
                    onClick={() => navigate("/Checkout")}
                  >
                    Към поръчка
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Link to="/Shop" className="block text-center text-sm text-gray-400 hover:text-rose-500 mt-4 transition-colors">
                    ← Продължи пазаруването
                  </Link>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
