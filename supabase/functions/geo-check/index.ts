import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Allowed country codes for North and South America
const ALLOWED_COUNTRIES = new Set([
  // North America
  'US', 'CA', 'MX', 'GL', // USA, Canada, Mexico, Greenland
  
  // Central America
  'GT', 'BZ', 'SV', 'HN', 'NI', 'CR', 'PA',
  // Guatemala, Belize, El Salvador, Honduras, Nicaragua, Costa Rica, Panama
  
  // Caribbean (North American region)
  'CU', 'JM', 'HT', 'DO', 'PR', 'BS', 'TT', 'BB', 'LC', 'VC', 'GD', 'AG', 'DM', 'KN', 'AW', 'CW', 'SX', 'BQ', 'VI', 'VG', 'AI', 'MS', 'TC', 'KY', 'BM',
  // Cuba, Jamaica, Haiti, Dominican Republic, Puerto Rico, Bahamas, Trinidad & Tobago, Barbados, St. Lucia, St. Vincent, Grenada, Antigua & Barbuda, Dominica, St. Kitts & Nevis, Aruba, Curaçao, Sint Maarten, Caribbean Netherlands, US Virgin Islands, British Virgin Islands, Anguilla, Montserrat, Turks & Caicos, Cayman Islands, Bermuda
  
  // South America
  'BR', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'BO', 'PY', 'UY', 'GY', 'SR', 'GF', 'FK',
  // Brazil, Argentina, Colombia, Peru, Venezuela, Chile, Ecuador, Bolivia, Paraguay, Uruguay, Guyana, Suriname, French Guiana, Falkland Islands
]);

interface GeoResponse {
  allowed: boolean;
  country: string | null;
  countryCode: string | null;
  region: string | null;
  city: string | null;
  ip: string;
  error?: string;
}

// Extract client IP from request headers
const extractClientIp = (req: Request): string => {
  // Check various headers in order of priority
  const headers = [
    'cf-connecting-ip',      // Cloudflare
    'x-real-ip',             // Nginx proxy
    'x-forwarded-for',       // Standard proxy header
    'x-client-ip',           // Some load balancers
    'true-client-ip',        // Akamai
  ];

  for (const header of headers) {
    const value = req.headers.get(header);
    if (value) {
      // x-forwarded-for may contain multiple IPs, take the first one
      const ip = value.split(',')[0].trim();
      if (ip && ip !== 'unknown') {
        return ip;
      }
    }
  }

  return 'unknown';
};

// Check if IP is private/localhost
const isPrivateIp = (ip: string): boolean => {
  return ip === 'unknown' || 
         ip.match(/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.|::1|localhost)/) !== null;
};

// Fetch geolocation data from IP API
const getGeoData = async (clientIp: string): Promise<{
  country: string | null;
  countryCode: string | null;
  region: string | null;
  city: string | null;
}> => {
  try {
    console.log(`Fetching geolocation data for IP: ${clientIp}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'GeoBlocker/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (geoResponse.ok) {
      const geoInfo = await geoResponse.json();
      
      if (geoInfo.error) {
        console.warn(`Geolocation API error: ${geoInfo.reason}`);
        return { country: null, countryCode: null, region: null, city: null };
      }
      
      console.log(`Located IP ${clientIp} to ${geoInfo.city}, ${geoInfo.country_name} (${geoInfo.country_code})`);
      
      return {
        country: geoInfo.country_name || null,
        countryCode: geoInfo.country_code || null,
        region: geoInfo.region || null,
        city: geoInfo.city || null,
      };
    } else {
      console.warn(`Geolocation API responded with status: ${geoResponse.status}`);
      return { country: null, countryCode: null, region: null, city: null };
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('Geolocation request timed out');
    } else {
      console.error('Error fetching geolocation data:', error);
    }
    return { country: null, countryCode: null, region: null, city: null };
  }
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = extractClientIp(req);
    console.log(`Geo-check request from IP: ${clientIp}`);
    
    // Allow private/localhost IPs (development)
    if (isPrivateIp(clientIp)) {
      console.log(`Private/localhost IP detected, allowing access`);
      const response: GeoResponse = {
        allowed: true,
        country: 'Development',
        countryCode: 'DEV',
        region: null,
        city: null,
        ip: clientIp,
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get geolocation data
    const geoData = await getGeoData(clientIp);
    
    // If we couldn't determine location, allow access (fail-open for better UX)
    if (!geoData.countryCode) {
      console.log(`Could not determine location for IP ${clientIp}, allowing access`);
      const response: GeoResponse = {
        allowed: true,
        country: null,
        countryCode: null,
        region: geoData.region,
        city: geoData.city,
        ip: clientIp,
        error: 'Could not determine location',
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if country is in allowed list
    const isAllowed = ALLOWED_COUNTRIES.has(geoData.countryCode);
    
    console.log(`IP ${clientIp} from ${geoData.country} (${geoData.countryCode}) - ${isAllowed ? 'ALLOWED' : 'BLOCKED'}`);
    
    const response: GeoResponse = {
      allowed: isAllowed,
      country: geoData.country,
      countryCode: geoData.countryCode,
      region: geoData.region,
      city: geoData.city,
      ip: clientIp,
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Geo-check error:', error);
    
    // On error, allow access (fail-open)
    const response: GeoResponse = {
      allowed: true,
      country: null,
      countryCode: null,
      region: null,
      city: null,
      ip: 'unknown',
      error: 'Internal server error',
    };
    
    return new Response(JSON.stringify(response), {
      status: 200, // Return 200 even on error to avoid breaking the app
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
