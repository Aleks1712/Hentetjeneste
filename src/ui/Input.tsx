import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, textStyles } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  darkMode?: boolean;
  containerStyle?: ViewStyle;
}

export function Input({ label, error, darkMode = false, containerStyle, ...props }: InputProps) {
  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[styles.label, darkMode && styles.labelDark]}>{label}</Text>
      )}
      <TextInput
        style={[
          styles.input,
          darkMode ? styles.inputDark : styles.inputLight,
          error && styles.inputError,
        ]}
        placeholderTextColor={darkMode ? colors.gray[400] : colors.gray[500]}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...textStyles.label,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  labelDark: {
    color: colors.gray[200],
  },
  input: {
    ...textStyles.body,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    minHeight: 48,
  },
  inputLight: {
    backgroundColor: colors.white,
    borderColor: colors.gray[300],
    color: colors.gray[900],
  },
  inputDark: {
    backgroundColor: colors.dark.card,
    borderColor: colors.dark.border,
    color: colors.dark.text,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...textStyles.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
