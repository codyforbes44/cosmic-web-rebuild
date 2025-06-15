import React, { useState, useEffect } from 'react';
import { useZephelSounds } from '@/hooks/useZephelSounds';

interface ZephelInitializerProps {
  children: React.ReactNode;
  onMatrixEffectsChange?: (active: boolean) => void;
}

export const ZephelInitializer: React.FC<ZephelInitializerProps> = ({ 
  children, 
  onMatrixEffectsChange 
}) => {
  const [matrixEffects, setMatrixEffects] = useState(false);
  const { playSystemBoot } = useZephelSounds();

  // Initialize system with matrix effects
  useEffect(() => {
    playSystemBoot();
    setMatrixEffects(true);
    
    const timeout = setTimeout(() => {
      setMatrixEffects(false);
      onMatrixEffectsChange?.(false);
    }, 5000);

    onMatrixEffectsChange?.(true);

    return () => clearTimeout(timeout);
  }, [playSystemBoot, onMatrixEffectsChange]);

  return <>{children}</>;
};