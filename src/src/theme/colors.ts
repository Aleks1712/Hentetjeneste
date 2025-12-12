// Hentetjeneste Color System
// Based on Spond-inspired UX

export const colors = {
  // Primary - Staff mode (Blue)
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB', // Main staff color
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Secondary - Parent mode (Purple)
  secondary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#8B5CF6', // Main parent color
    700: '#7C3AED',
    800: '#6D28D9',
    900: '#5B21B6',
  },

  // Neutral
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  // Semantic colors
  success: {
    light: '#DCFCE7',
    main: '#22C55E',
    dark: '#15803D',
  },
  warning: {
    light: '#FEF3C7',
    main: '#F59E0B',
    dark: '#B45309',
  },
  error: {
    light: '#FEE2E2',
    main: '#EF4444',
    dark: '#B91C1C',
  },
  info: {
    light: '#DBEAFE',
    main: '#3B82F6',
    dark: '#1E40AF',
  },

  // Daily Info Types
  dailyInfo: {
    menu: '#F59E0B',       // Amber/Orange
    activity: '#10B981',   // Green
    announcement: '#6366F1', // Indigo
  },

  // Background
  background: {
    default: '#FFFFFF',
    secondary: '#F9FAFB',
    tertiary: '#F3F4F6',
  },

  // Text
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    disabled: '#D1D5DB',
    inverse: '#FFFFFF',
  },

  // Borders
  border: {
    light: '#F3F4F6',
    main: '#E5E7EB',
    dark: '#D1D5DB',
  },
};

// Dark mode colors
export const darkColors = {
  ...colors,
  background: {
    default: '#030712',
    secondary: '#111827',
    tertiary: '#1F2937',
  },
  text: {
    primary: '#F9FAFB',
    secondary: '#9CA3AF',
    disabled: '#4B5563',
    inverse: '#111827',
  },
  border: {
    light: '#1F2937',
    main: '#374151',
    dark: '#4B5563',
  },
};
