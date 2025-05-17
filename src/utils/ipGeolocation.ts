
/**
 * Utilities for IP address geolocation
 */

/**
 * Get location data from IP address
 * @param ipAddress The IP address to geolocate
 * @returns An object containing country_code, city and state information
 */
export const getLocationDataFromIp = async (ipAddress: string | null): Promise<{ country_code?: string; city?: string; state?: string }> => {
  if (!ipAddress) return {};
  
  try {
    // Use a reliable IP geolocation service
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
    const data = await response.json();
    
    // Check if the API returned an error
    if (data.error) {
      console.error('Error in IP geolocation:', data.reason);
      return {};
    }
    
    return {
      country_code: data.country_code,
      city: data.city,
      state: data.region_code // This field contains state codes (e.g., "CA" for California)
    };
  } catch (err) {
    console.error('Error getting location data:', err);
    return {};
  }
};
