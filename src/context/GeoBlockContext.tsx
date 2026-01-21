import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FEATURES } from '@/config/environment';

interface GeoBlockState {
  isLoading: boolean;
  isAllowed: boolean;
  country: string | null;
  countryCode: string | null;
  city: string | null;
  error: string | null;
}

interface GeoBlockContextType extends GeoBlockState {
  recheckLocation: () => Promise<void>;
}

const GeoBlockContext = createContext<GeoBlockContextType | undefined>(undefined);

const GEO_CHECK_URL = 'https://strixttogzthapdhuczm.supabase.co/functions/v1/geo-check';
const SESSION_STORAGE_KEY = 'geo_block_result';

interface GeoCheckResponse {
  allowed: boolean;
  country: string | null;
  countryCode: string | null;
  region: string | null;
  city: string | null;
  ip: string;
  error?: string;
}

export const GeoBlockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GeoBlockState>({
    isLoading: true,
    isAllowed: true, // Default to allowed while checking
    country: null,
    countryCode: null,
    city: null,
    error: null,
  });

  const checkGeoLocation = async () => {
    // If geo-blocking is disabled, allow all
    if (!FEATURES.enableGeoBlocking) {
      setState({
        isLoading: false,
        isAllowed: true,
        country: null,
        countryCode: null,
        city: null,
        error: null,
      });
      return;
    }

    // Check sessionStorage for cached result
    try {
      const cached = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (cached) {
        const parsedCache = JSON.parse(cached) as GeoBlockState;
        // Use cached result
        setState({
          ...parsedCache,
          isLoading: false,
        });
        return;
      }
    } catch (e) {
      // Ignore parse errors
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(GEO_CHECK_URL, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Geo-check failed with status: ${response.status}`);
      }

      const data: GeoCheckResponse = await response.json();

      const newState: GeoBlockState = {
        isLoading: false,
        isAllowed: data.allowed,
        country: data.country,
        countryCode: data.countryCode,
        city: data.city,
        error: data.error || null,
      };

      // Cache the result in sessionStorage
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        // Ignore storage errors
      }

      setState(newState);

    } catch (error) {
      console.error('Geo-check error:', error);
      
      // On error, allow access (fail-open for better UX)
      setState({
        isLoading: false,
        isAllowed: true,
        country: null,
        countryCode: null,
        city: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  useEffect(() => {
    checkGeoLocation();
  }, []);

  const recheckLocation = async () => {
    // Clear cached result
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      // Ignore
    }
    await checkGeoLocation();
  };

  return (
    <GeoBlockContext.Provider value={{ ...state, recheckLocation }}>
      {children}
    </GeoBlockContext.Provider>
  );
};

export const useGeoBlock = (): GeoBlockContextType => {
  const context = useContext(GeoBlockContext);
  if (context === undefined) {
    throw new Error('useGeoBlock must be used within a GeoBlockProvider');
  }
  return context;
};

export default GeoBlockContext;
