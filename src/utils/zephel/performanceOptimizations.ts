import { useMemo, useCallback } from 'react';

// Memoization utilities for ZEPHEL components
export const useMemoizedQuantumState = (quantumState: any) => {
  return useMemo(() => ({
    intensity: quantumState.coherence,
    phase: quantumState.neural_resonance,
    harmonics: [1, 2, 3, 5, 8]
  }), [quantumState.coherence, quantumState.neural_resonance]);
};

export const useMemoizedInterfaceProps = (
  messages: any[],
  input: string,
  isProcessing: boolean,
  metrics: any,
  userId: string
) => {
  return useMemo(() => ({
    messages,
    input,
    isProcessing,
    metrics,
    userId
  }), [messages, input, isProcessing, metrics, userId]);
};

// Throttle function for high-frequency events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Debounce function for user input
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Custom hook for optimized event handlers
export const useOptimizedHandlers = () => {
  const createThrottledHandler = useCallback((
    handler: (...args: any[]) => void,
    delay: number = 100
  ) => {
    return throttle(handler, delay);
  }, []);

  const createDebouncedHandler = useCallback((
    handler: (...args: any[]) => void,
    delay: number = 300
  ) => {
    return debounce(handler, delay);
  }, []);

  return { createThrottledHandler, createDebouncedHandler };
};