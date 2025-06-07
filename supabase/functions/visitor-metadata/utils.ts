
/**
 * Utility functions for visitor metadata processing
 */

// Helper to create standardized response
export const createResponse = (body: unknown, status: number) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
  
  return new Response(
    JSON.stringify(body),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status 
    }
  );
};

// Extract IP from request headers with fallback
export const extractClientIp = (req: Request): string => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  return forwardedFor?.split(',')[0]?.trim() || realIP || 'unknown';
};
