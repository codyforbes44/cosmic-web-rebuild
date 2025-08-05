
interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

interface LocationResponse {
  city?: string;
  region?: string;
  state?: string;
  name?: string;
}

const LOCATION_TIMEOUT = 10000; // 10 seconds
const POSITION_CACHE_TIME = 300000; // 5 minutes

const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=9de243494c0b295cca9337e1e96b00e2`
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        const location = data[0];
        return location.state ? `${location.name}, ${location.state}` : location.name;
      }
    }
  } catch (err) {
    // Silent fail - will return coordinates as fallback
  }
  
  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
};

const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: LOCATION_TIMEOUT,
        maximumAge: POSITION_CACHE_TIME
      }
    );
  });
};

const fetchIPLocation = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const data: LocationResponse = await response.json();
    
    // Validate data quality
    if (!data.city || data.city === 'undefined') return null;
    
    return data.region || data.state 
      ? `${data.city}, ${data.region || data.state}` 
      : data.city;
  } catch {
    return null;
  }
};

export const fetchLocation = async (): Promise<string> => {
  // Try GPS location first
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const location = await reverseGeocode(latitude, longitude);
    
    if (location && !location.includes(',') === false) {
      return location;
    }
  } catch {
    // Continue to IP-based fallbacks
  }
  
  // Try IP-based location services
  const ipServices = [
    'https://ipapi.co/json/',
    'https://geolocation-db.com/json/'
  ];
  
  for (const serviceUrl of ipServices) {
    const location = await fetchIPLocation(serviceUrl);
    if (location) return location;
  }
  
  // Final fallback
  return 'Irving, TX';
};
