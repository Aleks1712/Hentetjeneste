/**
 * Format date to Norwegian format
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns Formatted date (e.g. "12. desember 2024")
 */
export function formatNorwegianDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('nb-NO', options);
}

/**
 * Format date to short Norwegian format
 * @param dateString ISO date string
 * @returns Short date (e.g. "12.12.2024")
 */
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('nb-NO');
}

/**
 * Get today's date in ISO format (YYYY-MM-DD)
 */
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check if date is today
 */
export function isToday(dateString: string): boolean {
  return dateString === getTodayISO();
}

/**
 * Check if date is in the future
 */
export function isFuture(dateString: string): boolean {
  return dateString > getTodayISO();
}

/**
 * Check if date is in the past
 */
export function isPast(dateString: string): boolean {
  return dateString < getTodayISO();
}

/**
 * Get relative date label
 * @param dateString ISO date string
 * @returns "I dag", "I morgen", or formatted date
 */
export function getRelativeDateLabel(dateString: string): string {
  const today = getTodayISO();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowISO = tomorrow.toISOString().split('T')[0];

  if (dateString === today) return 'I dag';
  if (dateString === tomorrowISO) return 'I morgen';
  
  return formatNorwegianDate(dateString);
}

/**
 * Get weekday name in Norwegian
 */
export function getWeekdayName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('nb-NO', { weekday: 'long' });
}

/**
 * Format time from timestamp
 * @param timestamp ISO timestamp
 * @returns Time in HH:mm format
 */
export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('nb-NO', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

/**
 * Format date and time
 * @param timestamp ISO timestamp
 * @returns "12.12.2024 kl. 14:30"
 */
export function formatDateTime(timestamp: string): string {
  const date = formatShortDate(timestamp);
  const time = formatTime(timestamp);
  return `${date} kl. ${time}`;
}

/**
 * Get days until date
 */
export function getDaysUntil(dateString: string): number {
  const today = new Date(getTodayISO());
  const target = new Date(dateString);
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
