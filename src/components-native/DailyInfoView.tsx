import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context-native/ThemeContext';
import { DailyInfo } from '../data-native/mockData';

interface DailyInfoViewProps {
  info: DailyInfo[];
  targetGroup?: string;
}

export function DailyInfoView({ info, targetGroup }: DailyInfoViewProps) {
  const { colors } = useTheme();

  // Filter by target group if specified
  const filteredInfo = targetGroup
    ? info.filter(item => !item.targetGroup || item.targetGroup === targetGroup)
    : info;

  // Group by date
  const today = new Date().toISOString().split('T')[0];
  const todayInfo = filteredInfo.filter(item => item.date === today);
  const upcomingInfo = filteredInfo.filter(item => item.date > today);

  const getInfoIcon = (type: string) => {
    switch (type) {
      case 'menu':
        return '🍽️';
      case 'activity':
        return '🎨';
      case 'announcement':
        return '📢';
      default:
        return 'ℹ️';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'menu':
        return 'Matmeny';
      case 'activity':
        return 'Aktivitet';
      case 'announcement':
        return 'Beskjed';
      default:
        return 'Info';
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case 'menu':
        return '#FFF7ED';
      case 'activity':
        return '#FAF5FF';
      case 'announcement':
        return '#EFF6FF';
      default:
        return '#F3F4F6';
    }
  };

  const getTypeTextColor = (type: string) => {
    switch (type) {
      case 'menu':
        return '#EA580C';
      case 'activity':
        return '#9333EA';
      case 'announcement':
        return '#2563EB';
      default:
        return '#6B7280';
    }
  };

  if (filteredInfo.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={styles.emptyIcon}>📅</Text>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Ingen info tilgjengelig</Text>
        <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
          Det er ingen planlagte aktiviteter eller info akkurat nå
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* Today's Info */}
      {todayInfo.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>📅</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>I dag</Text>
          </View>
          {todayInfo.map((item) => (
            <View
              key={item.id}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: getTypeBgColor(item.type) }]}>
                  <Text style={styles.icon}>{getInfoIcon(item.type)}</Text>
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.headerRow}>
                    <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: getTypeBgColor(item.type) }]}>
                      <Text style={[styles.badgeText, { color: getTypeTextColor(item.type) }]}>
                        {getTypeLabel(item.type)}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.description, { color: colors.textSecondary }]}>
                    {item.description}
                  </Text>
                  {item.targetGroup && (
                    <View style={styles.groupContainer}>
                      <View style={[styles.groupDot, { backgroundColor: colors.primary }]} />
                      <Text style={[styles.groupText, { color: colors.primary }]}>
                        For {item.targetGroup}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Upcoming Info */}
      {upcomingInfo.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🗓️</Text>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Kommende</Text>
          </View>
          {upcomingInfo.map((item) => {
            const date = new Date(item.date);
            return (
              <View
                key={item.id}
                style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={styles.cardContent}>
                  <View style={[styles.iconContainer, { backgroundColor: getTypeBgColor(item.type) }]}>
                    <Text style={styles.icon}>{getInfoIcon(item.type)}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <View style={styles.headerRow}>
                      <View style={styles.titleWithDate}>
                        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
                          {item.title}
                        </Text>
                        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                          {date.toLocaleDateString('no-NO', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </Text>
                      </View>
                      <View style={[styles.badge, { backgroundColor: getTypeBgColor(item.type) }]}>
                        <Text style={[styles.badgeText, { color: getTypeTextColor(item.type) }]}>
                          {getTypeLabel(item.type)}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.description, { color: colors.textSecondary }]}>
                      {item.description}
                    </Text>
                    {item.targetGroup && (
                      <View style={styles.groupContainer}>
                        <View style={[styles.groupDot, { backgroundColor: colors.primary }]} />
                        <Text style={[styles.groupText, { color: colors.primary }]}>
                          For {item.targetGroup}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  titleWithDate: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  groupDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  groupText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
