
import { TimingConfig } from "./chatStateTypes";

/**
 * Returns a random delay between min and max values
 */
export const getRandomDelay = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Calculate a realistic typing duration based on text length
 */
export const calculateTypingDuration = (text: string, typingSpeed: TimingConfig): number => {
  const baseDelay = 500; // base delay in milliseconds
  const charsPerSecond = getRandomDelay(typingSpeed.min, typingSpeed.max);
  return baseDelay + (text.length / charsPerSecond) * 1000;
};
