
/**
 * Utility functions for handling subdomain routing
 */

/**
 * Extracts the subdomain from the current hostname
 * @returns The subdomain or null if on the main domain
 */
export function getSubdomain(): string | null {
  // In development, use localhost testing approach
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Check for subdomain simulation in local storage
    const simulatedSubdomain = localStorage.getItem('simulatedSubdomain');
    if (simulatedSubdomain) return simulatedSubdomain;
    
    // Allow testing subdomains with a URL parameter in development
    const urlParams = new URLSearchParams(window.location.search);
    const subdomainParam = urlParams.get('subdomain');
    if (subdomainParam) return subdomainParam;
    
    return null;
  }

  // Production subdomain handling
  const hostParts = window.location.hostname.split('.');
  
  // If we have enough parts for a subdomain (e.g., cpn.example.com)
  if (hostParts.length > 2) {
    return hostParts[0];
  }
  
  return null;
}

/**
 * Check if the current subdomain matches a specific value
 * @param subdomain The subdomain to check against
 * @returns True if the current subdomain matches
 */
export function isSubdomain(subdomain: string): boolean {
  return getSubdomain() === subdomain;
}

/**
 * For development only: Simulate a subdomain
 * @param subdomain The subdomain to simulate
 */
export function simulateSubdomain(subdomain: string | null): void {
  if (subdomain) {
    localStorage.setItem('simulatedSubdomain', subdomain);
  } else {
    localStorage.removeItem('simulatedSubdomain');
  }
  window.location.reload();
}
