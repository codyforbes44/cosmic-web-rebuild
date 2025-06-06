
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on location change
  if (isOpen && location) {
    setIsOpen(false);
  }

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  return {
    isOpen,
    toggle,
    close,
    open
  };
}
