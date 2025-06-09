
// Helper function to detect device type
export function detectDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (
    /mobile|iphone|ipod|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(
      ua
    )
  ) {
    return 'mobile';
  }
  return 'desktop';
}

// Helper function to detect operating system
export function detectOS(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  
  if (ua.indexOf('windows') !== -1) return 'Windows';
  if (ua.indexOf('mac') !== -1) return 'MacOS';
  if (ua.indexOf('linux') !== -1) return 'Linux';
  if (ua.indexOf('android') !== -1) return 'Android';
  if (ua.indexOf('ios') !== -1 || ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1) return 'iOS';
  
  return 'Unknown';
}
