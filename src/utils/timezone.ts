
import { format, formatInTimeZone, toZonedTime } from 'date-fns-tz';

// UTC-6 timezone (Central Standard Time)
export const APP_TIMEZONE = 'America/Chicago'; // UTC-6
export const UTC_OFFSET = -6;

/**
 * Converts any date to UTC-6 timezone
 */
export const toAppTimezone = (date: Date | string | number): Date => {
  return toZonedTime(new Date(date), APP_TIMEZONE);
};

/**
 * Formats a date in UTC-6 timezone with specified format
 */
export const formatInAppTimezone = (date: Date | string | number, formatStr: string): string => {
  return formatInTimeZone(new Date(date), APP_TIMEZONE, formatStr);
};

/**
 * Gets current time in UTC-6
 */
export const getCurrentTimeInAppTimezone = (): Date => {
  return toAppTimezone(new Date());
};

/**
 * Formats time for display (e.g., "6:45 AM")
 */
export const formatTimeDisplay = (date: Date | string | number): string => {
  return formatInAppTimezone(date, 'h:mm a');
};

/**
 * Formats date for display (e.g., "Jan 15, 2024")
 */
export const formatDateDisplay = (date: Date | string | number): string => {
  return formatInAppTimezone(date, 'MMM d, yyyy');
};

/**
 * Formats full datetime for display (e.g., "Jan 15, 2024 6:45 AM")
 */
export const formatDateTimeDisplay = (date: Date | string | number): string => {
  return formatInAppTimezone(date, 'MMM d, yyyy h:mm a');
};

/**
 * Gets ISO string for the current time in UTC-6
 */
export const getCurrentISOInAppTimezone = (): string => {
  return getCurrentTimeInAppTimezone().toISOString();
};
