
interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  try {
    // Use OpenWeatherMap's reverse geocoding API
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
    console.log('Reverse geocoding failed:', err);
  }
  
  return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
};

const getCurrentPositionPromise = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // Cache position for 5 minutes
      }
    );
  });
};

export const fetchLocation = async (): Promise<string> => {
  let userLocation: string | null = null;
  
  // First attempt: Browser Geolocation API (most accurate)
  try {
    console.log('LocationService: Attempting to get precise location...');
    const position = await getCurrentPositionPromise();
    const { latitude, longitude } = position.coords;
    
    console.log('LocationService: Got coordinates:', { latitude, longitude });
    userLocation = await reverseGeocode(latitude, longitude);
    console.log('LocationService: Got location from GPS:', userLocation);
    
    if (userLocation) return userLocation;
  } catch (err) {
    console.log('LocationService: GPS location failed:', err.message);
  }
  
  // Second attempt: ipapi.co (same service used by visitor tracking)
  try {
    console.log('LocationService: Trying IP-based location...');
    const geoResponse = await fetch('https://ipapi.co/json/');
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      // Use city, state format for better weather API results
      userLocation = geoData.region ? `${geoData.city}, ${geoData.region}` : geoData.city;
      console.log('LocationService: Got location from ipapi.co:', userLocation);
      
      if (userLocation && userLocation !== 'undefined, undefined') return userLocation;
    }
  } catch (err) {
    console.log('LocationService: Primary IP service failed:', err);
  }

  // Third attempt: alternative geo API if first one fails
  try {
    console.log('LocationService: Trying backup IP service...');
    const backupGeoResponse = await fetch('https://geolocation-db.com/json/');
    if (backupGeoResponse.ok) {
      const backupGeoData = await backupGeoResponse.json();
      userLocation = backupGeoData.state ? `${backupGeoData.city}, ${backupGeoData.state}` : backupGeoData.city;
      console.log('LocationService: Got location from backup service:', userLocation);
      
      if (userLocation && userLocation !== 'undefined, undefined') return userLocation;
    }
  } catch (err) {
    console.log('LocationService: Secondary IP service failed:', err);
  }
  
  // If all attempts fail, use a default city
  const finalLocation = userLocation || 'Irving, TX';
  console.log('LocationService: Final location (using fallback):', finalLocation);
  return finalLocation;
};
