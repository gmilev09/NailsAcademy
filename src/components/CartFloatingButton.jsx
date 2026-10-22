import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { CART_UPDATED_EVENT, getCartItems } from "@/lib/cart";
import { useAuth } from "@/lib/AuthContext";

/**
 * Плаващ бутон за бърз достъп до количката.
 * Показва броя артикули и се „подскачa" при всяко добавяне.
 * Използва се в магазина и страниците на продуктите.
 */
export default function CartFloatingButton() {
  const { isAuthenticated } = useAuth();
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(0);
  const isFirstRender = useRef(true);

  const refreshCount = useCallback(async () => {
    try {
      const items = await getCartItems();
      const totalItems = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
      setCount(totalItems);
    } catch {
      setCount(0);
    }
  }, []);

  // Първоначално зареждане + при смяна на логнат потребител
  useEffect(() => {
    refreshCount();
  }, [refreshCount, isAuthenticated]);

  // Живо обновяване при промяна на количката
  useEffect(() => {
    const handler = () => {
      setBump((value) => value + 1);
      refreshCount();
    };
    window.addEventListener(CART_UPDATED_EVENT, handler);
    return () => window.removeEventListener(CART_UPDATED_EVENT, handler);
  }, [refreshCount]);

  // Без „подскачане" при първото зареждане
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <motion.div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90]"
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.4 }}
    >
      <motion.div
        key={bump}
        animate={isFirstRender.current ? {} : { scale: [1, 1.14, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Link
          to="/Cart"
          aria-label={count > 0 ? `Количка — ${count} артикула` : "Количка"}
          className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 pl-4 pr-5 py-3.5 text-white shadow-xl shadow-rose-300/60 ring-1 ring-white/30 transition-shadow hover:shadow-2xl hover:shadow-rose-400/50"
        >
          <span className="relative">
            <ShoppingCart className="w-5 h-5" strokeWidth={2.2} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={`badge-${count}`}
                  className="absolute -top-2.5 -right-2.5 grid min-w-[1.25rem] h-5 place-items-center rounded-full bg-white px-1 text-[11px] font-bold leading-none text-rose-600 shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <span className="text-sm font-semibold tracking-wide">Количка</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
