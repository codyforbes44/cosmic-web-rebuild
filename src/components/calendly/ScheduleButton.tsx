
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useCalendly } from '@/hooks/useCalendly';

interface ScheduleButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const ScheduleButton: React.FC<ScheduleButtonProps> = ({ 
  children, 
  onClick,
  ...props 
}) => {
  const { open } = useCalendly();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Call original onClick if provided
    if (onClick) onClick(e);
    open();
  };
  
  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

export default ScheduleButton;
