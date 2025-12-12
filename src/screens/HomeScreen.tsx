import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Badge } from '../ui';
import { colors, spacing, textStyles, borderRadius } from '../theme';
import { useTheme } from '../context/ThemeContext';

export function HomeScreen() {
  const { colorScheme, userRole } = useTheme();
  const isDark = colorScheme === 'dark';
  const isStaff = userRole === 'staff';
  
  const primaryColor = isStaff ? colors.staff.primary : colors.parent.primary;
  const bgColor = isStaff ? colors.staff.bg : colors.parent.bg;

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            {isStaff ? 'Hurtighandlinger' : 'Mine barn'}
          </Text>
          
          {isStaff ? (
            <View style={styles.grid}>
              <QuickActionCard
                icon="✓"
                title="Krysselista"
                subtitle="Se inn/ut status"
                color={primaryColor}
                isDark={isDark}
                onPress={() => {}}
              />
              <QuickActionCard
                icon="👥"
                title="Alle barn"
                subtitle="15 barn i dag"
                color={primaryColor}
                isDark={isDark}
                onPress={() => {}}
              />
            </View>
          ) : (
            <Card darkMode={isDark} style={styles.childCard}>
              <View style={styles.childHeader}>
                <View style={[styles.childAvatar, { backgroundColor: bgColor }]}>
                  <Text style={styles.childAvatarText}>👧</Text>
                </View>
                <View style={styles.childInfo}>
                  <Text style={[styles.childName, isDark && styles.childNameDark]}>
                    Emma Nordmann
                  </Text>
                  <Badge label="Til stede" variant="success" size="sm" />
                </View>
              </View>
              <View style={styles.childDetails}>
                <InfoRow
                  label="Innsjekk"
                  value="08:15"
                  isDark={isDark}
                />
                <InfoRow
                  label="Hentes av"
                  value="Mor (godkjent)"
                  isDark={isDark}
                />
              </View>
            </Card>
          )}
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Dagens plan
          </Text>
          <Card darkMode={isDark} padding="lg">
            <ScheduleItem
              time="09:00"
              activity="Morgensamling"
              isDark={isDark}
            />
            <ScheduleItem
              time="10:30"
              activity="Lek ute"
              isDark={isDark}
            />
            <ScheduleItem
              time="12:00"
              activity="Lunsj"
              isDark={isDark}
            />
          </Card>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
            Siste aktivitet
          </Text>
          <Card darkMode={isDark} padding="lg">
            <ActivityItem
              icon="📸"
              title="Nye bilder lastet opp"
              time="2 timer siden"
              isDark={isDark}
            />
            <ActivityItem
              icon="📝"
              title="Ukeplan oppdatert"
              time="I går"
              isDark={isDark}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper Components
function QuickActionCard({ icon, title, subtitle, color, isDark, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.quickAction, isDark && styles.quickActionDark]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: color + '15' }]}>
        <Text style={styles.quickActionEmoji}>{icon}</Text>
      </View>
      <Text style={[styles.quickActionTitle, isDark && styles.quickActionTitleDark]}>
        {title}
      </Text>
      <Text style={[styles.quickActionSubtitle, isDark && styles.quickActionSubtitleDark]}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

function InfoRow({ label, value, isDark }: any) {
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, isDark && styles.infoLabelDark]}>{label}</Text>
      <Text style={[styles.infoValue, isDark && styles.infoValueDark]}>{value}</Text>
    </View>
  );
}

function ScheduleItem({ time, activity, isDark }: any) {
  return (
    <View style={styles.scheduleItem}>
      <View style={[styles.timeBadge, isDark && styles.timeBadgeDark]}>
        <Text style={[styles.timeText, isDark && styles.timeTextDark]}>{time}</Text>
      </View>
      <Text style={[styles.activityText, isDark && styles.activityTextDark]}>{activity}</Text>
    </View>
  );
}

function ActivityItem({ icon, title, time, isDark }: any) {
  return (
    <View style={styles.activityItem}>
      <Text style={styles.activityIcon}>{icon}</Text>
      <View style={styles.activityContent}>
        <Text style={[styles.activityTitle, isDark && styles.activityTitleDark]}>{title}</Text>
        <Text style={[styles.activityTime, isDark && styles.activityTimeDark]}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  containerDark: {
    backgroundColor: colors.dark.bg,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...textStyles.h3,
    color: colors.gray[900],
    marginBottom: spacing.base,
  },
  sectionTitleDark: {
    color: colors.dark.text,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignItems: 'center',
  },
  quickActionDark: {
    backgroundColor: colors.dark.card,
    borderColor: colors.dark.border,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  quickActionEmoji: {
    fontSize: 28,
  },
  quickActionTitle: {
    ...textStyles.label,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  quickActionTitleDark: {
    color: colors.dark.text,
  },
  quickActionSubtitle: {
    ...textStyles.caption,
    color: colors.gray[600],
  },
  quickActionSubtitleDark: {
    color: colors.dark.textSecondary,
  },
  childCard: {
    padding: spacing.lg,
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  childAvatar: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  childAvatarText: {
    fontSize: 28,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    ...textStyles.h4,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  childNameDark: {
    color: colors.dark.text,
  },
  childDetails: {
    gap: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  infoLabel: {
    ...textStyles.bodySmall,
    color: colors.gray[600],
  },
  infoLabelDark: {
    color: colors.dark.textSecondary,
  },
  infoValue: {
    ...textStyles.bodySmall,
    color: colors.gray[900],
    fontWeight: '500',
  },
  infoValueDark: {
    color: colors.dark.text,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timeBadge: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  timeBadgeDark: {
    backgroundColor: colors.dark.bg,
  },
  timeText: {
    ...textStyles.label,
    color: colors.gray[700],
  },
  timeTextDark: {
    color: colors.dark.text,
  },
  activityText: {
    ...textStyles.body,
    color: colors.gray[900],
  },
  activityTextDark: {
    color: colors.dark.text,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...textStyles.body,
    color: colors.gray[900],
    marginBottom: spacing.xs / 2,
  },
  activityTitleDark: {
    color: colors.dark.text,
  },
  activityTime: {
    ...textStyles.caption,
    color: colors.gray[600],
  },
  activityTimeDark: {
    color: colors.dark.textSecondary,
  },
});
