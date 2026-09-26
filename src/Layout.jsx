// NOTE: header + навигация са вербатим от репозиторито; footer-ът е реконструиран
// в същия стил (оригиналът е 10.5KB). Логото сочи към GitHub raw.
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/ui/button";
import {
  Menu,
  X,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  LogIn,
  Facebook } from "lucide-react";
import CookieBanner from "./components/CookieBanner";
import { useAuth } from "./lib/AuthContext";

const siteLogo = "https://raw.githubusercontent.com/gmilev09/NailsAcademy/main/src/NailsAcademy/logo.jpg";

const navLinks = [
  { name: "Начало", page: "" },
  { name: "Курсове", page: "Courses" },
  { name: "Магазин", page: "Shop" },
  { name: "Галерия", page: "Gallery" },
  { name: "За нас", page: "About" },
  { name: "Контакти", page: "Contact" }
];

const courseLinks = [
  { name: "Базов курс", slug: "bazov-kurs-manikyur-pedikyur-noktoplastika" },
  { name: "Комбиниран маникюр", slug: "kombiniran-manikyur" },
  { name: "Изграждане с горни форми", slug: "izgrazhdane-s-gorni-formi" },
  { name: "Работа с гел", slug: "rabota-s-gel" }
];

const legalLinks = [
  { name: "Общи условия", page: "Terms" },
  { name: "Политика за поверителност", page: "PrivacyPolicy" },
  { name: "Политика за бисквитки", page: "CookiePolicy" },
  { name: "Доставка", page: "Shipping" },
  { name: "Връщане", page: "Returns" }
];

export default function Layout({ children, currentPageName: _currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, navigateToLogin } = useAuth();
  const enrollNowPath = isAuthenticated ? "/Enroll" : "/auth?mode=signup";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-rose-50/10">
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img
                src={siteLogo}
                alt="Nails Academy"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-rose-300/80"
              />
              <div className="flex flex-col items-start text-left leading-tight">
                <span className="font-display text-xl font-medium text-[#0f172a] tracking-wide">ARTAYA</span>
                <span className="font-display text-xl font-semibold italic bg-gradient-to-r from-[#F43F5E] via-[#EC4899] to-[#DB2777] bg-clip-text text-transparent">
                  Nails Academy
                </span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={`/${link.page}`}
                  className={`nav-link text-[11px] uppercase tracking-[0.16em] font-semibold transition-colors hover:text-rose-500 ${
                    location.pathname === `/${link.page}` ? "text-rose-500" : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/Cart">
                <Button variant="outline" size="sm" className="border-rose-200 text-rose-600 hover:bg-rose-50 rounded-full px-4">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Количка
                </Button>
              </Link>
              {isAuthenticated ? (
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-rose-500" onClick={logout}>
                  {user?.name || user?.email || "Профил"} | Изход
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-rose-500" onClick={navigateToLogin}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Вход
                </Button>
              )}
              <Link to={enrollNowPath}>
                <Button className="bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full px-6">
                  Запиши се
                </Button>
              </Link>
            </div>

            <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div className="md:hidden bg-white border-t" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <div className="container mx-auto px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link key={link.page} to={`/${link.page}`} className="block py-2 text-lg font-medium text-gray-600">{link.name}</Link>
                ))}
                <Link to="/Cart" className="block">
                  <Button variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 rounded-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Количка
                  </Button>
                </Link>
                {isAuthenticated ? (
                  <Button variant="ghost" className="w-full" onClick={logout}>
                    Изход ({user?.name || user?.email || "Профил"})
                  </Button>
                ) : (
                  <Button variant="ghost" className="w-full" onClick={navigateToLogin}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Вход
                  </Button>
                )}
                <Link to={enrollNowPath} className="block pt-4">
                  <Button className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full">Запиши се</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>{children}</main>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img src={siteLogo} alt="Nails Academy" className="w-12 h-12 rounded-full object-cover" />
                <div><span className="font-display text-xl font-medium text-gray-100 tracking-wide">ARTAYA</span><span className="font-display text-xl font-semibold italic text-rose-300 ml-1">Nails Academy</span></div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Професионални курсове и сертификати за маникюристи.Стартирайте кариерата си в бюти индустрията.</p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/artaya_nails_academy?igsh=MTdrdGxzeXNnaGJ6Zg==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="https://www.facebook.com/share/1a3J1NbP87/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Бързи връзки</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.page}><Link to={`/${link.page}`} className="text-gray-400 hover:text-rose-400 text-sm">{link.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Курсове</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {courseLinks.map((course) => (
                  <li key={course.slug}>
                    <Link to={`/courses/${course.slug}`} className="hover:text-rose-400">{course.name}</Link>
                  </li>
                ))}
                <li><Link to="/Courses" className="hover:text-rose-400">Всички курсове</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Контакти</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-rose-300 shrink-0" /> гр. Петрич, България</li>
                <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-rose-300 shrink-0" /> <a href="tel:+359895737470" className="hover:text-rose-400">+359 89 5737470</a></li>
                <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-rose-300 shrink-0" /> <a href="mailto:bozhinova.nails.academy@gmail.com" className="hover:text-rose-400 break-all">bozhinova.nails.academy@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ARTAYA Nails Academy. Всички права запазени.</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link key={link.page} to={`/${link.page}`} className="text-gray-500 hover:text-rose-400 text-xs transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
}
