
interface LocationResponse {
  city?: string;
  region?: string;
  state?: string;
}

export const fetchLocation = async (): Promise<string> => {
  // Try IP-based location (no GPS permission required)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data: LocationResponse = await response.json();
      if (data.city && data.city !== 'undefined') {
        return data.region || data.state 
          ? `${data.city}, ${data.region || data.state}` 
          : data.city;
      }
    }
  } catch {
    // Silent fail - use default
  }
  
  return 'Irving, TX';
};
