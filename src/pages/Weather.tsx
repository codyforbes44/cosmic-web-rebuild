import React, { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, MapPin, Settings } from "lucide-react";
import { fetchWeatherData, WeatherResponse } from "@/components/footer/weather/WeatherService";
import CurrentWeatherDetails from "@/components/weather/CurrentWeatherDetails";
import ExtendedForecast from "@/components/weather/ExtendedForecast";
import HourlyForecast from "@/components/weather/HourlyForecast";
import WeatherMaps from "@/components/weather/WeatherMaps";
import WeatherAlerts from "@/components/weather/WeatherAlerts";
import WeatherSettings from "@/components/weather/WeatherSettings";
import { useIsMobile } from "@/hooks/use-mobile";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'imperial' | 'metric'>('imperial');
  const [refreshing, setRefreshing] = useState(false);
  const isMobile = useIsMobile();

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchWeatherData(units);
      
      if (data) {
        setWeatherData(data);
        if (data.current.location === 'Demo City') {
          setError('Unable to fetch local weather - showing demo data');
        }
      }
    } catch (err) {
      console.error('Weather page error:', err);
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
  }, [units]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadWeatherData();
  };

  const handleUnitsChange = (newUnits: 'imperial' | 'metric') => {
    setUnits(newUnits);
  };

  if (loading) {
    return (
      <>
        <SEO
          title="Weather | ƷBI"
          description="Comprehensive weather information and forecasts"
          keywords="weather, forecast, current conditions, temperature"
        />
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-space-dark-blue to-space-deep-blue py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-center items-center h-32 md:h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="text-white text-sm md:text-base">Loading weather data...</p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Weather | ƷBI"
        description="Comprehensive weather information and forecasts for your location"
        keywords="weather, forecast, current conditions, temperature, humidity, wind"
      />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-space-dark-blue to-space-deep-blue py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <BreadcrumbNav currentPageLabel="Weather" />
          
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Weather Center</h1>
                <p className="text-gray-400 flex items-center gap-2 text-sm md:text-base">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  Complete weather information for your location
                </p>
              </div>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>

          {error && (
            <Card className="bg-card/20 backdrop-blur-sm border-amber-500/50 mb-6">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex items-center gap-2 text-amber-300">
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm md:text-base">{error}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {weatherData && (
            <Tabs defaultValue="current" className="space-y-6">
              <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-5'} bg-space-deep-blue/50 border border-white/10`}>
                <TabsTrigger 
                  value="current" 
                  className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
                >
                  Current
                </TabsTrigger>
                <TabsTrigger 
                  value="hourly" 
                  className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
                >
                  Hourly
                </TabsTrigger>
                <TabsTrigger 
                  value="forecast" 
                  className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
                >
                  {isMobile ? '7-Day' : '7-Day'}
                </TabsTrigger>
                {!isMobile && (
                  <>
                    <TabsTrigger 
                      value="maps" 
                      className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
                    >
                      Maps
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      className="data-[state=active]:bg-brand-gold data-[state=active]:text-black text-xs md:text-sm"
                    >
                      Settings
                    </TabsTrigger>
                  </>
                )}
              </TabsList>

              {/* Mobile-specific tabs for maps and settings */}
              {isMobile && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                    onClick={() => {
                      const tabsList = document.querySelector('[role="tablist"]');
                      const mapsTab = document.querySelector('[value="maps"]');
                      if (tabsList && mapsTab) {
                        (mapsTab as HTMLElement).click();
                      }
                    }}
                  >
                    Maps
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
                    onClick={() => {
                      const tabsList = document.querySelector('[role="tablist"]');
                      const settingsTab = document.querySelector('[value="settings"]');
                      if (tabsList && settingsTab) {
                        (settingsTab as HTMLElement).click();
                      }
                    }}
                  >
                    Settings
                  </Button>
                </div>
              )}

              <TabsContent value="current">
                <CurrentWeatherDetails weatherData={weatherData.current} units={units} />
              </TabsContent>

              <TabsContent value="hourly">
                <HourlyForecast units={units} location={weatherData.current.location} />
              </TabsContent>

              <TabsContent value="forecast">
                <ExtendedForecast forecast={weatherData.forecast} units={units} />
              </TabsContent>

              <TabsContent value="maps">
                <WeatherMaps location={weatherData.current.location} />
              </TabsContent>

              <TabsContent value="settings">
                <WeatherSettings 
                  currentUnits={units} 
                  onUnitsChange={handleUnitsChange}
                  location={weatherData.current.location}
                />
              </TabsContent>
            </Tabs>
          )}

          <WeatherAlerts />
        </div>
      </main>
    </>
  );
};

export default Weather;
