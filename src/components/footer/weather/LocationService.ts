
export const fetchLocation = async (): Promise<string> => {
  // Try multiple geo-location services for better precision
  let userLocation: string | null = null;
  
  // First attempt: ipapi.co (most precise service)
  try {
    const geoResponse = await fetch('https://ipapi.co/json/');
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      
      if (!geoData.error) {
        // Use more precise location format: City, State/Region, Country
        const locationParts = [];
        if (geoData.city) locationParts.push(geoData.city);
        if (geoData.region) locationParts.push(geoData.region);
        if (geoData.country_name && geoData.country_name !== geoData.region) {
          locationParts.push(geoData.country_name);
        }
        
        userLocation = locationParts.join(', ');
        console.log('LocationService: Precise location from ipapi.co:', userLocation);
        console.log('LocationService: Additional details:', {
          postal: geoData.postal,
          latitude: geoData.latitude,
          longitude: geoData.longitude,
          timezone: geoData.timezone,
          org: geoData.org
        });
      }
    }
  } catch (err) {
    console.log('Primary location service failed:', err);
  }

  // Second attempt: alternative service with different precision
  if (!userLocation) {
    try {
      const backupGeoResponse = await fetch('https://geolocation-db.com/json/');
      if (backupGeoResponse.ok) {
        const backupGeoData = await backupGeoResponse.json();
        
        const locationParts = [];
        if (backupGeoData.city) locationParts.push(backupGeoData.city);
        if (backupGeoData.state) locationParts.push(backupGeoData.state);
        if (backupGeoData.country_name && backupGeoData.country_name !== backupGeoData.state) {
          locationParts.push(backupGeoData.country_name);
        }
        
        userLocation = locationParts.join(', ');
        console.log('LocationService: Backup location:', userLocation);
      }
    } catch (err) {
      console.log('Secondary location service failed:', err);
    }
  }
  
  // If both attempts fail, use a default city
  const finalLocation = userLocation || 'Irving, TX, United States';
  console.log('LocationService: Final precise location:', finalLocation);
  return finalLocation;
};

// New function to get browser geolocation for even more precision
export const getBrowserLocation = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocode the coordinates for a precise address
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=9de243494c0b295cca9337e1e96b00e2`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              const location = data[0];
              const locationParts = [];
              
              if (location.name) locationParts.push(location.name);
              if (location.state) locationParts.push(location.state);
              if (location.country) locationParts.push(location.country);
              
              const preciseLocation = locationParts.join(', ');
              console.log('LocationService: Browser geolocation result:', preciseLocation);
              resolve(preciseLocation);
              return;
            }
          }
          
          // Fallback to coordinates if reverse geocoding fails
          resolve(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } catch (err) {
          console.error('Reverse geocoding failed:', err);
          resolve(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
      },
      (error) => {
        console.error('Browser geolocation failed:', error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};
