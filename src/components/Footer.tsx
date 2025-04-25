import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 
      light:border-t light:border-pink-100 light:bg-white/70 light:backdrop-blur-md 
      dark:border-t dark:border-white/10 dark:bg-black/30 dark:backdrop-blur-md 
      mt-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 dark:text-white">José Eduardo Roppa</h3>
            <p className="text-gray-400 dark:text-gray-300">
              Estudante de Engenharia de Software e desenvolvedor apaixonado por tecnologia e inovação.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 dark:text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  className="
                    light:text-pink-600 light:hover:text-pink-700 
                    dark:text-purple-400 dark:hover:text-purple-300 
                    transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Início
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-purple-400 hover:text-purple-300 transition-colors dark:text-purple-300 dark:hover:text-purple-200"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Sobre
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="text-purple-400 hover:text-purple-300 transition-colors dark:text-purple-300 dark:hover:text-purple-200"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Projetos
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-purple-400 hover:text-purple-300 transition-colors dark:text-purple-300 dark:hover:text-purple-200"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 dark:text-white">Redes Sociais</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/seuusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full 
                  light:bg-pink-100 light:text-pink-600 light:hover:bg-pink-200
                  dark:bg-purple-500/20 dark:text-white dark:hover:bg-purple-500/30 
                  flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/seuusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-white hover:bg-purple-500/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:seuemail@exemplo.com"
                className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-white hover:bg-purple-500/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 dark:text-gray-300">
            &copy; {currentYear} José Eduardo Roppa. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 flex items-center mt-4 md:mt-0 dark:text-gray-300">
            Desenvolvido com usando React e Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 