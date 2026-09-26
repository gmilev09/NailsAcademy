// NOTE: Първата част е вербатим от репозиторито; краят на формата и дясната колона са
// реконструирани (оригиналът е 12.7KB). Заявките се записват и локално при липса на API.
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Clock, GraduationCap, Users, Award, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { courses, normalizeCourseTitle } from "../data/courses";

function saveEnrollmentLocally(payload) {
  try {
    const saved = JSON.parse(localStorage.getItem("na_enrollments") || "[]");
    saved.push({ ...payload, id: String(Date.now()), created_at: new Date().toISOString() });
    localStorage.setItem("na_enrollments", JSON.stringify(saved));
  } catch {
    // ignore
  }
}

export default function Enroll() {
  const [searchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneDisplay = "+359 89 5737470";
  const phoneHref = "tel:+359895737470";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const courseFromQuery = searchParams.get("course");
    if (!courseFromQuery) return;

    const normalizedCourseFromQuery = normalizeCourseTitle(courseFromQuery);
    const matchedCourse = courses.find(
      (course) => normalizeCourseTitle(course.title) === normalizedCourseFromQuery
    );

    if (matchedCourse) {
      setSelectedCourse(matchedCourse);
    }
  }, [searchParams]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleEnroll = async (e) => {
    e.preventDefault();

    if (!selectedCourse) {
      toast.error("Изберете курс.");
      return;
    }

    if (!contactData.name.trim() || !contactData.email.trim() || !contactData.phone.trim()) {
      toast.error("Попълнете име, имейл и телефон.");
      return;
    }

    setIsSubmitting(true);
    try {
      const form = e.currentTarget;
      const formDataPayload = new FormData(form);
      const payload = {
        name: contactData.name.trim(),
        email: contactData.email.trim(),
        phone: contactData.phone.trim(),
        message: contactData.message.trim(),
        course_title: selectedCourse.title,
        course_price: String(Number(selectedCourse.price) || 0),
        course_duration: selectedCourse.duration || "",
      };

      formDataPayload.set("name", payload.name);
      formDataPayload.set("email", payload.email);
      formDataPayload.set("phone", payload.phone);
      formDataPayload.set("message", payload.message);
      formDataPayload.set("course_title", payload.course_title);
      formDataPayload.set("course_price", payload.course_price);
      formDataPayload.set("course_duration", payload.course_duration);

      let delivered = false;
      try {
        const apiResponse = await fetch("/api/enrollments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        delivered = apiResponse.ok;
      } catch {
        delivered = false;
      }

      if (!delivered) {
        saveEnrollmentLocally(payload);
      }

      // Netlify Forms fallback (best effort)
      try {
        await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formDataPayload).toString(),
        });
      } catch {
        // ignore
      }

      toast.success("Заявката за записване е изпратена успешно.");
      setContactData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Неуспешно изпращане. Моля, опитайте отново.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-pink-100 shadow-sm mb-6">
              <GraduationCap className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-600">Започнете вашето пътуване</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-4 italic">
              Запишете се <span className="font-semibold text-rose-500">сега</span>
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Изберете курс и се свържете с нас по телефона, за да финализирате записването.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Course selection & Contact */}
          <motion.div
            className="lg:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-pink-50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-8 italic">Изберете курс</h2>
            <div className="space-y-4 mb-8">
              {courses.map((course) => (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => handleCourseSelect(course)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedCourse?.id === course.id
                      ? "border-rose-400 bg-rose-50/50 shadow-md"
                      : "border-gray-100 hover:border-rose-200 hover:bg-rose-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{course.duration}</p>
                    </div>
                    <span className="text-lg font-bold text-rose-500">
                      {`€${course.price}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <form
              name="enrollment"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleEnroll}
              className="bg-gray-50 rounded-3xl p-6 md:p-8 text-center border border-pink-100"
            >
              <input type="hidden" name="form-name" value="enrollment" />
              <input type="hidden" name="course_title" value={selectedCourse?.title || ""} />
              <input type="hidden" name="course_price" value={selectedCourse ? String(Number(selectedCourse.price) || 0) : ""} />
              <input type="hidden" name="course_duration" value={selectedCourse?.duration || ""} />
              <p className="hidden" aria-hidden="true">
                <label>
                  Не попълвайте това поле:
                  <input name="bot-field" />
                </label>
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Попълнете данни за записване и ще се свържем с вас.
              </p>
              <div className="space-y-3 text-left mb-5">
                <input
                  name="name"
                  type="text"
                  placeholder="Име и фамилия *"
                  value={contactData.name}
                  onChange={(e) => setContactData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Имейл *"
                  value={contactData.email}
                  onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Телефон *"
                  value={contactData.phone}
                  onChange={(e) => setContactData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Съобщение (незадължително)"
                  value={contactData.message}
                  onChange={(e) => setContactData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 min-h-[100px]"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white rounded-full px-10 py-6 text-base"
              >
                {isSubmitting ? "Изпращане..." : "Изпрати заявка"}
              </Button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl p-8 text-white shadow-xl">
              <Phone className="w-8 h-8 text-white/80 mb-4" />
              <h3 className="text-xl font-bold mb-2 italic">Предпочитате телефон?</h3>
              <p className="text-white/85 text-sm mb-6">
                Обадете ни се директно и ще Ви консултираме за най-подходящия курс.
              </p>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 bg-white text-rose-600 rounded-full px-6 py-3 font-semibold shadow hover:bg-rose-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {phoneDisplay}
              </a>
            </div>

            {selectedCourse ? (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50">
                <Badge className="bg-rose-100 text-rose-600 border-0 mb-4">Избран курс</Badge>
                <img
                  src={selectedCourse.image_url}
                  alt={selectedCourse.title}
                  className="w-full h-40 object-cover rounded-2xl mb-4"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="font-bold text-gray-900 mb-4">{selectedCourse.title}</h3>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-rose-400" />
                    {selectedCourse.duration}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-rose-400" />
                    {selectedCourse.max_students ? `Максимум ${selectedCourse.max_students} курсисти` : "Индивидуално обучение"}
                  </p>
                  {selectedCourse.certificate && (
                    <p className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4 text-rose-400" />
                      Сертификат след завършване
                    </p>
                  )}
                </div>
                <p className="text-3xl font-bold text-rose-500 mt-6 italic">€{selectedCourse.price}</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50 text-sm text-gray-500">
                Изберете курс от списъка вляво, за да видите детайлите тук.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
