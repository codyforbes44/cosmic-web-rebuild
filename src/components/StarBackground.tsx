
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  blinkDuration: number;
  blinkDelay: number;
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full width/height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create stars
    function initStars() {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000); // Adjust density

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          blinkDuration: 1000 + Math.random() * 5000, // Random duration
          blinkDelay: Math.random() * 5000, // Random delay
        });
      }
    }

    // Draw animation
    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw each star
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        
        // Calculate opacity based on time for twinkling effect
        const normalizedTime = (timestamp % (star.blinkDuration + star.blinkDelay)) / star.blinkDuration;
        const twinkleFactor = normalizedTime < 1 
          ? 0.5 + 0.5 * Math.sin(normalizedTime * Math.PI * 2)
          : 1;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkleFactor})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default StarBackground;
