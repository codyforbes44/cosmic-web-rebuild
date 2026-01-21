import { useState, useEffect, useCallback } from 'react';

// Breakpoints (matching Tailwind defaults)
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
}

/**
 * SSR-safe device detection hook with tablet support
 * Uses matchMedia for efficient resize detection
 */
export function useDevice(): DeviceState {
  // SSR-safe initial state - default to desktop to avoid layout shift
  const [state, setState] = useState<DeviceState>(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') {
      return { isMobile: false, isTablet: false, isDesktop: true, width: 1024 };
    }
    
    const width = window.innerWidth;
    return {
      isMobile: width < MOBILE_BREAKPOINT,
      isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
      isDesktop: width >= TABLET_BREAKPOINT,
      width,
    };
  });

  useEffect(() => {
    // Skip on server
    if (typeof window === 'undefined') return;

    // Use matchMedia for more efficient event handling
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const tabletQuery = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`);
    const desktopQuery = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`);

    const updateState = () => {
      const width = window.innerWidth;
      setState({
        isMobile: mobileQuery.matches,
        isTablet: tabletQuery.matches,
        isDesktop: desktopQuery.matches,
        width,
      });
    };

    // Initial update
    updateState();

    // Add listeners
    mobileQuery.addEventListener('change', updateState);
    tabletQuery.addEventListener('change', updateState);
    desktopQuery.addEventListener('change', updateState);

    return () => {
      mobileQuery.removeEventListener('change', updateState);
      tabletQuery.removeEventListener('change', updateState);
      desktopQuery.removeEventListener('change', updateState);
    };
  }, []);

  return state;
}

/**
 * Simple mobile detection hook (backwards compatible)
 * SSR-safe with proper hydration handling
 */
export function useIsMobile(): boolean {
  const { isMobile } = useDevice();
  return isMobile;
}

/**
 * Tablet detection hook
 */
export function useIsTablet(): boolean {
  const { isTablet } = useDevice();
  return isTablet;
}

/**
 * Desktop detection hook
 */
export function useIsDesktop(): boolean {
  const { isDesktop } = useDevice();
  return isDesktop;
}

/**
 * Returns true for mobile and tablet (non-desktop)
 */
export function useIsTouchDevice(): boolean {
  const { isMobile, isTablet } = useDevice();
  return isMobile || isTablet;
}
