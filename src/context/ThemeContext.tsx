import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { ColorScheme, UserRole } from '../theme/colors';

interface ThemeContextType {
  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const [userRole, setUserRole] = useState<UserRole>('parent');

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        toggleColorScheme,
        userRole,
        setUserRole,
      }}
    >
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
