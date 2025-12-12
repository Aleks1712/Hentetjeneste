import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DailyInfo } from '../types/dailyInfo';
import { theme } from '../theme';
import { formatNorwegianDate } from '../utils/date';

interface DailyInfoCardProps {
  item: DailyInfo;
  showDate?: boolean;
}

const TYPE_LABELS: Record<DailyInfo['type'], string> = {
  menu: 'Meny',
  activity: 'Aktivitet',
  announcement: 'Beskjed',
};

const TYPE_ICONS: Record<DailyInfo['type'], string> = {
  menu: '🍽️',
  activity: '🎨',
  announcement: '📢',
};

export function DailyInfoCard({ item, showDate = true }: DailyInfoCardProps) {
  const typeColor = theme.colors.dailyInfo[item.type];

  return (
    <View style={[styles.card, theme.shadows.sm]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: `${typeColor}15` }]}>
          <Text style={styles.icon}>{TYPE_ICONS[item.type]}</Text>
          <Text style={[styles.badgeText, { color: typeColor }]}>
            {TYPE_LABELS[item.type]}
          </Text>
        </View>
        {showDate && (
          <Text style={styles.date}>{formatNorwegianDate(item.date)}</Text>
        )}
      </View>

      {/* Content */}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {/* Target Group */}
      {item.target_group && (
        <View style={styles.groupBadge}>
          <Text style={styles.groupText}>👥 {item.target_group}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background.default,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  icon: {
    fontSize: 16,
  },
  badgeText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  date: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    lineHeight: 22,
  },
  groupBadge: {
    marginTop: theme.spacing.sm,
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  groupText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
  },
});
