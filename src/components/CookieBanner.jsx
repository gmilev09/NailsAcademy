import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui/button";

const COOKIE_CONSENT_KEY = "nails_academy_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-2xl shadow-2xl border border-pink-100 p-5 md:p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Използваме бисквитки
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Този уебсайт използва бисквитки, за да подобри Вашето потребителско изживяване, да анализира трафика и да персонализира съдържанието.
                    Научете повече в нашата{" "}
                    <Link
                      to="/CookiePolicy"
                      className="text-rose-500 hover:text-rose-600 underline font-medium"
                    >
                      Политика за бисквитките
                    </Link>.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button
                      onClick={handleAccept}
                      className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-6 text-sm"
                    >
                      Приемам
                    </Button>
                    <Button
                      onClick={handleDecline}
                      variant="outline"
                      className="border-rose-200 text-rose-600 hover:bg-rose-50 rounded-full px-6 text-sm"
                    >
                      Отказвам
                    </Button>
                  </div>
                </div>
                <button
                  onClick={handleDecline}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  aria-label="Затвори"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
