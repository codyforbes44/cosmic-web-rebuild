
export const processAirQualityData = (data: any) => {
  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;
  
  const getAQILevel = (aqi: number) => {
    if (aqi === 1) return 'Good';
    if (aqi === 2) return 'Fair';
    if (aqi === 3) return 'Moderate';
    if (aqi === 4) return 'Poor';
    return 'Very Poor';
  };
  
  const getHealthRecommendations = (aqi: number) => {
    if (aqi <= 2) return ['Air quality is good', 'Perfect for outdoor activities'];
    if (aqi === 3) return ['Moderate air quality', 'Sensitive individuals should limit outdoor exposure'];
    return ['Poor air quality', 'Limit outdoor activities', 'Consider wearing a mask outdoors'];
  };
  
  return {
    aqi: aqi * 50, // Convert to 0-300 scale
    level: getAQILevel(aqi),
    pollutants: {
      pm25: Math.round(components.pm2_5 || 0),
      pm10: Math.round(components.pm10 || 0),
      o3: Math.round(components.o3 || 0),
      no2: Math.round(components.no2 || 0),
      so2: Math.round(components.so2 || 0),
      co: Math.round(components.co || 0)
    },
    healthRecommendations: getHealthRecommendations(aqi)
  };
};

export const fetchAirQuality = async (lat: number, lon: number) => {
  try {
    const airQualityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=9de243494c0b295cca9337e1e96b00e2`
    );
    
    if (airQualityResponse.ok) {
      const airQualityResult = await airQualityResponse.json();
      return processAirQualityData(airQualityResult);
    }
  } catch (err) {
    console.warn('Air quality data unavailable:', err);
  }
  return null;
};
