/**
 * Format date to Norwegian format
 */
export function formatDateNorwegian(dateString: string, options?: {
  includeWeekday?: boolean;
  includeYear?: boolean;
}): string {
  const date = new Date(dateString);
  const { includeWeekday = false, includeYear = false } = options || {};

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
  };

  if (includeWeekday) {
    formatOptions.weekday = 'long';
  }

  if (includeYear) {
    formatOptions.year = 'numeric';
  }

  return date.toLocaleDateString('no-NO', formatOptions);
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Check if a date is today
 */
export function isToday(dateString: string): boolean {
  return dateString === getTodayDate();
}

/**
 * Check if a date is in the future
 */
export function isFuture(dateString: string): boolean {
  return dateString > getTodayDate();
}

/**
 * Check if a date is in the past
 */
export function isPast(dateString: string): boolean {
  return dateString < getTodayDate();
}

/**
 * Get relative date label (I dag, I morgen, etc.)
 */
export function getRelativeDateLabel(dateString: string): string {
  const today = getTodayDate();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  if (dateString === today) return 'I dag';
  if (dateString === tomorrowString) return 'I morgen';
  
  return formatDateNorwegian(dateString, { includeWeekday: true });
}

/**
 * Format time to Norwegian format (HH:MM)
 */
export function formatTimeNorwegian(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Get day difference from today
 */
export function getDaysDifference(dateString: string): number {
  const today = new Date(getTodayDate());
  const targetDate = new Date(dateString);
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Sort dates ascending
 */
export function sortDatesAsc(a: string, b: string): number {
  return a.localeCompare(b);
}

/**
 * Sort dates descending
 */
export function sortDatesDesc(a: string, b: string): number {
  return b.localeCompare(a);
}
