import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, textStyles, spacing, borderRadius } from '../theme';
import type { UserRole } from '../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  role?: UserRole;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  role = 'parent',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
}: ButtonProps) {
  const primaryColor = role === 'staff' ? colors.staff.primary : colors.parent.primary;
  const darkColor = role === 'staff' ? colors.staff.dark : colors.parent.dark;

  const buttonStyles: ViewStyle[] = [
    styles.base,
    size === 'sm' && styles.sizeSm,
    size === 'md' && styles.sizeMd,
    size === 'lg' && styles.sizeLg,
    variant === 'primary' && { backgroundColor: primaryColor },
    variant === 'secondary' && { backgroundColor: colors.gray[100] },
    variant === 'outline' && { borderWidth: 1.5, borderColor: primaryColor, backgroundColor: 'transparent' },
    variant === 'ghost' && { backgroundColor: 'transparent' },
    (disabled || loading) && styles.disabled,
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyles_: TextStyle[] = [
    styles.text,
    size === 'sm' && styles.textSm,
    size === 'md' && styles.textMd,
    size === 'lg' && styles.textLg,
    variant === 'primary' && { color: colors.white },
    variant === 'secondary' && { color: colors.gray[900] },
    variant === 'outline' && { color: primaryColor },
    variant === 'ghost' && { color: primaryColor },
    (disabled || loading) && { opacity: 0.5 },
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={buttonStyles}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : primaryColor} />
      ) : (
        <Text style={textStyles_}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },
  sizeSm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  sizeMd: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 44,
  },
  sizeLg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    minHeight: 52,
  },
  text: {
    ...textStyles.button,
  },
  textSm: {
    fontSize: 14,
  },
  textMd: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
});
