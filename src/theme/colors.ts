// Hentetjeneste Theme - GDPR-sikker barnehage-app
// Blå for ansatt-modus, lilla for foreldre-elementer

export const colors = {
  // Primary - Staff (Ansatt)
  staff: {
    primary: '#2563EB',    // Blue-600
    light: '#3B82F6',      // Blue-500
    dark: '#1E40AF',       // Blue-700
    bg: '#EFF6FF',         // Blue-50
  },
  
  // Secondary - Parent (Foreldre)
  parent: {
    primary: '#8B5CF6',    // Purple-500
    light: '#A78BFA',      // Purple-400
    dark: '#7C3AED',       // Purple-600
    bg: '#F5F3FF',         // Purple-50
  },
  
  // Neutrals
  gray: {
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
  },
  
  // Dark mode
  dark: {
    bg: '#111827',         // Gray-900
    card: '#1F2937',       // Gray-800
    border: '#374151',     // Gray-700
    text: '#F9FAFB',       // Gray-50
    textSecondary: '#D1D5DB', // Gray-300
  },
  
  // Semantic
  success: '#10B981',      // Green-500
  warning: '#F59E0B',      // Amber-500
  error: '#EF4444',        // Red-500
  info: '#3B82F6',         // Blue-500
  
  // Common
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export type ColorScheme = 'light' | 'dark';
export type UserRole = 'parent' | 'staff';
