import React, { useState, useEffect } from 'react';
import StarBackground from '@/components/StarBackground';
import { ZephelInterface } from '@/components/zephel/ZephelInterface';
import { useZephelSounds } from '@/hooks/useZephelSounds';

const U2014 = () => {
  const [matrixEffects, setMatrixEffects] = useState(false);
  const { playSystemBoot } = useZephelSounds();

  // Initialize system with matrix effects
  useEffect(() => {
    playSystemBoot();
    setMatrixEffects(true);
    setTimeout(() => setMatrixEffects(false), 5000);
  }, [playSystemBoot]);

  return (
    <div className="min-h-screen relative bg-space-dark-blue">
      <StarBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <ZephelInterface userId="architect_001" />
        </div>
      </div>
    </div>
  );
};

export default U2014;