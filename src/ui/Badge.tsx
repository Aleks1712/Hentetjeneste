import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'neutral', size = 'md', style }: BadgeProps) {
  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return { bg: '#D1FAE5', text: '#065F46' }; // Green-100/Green-900
      case 'warning':
        return { bg: '#FEF3C7', text: '#92400E' }; // Amber-100/Amber-900
      case 'error':
        return { bg: '#FEE2E2', text: '#991B1B' }; // Red-100/Red-900
      case 'info':
        return { bg: '#DBEAFE', text: '#1E40AF' }; // Blue-100/Blue-700
      default:
        return { bg: colors.gray[100], text: colors.gray[700] };
    }
  };

  const variantColors = getVariantColors();

  return (
    <View
      style={[
        styles.badge,
        size === 'sm' && styles.badgeSm,
        size === 'md' && styles.badgeMd,
        { backgroundColor: variantColors.bg },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'sm' && styles.textSm,
          { color: variantColors.text },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.md,
  },
  badgeSm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeMd: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  text: {
    ...textStyles.label,
  },
  textSm: {
    fontSize: 11,
  },
});
