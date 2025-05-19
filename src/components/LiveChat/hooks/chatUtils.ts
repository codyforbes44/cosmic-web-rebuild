
import { TimingConfig } from './chatStateTypes';

/**
 * Returns a random delay between min and max
 */
export const getRandomDelay = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Calculates a realistic typing duration based on message length
 */
export const calculateTypingDuration = (message: string, speed: TimingConfig): number => {
  const charCount = message.length;
  const baseSpeed = getRandomDelay(speed.min, speed.max);
  
  // Calculate typing duration with some variability
  // - Base speed per character
  // - Plus random factor for human-like variability
  let duration = charCount * baseSpeed;
  
  // Add some randomness (±15%)
  const randomFactor = 1 + (Math.random() * 0.3 - 0.15);
  duration *= randomFactor;
  
  // Ensure reasonable minimum and maximum times
  const minDuration = 800; // minimum typing time
  const maxDuration = 6000; // cap at 6 seconds for very long messages
  
  return Math.max(minDuration, Math.min(duration, maxDuration));
};
