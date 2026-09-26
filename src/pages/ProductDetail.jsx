import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, PackageX, Truck, ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";
import { shopProducts, getGroupForProduct } from "../data/products";
import { addProductToCart } from "@/lib/cart";
import { useAuth } from "@/lib/AuthContext";

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get("id");
  const [selectedVariantId, setSelectedVariantId] = useState(urlId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const { isAuthenticated, navigateToLogin } = useAuth();

  // Ако id се смени отвън (линк), синхронизираме избора
  useEffect(() => {
    setSelectedVariantId(urlId);
  }, [urlId]);

  const group = useMemo(() => getGroupForProduct(urlId), [urlId]);

  // Избраният вариант (или самият продукт, ако няма група)
  const selectedVariant = useMemo(() => {
    if (!group) return null;
    return group.variants.find((variant) => String(variant.productId) === String(selectedVariantId)) || group.variants[0];
  }, [group, selectedVariantId]);

  const product = useMemo(() => {
    const id = group ? (selectedVariant?.productId ?? urlId) : urlId;
    return shopProducts.find((item) => String(item.id) === String(id));
  }, [group, selectedVariant, urlId]);

  const displayName = group ? group.name : product?.name;

  const images = useMemo(
    () => (product ? [product.image_url, product.image_url_2, product.image_url_3].filter(Boolean) : []),
    [product]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentImageIndex(0);
  }, [product]);

  const handleSelectVariant = (variant) => {
    setSelectedVariantId(variant.productId);
    setCurrentImageIndex(0);
    setAdded(false);
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Влезте в акаунт, за да добавяте продукти.");
      navigateToLogin();
      return;
    }
    try {
      const cartProduct = product;
      await addProductToCart(cartProduct);
      setAdded(true);
      toast.success(`${group ? `${group.name} — ${selectedVariant.label}` : product.name} е добавен в количката!`);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      toast.error("Възникна проблем при добавяне в количката.");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-40 pb-24 px-6 text-center">
        <PackageX className="w-14 h-14 text-rose-200 mx-auto mb-6" />
        <h1 className="text-3xl font-light text-gray-900 mb-4">Продуктът не е намерен</h1>
        <Link to="/Shop">
          <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Към магазина
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      <div className="container mx-auto max-w-6xl pt-32 pb-24 px-6">
        {/* Back button */}
        <Link to="/Shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-500 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Назад към магазина
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="relative bg-gray-50 rounded-3xl overflow-hidden aspect-square group border border-pink-100 shadow-sm">
              <AnimatePresence mode="wait" initial={false}>
                {images.length > 0 ? (
                  <motion.img
                    key={images[currentImageIndex] + String(product.id)}
                    src={images[currentImageIndex]}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0.4, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">Без снимка</div>
                )}
              </AnimatePresence>
              {!product.in_stock && (
                <Badge className="absolute top-4 right-4 bg-gray-500 text-white">Изчерпан</Badge>
              )}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    aria-label="Предишна снимка"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                    aria-label="Следваща снимка"
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
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${i === currentImageIndex ? "border-rose-400 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} alt={`${displayName} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col">
            {product.category && (
              <Badge className="w-fit mb-4 bg-rose-100 text-rose-600 border-0 px-3 py-1 font-medium">{product.category}</Badge>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 italic leading-tight">{displayName}</h2>

            {/* Избор на вариант */}
            {group && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  {group.selectorLabel}:{" "}
                  <span className="text-rose-500 font-bold italic">{selectedVariant?.label}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {group.variants.map((variant) => {
                    const isActive = String(variant.productId) === String(selectedVariant?.productId);
                    if (variant.swatch) {
                      return (
                        <button
                          key={variant.productId}
                          onClick={() => handleSelectVariant(variant)}
                          className="flex flex-col items-center gap-1.5 group/variant"
                          title={variant.label}
                        >
                          <span
                            className={`w-10 h-10 rounded-full border-2 shadow-inner transition-all duration-300 flex items-center justify-center ${
                              isActive
                                ? "border-rose-500 ring-2 ring-rose-200 scale-110"
                                : "border-white ring-1 ring-gray-200 group-hover/variant:scale-110"
                            }`}
                            style={{ backgroundColor: variant.swatch }}
                          >
                            {isActive && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                          </span>
                          <span className={`text-[11px] transition-colors ${isActive ? "text-rose-600 font-semibold" : "text-gray-400"} max-w-16 text-center leading-tight`}>
                            {variant.label}
                          </span>
                        </button>
                      );
                    }
                    return (
                      <button
                        key={variant.productId}
                        onClick={() => handleSelectVariant(variant)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-200"
                            : "bg-white border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600"
                        }`}
                      >
                        {variant.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="text-4xl font-bold text-rose-500 mb-8 italic">
              {`€${product.price}`}
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={String(product.id)}
                className="text-gray-600 leading-relaxed mb-10 whitespace-pre-line text-lg italic"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {product.description}
              </motion.p>
            </AnimatePresence>

            <div className="mt-auto space-y-6">
              <Button
                className={`w-full rounded-full py-6 text-lg ${added ? "bg-green-500 hover:bg-green-600" : "bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600"} text-white`}
                disabled={!product.in_stock}
                onClick={handleAddToCart}
              >
                {added ? "✔ Добавено!" : <><Plus className="w-5 h-5 mr-2" /> {isAuthenticated ? "Добави в количката" : "Влезте, за да поръчате"}</>}
              </Button>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-pink-50">
                  <Truck className="w-5 h-5 text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Доставка 5–7 дни</p>
                    <p className="text-gray-500 text-xs mt-1">Безплатна над €50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-pink-50">
                  <ShieldCheck className="w-5 h-5 text-rose-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Преглед и тест</p>
                    <p className="text-gray-500 text-xs mt-1">При получаване на пратката</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
