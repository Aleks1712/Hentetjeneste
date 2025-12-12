import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../theme';

interface CardProps {
  children: React.ReactNode;
  darkMode?: boolean;
  padding?: keyof typeof spacing;
  style?: ViewStyle;
}

export function Card({ children, darkMode = false, padding = 'base', style }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        darkMode ? styles.cardDark : styles.cardLight,
        { padding: spacing[padding] },
        shadows.sm,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
  },
  cardLight: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  cardDark: {
    backgroundColor: colors.dark.card,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
});
