
import { useState, useEffect } from 'react';

export const useSparksAnimation = () => {
  const [showSparks, setShowSparks] = useState(false);

  useEffect(() => {
    // Check if user has seen the spark animation in this session
    const hasSeenSparks = sessionStorage.getItem('hasSeenSparks');
    if (!hasSeenSparks) {
      // Add small delay before showing sparks for better user experience
      const sparkTimer = setTimeout(() => {
        setShowSparks(true);
        sessionStorage.setItem('hasSeenSparks', 'true');
      }, 600);
      
      // Auto-hide sparks after animation completes
      const hideTimer = setTimeout(() => {
        setShowSparks(false);
      }, 7500); // Extended to accommodate all animations
      
      return () => {
        clearTimeout(sparkTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return { showSparks };
};
