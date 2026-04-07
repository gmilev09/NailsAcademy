import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { shopProducts } from "../../data/products";
import { addProductToCart } from "@/lib/cart";
import { useAuth } from "@/lib/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const featuredProductIds = ["1", "3", "4", "2", "25", "26"];
const productsData = featuredProductIds
  .map((id) => shopProducts.find((product) => product.id === id))
  .filter(Boolean);

function AddToCartButton({ product, isAuthenticated, navigateToLogin }) {
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    if (!isAuthenticated) {
      toast.error("Влезте в акаунт, за да добавяте продукти.");
      navigateToLogin();
      return;
    }

    try {
      await addProductToCart(product);
      setAdded(true);
      toast.success(`${product.name} е добавен в количката!`);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      toast.error("Възникна проблем при добавяне в количката.");
    }
  };

  return (
    <motion.button
      onClick={handleAdd}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        added ? "bg-green-500 text-white" : "bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600"
      }`}
      whileTap={{ scale: 0.92 }}
    >
      {added ? "✔ Добавено!" : <><Plus className="w-4 h-4" />Добави</>}
    </motion.button>
  );
}

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState(0);
  const [pendingIndex, setPendingIndex] = useState(null);
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const { isAuthenticated, navigateToLogin } = useAuth();
  const isMobile = useIsMobile();

  const visibleCount = isMobile ? 2 : 4;
  const maxIndex = Math.max(0, productsData.length - visibleCount);
  const isAnimating = slideDirection !== 0;

  const getWindowProducts = useCallback(
    (startIndex) => productsData.slice(startIndex, startIndex + visibleCount),
    [visibleCount]
  );

  const beginSlide = useCallback(
    (direction) => {
      if (isAnimating || maxIndex <= 0) return;

      const targetIndex =
        direction === 1
          ? (currentIndex >= maxIndex ? 0 : currentIndex + 1)
          : (currentIndex <= 0 ? maxIndex : currentIndex - 1);

      setPendingIndex(targetIndex);
      setSlideDirection(direction);
    },
    [currentIndex, isAnimating, maxIndex]
  );

  const next = useCallback(() => {
    beginSlide(1);
  }, [beginSlide]);

  const prev = useCallback(() => {
    beginSlide(-1);
  }, [beginSlide]);

  useEffect(() => {
    if (!isPaused && !isAnimating && productsData.length > 1 && maxIndex > 0) {
      intervalRef.current = setInterval(next, 4500);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, isAnimating, maxIndex, next]);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  useEffect(() => () => clearTimeout(resumeTimeoutRef.current), []);

  const pauseAndResumeAutoplay = () => {
    clearTimeout(resumeTimeoutRef.current);
    setIsPaused(true);
    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), 2500);
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? 0;
    touchEndXRef.current = touchStartXRef.current;
    pauseAndResumeAutoplay();
  };

  const handleTouchMove = (event) => {
    touchEndXRef.current = event.changedTouches[0]?.clientX ?? touchEndXRef.current;
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX > 0) next();
    if (deltaX < 0) prev();
  };

  const currentProducts = getWindowProducts(currentIndex);
  const incomingProducts = pendingIndex === null ? [] : getWindowProducts(pendingIndex);
  const isMobileGrid = isMobile ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  const slidePages = slideDirection === -1 ? [incomingProducts, currentProducts] : [currentProducts, incomingProducts];
  const slideFrom = slideDirection === -1 ? "-100%" : "0%";
  const slideTo = slideDirection === -1 ? "0%" : "-100%";

  const handleSlideComplete = () => {
    if (pendingIndex === null || slideDirection === 0) return;
    setCurrentIndex(pendingIndex);
    setPendingIndex(null);
    setSlideDirection(0);
  };

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
          {productsData.length > visibleCount && (
            <>
              <button onClick={prev} disabled={isAnimating} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
              <button onClick={next} disabled={isAnimating} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
            </>
          )}

          <div
            className="overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isAnimating ? (
              <motion.div
                key={`${currentIndex}-${pendingIndex}-${slideDirection}`}
                className="flex w-[200%]"
                initial={{ x: slideFrom }}
                animate={{ x: slideTo }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={handleSlideComplete}
              >
                {slidePages.map((products, pageIdx) => (
                  <div key={pageIdx} className={`w-1/2 shrink-0 grid gap-6 ${isMobileGrid}`}>
                    {products.map((product) => (
                      <div
                        key={`${pageIdx}-${product.id}`}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50"
                      >
                        <div className="relative h-48 bg-gray-100">
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">{product.name}</h3>
                          <p className="text-gray-400 text-xs mb-3 line-clamp-1">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-rose-500">
                              {`€${product.price}`}
                            </span>
                            <AddToCartButton
                              product={product}
                              isAuthenticated={isAuthenticated}
                              navigateToLogin={navigateToLogin}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className={`grid gap-6 ${isMobileGrid}`}>
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">{product.name}</h3>
                      <p className="text-gray-400 text-xs mb-3 line-clamp-1">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-rose-500">
                          {`€${product.price}`}
                        </span>
                        <AddToCartButton
                          product={product}
                          isAuthenticated={isAuthenticated}
                          navigateToLogin={navigateToLogin}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <Link
            to="/Shop"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 px-10 py-3 text-lg font-semibold text-white shadow-md transition-all hover:from-rose-500 hover:to-pink-600 hover:shadow-lg"
          >
            Покажи всички→
          </Link>
        </div>
       </div>
    </section>
  );
}
