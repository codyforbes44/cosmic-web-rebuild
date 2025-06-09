
export const fetchMoonPhase = async () => {
  const now = new Date();
  
  // More accurate moon phase calculation using astronomical algorithms
  const calculateMoonPhase = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Convert to Julian Day Number
    let a = Math.floor((14 - month) / 12);
    let y = year - a;
    let m = month + 12 * a - 3;
    
    let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1721119;
    
    // Calculate days since new moon (January 6, 2000)
    let daysSinceNew = jd - 2451549.5;
    
    // Moon cycle is approximately 29.53058868 days
    let newMoons = daysSinceNew / 29.53058868;
    
    // Get the fractional part to determine phase
    let phase = newMoons - Math.floor(newMoons);
    
    // Calculate illumination percentage
    let illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) * 50);
    
    // Determine phase name based on the cycle position
    let phaseName = '';
    if (phase < 0.0625) phaseName = 'New Moon';
    else if (phase < 0.1875) phaseName = 'Waxing Crescent';
    else if (phase < 0.3125) phaseName = 'First Quarter';
    else if (phase < 0.4375) phaseName = 'Waxing Gibbous';
    else if (phase < 0.5625) phaseName = 'Full Moon';
    else if (phase < 0.6875) phaseName = 'Waning Gibbous';
    else if (phase < 0.8125) phaseName = 'Third Quarter';
    else if (phase < 0.9375) phaseName = 'Waning Crescent';
    else phaseName = 'New Moon';
    
    // Calculate next full moon
    let daysToFullMoon = 0;
    if (phase <= 0.5) {
      daysToFullMoon = (0.5 - phase) * 29.53058868;
    } else {
      daysToFullMoon = (1.5 - phase) * 29.53058868;
    }
    
    let nextFullMoon = new Date(now.getTime() + daysToFullMoon * 24 * 60 * 60 * 1000);
    
    return {
      phase: phaseName,
      illumination: illumination,
      nextFullMoon: nextFullMoon.toLocaleDateString()
    };
  };
  
  return calculateMoonPhase(now);
};
