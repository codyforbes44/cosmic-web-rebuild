import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchWeatherData, WeatherResponse } from "@/components/footer/weather/WeatherService";
import { supabase } from "@/integrations/supabase/client";
import { isDay } from "@/utils/weatherUtils";

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
        console.log('WeatherPageProvider: Weather data loaded for location:', data.current.location);
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
    console.log('WeatherPageProvider: Location change requested:', newLocation);
    setCurrentLocation(newLocation);
    // Force refresh when location changes manually
    loadWeatherData(newLocation, true);
  };

  const handleUnitsChange = (newUnits: 'imperial' | 'metric') => {
    console.log('WeatherPageProvider: Units changed to:', newUnits);
    setUnits(newUnits);
  };

  useEffect(() => {
    // Initial load with location detection
    console.log('WeatherPageProvider: Initial weather data load');
    loadWeatherData(undefined, true);
  }, []);

  useEffect(() => {
    // Force refresh when units change
    console.log('WeatherPageProvider: Reloading due to units change:', units);
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
