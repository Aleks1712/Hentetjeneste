import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { DailyInfo } from '../types/dailyInfo';
import { DailyInfoCard } from './DailyInfoCard';
import { EmptyState } from './EmptyState';
import { theme } from '../theme';

interface DailyInfoListProps {
  data: DailyInfo[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  showDate?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DailyInfoList({
  data,
  isLoading,
  error,
  onRefresh,
  isRefreshing = false,
  showDate = true,
  emptyTitle = 'Ingen informasjon',
  emptyDescription = 'Det er ingen daglig informasjon å vise akkurat nå.',
}: DailyInfoListProps) {
  if (isLoading && !data) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary[600]} />
        <Text style={styles.loadingText}>Laster...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon="⚠️"
        title="Noe gikk galt"
        description={error.message || 'Kunne ikke laste informasjon'}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        icon="📅"
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DailyInfoCard item={item} showDate={showDate} />
      )}
      contentContainerStyle={styles.list}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary[600]]}
          />
        ) : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
  },
  list: {
    padding: theme.spacing.md,
  },
});
