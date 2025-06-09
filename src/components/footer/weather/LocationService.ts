
export const fetchLocation = async (): Promise<string> => {
  // Try multiple geo-location services
  let userLocation: string | null = null;
  
  // First attempt: ipapi.co (same service used by visitor tracking)
  try {
    const geoResponse = await fetch('https://ipapi.co/json/');
    if (geoResponse.ok) {
      const geoData = await geoResponse.json();
      // Use city, state format for better weather API results
      userLocation = geoData.region ? `${geoData.city}, ${geoData.region}` : geoData.city;
      console.log('LocationService: Got location from ipapi.co:', userLocation);
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
        userLocation = backupGeoData.state ? `${backupGeoData.city}, ${backupGeoData.state}` : backupGeoData.city;
        console.log('LocationService: Got location from backup service:', userLocation);
      }
    } catch (err) {
      console.log('Secondary location service failed:', err);
    }
  }
  
  // If both attempts fail, use a default city
  const finalLocation = userLocation || 'Irving, TX';
  console.log('LocationService: Final location:', finalLocation);
  return finalLocation;
};
