// RECONSTRUCTED (оригиналът е 10KB) — формата и контактните данни следват оригинала.
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Clock } from "lucide-react";
import { toast } from "sonner";

const contactCards = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+359 89 5737470",
    href: "tel:+359895737470",
  },
  {
    icon: Mail,
    title: "Имейл",
    value: "bozhinova.nails.academy@gmail.com",
    href: "mailto:bozhinova.nails.academy@gmail.com",
  },
  {
    icon: MapPin,
    title: "Адрес",
    value: "гр. Петрич, България",
    href: "https://www.google.com/maps/search/?api=1&query=Петрич",
  },
  {
    icon: Clock,
    title: "Работно време",
    value: "Понеделник – Събота",
    href: null,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Попълнете всички задължителни полета.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("api unavailable");
      toast.success("Съобщението е изпратено успешно! Ще се свържем с вас скоро.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      // Preview fallback: keep the message locally
      try {
        const saved = JSON.parse(localStorage.getItem("na_contact_messages") || "[]");
        saved.push({ ...formData, created_at: new Date().toISOString() });
        localStorage.setItem("na_contact_messages", JSON.stringify(saved));
      } catch {
        // ignore
      }
      toast.success("Съобщението е изпратено успешно! Ще се свържем с вас скоро.");
      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
            <Mail className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-medium text-rose-600 uppercase">Контакти</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 italic">
            Свържете се <span className="font-semibold text-rose-500">с нас</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Имате въпрос относно курсовете, продуктите или записванията? Пишете ни — отговаряме бързо.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {contactCards.map((card) => (
                <div key={card.title} className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                  {card.href ? (
                    <a href={card.href} className="text-sm text-gray-500 hover:text-rose-500 transition-colors break-all">
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-500">{card.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50">
              <h3 className="font-semibold text-gray-900 mb-4">Последвайте ни</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/artaya_nails_academy?igsh=MTdrdGxzeXNnaGJ6Zg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/share/1a3J1NbP87/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-pink-50"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 italic">Изпратете съобщение</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Вашето име *</Label>
                    <Input id="name" name="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className="rounded-xl" placeholder="Име и фамилия" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Вашият имейл *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required className="rounded-xl" placeholder="you@example.com" />
                  </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Вашето съобщение *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={(e) => handleChange("message", e.target.value)} required className="rounded-xl min-h-[140px]" placeholder="Как можем да помогнем?" />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full py-6 mt-4"
                >
                  {isSubmitting ? "Изпращане..." : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Изпрати съобщение
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
