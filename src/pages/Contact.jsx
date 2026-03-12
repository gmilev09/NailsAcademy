import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2, Instagram } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Посетете ни",
    details: ["гр. Петрич 2850"],
    link: "https://www.google.com",
  },
  {
    icon: Phone,
    title: "Обадете се",
    details: ["+359 89 5737470"],
    link: "tel:+359895737470",
  },
  {
    icon: Mail,
    title: "Пишете ни",
    details: ["bozhinova.nails.academy@gmail.com"],
    link: "mailto:bozhinova.nails.academy@gmail.com",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Симулация на изпращане за Netlify
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Съобщението е изпратено успешно!");
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <Mail className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Свържете се с нас</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4">
              <span className="font-semibold text-rose-500">Контакти</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Имате въпроси? Ще се радваме да чуем от вас. Изпратете ни съобщение и ще отговорим възможно най-скоро.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 pb-24">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div className="lg:col-span-1" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-8 text-white h-full shadow-xl shadow-rose-200/50">
                <h2 className="text-2xl font-semibold mb-8 italic">Информация</h2>
                <div className="space-y-8">
                  {contactInfo.map((item) => (
                    <a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 hover:opacity-80 transition-opacity">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">{item.title}</p>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-white/80 text-sm">{detail}</p>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="font-medium mb-4">Последвайте ни</p>
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              {submitted ? (
                <div className="bg-white rounded-3xl p-10 shadow-xl border border-pink-50 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Съобщението е изпратено!</h2>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">Благодарим ви, че се свързахте с нас. Ще ви отговорим възможно най-скоро.</p>
                  <Button onClick={() => setSubmitted(false)} className="bg-rose-500 text-white rounded-full px-8">Изпрати друго</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-pink-50 space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-8 italic">Изпратете ни съобщение</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Вашето име *</Label>
                      <Input id="name" placeholder="Име и фамилия" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Вашият имейл *</Label>
                      <Input id="email" type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required className="rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема</Label>
                    <Input id="subject" placeholder="Как можем да помогнем?" value={formData.subject} onChange={(e) => handleChange("subject", e.target.value)} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Вашето съобщение *</Label>
                    <Textarea id="message" placeholder="Разкажете ни повече..." value={formData.message} onChange={(e) => handleChange("message", e.target.value)} required className="rounded-xl min-h-[180px]" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full py-6 text-base shadow-lg">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5 mr-2" /> Изпрати</>}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
