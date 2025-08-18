import { useState, useEffect } from 'react';

export const useCelebrationEffect = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationComplete, setCelebrationComplete] = useState(false);

  useEffect(() => {
    // Only show celebration on initial page load
    const hasShownCelebration = sessionStorage.getItem('celebration-shown');
    
    if (!hasShownCelebration) {
      // Mark as shown for this session
      sessionStorage.setItem('celebration-shown', 'true');
      
      // Start celebration immediately
      setShowCelebration(true);
      
      // Hide celebration and mark complete after 2 seconds
      const timer = setTimeout(() => {
        setShowCelebration(false);
        setCelebrationComplete(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      // Skip celebration if already shown this session
      setCelebrationComplete(true);
    }
  }, []);

  return { showCelebration, celebrationComplete };
};