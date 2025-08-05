/**
 * Enhanced security event logging for monitoring security violations
 */

export interface SecurityEvent {
  type: 'authentication' | 'authorization' | 'input_validation' | 'rate_limit' | 'injection_attempt' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
}

class SecurityLogger {
  private static instance: SecurityLogger;
  private logBuffer: SecurityEvent[] = [];
  private maxBufferSize = 100;

  private constructor() {}

  static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger();
    }
    return SecurityLogger.instance;
  }

  /**
   * Log a security event
   */
  logEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now(),
      ipAddress: this.getClientIP(),
      userAgent: navigator.userAgent,
    };

    // Add to buffer
    this.logBuffer.push(securityEvent);
    
    // Maintain buffer size
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift();
    }

    // Console logging based on severity
    this.logToConsole(securityEvent);

    // Store in localStorage for debugging (with size limits)
    this.storeLocalLog(securityEvent);

    // For critical events, attempt to send to server
    if (event.severity === 'critical') {
      this.sendToServer(securityEvent);
    }
  }

  /**
   * Log authentication failures
   */
  logAuthFailure(reason: string, details: Record<string, any> = {}): void {
    this.logEvent({
      type: 'authentication',
      severity: 'medium',
      message: `Authentication failure: ${reason}`,
      details,
    });
  }

  /**
   * Log authorization violations
   */
  logAuthorizationViolation(resource: string, action: string, userId?: string): void {
    this.logEvent({
      type: 'authorization',
      severity: 'high',
      message: `Unauthorized access attempt to ${resource}`,
      details: { resource, action },
      userId,
    });
  }

  /**
   * Log injection attempts
   */
  logInjectionAttempt(input: string, type: string): void {
    this.logEvent({
      type: 'injection_attempt',
      severity: 'critical',
      message: `Potential ${type} injection detected`,
      details: { input: input.substring(0, 100), type },
    });
  }

  /**
   * Log rate limit violations
   */
  logRateLimitViolation(key: string, attempts: number): void {
    this.logEvent({
      type: 'rate_limit',
      severity: 'medium',
      message: `Rate limit exceeded for ${key}`,
      details: { key, attempts },
    });
  }

  /**
   * Get recent security events
   */
  getRecentEvents(limit: number = 10): SecurityEvent[] {
    return this.logBuffer.slice(-limit);
  }

  /**
   * Get events by severity
   */
  getEventsBySeverity(severity: SecurityEvent['severity']): SecurityEvent[] {
    return this.logBuffer.filter(event => event.severity === severity);
  }

  private logToConsole(event: SecurityEvent): void {
    const logMethod = this.getConsoleMethod(event.severity);
    logMethod(`[SECURITY] ${event.message}`, event);
  }

  private getConsoleMethod(severity: SecurityEvent['severity']) {
    switch (severity) {
      case 'critical':
      case 'high':
        return console.error;
      case 'medium':
        return console.warn;
      case 'low':
      default:
        return console.info;
    }
  }

  private storeLocalLog(event: SecurityEvent): void {
    try {
      const key = 'security_events';
      const stored = localStorage.getItem(key);
      const events: SecurityEvent[] = stored ? JSON.parse(stored) : [];
      
      events.push(event);
      
      // Keep only last 50 events to prevent storage bloat
      if (events.length > 50) {
        events.splice(0, events.length - 50);
      }
      
      localStorage.setItem(key, JSON.stringify(events));
    } catch (error) {
      console.warn('Failed to store security event to localStorage:', error);
    }
  }

  private async sendToServer(event: SecurityEvent): Promise<void> {
    try {
      // In a real application, this would send to a security monitoring endpoint
      console.log('Critical security event would be sent to server:', event);
      
      // Example: await fetch('/api/security/events', { method: 'POST', body: JSON.stringify(event) });
    } catch (error) {
      console.error('Failed to send critical security event to server:', error);
    }
  }

  private getClientIP(): string {
    // Note: This is a placeholder - real IP detection would need server-side help
    return 'client-side-unknown';
  }
}

export const securityLogger = SecurityLogger.getInstance();
