import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../context-native/ThemeContext';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'sm' | 'md';
  style?: ViewStyle;
}

export function Badge({ label, variant = 'default', size = 'md', style }: BadgeProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return '#D1FAE5';
      case 'warning':
        return '#FEF3C7';
      case 'error':
        return '#FEE2E2';
      case 'info':
        return '#DBEAFE';
      default:
        return colors.border;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return '#059669';
      case 'warning':
        return '#D97706';
      case 'error':
        return '#DC2626';
      case 'info':
        return '#2563EB';
      default:
        return colors.text;
    }
  };

  const badgeStyle: ViewStyle = {
    paddingHorizontal: size === 'sm' ? 8 : 12,
    paddingVertical: size === 'sm' ? 4 : 6,
    borderRadius: 8,
    backgroundColor: getBackgroundColor(),
  };

  const textStyle: TextStyle = {
    fontSize: size === 'sm' ? 12 : 14,
    fontWeight: '600',
    color: getTextColor(),
  };

  return (
    <View style={[badgeStyle, style]}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}
