
import React from 'react';
import CalendlyModal from './CalendlyModal';
import { useCalendly } from '@/hooks/useCalendly';

export const CalendlyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, close } = useCalendly();
  
  return (
    <>
      {children}
      <CalendlyModal isOpen={isOpen} onClose={close} />
    </>
  );
};
