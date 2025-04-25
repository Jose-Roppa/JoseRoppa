import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Clock, Code, Database, Layout, GraduationCap, Briefcase, BookOpen } from "lucide-react";

const timelineEvents = [
  {
    year: "2022",
    title: "Início da Faculdade",
    description: "Ingresso na faculdade de Engenharia de Software (Previsão de formatura: 2026)",
    icon: GraduationCap,
    technologies: ["Engenharia de Software", "Programação", "Algoritmos"],
  },
  {
    year: "2024",
    title: "Estágio em Desenvolvimento",
    description: "Início do estágio em desenvolvimento na VPJ Alimentos",
    icon: Briefcase,
    technologies: ["Python", "IA", "LLM", "API Integration"],
  },
  {
    year: "2025",
    title: "Cursos Online de Harvard",
    description: "Início dos cursos de programação online oferecidos por Harvard",
    icon: BookOpen,
    technologies: ["Computer Science", "Web Development", "Algoritmos Avançados"],
  },
  {
    year: "2026",
    title: "Formatura Prevista",
    description: "Previsão de conclusão do curso de Engenharia de Software",
    icon: GraduationCap,
    technologies: ["Engenharia de Software", "Desenvolvimento Full Stack", "Gestão de Projetos"],
  },
];

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="relative py-32">
      <div 
        className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
        style={{
          background: document.documentElement.classList.contains('dark')
            ? "linear-gradient(180deg, #8B5CF6 0%, #D946EF 100%)"
            : "linear-gradient(180deg, #EC4899 0%, #F472B6 100%)",
          boxShadow: document.documentElement.classList.contains('dark')
            ? "0 0 20px rgba(139, 92, 246, 0.5)"
            : "0 0 20px rgba(236, 72, 153, 0.5)",
        }}
        aria-hidden="true"
      />
      
      <div className="sr-only">
        <h3>Minha linha do tempo</h3>
        <ul>
          {timelineEvents.map((event) => (
            <li key={event.year}>
              {event.year}: {event.title} - {event.description}
            </li>
          ))}
        </ul>
      </div>
      
      {timelineEvents.map((event, index) => {
        const Icon = event.icon;
        const isExpanded = expandedIndex === index;
        const isEven = index % 2 === 0;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative ${
              isEven ? "pr-1/2 text-right md:text-right" : "pl-1/2 text-left md:text-left"
            } mb-32`}
            onHoverStart={() => setExpandedIndex(index)}
            onHoverEnd={() => setExpandedIndex(null)}
            onFocus={() => setExpandedIndex(index)}
            onBlur={() => setExpandedIndex(null)}
            tabIndex={0}
            aria-label={`${event.year}: ${event.title} - ${event.description}`}
            role="article"
          >
            <motion.div
              className={`inline-block ${isEven ? "mr-8 md:mr-8" : "ml-8 md:ml-8"} max-w-md dark:bg-gradient-to-br dark:from-purple-900/40 dark:to-pink-900/40 dark:backdrop-blur-xl dark:rounded-2xl dark:p-8 dark:border dark:border-white/10 dark:shadow-lg transform-gpu transition-all duration-300 dark:hover:border-purple-500/50`}
              animate={{
                scale: isExpanded ? 1.05 : 1,
                boxShadow: isExpanded
                  ? "0 25px 50px -12px rgba(139, 92, 246, 0.25)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <motion.div
                className="absolute top-1/2 transform -translate-y-1/2 w-20 h-20 rounded-full dark:bg-gradient-to-br dark:from-purple-600 dark:to-pink-600"
                style={{ [isEven ? "right" : "left"]: "-2.5rem", boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)" }}
                whileHover={{ scale: 1.1 }}
                animate={{ rotate: isExpanded ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                aria-hidden="true"
              >
                <motion.div
                  className="absolute inset-1 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
                  animate={{ rotate: isExpanded ? 360 : 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                >
                  <Icon className="w-8 h-8 text-white relative z-10" aria-hidden="true" />
                </motion.div>
              </motion.div>
              <motion.span
                className="block text-4xl font-bold bg-clip-text text-transparent dark:bg-gradient-to-r dark:from-purple-400 dark:to-pink-400 mb-4"
                animate={{ textShadow: isExpanded ? "0 0 20px rgba(139, 92, 246, 0.5)" : "none" }}
              >
                {event.year}
              </motion.span>
              <h3 className="text-2xl font-bold mb-3 dark:text-white">{event.title}</h3>
              <p className="dark:text-gray-300 mb-6 leading-relaxed">{event.description}</p>
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
              >
                {event.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-4 py-2 text-sm dark:bg-purple-500/30 dark:text-purple-200 dark:border dark:border-purple-500/20 backdrop-blur-sm rounded-full"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: isExpanded ? 1 : 0, rotate: isExpanded ? 0 : -180 }}
                    transition={{ delay: techIndex * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Timeline;