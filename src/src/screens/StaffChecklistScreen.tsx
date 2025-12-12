import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export function StaffChecklistScreen() {
  const navigation = useNavigation();

  const handleOpenEditor = () => {
    navigation.navigate('DailyInfoEditor' as never);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Krysselista</Text>
          <Text style={styles.subtitle}>Oversikt over tilstedeværelse</Text>
        </View>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={handleOpenEditor}
          activeOpacity={0.7}
        >
          <Text style={styles.calendarIcon}>📅</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* TODO: Implement checklist functionality */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>✅</Text>
          <Text style={styles.placeholderTitle}>Krysselista</Text>
          <Text style={styles.placeholderText}>
            Her vil ansatte kunne krysse barn inn og ut.
          </Text>
          <Text style={styles.placeholderText}>
            Trykk på 📅 for å redigere daglig informasjon.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  header: {
    backgroundColor: theme.colors.primary[600],
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.inverse,
    opacity: 0.9,
  },
  calendarButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  placeholder: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
  },
  placeholderIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },
  placeholderTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  placeholderText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
});
