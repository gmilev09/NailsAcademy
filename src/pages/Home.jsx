import { useEffect } from "react";
import HeroSection from "../components/home/HeroSection";
import CoursesPreview from "../components/home/CoursesPreview";
import FeaturedProducts from "../components/home/FeaturedProducts";
import GalleryPreview from "../components/home/GalleryPreview";
import CTASection from "../components/home/CTASection";
import InstructorSection from "../components/home/InstructorSection";

export default function Home() {
  useEffect(() => {
    document.title = "Nails Academy - Професионални курсове за маникюр в Петрич";
    
    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    setMeta('description', 'Nails Academy предлага професионални курсове за маникюр в Петрич.');
    setMeta('og:title', 'Nails Academy - Професионални курсове за маникюр', true);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CoursesPreview />
      <FeaturedProducts />
      <InstructorSection />
      <GalleryPreview />
      <CTASection />
    </div>
  );
}
