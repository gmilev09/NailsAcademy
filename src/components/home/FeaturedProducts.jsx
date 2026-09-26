import { useState, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { ShoppingBag, Plus } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { shopProducts } from "../../data/products";
import { addProductToCart } from "@/lib/cart";
import { useAuth } from "@/lib/AuthContext";

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
    <button
      onClick={handleAdd}
      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${
        added ? "bg-green-500 text-white" : "bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:from-rose-500 hover:to-pink-600"
      }`}
    >
      {added ? "✔ Добавено!" : <><Plus className="w-4 h-4" />Добави</>}
    </button>
  );
}

function ProductCard({ product, isAuthenticated, navigateToLogin }) {
  return (
    <div className="w-60 sm:w-72 flex-none bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-50 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 bg-gray-100">
        <Link to={`/ProductDetail?id=${product.id}`}>
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/ProductDetail?id=${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1 hover:text-rose-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-lg font-bold text-rose-500 mb-3">€{product.price}</p>
        <AddToCartButton product={product} isAuthenticated={isAuthenticated} navigateToLogin={navigateToLogin} />
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const { isAuthenticated, navigateToLogin } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);

  // Скорост на плъзгане в пиксели за секунда — повдигни/намали при нужда
  const SPEED = 45;

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || productsData.length === 0) return;

    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    if (!isHovered) {
      // Ограничаваме delta, за да няма "скок" след неактивен таб
      const dt = Math.min(delta, 100) / 1000;
      offsetRef.current = (offsetRef.current + SPEED * dt) % halfWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }
  });

  const duplicatedProducts = [...productsData, ...productsData];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/50 rounded-full mb-4">
            <ShoppingBag className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-600">Магазин</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Най-желаните <span className="font-semibold text-rose-500">продукти</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Качествени продукти за професионален маникюр</p>
        </motion.div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Меки преливащи маски по краищата за ефект "разтваряне" */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-white via-white/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-pink-50/80 via-pink-50/40 to-transparent" />

        <div className="overflow-hidden py-4">
          <div
            ref={trackRef}
            className="flex gap-6 w-max touch-pan-y will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {duplicatedProducts.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
                isAuthenticated={isAuthenticated}
                navigateToLogin={navigateToLogin}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
