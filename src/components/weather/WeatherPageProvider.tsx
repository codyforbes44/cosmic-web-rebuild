
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchWeatherData, WeatherResponse } from "@/components/footer/weather/WeatherService";
import { supabase } from "@/integrations/supabase/client";

interface WeatherPageContextType {
  weatherData: WeatherResponse | null;
  loading: boolean;
  error: string | null;
  units: 'imperial' | 'metric';
  currentLocation: string;
  handleUnitsChange: (newUnits: 'imperial' | 'metric') => void;
  handleLocationChange: (newLocation: string) => void;
  loadWeatherData: (location?: string, forceRefresh?: boolean) => Promise<void>;
  isDay: boolean;
  user: any | null;
}

const WeatherPageContext = createContext<WeatherPageContextType | undefined>(undefined);

export const useWeatherPage = () => {
  const context = useContext(WeatherPageContext);
  if (!context) {
    throw new Error('useWeatherPage must be used within a WeatherPageProvider');
  }
  return context;
};

interface WeatherPageProviderProps {
  children: ReactNode;
}

export const WeatherPageProvider = ({ children }: WeatherPageProviderProps) => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [user, setUser] = useState<any | null>(null);

  // Helper function to determine if it's day or night
  const isDay = (sunrise: string, sunset: string): boolean => {
    const now = new Date();
    const currentHour = now.getHours();
    
    // Parse sunrise and sunset times (assuming format like "6:45 AM")
    const sunriseHour = parseInt(sunrise.split(':')[0]) + (sunrise.includes('PM') && !sunrise.startsWith('12') ? 12 : 0);
    const sunsetHour = parseInt(sunset.split(':')[0]) + (sunset.includes('PM') && !sunset.startsWith('12') ? 12 : 0);
    
    return currentHour >= sunriseHour && currentHour < sunsetHour;
  };

  // Check for authentication
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    fetchUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loadWeatherData = async (location?: string, forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Clear cache if force refresh is requested
      if (forceRefresh) {
        localStorage.removeItem(`weather_data_${units}`);
        console.log('Weather cache cleared - forcing fresh data fetch');
      }
      
      const data = await fetchWeatherData(units);
      
      if (data) {
        setWeatherData(data);
        setCurrentLocation(data.current.location);
        // Only show demo warning if this is actually demo data
        if (data.current.location === 'Demo City') {
          setError('Unable to fetch real weather data - showing demo data');
        }
      }
    } catch (err) {
      console.error('Weather page error:', err);
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
    // In a real app, you would fetch weather for the new location
    loadWeatherData(newLocation, true);
  };

  const handleUnitsChange = (newUnits: 'imperial' | 'metric') => {
    setUnits(newUnits);
  };

  useEffect(() => {
    // Force refresh on initial load
    loadWeatherData(undefined, true);
  }, []);

  useEffect(() => {
    // Force refresh when units change
    loadWeatherData(undefined, true);
  }, [units]);

  const isDayTime = weatherData ? isDay(
    weatherData.current.sunrise || '6:00 AM', 
    weatherData.current.sunset || '6:00 PM'
  ) : true;

  const value: WeatherPageContextType = {
    weatherData,
    loading,
    error,
    units,
    currentLocation,
    handleUnitsChange,
    handleLocationChange,
    loadWeatherData,
    isDay: isDayTime,
    user
  };

  return (
    <WeatherPageContext.Provider value={value}>
      {children}
    </WeatherPageContext.Provider>
  );
};
