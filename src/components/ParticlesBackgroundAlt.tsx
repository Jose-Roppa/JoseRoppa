import { useEffect, useState } from "react";
import { MotionValue } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
}

interface ParticlesBackgroundAltProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const ParticlesBackgroundAlt = ({ mouseX, mouseY }: ParticlesBackgroundAltProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  
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
  
  // Criar partículas
  useEffect(() => {
    const newParticles: Particle[] = [];
    const count = 50;
    
    // Cores baseadas no tema
    const colors = isDarkMode 
      ? ["rgba(139, 92, 246, 0.7)", "rgba(217, 70, 239, 0.7)"] // Roxo e rosa para dark mode
      : ["rgba(236, 72, 153, 0.7)", "rgba(244, 114, 182, 0.7)"]; // Rosa para light mode
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
      });
    }
    
    setParticles(newParticles);
  }, [isDarkMode]);
  
  // Animar partículas
  useEffect(() => {
    if (particles.length === 0) return;
    
    const animateParticles = () => {
      const mouseXValue = mouseX.get();
      const mouseYValue = mouseY.get();
      
      setParticles(prevParticles => 
        prevParticles.map(p => {
          // Mover partícula
          let newX = p.x + p.vx;
          let newY = p.y + p.vy;
          
          // Verificar limites
          if (newX > window.innerWidth) newX = 0;
          if (newX < 0) newX = window.innerWidth;
          if (newY > window.innerHeight) newY = 0;
          if (newY < 0) newY = window.innerHeight;
          
          // Interação com o mouse
          const dx = newX - (window.innerWidth / 2 + mouseXValue);
          const dy = newY - (window.innerHeight / 2 + mouseYValue);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;
          
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const directionX = dx / distance || 0;
            const directionY = dy / distance || 0;
            newX += directionX * force * 2;
            newY += directionY * force * 2;
          }
          
          return {
            ...p,
            x: newX,
            y: newY
          };
        })
      );
    };
    
    const intervalId = setInterval(animateParticles, 30);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [particles, mouseX, mouseY]);
  
  // Calcular linhas entre partículas
  const lines = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const opacity = 0.2 - distance / 500;
        if (opacity > 0) {
          lines.push({
            id: `${p1.id}-${p2.id}`,
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            color: isDarkMode
              ? `rgba(139, 92, 246, ${opacity})`
              : `rgba(236, 72, 153, ${opacity})`
          });
        }
      }
    }
  }
  
  return (
    <div className="fixed inset-0 -z-10 transition-colors duration-300 light:bg-gradient-to-br light:from-white light:to-pink-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-purple-900/30">
      <svg className="absolute inset-0 w-full h-full">
        {/* Linhas entre partículas */}
        {lines.map(line => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth="1"
          />
        ))}
        
        {/* Partículas */}
        {particles.map(particle => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
          />
        ))}
      </svg>
    </div>
  );
};

export default ParticlesBackgroundAlt; 