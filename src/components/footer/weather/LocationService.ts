
export const fetchLocation = async (): Promise<string> => {
  // Try multiple geo-location services
  let userLocation: string | null = null;
  
  // First attempt: ipapi.co
  try {
    const geoResponse = await fetch('https://ipapi.co/json/');
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      userLocation = geoData.city;
    }
  } catch (err) {
    console.log('Primary location service failed:', err);
  }

  // Second attempt: alternative geo API if first one fails
  if (!userLocation) {
    try {
      const backupGeoResponse = await fetch('https://geolocation-db.com/json/');
      if (backupGeoResponse.ok) {
        const backupGeoData = await backupGeoResponse.json();
        userLocation = backupGeoData.city;
      }
    } catch (err) {
      console.log('Secondary location service failed:', err);
    }
  }
  
  // If both attempts fail, use a default city
  return userLocation || 'New York';
};
