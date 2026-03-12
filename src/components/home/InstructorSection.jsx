import { motion } from "framer-motion";
import { Award, Instagram, Star } from "lucide-react";

// Твоите данни (записани директно, за да работят без Base44)
const instructors = [
  {
    id: 1,
    name: "Твоето Име", // Промени го на твоето име
    title: "Основател и Главен Инструктор",
    image_url: "https://storage.googleapis.com", // Снимката, която изпрати
    instagram: "your_instagram", // Сложи твоя Instagram тук
    bio: "Професионалист с дългогодишен опит в индустрията на маникюра. Специалист по изграждане и арт дизайн.",
    experience_years: "10",
    specialties: ["Гел лак", "Ноктопластика", "Арт дизайн"],
    certifications: ["Международен сертификат", "Мастър клас 2024"]
  }
];

export default function InstructorSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100/50 rounded-full mb-6">
            <Star className="w-4 h-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-600">Нашият екип</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Нашите <span className="font-semibold text-rose-500">инструктори</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Запознайте се с професионалистите, които ще ви водят по пътя към успеха
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-50">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={instructor.image_url}
                    alt={instructor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {instructor.instagram && (
                    <a
                      href={`https://instagram.com/${instructor.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white">{instructor.name}</h3>
                    <p className="text-white/80 text-sm">{instructor.title}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-4">{instructor.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-rose-100 text-rose-600 text-xs font-medium rounded-full">
                      {instructor.experience_years}+ години опит
                    </span>
                    {instructor.specialties.map((specialty, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Award className="w-4 h-4 text-rose-400" />
                      <span>{instructor.certifications.length} сертификата</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
