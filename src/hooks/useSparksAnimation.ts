
import { useState, useEffect } from 'react';

export const useSparksAnimation = () => {
  const [showSparks, setShowSparks] = useState(false);

  useEffect(() => {
    // Always trigger the spark animation on every page load
    // Add small delay before showing sparks for better user experience
    const sparkTimer = setTimeout(() => {
      setShowSparks(true);
    }, 600);
    
    // Auto-hide sparks after animation completes
    const hideTimer = setTimeout(() => {
      setShowSparks(false);
    }, 7500); // Extended to accommodate all animations
    
    return () => {
      clearTimeout(sparkTimer);
      clearTimeout(hideTimer);
    };
  }, []); // Empty dependency array ensures this runs on every mount

  return { showSparks };
};
