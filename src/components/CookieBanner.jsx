// RECONSTRUCTED (оригиналният файл не беше достъпен изцяло при преноса).
// Изгражда cookie банер в стилистиката на сайта със запазване на избора в localStorage.
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui/button";

const CONSENT_KEY = "cookie_consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChoice = (choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[90]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35 }}
        >
          <div className="bg-white rounded-2xl shadow-xl border border-pink-100 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Използваме бисквитки
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Този уебсайт използва бисквитки, за да подобри Вашето потребителско изживяване, да анализира трафика и да персонализира съдържанието.
                  Научете повече в нашата{" "}
                  <Link to="/CookiePolicy" className="text-rose-500 hover:text-rose-600 font-medium underline underline-offset-2">
                    Политика за бисквитките
                  </Link>
                  .
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <Button
                    size="sm"
                    onClick={() => handleChoice("accepted")}
                    className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-5"
                  >
                    Приемам
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleChoice("declined")}
                    className="rounded-full px-5 border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    Отказвам
                  </Button>
                </div>
              </div>
              <button
                onClick={() => handleChoice("dismissed")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Затвори"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
