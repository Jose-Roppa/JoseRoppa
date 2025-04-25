import { motion } from "framer-motion";
import { Home, User, Code, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";

const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Função para rolagem suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Detectar seção ativa durante a rolagem
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset para detecção melhor

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: "Início", href: "#home", id: "home" },
    { icon: User, label: "Sobre", href: "#about", id: "about" },
    { icon: Code, label: "Projetos", href: "#projects", id: "projects" },
    { icon: Mail, label: "Contato", href: "#contact", id: "contact" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <nav className="flex items-center gap-1 md:gap-2 p-2 
          light:bg-white/70 light:border-pink-200/30 light:shadow-pink-100/20
          dark:bg-black/30 dark:border-white/10 dark:shadow-purple-900/20
          backdrop-blur-lg rounded-full border shadow-xl transition-colors">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className={`relative group flex flex-col items-center justify-center p-2 md:p-3 rounded-full transition-colors ${
                  isActive 
                    ? "light:bg-pink-500/30 light:text-pink-900 dark:bg-purple-500/30 dark:text-white" 
                    : "light:hover:bg-pink-500/20 light:text-gray-700 dark:hover:bg-purple-500/20 dark:text-white/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
                <span className="sr-only">{item.label}</span>
                
                <motion.span
                  className="absolute top-full mt-2 px-2.5 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap dark:bg-white/20"
                  initial={{ y: 5 }}
                  animate={{ y: 0 }}
                >
                  {item.label}
                </motion.span>
                
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 
                      light:bg-pink-500 dark:bg-purple-500 rounded-full"
                    layoutId="navIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </motion.button>
            );
          })}
          
          <div className="mx-1">
            <ThemeToggle />
          </div>
        </nav>
      </motion.div>
    </div>
  );
};

export default FloatingNav;
