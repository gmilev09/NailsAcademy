import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X as XIcon, Flame } from "lucide-react";
import { PROMO_ACTIVE, shopProducts } from "@/data/products";

const EASE = [0.22, 1, 0.36, 1];


let flyerShownDuringThisPageLoad = false;

export default function PromoFlyer() {
  // "unknown" | "closed" | "open"
  const [flyerState, setFlyerState] = useState("unknown");


  useEffect(() => {
    if (!PROMO_ACTIVE) {
      setFlyerState("closed");
      return;
    }

    if (flyerShownDuringThisPageLoad) {
      setFlyerState("closed");
      return;
    }

    flyerShownDuringThisPageLoad = true;
    const timer = setTimeout(() => {
      setFlyerState("open");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    if (flyerState !== "open") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEscape = (event) => {
      if (event.key === "Escape") setFlyerState("closed");
    };
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [flyerState]);

  
  const LED_LAMP_ID = "41";
  const LAMP_POSITION = 2; // индекс 2 = трета позиция

  const otherPromoProducts = shopProducts
    .filter(
      (product) =>
        product.on_sale &&
        product.in_stock &&
        String(product.id) !== LED_LAMP_ID
    )
    .slice(0, 3);

  const featuredLamp = shopProducts.find(
    (product) => String(product.id) === LED_LAMP_ID && product.on_sale && product.in_stock
  );

  const promoProducts = [...otherPromoProducts];
  if (featuredLamp) {
    promoProducts.splice(Math.min(LAMP_POSITION, promoProducts.length), 0, featuredLamp);
  }

  if (flyerState === "unknown") return null;

  const closeFlyer = () => setFlyerState("closed");

  const rotationAt = (index) => [-5, 4, 6, -4][index] ?? 0;
  const offsetAt = (index) => [36, 0, 0, 36][index] ?? 0;

  return (
    <AnimatePresence>
      {flyerState === "open" && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Промоция −20% на електроуреди"
        >
          {/* Backdrop — клик извън картата затваря */}
          <motion.div
            className="absolute inset-0 bg-[#0f172a]/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFlyer}
          />

          {/* Картa */}
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] shadow-2xl"
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative bg-gradient-to-br from-[#FF5A8C] via-[#F0447F] to-[#D61C6E] text-white min-h-[540px] md:min-h-[560px]">
              {/* Декоративни елементи на фона */}
              <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-pink-300/25 blur-3xl" />
              <div className="pointer-events-none absolute right-8 top-8 h-40 w-40 rounded-full border-2 border-white/15" />
              <div className="pointer-events-none absolute right-16 top-16 h-40 w-40 rounded-full border border-white/10" />

              {/* Градиентна завеса отляво за четимост на текста */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-[6] w-full md:w-[58%] bg-gradient-to-r from-[#FF5A8C] via-[#FF5A8C]/90 to-transparent" />

              {/* X бутон */}
              <motion.button
                type="button"
                onClick={closeFlyer}
                aria-label="Затвори промоцията"
                className="absolute right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white text-rose-600 shadow-xl"
                whileHover={{ scale: 1.12, rotate: 90 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <XIcon className="h-5 w-5" strokeWidth={2.5} />
              </motion.button>

              {/* Продукти на бекграунд */}
              <div
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center md:justify-end"
                aria-hidden="true"
              >
                <div className="relative mx-4 md:mx-8 lg:mx-12 grid grid-cols-2 gap-3 md:gap-6">
                  {promoProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 60, scale: 0.85, rotate: rotationAt(index) * 2 }}
                      animate={{ opacity: 1, y: offsetAt(index), scale: 1, rotate: rotationAt(index) }}
                      transition={{ delay: 0.42 + index * 0.11, duration: 0.65, ease: EASE }}
                      className="opacity-65 md:opacity-100"
                    >
                      <motion.div
                        animate={{ y: [0, -9, 0] }}
                        transition={{
                          duration: 3.6 + index * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.2 + index * 0.3,
                        }}
                        className="relative"
                      >
                        {/* Картичка с продукт */}
                        <div className="relative h-36 w-24 sm:h-44 sm:w-28 md:h-56 md:w-40 lg:h-60 lg:w-44 rounded-xl md:rounded-[1.4rem] border-[3px] md:border-[5px] border-white bg-white shadow-[0_26px_52px_-14px_rgba(0,0,0,0.5)] p-2 md:p-3">
                          <img
                            src={product.image_url}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-contain object-center"
                          />
                        </div>

                        {/* Значка на отстъпката */}
                        <span className="absolute -top-2 -right-2 z-10 grid h-8 w-8 md:h-11 md:w-11 place-items-center rounded-full bg-white shadow-lg ring-2 ring-rose-300/60">
                          <span className="font-display text-[10px] md:text-[13px] font-bold italic leading-none text-rose-600">
                            −{product.discount_percent}%
                          </span>
                        </span>

                        {/* Цена — само на desktop */}
                        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 hidden md:block whitespace-nowrap rounded-full bg-white px-3.5 py-1 shadow-lg ring-1 ring-rose-100">
                          <span className="font-display text-sm font-semibold text-gray-900">
                            €{product.price}
                          </span>
                          <span className="ml-1.5 text-[11px] text-gray-400 line-through">
                            €{product.old_price}
                          </span>
                        </span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Текстов блок — вляво */}
              <div className="relative z-10 flex min-h-[540px] w-full flex-col justify-center px-8 py-10 md:max-w-[54%] md:pl-12 md:pr-8 md:py-14">
                <motion.div
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-sm border border-white/25"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18, ease: EASE }}
                >
                  <motion.span
                    animate={{ rotate: [0, 14, -10, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}
                  >
                    <Flame className="h-4 w-4 text-white" />
                  </motion.span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/95">
                    Гореща оферта
                  </span>
                </motion.div>

                <motion.h1
                  className="font-display mt-6 text-[19vw] sm:text-7xl md:text-8xl font-semibold italic leading-[0.9] tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, ease: EASE }}
                >
                  −20%
                </motion.h1>

                <motion.p
                  className="font-display mt-3 text-2xl md:text-3xl italic text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36, ease: EASE }}
                >
                  на всички електроуреди
                </motion.p>

                <motion.div
                  className="mt-4 h-px w-24 bg-gradient-to-r from-white/80 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.44, duration: 0.5, ease: EASE }}
                  style={{ transformOrigin: "left" }}
                />

                <motion.p
                  className="mt-5 text-white/90 leading-relaxed max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.48 }}
                >
                  Професионални пили и UV/LED лампи NAIL MASTER на специални цени.
                  Офертата важи само днес.
                </motion.p>

                {/* Бутон за затваряне на флайера */}
                <motion.div
                  className="mt-8 flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.62, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={closeFlyer}
                    className="rounded-full border-2 border-white/60 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/15 hover:border-white"
                  >
                    Разгледай сайта
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
