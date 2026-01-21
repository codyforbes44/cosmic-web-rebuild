
import { useState, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { RefreshCw, Cloud, Search } from 'lucide-react';
import { fetchWeatherData, WeatherResponse } from './weather/WeatherService';
import { fetchLocation } from './weather/LocationService';
import CurrentWeather from './weather/CurrentWeather';
import WeatherForecast from './weather/WeatherForecast';
import WeatherError from './weather/WeatherError';

interface WeatherWidgetProps {
  className?: string;
  units?: 'imperial' | 'metric';
}

interface WeatherState {
  data: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: WeatherState = {
  data: null,
  loading: true,
  error: null
};

const WeatherWidget = ({ 
  className = "",
  units = 'imperial'
}: WeatherWidgetProps) => {
  const [state, setState] = useState<WeatherState>(INITIAL_STATE);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  const updateState = useCallback((updates: Partial<WeatherState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const loadWeatherForLocation = useCallback(async (location: string) => {
    try {
      updateState({ loading: true, error: null });
      const data = await fetchWeatherData(units, location);
      
      if (data) {
        setCurrentLocation(location);
        updateState({ data, error: null, loading: false });
      }
    } catch (err) {
      console.error('Weather widget error:', err);
      updateState({ error: 'City not found', loading: false });
    }
  }, [units, updateState]);

  const loadDefaultWeather = useCallback(async () => {
    try {
      updateState({ loading: true, error: null });
      const location = await fetchLocation();
      const data = await fetchWeatherData(units, location);
      
      if (data) {
        setCurrentLocation(location);
        updateState({ data, error: null, loading: false });
      }
    } catch (err) {
      console.error('Weather widget error:', err);
      updateState({ error: 'Failed to load weather data', loading: false });
    }
  }, [units, updateState]);

  const handleSearch = useCallback(() => {
    const trimmed = searchQuery.trim();
    if (trimmed.length >= 2) {
      loadWeatherForLocation(trimmed);
      setSearchQuery('');
    }
  }, [searchQuery, loadWeatherForLocation]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  useEffect(() => {
    loadDefaultWeather();
  }, [loadDefaultWeather]);

  const renderLoading = () => (
    <div className="text-muted-foreground flex-grow flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="relative mx-auto w-10 h-10">
          <div className="absolute inset-0 animate-spin w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full"></div>
          <Cloud className="absolute inset-0 m-auto w-5 h-5 text-primary animate-pulse" />
        </div>
        <div className="text-sm font-medium">Loading weather...</div>
      </div>
    </div>
  );

  const renderSearchBar = () => (
    <div className="flex gap-2 mb-3">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search city..."
        className="flex-1 px-3 py-1.5 text-sm bg-background/50 border border-border/50 rounded-md 
                   placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/50
                   text-foreground"
        maxLength={100}
      />
      <button
        onClick={handleSearch}
        disabled={searchQuery.trim().length < 2}
        className="px-2.5 py-1.5 bg-primary/20 hover:bg-primary/30 disabled:opacity-50 
                   disabled:cursor-not-allowed rounded-md transition-colors"
        title="Search city"
      >
        <Search size={14} className="text-primary" />
      </button>
    </div>
  );

  const renderError = () => state.error && (
    <div className="flex justify-between items-center mb-2">
      <WeatherError error={state.error} />
      <button
        onClick={loadDefaultWeather}
        className="text-brand-gold hover:text-yellow-300 transition-colors p-1"
        title="Retry weather"
      >
        <RefreshCw size={14} />
      </button>
    </div>
  );

  const renderWeatherContent = () => state.data && (
    <>
      <CurrentWeather 
        weatherData={state.data.current} 
        units={units} 
        hasTitle={false}
      />
      <WeatherForecast 
        forecast={state.data.forecast} 
        units={units}
      />
    </>
  );

  return (
    <div className={cn(
      "bg-space-deep-blue/40 backdrop-blur-sm p-6 rounded-lg border border-brand-gold/20 h-full flex flex-col", 
      className
    )}>
      {renderSearchBar()}
      {state.loading ? renderLoading() : (
        <>
          {renderError()}
          {renderWeatherContent()}
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
