import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  baseY: number; // Original Y position for parallax calculation
  size: number;
  opacity: number;
  blinkDuration: number;
  blinkDelay: number;
  parallaxSpeed: number; // Different speeds for parallax layers
}

const StarBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);

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

    // Track scroll position
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    resizeCanvas();

    // Create stars with parallax layers
    function initStars() {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);

      for (let i = 0; i < starCount; i++) {
        // Assign stars to different parallax layers based on size
        // Smaller/dimmer stars move slower (background), larger stars move faster (foreground)
        const size = Math.random() * 2 + 0.5;
        const parallaxSpeed = 0.02 + (size / 2.5) * 0.08; // Range: 0.02 to 0.1
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

    // Draw animation with parallax
    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollOffset = scrollYRef.current;

      // Draw each star with parallax offset
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        
        // Calculate parallax Y position
        const parallaxY = star.baseY - (scrollOffset * star.parallaxSpeed);
        // Wrap stars that go off screen
        const wrappedY = ((parallaxY % canvas.height) + canvas.height) % canvas.height;
        
        // Calculate opacity based on time for twinkling effect
        const normalizedTime = (timestamp % (star.blinkDuration + star.blinkDelay)) / star.blinkDuration;
        const twinkleFactor = normalizedTime < 1 
          ? 0.5 + 0.5 * Math.sin(normalizedTime * Math.PI * 2)
          : 1;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkleFactor})`;
        ctx.arc(star.x, wrappedY, star.size, 0, Math.PI * 2);
        ctx.fill();
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
