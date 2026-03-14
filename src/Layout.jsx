import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/ui/button";
import {
  Menu,
  X,
  Sparkles,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  LogIn,
  Facebook } from "lucide-react";

const navLinks = [
  { name: "Начало", page: "" },
  { name: "Курсове", page: "Courses" },
  { name: "Магазин", page: "Shop" },
  { name: "Галерия", page: "Gallery" },
  { name: "За нас", page: "About" },
  { name: "Контакти", page: "Contact" }
];

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-light text-gray-900">Nails</span>
                <span className="text-xl font-semibold text-rose-500 ml-1">Academy</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={`/${link.page}`}
                  className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                    location.pathname === `/${link.page}` ? "text-rose-500" : "text-gray-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/Cart" className="relative p-2 text-rose-600">
                <ShoppingCart className="w-6 h-6" />
              </Link>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-rose-500">
                <LogIn className="w-4 h-4 mr-2" />
                Вход
              </Button>
              <Link to="/Enroll">
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
                <Link to="/Enroll" className="block pt-4">
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
                <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div><span className="text-xl font-light">Nails</span><span className="text-xl font-semibold text-rose-400 ml-1">Academy</span></div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Професионални курсове и сертификати за маникюристи.Стартирайте кариерата си в бюти индустрията.</p>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/nailsacademy22" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-rose-500 transition-colors"><Instagram className="w-5 h-5" /></a>
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
                <li><Link to="/Enroll?course=Базов%20курс%20по%20маникюр%2C%D0%BF%D0%B5%D0%B4%D0%B8%D0%BA%D1%8E%D1%80%20%D0%B8%20%D0%BD%D0%BE%D0%BA%D1%82%D0%BE%D0%BF%D0%BB%D0%B0%D1%81%D1%82%D0%B8%D0%BA%D0%B0" className="hover:text-rose-400 transition-colors">Базов курс по маникюр,педикюр и ноктопластика</Link></li>
                <li><Link to="/Enroll?course=Комбиниран маникюр" className="hover:text-rose-400 transition-colors">Комбиниран маникюр</Link></li>
                <li><Link to="/Enroll?course=Изграждане с горни форми" className="hover:text-rose-400 transition-colors">Изграждане с горни форми</Link></li>
                <li><Link to="/Enroll?course=Работа с гел" className="hover:text-rose-400 transition-colors">Работа с гел</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Контакти</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-rose-400" />гр. Петрич 2850</li>
                <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-rose-400" /><a href="tel:+359895737470" className="hover:text-rose-400">+359 89 5737470</a></li>
                <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-rose-400" /><a href="mailto:bozhinova.nails.academy@gmail.com" className="hover:text-rose-400 transition-colors">bozhinova.nails.academy@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col items-center space-y-4">
  <p className="text-sm text-gray-500">
    © {new Date().getFullYear()} Nails Academy. Всички права запазени.
  </p>
  
  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
    <Link to="/returns" className="hover:text-rose-400 transition-colors">Връщане</Link>
    <Link to="/shipping" className="hover:text-rose-400 transition-colors">Доставка</Link>
    <Link to="/privacy" className="hover:text-rose-400 transition-colors">Поверителност</Link>
    <Link to="/terms" className="hover:text-rose-400 transition-colors">Общи условия</Link>
  </div>
</div>

        </div>
      </footer>
    </div>
  );
}
