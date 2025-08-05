
import { useState, useEffect, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { RefreshCw } from 'lucide-react';
import { fetchWeatherData, WeatherResponse } from './weather/WeatherService';
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
  locationStatus: string;
}

const INITIAL_STATE: WeatherState = {
  data: null,
  loading: true,
  error: null,
  locationStatus: 'Getting your location...'
};

const WeatherWidget = ({ 
  className = "",
  units = 'imperial'
}: WeatherWidgetProps) => {
  const [state, setState] = useState<WeatherState>(INITIAL_STATE);
  const [retryCount, setRetryCount] = useState(0);

  const updateState = useCallback((updates: Partial<WeatherState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const loadWeatherData = useCallback(async () => {
    try {
      updateState({ 
        loading: true, 
        error: null, 
        locationStatus: 'Getting your location...' 
      });
      
      const data = await fetchWeatherData(units);
      
      if (data) {
        let error = null;
        
        if (data.current.location === 'Demo City') {
          error = 'Unable to fetch local weather - showing demo data';
        } else if (data.current.location === 'Irving, TX') {
          error = 'Using default location - allow location access for local weather';
        }
        
        updateState({ 
          data, 
          error, 
          locationStatus: '',
          loading: false 
        });
      }
    } catch (err) {
      console.error('Weather widget error:', err);
      updateState({ 
        error: 'Failed to load weather data',
        locationStatus: '',
        loading: false 
      });
    }
  }, [units, updateState]);

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData, retryCount]);

  const renderLoading = () => (
    <div className="text-gray-400 flex-grow flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full mx-auto mb-2"></div>
        <div>{state.locationStatus}</div>
      </div>
    </div>
  );

  const renderError = () => state.error && (
    <div className="flex justify-between items-center mb-2">
      <WeatherError error={state.error} />
      {state.error.includes('default location') && (
        <button
          onClick={handleRetry}
          className="text-brand-gold hover:text-yellow-300 transition-colors p-1"
          title="Retry location detection"
        >
          <RefreshCw size={14} />
        </button>
      )}
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
