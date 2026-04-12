import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Clock, GraduationCap, Users, Award, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { courses, normalizeCourseTitle } from "../data/courses";

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
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_name: contactData.name.trim(),
          email: contactData.email.trim(),
          phone: contactData.phone.trim(),
          course_title: selectedCourse.title,
          course_price: Number(selectedCourse.price) || 0,
          course_duration: selectedCourse.duration,
          message: contactData.message.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || "Form submission failed");
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
              onSubmit={handleEnroll}
              className="bg-gray-50 rounded-3xl p-6 md:p-8 text-center border border-pink-100"
            >
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
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm min-h-[90px] focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full py-7 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow"
                disabled={!selectedCourse || isSubmitting}
              >
                <Phone className="w-5 h-5 mr-2" />
                {isSubmitting ? "Изпращане..." : "Запиши ме"}
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Може и директно обаждане:{" "}
                <a href={phoneHref} className="font-semibold text-rose-500 hover:underline">
                  {phoneDisplay}
                </a>
              </p>
            </form>
          </motion.div>

          {/* Preview */}
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
            {selectedCourse ? (
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-50 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Детайли за курса</h3>
                <img src={selectedCourse.image_url} alt={selectedCourse.title} className="w-full h-40 object-cover rounded-2xl mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2 italic">{selectedCourse.title}</h4>
                 <p className="text-sm text-gray-600 whitespace-pre-line max-h-56 overflow-y-auto pr-1 mb-4">{selectedCourse.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm"><span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4 text-rose-500" /> Срок</span><span className="font-bold">{selectedCourse.duration}</span></div>
                                  <div className="flex justify-between text-sm"><span className="text-gray-500 flex items-center gap-2"><Users className="w-4 h-4 text-rose-500" /> Група</span><span className="font-bold">{selectedCourse.max_students ? `Максимум ${selectedCourse.max_students}` : "Индивидуално"}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500 flex items-center gap-2"><Award className="w-4 h-4 text-rose-500" /> Диплома</span><Badge className="bg-green-100 text-green-700 border-0">Включена</Badge></div>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="text-gray-500">Цена</span>
                  <span className="text-2xl font-bold text-rose-500">
                    {`€${selectedCourse.price}`}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50/50 rounded-3xl p-8 text-center border-2 border-dashed border-rose-200">
                <GraduationCap className="w-12 h-12 text-rose-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">Изберете курс</h3>
                <p className="text-gray-500 text-sm">Детайлите за Вашето обучение ще се появят тук.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
