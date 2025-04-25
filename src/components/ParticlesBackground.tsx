import { useEffect, useState, useRef } from "react";
import { MotionValue } from "framer-motion";
import "./ParticlesBackgroundCSS.css";

interface ParticlesBackgroundProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  speedX: number;
  speedY: number;
}

interface Connection {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

const ParticlesBackground = ({ mouseX, mouseY }: ParticlesBackgroundProps) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  
  // Detectar mudanças no tema
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Gerar estrelas iniciais
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const count = 70; // Número de estrelas
      
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5
        });
      }
      
      setStars(newStars);
      starsRef.current = newStars;
    };
    
    generateStars();
    
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Animar estrelas e conexões
  useEffect(() => {
    if (stars.length === 0) return;
    
    const animate = () => {
      const mouseXValue = mouseX.get();
      const mouseYValue = mouseY.get();
      const mousePosition = {
        x: window.innerWidth / 2 + mouseXValue,
        y: window.innerHeight / 2 + mouseYValue
      };
      
      // Atualizar posições das estrelas
      const updatedStars = starsRef.current.map(star => {
        let newX = star.x + star.speedX;
        let newY = star.y + star.speedY;
        
        // Verificar limites
        if (newX > window.innerWidth) newX = 0;
        if (newX < 0) newX = window.innerWidth;
        if (newY > window.innerHeight) newY = 0;
        if (newY < 0) newY = window.innerHeight;
        
        // Interação com o mouse
        const dx = newX - mousePosition.x;
        const dy = newY - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance * 0.5;
          const directionX = dx / distance || 0;
          const directionY = dy / distance || 0;
          newX += directionX * force;
          newY += directionY * force;
        }
        
        return {
          ...star,
          x: newX,
          y: newY
        };
      });
      
      // Calcular conexões
      const newConnections: Connection[] = [];
      for (let i = 0; i < updatedStars.length; i++) {
        for (let j = i + 1; j < updatedStars.length; j++) {
          const star1 = updatedStars[i];
          const star2 = updatedStars[j];
          const dx = star1.x - star2.x;
          const dy = star1.y - star2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = 0.3 - distance / 333;
            if (opacity > 0) {
              newConnections.push({
                id: `${star1.id}-${star2.id}`,
                x1: star1.x,
                y1: star1.y,
                x2: star2.x,
                y2: star2.y,
                opacity
              });
            }
          }
        }
      }
      
      starsRef.current = updatedStars;
      setStars(updatedStars);
      setConnections(newConnections);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [stars.length, mouseX, mouseY]);
  
  return (
    <div className="fixed inset-0 -z-10 transition-colors duration-300 bg-gradient-to-br from-gray-900 to-purple-900/30">
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--duration": `${star.duration}s`
            } as React.CSSProperties}
          />
        ))}
        
        {connections.map(connection => {
          const dx = connection.x2 - connection.x1;
          const dy = connection.y2 - connection.y1;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * 180 / Math.PI;
          
          return (
            <div
              key={connection.id}
              className="connection"
              style={{
                left: `${connection.x1}px`,
                top: `${connection.y1}px`,
                width: `${distance}px`,
                transform: `rotate(${angle}deg)`,
                "--connection-opacity": connection.opacity
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ParticlesBackground;
