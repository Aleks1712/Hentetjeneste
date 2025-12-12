import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTodayDailyInfo } from '../hooks/useDailyInfo';
import { DailyInfoList } from '../components/DailyInfoList';
import { theme } from '../theme';

export function ParentHomeScreen() {
  // TODO: Get child's group from user profile/child data
  // For now, pass undefined to get all info
  const targetGroup = undefined; // Replace with actual child's group
  
  const { data, isLoading, error, refetch } = useTodayDailyInfo(targetGroup);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Hjem</Text>
        <Text style={styles.subtitle}>Daglig informasjon</Text>
      </View>

      {/* Daily Info List */}
      <DailyInfoList
        data={data}
        isLoading={isLoading}
        error={error}
        onRefresh={refetch}
        showDate={false} // Don't show date since it's today's info
        emptyTitle="Ingen info i dag"
        emptyDescription="Det er ingen daglig informasjon publisert for i dag ennå."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  header: {
    backgroundColor: theme.colors.secondary[600],
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
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
});
