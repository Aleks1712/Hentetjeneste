import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context-native/ThemeContext';
import { useTranslation } from '../translations-native/translations';
import { Card } from '../components-native/ui/Card';
import { Badge } from '../components-native/ui/Badge';
import { mockNotifications } from '../data-native/mockData';

export function NotificationsScreen() {
  const { colors, language } = useTheme();
  const t = useTranslation(language);

  const todayNotifications = mockNotifications.filter(n => !n.read);
  const earlierNotifications = mockNotifications.filter(n => n.read);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t.notifications}</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today */}
        {todayNotifications.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.today}</Text>
            {todayNotifications.map(notification => (
              <Card key={notification.id} style={styles.notificationCard}>
                <View style={styles.notificationHeader}>
                  <Badge
                    label={
                      notification.type === 'incident' ? '🩹 Hendelse' :
                      notification.type === 'pickup' ? '🚗 Henting' :
                      notification.type === 'daily' ? '📋 Rapport' :
                      '🔔 Påminnelse'
                    }
                    variant={
                      notification.type === 'incident' ? 'warning' :
                      notification.type === 'pickup' ? 'info' :
                      'default'
                    }
                    size="sm"
                  />
                  <Text style={[styles.notificationTime, { color: colors.textSecondary }]}>
                    {notification.timestamp}
                  </Text>
                </View>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  {notification.title}
                </Text>
                <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>
                  {notification.message}
                </Text>
              </Card>
            ))}
          </View>
        )}

        {/* Earlier */}
        {earlierNotifications.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Tidligere</Text>
            {earlierNotifications.map(notification => (
              <Card key={notification.id} style={[styles.notificationCard, { opacity: 0.6 }]}>
                <View style={styles.notificationHeader}>
                  <Badge
                    label={
                      notification.type === 'incident' ? '🩹' :
                      notification.type === 'pickup' ? '🚗' :
                      notification.type === 'daily' ? '📋' :
                      '🔔'
                    }
                    variant="default"
                    size="sm"
                  />
                  <Text style={[styles.notificationTime, { color: colors.textSecondary }]}>
                    {notification.timestamp}
                  </Text>
                </View>
                <Text style={[styles.notificationTitle, { color: colors.text }]}>
                  {notification.title}
                </Text>
                <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>
                  {notification.message}
                </Text>
              </Card>
            ))}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  notificationCard: {
    marginBottom: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationTime: {
    fontSize: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});