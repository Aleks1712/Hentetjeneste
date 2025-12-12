import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from '../translations-native/translations';

export type UserRole = 'parent' | 'staff';

interface ThemeContextType {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Role
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  
  // Language
  language: Language;
  setLanguage: (language: Language) => void;
  
  // Colors
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [role, setRoleState] = useState<UserRole>('parent');
  const [language, setLanguage] = useState<Language>('no');

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  
  const toggleRole = () => {
    setRoleState(prev => prev === 'parent' ? 'staff' : 'parent');
  };
  
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  // Generate colors based on role and dark mode
  const getColors = () => {
    const isParent = role === 'parent';
    
    if (isDarkMode) {
      return {
        primary: isParent ? '#8B5CF6' : '#2563EB',
        primaryLight: isParent ? '#A78BFA' : '#3B82F6',
        primaryDark: isParent ? '#7C3AED' : '#1E40AF',
        background: '#111827',
        surface: '#1F2937',
        text: '#F9FAFB',
        textSecondary: '#9CA3AF',
        border: '#374151',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      };
    }
    
    return {
      primary: isParent ? '#8B5CF6' : '#2563EB',
      primaryLight: isParent ? '#A78BFA' : '#3B82F6',
      primaryDark: isParent ? '#7C3AED' : '#1E40AF',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: '#111827',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    };
  };

  const value: ThemeContextType = {
    isDarkMode,
    toggleDarkMode,
    role,
    setRole,
    toggleRole,
    language,
    setLanguage,
    colors: getColors(),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
