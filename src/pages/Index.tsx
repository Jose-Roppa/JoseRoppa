import { useMotionValue, useSpring, motion } from "framer-motion";
import { useCallback, useMemo } from 'react';
import CustomCursor from "@/components/CustomCursor";
import FloatingNav from "@/components/FloatingNav";
import Timeline from "@/components/Timeline";
import ChatbotButton from "@/components/ChatbotButton";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/sections/SkillsSection";

const Index = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = useMemo(() => ({ damping: 25, stiffness: 400 }), []);
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  }, [mouseX, mouseY]);

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <CustomCursor />
      <FloatingNav />
      <ChatbotButton />
      
      <section id="home">
        <HeroSection smoothX={smoothX} smoothY={smoothY} />
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 
              light:text-gray-800 dark:text-white"
          >
            Minha Trajetória
          </motion.h2>
          <Timeline />
        </div>
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>
      
      <section id="skills" className="py-20">
        <SkillsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
