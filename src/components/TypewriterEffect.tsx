import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TypewriterEffectProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypewriterEffect = ({ 
  text, 
  className = "", 
  delay = 0,
  speed = 50 
}: TypewriterEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      // Se reduzir movimento, apenas mostrar o texto completo após um pequeno delay
      const timer = setTimeout(() => {
        setDisplayedText(text);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    } else {
      // Efeito de digitação normal
      let index = 0;
      let timer: ReturnType<typeof setTimeout>;
      
      const startTyping = () => {
        timer = setTimeout(() => {
          if (index < text.length) {
            setDisplayedText(text.substring(0, index + 1));
            index++;
            startTyping();
          }
        }, speed);
      };
      
      // Delay inicial antes de começar a digitar
      const initialTimer = setTimeout(() => {
        startTyping();
      }, delay * 1000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(initialTimer);
      };
    }
  }, [text, delay, speed, shouldReduceMotion]);

  useEffect(() => {
    if (displayedText === text) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.3 }
      });
    }
  }, [displayedText, text, controls]);

  return (
    <motion.div
      className={className}
    >
      {displayedText}
    </motion.div>
  );
};

export default TypewriterEffect;
