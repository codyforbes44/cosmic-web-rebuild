import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SecurityScanRequest {
  url?: string;
  type: 'headers' | 'ssl' | 'cookies' | 'content' | 'full';
  options?: {
    checkMixedContent?: boolean;
    checkRedirects?: boolean;
    followRedirects?: boolean;
    maxRedirects?: number;
  };
}

interface SecurityScanResult {
  score: number; // 0-100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  issues: SecurityIssue[];
  recommendations: string[];
  timestamp: string;
  scanType: string;
}

interface SecurityIssue {
  category: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  impact: string;
  solution: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Security scanner function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const scanRequest: SecurityScanRequest = await req.json();
    console.log("Security scan request:", scanRequest);

    const targetUrl = scanRequest.url || req.headers.get('referer') || 'https://localhost:3000';
    const result = await performSecurityScan(targetUrl, scanRequest);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in security scanner:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

async function performSecurityScan(url: string, request: SecurityScanRequest): Promise<SecurityScanResult> {
  const issues: SecurityIssue[] = [];
  const recommendations: string[] = [];
  
  console.log(`Performing ${request.type} security scan on ${url}`);

  try {
    // Fetch the target URL with options
    const response = await fetch(url, {
      method: 'GET',
      redirect: request.options?.followRedirects ? 'follow' : 'manual',
    });

    if (request.type === 'headers' || request.type === 'full') {
      analyzeSecurityHeaders(response.headers, issues, recommendations);
    }

    if (request.type === 'ssl' || request.type === 'full') {
      await analyzeSSLConfiguration(url, issues, recommendations);
    }

    if (request.type === 'cookies' || request.type === 'full') {
      analyzeCookieSettings(response.headers, issues, recommendations);
    }

    if (request.type === 'content' || request.type === 'full') {
      const content = await response.text();
      analyzeContentSecurity(content, url, issues, recommendations);
    }

  } catch (error) {
    console.error("Error during security scan:", error);
    issues.push({
      category: 'medium',
      title: 'Scan Error',
      description: `Could not complete security scan: ${error.message}`,
      impact: 'Unable to verify security configuration',
      solution: 'Ensure the URL is accessible and try again'
    });
  }

  // Calculate security score
  const score = calculateSecurityScore(issues);
  const grade = getSecurityGrade(score);

  return {
    score,
    grade,
    issues,
    recommendations,
    timestamp: new Date().toISOString(),
    scanType: request.type
  };
}

function analyzeSecurityHeaders(headers: Headers, issues: SecurityIssue[], recommendations: string[]) {
  console.log("Analyzing security headers...");

  // Check for important security headers
  const securityHeaders = [
    {
      name: 'Strict-Transport-Security',
      critical: true,
      purpose: 'Enforce HTTPS connections'
    },
    {
      name: 'X-Content-Type-Options',
      critical: true,
      purpose: 'Prevent MIME type sniffing'
    },
    {
      name: 'X-Frame-Options',
      critical: true,
      purpose: 'Prevent clickjacking attacks'
    },
    {
      name: 'X-XSS-Protection',
      critical: false,
      purpose: 'Enable XSS filtering'
    },
    {
      name: 'Content-Security-Policy',
      critical: true,
      purpose: 'Control resource loading'
    },
    {
      name: 'Referrer-Policy',
      critical: false,
      purpose: 'Control referrer information'
    }
  ];

  securityHeaders.forEach(header => {
    const headerValue = headers.get(header.name);
    
    if (!headerValue) {
      issues.push({
        category: header.critical ? 'high' : 'medium',
        title: `Missing ${header.name} Header`,
        description: `The ${header.name} header is not set`,
        impact: `Potential security vulnerability: ${header.purpose}`,
        solution: `Add the ${header.name} header to your server configuration`
      });
    } else {
      // Validate header values
      validateHeaderValue(header.name, headerValue, issues);
    }
  });

  // Check for potentially harmful headers
  const harmfulHeaders = ['Server', 'X-Powered-By'];
  harmfulHeaders.forEach(headerName => {
    if (headers.get(headerName)) {
      issues.push({
        category: 'low',
        title: `Information Disclosure: ${headerName}`,
        description: `The ${headerName} header reveals server information`,
        impact: 'Potential information leakage to attackers',
        solution: `Remove or modify the ${headerName} header`
      });
    }
  });

  recommendations.push("Implement all recommended security headers");
  recommendations.push("Regularly review and update security header values");
}

function validateHeaderValue(headerName: string, value: string, issues: SecurityIssue[]) {
  switch (headerName) {
    case 'Strict-Transport-Security':
      if (!value.includes('max-age=')) {
        issues.push({
          category: 'medium',
          title: 'Weak HSTS Configuration',
          description: 'HSTS header missing max-age directive',
          impact: 'HTTPS enforcement may not be effective',
          solution: 'Add max-age directive with appropriate value (e.g., max-age=31536000)'
        });
      }
      break;
    
    case 'X-Content-Type-Options':
      if (value.toLowerCase() !== 'nosniff') {
        issues.push({
          category: 'medium',
          title: 'Incorrect X-Content-Type-Options',
          description: 'X-Content-Type-Options should be set to "nosniff"',
          impact: 'MIME type sniffing vulnerabilities may exist',
          solution: 'Set X-Content-Type-Options: nosniff'
        });
      }
      break;
    
    case 'X-Frame-Options':
      if (!['DENY', 'SAMEORIGIN'].includes(value.toUpperCase())) {
        issues.push({
          category: 'medium',
          title: 'Weak X-Frame-Options',
          description: 'X-Frame-Options should be DENY or SAMEORIGIN',
          impact: 'Clickjacking attacks may be possible',
          solution: 'Set X-Frame-Options to DENY or SAMEORIGIN'
        });
      }
      break;
  }
}

async function analyzeSSLConfiguration(url: string, issues: SecurityIssue[], recommendations: string[]) {
  console.log("Analyzing SSL configuration...");

  try {
    const urlObj = new URL(url);
    
    if (urlObj.protocol !== 'https:') {
      issues.push({
        category: 'critical',
        title: 'No HTTPS',
        description: 'Website is not using HTTPS',
        impact: 'Data transmission is not encrypted',
        solution: 'Implement SSL/TLS certificate and redirect HTTP to HTTPS'
      });
      return;
    }

    // For a full SSL analysis, you might want to use a specialized service
    // This is a basic check for HTTPS usage
    recommendations.push("Use strong SSL/TLS configuration (TLS 1.2 or higher)");
    recommendations.push("Implement proper certificate chain validation");
    recommendations.push("Consider using Certificate Transparency monitoring");

  } catch (error) {
    issues.push({
      category: 'medium',
      title: 'SSL Analysis Error',
      description: 'Could not analyze SSL configuration',
      impact: 'Unable to verify HTTPS security',
      solution: 'Manually verify SSL certificate and configuration'
    });
  }
}

function analyzeCookieSettings(headers: Headers, issues: SecurityIssue[], recommendations: string[]) {
  console.log("Analyzing cookie settings...");

  const cookies = headers.get('Set-Cookie');
  
  if (cookies) {
    // Check for secure cookie attributes
    if (!cookies.includes('Secure')) {
      issues.push({
        category: 'medium',
        title: 'Insecure Cookies',
        description: 'Cookies missing Secure attribute',
        impact: 'Cookies may be transmitted over unencrypted connections',
        solution: 'Add Secure attribute to all cookies'
      });
    }

    if (!cookies.includes('HttpOnly')) {
      issues.push({
        category: 'high',
        title: 'Cookies Accessible via JavaScript',
        description: 'Cookies missing HttpOnly attribute',
        impact: 'XSS attacks could steal session cookies',
        solution: 'Add HttpOnly attribute to session cookies'
      });
    }

    if (!cookies.includes('SameSite')) {
      issues.push({
        category: 'medium',
        title: 'Missing SameSite Attribute',
        description: 'Cookies missing SameSite attribute',
        impact: 'CSRF attacks may be possible',
        solution: 'Add SameSite attribute (Strict, Lax, or None)'
      });
    }
  }

  recommendations.push("Use secure cookie attributes (Secure, HttpOnly, SameSite)");
  recommendations.push("Implement proper session management");
}

function analyzeContentSecurity(content: string, url: string, issues: SecurityIssue[], recommendations: string[]) {
  console.log("Analyzing content security...");

  // Check for inline scripts
  if (content.includes('<script') && content.includes('onclick=')) {
    issues.push({
      category: 'medium',
      title: 'Inline Event Handlers',
      description: 'HTML contains inline event handlers',
      impact: 'May violate Content Security Policy',
      solution: 'Move event handlers to external JavaScript files'
    });
  }

  // Check for mixed content
  if (url.startsWith('https://') && content.includes('http://')) {
    issues.push({
      category: 'high',
      title: 'Mixed Content',
      description: 'HTTPS page contains HTTP resources',
      impact: 'Security warnings and potential man-in-the-middle attacks',
      solution: 'Update all resource URLs to use HTTPS'
    });
  }

  // Check for potential XSS vulnerabilities
  const suspiciousPatterns = [
    /javascript:/gi,
    /on\w+\s*=/gi,
    /document\.write/gi
  ];

  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      issues.push({
        category: 'medium',
        title: 'Potential XSS Vector',
        description: 'Content contains patterns that may indicate XSS vulnerabilities',
        impact: 'Cross-site scripting attacks may be possible',
        solution: 'Review and sanitize user input, implement CSP'
      });
    }
  });

  recommendations.push("Implement Content Security Policy");
  recommendations.push("Sanitize all user input");
  recommendations.push("Use HTTPS for all resources");
}

function calculateSecurityScore(issues: SecurityIssue[]): number {
  let score = 100;
  
  issues.forEach(issue => {
    switch (issue.category) {
      case 'critical':
        score -= 25;
        break;
      case 'high':
        score -= 15;
        break;
      case 'medium':
        score -= 10;
        break;
      case 'low':
        score -= 5;
        break;
      case 'info':
        score -= 1;
        break;
    }
  });

  return Math.max(0, score);
}

function getSecurityGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 65) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

serve(handler);