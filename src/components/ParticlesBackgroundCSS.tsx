import { useEffect, useState } from "react";
import "./ParticlesBackgroundCSS.css";

const ParticlesBackgroundCSS = () => {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);
  
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const count = 100;
      
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 3 + 2
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
    
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 transition-colors duration-300 bg-gradient-to-br from-gray-900 to-purple-900/30">
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--duration": `${star.duration}s`
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticlesBackgroundCSS; 