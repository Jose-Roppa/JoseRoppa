import { MotionValue, motion } from "framer-motion";
import ThreeScene from "../ThreeScene";
import TypewriterEffect from "../TypewriterEffect";

interface HeroSectionProps {
  smoothX: MotionValue;
  smoothY: MotionValue;
}

const HeroSection = ({ smoothX, smoothY }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Three.js Scene */}
      <div className="absolute inset-0 z-0">
        <ThreeScene className="w-full h-full" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-screen">
        <motion.div
          className="container px-4 mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-6"
            animate={{
              rotateX: [-1, 1, -1],
              rotateY: [-1, 1, -1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <TypewriterEffect
              text="José Eduardo Roppa"
              className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 dark:from-purple-400 dark:to-pink-600 light:from-pink-700 light:to-purple-900 light:text-transparent dark:text-transparent"
              speed={40}
            />
          </motion.div>
          
          <TypewriterEffect 
            text="Estagiário em Desenvolvimento de Software"
            className="text-2xl md:text-3xl mb-4 max-w-3xl mx-auto text-gray-900 dark:text-gray-300 font-semibold"
            delay={1.0}
            speed={30}
          />
          
          <TypewriterEffect 
            text="Sou estudante de Engenharia de Software na PUC-Campinas, apaixonado por tecnologia, resolução de problemas e inovação. Busco desafios que promovam meu crescimento pessoal e profissional."
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
            delay={2.0}
            speed={25}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            <a 
              href="#projects" 
              className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 
                hover:from-purple-600 hover:to-indigo-700
                text-white font-bold py-3 px-8 rounded-full
                transform transition duration-300 hover:scale-105
                shadow-lg hover:shadow-purple-500/30"
            >
              Ver Projetos
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
