import { useState, useEffect } from 'react';

const DebugInfo = () => {
  const [theme, setTheme] = useState('');
  const [canvasInfo, setCanvasInfo] = useState('');
  
  useEffect(() => {
    // Verificar o tema
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    
    // Verificar o canvas
    const checkCanvas = () => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        setCanvasInfo(`Canvas: ${canvas.width}x${canvas.height}`);
      } else {
        setCanvasInfo('Canvas não encontrado');
      }
    };
    
    checkTheme();
    checkCanvas();
    
    // Observar mudanças no tema
    const observer = new MutationObserver(() => {
      checkTheme();
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Verificar periodicamente o canvas
    const interval = setInterval(checkCanvas, 2000);
    
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/70 text-white p-2 rounded-md text-xs z-50">
      <div>Tema: {theme}</div>
      <div>{canvasInfo}</div>
    </div>
  );
};

export default DebugInfo; 