
/**
 * Geolocation functionality for visitor metadata
 */

import type { GeoData } from './types.ts';

// Enhanced geolocation with error handling
export const getGeoData = async (clientIp: string): Promise<GeoData> => {
  let geoData: GeoData = { country: null, region: null, city: null };
  
  // Skip geolocation for localhost/private IPs
  if (clientIp !== 'unknown' && !clientIp.match(/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.|::1|localhost)/)) {
    try {
      console.log(`Fetching geolocation data for IP: ${clientIp}`);
      
      // Use a more reliable geolocation service with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'VisitorTracker/1.0'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (geoResponse.ok) {
        const geoInfo = await geoResponse.json();
        
        if (geoInfo.error) {
          console.warn(`Geolocation API error: ${geoInfo.reason}`);
        } else {
          geoData = {
            country: geoInfo.country_name?.slice(0, 100) || null,
            region: geoInfo.region?.slice(0, 100) || null,
            city: geoInfo.city?.slice(0, 100) || null,
          };
          console.log(`Located IP ${clientIp} to ${geoInfo.city}, ${geoInfo.country_name}`);
        }
      } else {
        console.warn(`Geolocation API responded with status: ${geoResponse.status}`);
      }
    } catch (geoError) {
      if (geoError.name === 'AbortError') {
        console.warn('Geolocation request timed out');
      } else {
        console.error('Error fetching geolocation data:', geoError);
      }
    }
  }
  
  return geoData;
};
