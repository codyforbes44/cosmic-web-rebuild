import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  baseY: number;
  size: number;
  opacity: number;
  blinkDuration: number;
  blinkDelay: number;
  parallaxSpeed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  trail: { x: number; y: number; opacity: number }[];
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);
  const lastShootingStarTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    resizeCanvas();

    function initStars() {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);

      for (let i = 0; i < starCount; i++) {
        const size = Math.random() * 2 + 0.5;
        const parallaxSpeed = 0.02 + (size / 2.5) * 0.08;
        const baseY = Math.random() * canvas.height;
        
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: baseY,
          baseY: baseY,
          size: size,
          opacity: Math.random() * 0.5 + 0.5,
          blinkDuration: 1000 + Math.random() * 5000,
          blinkDelay: Math.random() * 5000,
          parallaxSpeed: parallaxSpeed,
        });
      }
    }

    function createShootingStar() {
      const angle = Math.PI / 4 + (Math.random() * Math.PI / 6); // 45-75 degrees
      const startX = Math.random() * canvas.width * 0.7;
      const startY = Math.random() * canvas.height * 0.4;
      
      shootingStarsRef.current.push({
        x: startX,
        y: startY,
        length: 80 + Math.random() * 60,
        speed: 12 + Math.random() * 8,
        angle: angle,
        opacity: 1,
        trail: [],
      });
    }

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollOffset = scrollYRef.current;

      // Draw static stars with parallax
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        const parallaxY = star.baseY - (scrollOffset * star.parallaxSpeed);
        const wrappedY = ((parallaxY % canvas.height) + canvas.height) % canvas.height;
        
        const normalizedTime = (timestamp % (star.blinkDuration + star.blinkDelay)) / star.blinkDuration;
        const twinkleFactor = normalizedTime < 1 
          ? 0.5 + 0.5 * Math.sin(normalizedTime * Math.PI * 2)
          : 1;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkleFactor})`;
        ctx.arc(star.x, wrappedY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn shooting stars occasionally (every 3-6 seconds)
      if (timestamp - lastShootingStarTime.current > 3000 + Math.random() * 3000) {
        if (shootingStarsRef.current.length < 2) {
          createShootingStar();
          lastShootingStarTime.current = timestamp;
        }
      }

      // Update and draw shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        
        // Add current position to trail
        star.trail.unshift({ x: star.x, y: star.y, opacity: star.opacity });
        
        // Limit trail length
        if (star.trail.length > 20) {
          star.trail.pop();
        }

        // Draw the shooting star trail
        star.trail.forEach((point, index) => {
          const trailOpacity = point.opacity * (1 - index / star.trail.length);
          const trailWidth = (1 - index / star.trail.length) * 2;
          
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity * 0.8})`;
          ctx.arc(point.x, point.y, trailWidth, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw the head with a glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 4);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(150, 180, 255, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Remove if off screen
        return star.x < canvas.width + 100 && star.y < canvas.height + 100;
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    animationFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
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
