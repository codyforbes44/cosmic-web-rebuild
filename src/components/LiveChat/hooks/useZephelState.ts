
import { useState, useCallback } from 'react';

export interface ZephelState {
  isActive: boolean;
  mode: string;
  lastActivated: Date | null;
}

export const useZephelState = () => {
  const [zephelState, setZephelState] = useState<ZephelState>({
    isActive: false,
    mode: 'dormant',
    lastActivated: null
  });

  const activateZephel = useCallback(() => {
    setZephelState({
      isActive: true,
      mode: 'ZEPHEL.CORE.ACTIVE',
      lastActivated: new Date()
    });
  }, []);

  const deactivateZephel = useCallback(() => {
    setZephelState({
      isActive: false,
      mode: 'dormant',
      lastActivated: null
    });
  }, []);

  const checkActivationCode = useCallback((message: string): boolean => {
    return message.trim() === '90812';
  }, []);

  return {
    zephelState,
    activateZephel,
    deactivateZephel,
    checkActivationCode
  };
};
