import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context-native/ThemeContext';
import { useTranslation } from '../translations-native/translations';
import { ChildCard } from '../components-native/ChildCard';
import { DailyInfoView } from '../components-native/DailyInfoView';
import { Card } from '../components-native/ui/Card';
import { Badge } from '../components-native/ui/Badge';
import { mockChildren, mockIncidents, mockDailyInfo } from '../data-native/mockData';

export function ParentHomeScreen() {
  const { colors, language } = useTheme();
  const t = useTranslation(language);
  const [selectedChildId, setSelectedChildId] = useState('child-1');

  // Filter: Parent only sees their own children
  const myChildren = mockChildren.filter(child => 
    child.id === 'child-1' || child.id === 'child-5' || child.id === 'child-7'
  );

  const selectedChild = myChildren.find(c => c.id === selectedChildId);
  const childIncidents = selectedChild ? mockIncidents.filter(i => i.childId === selectedChild.id) : [];
  const todayInfo = mockDailyInfo.filter(info => {
    if (info.targetGroup) {
      return info.targetGroup === selectedChild?.group;
    }
    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoSmall}>
            <Text style={styles.logoIcon}>👶</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Hentetjeneste</Text>
            <Text style={styles.headerSubtitle}>Forelder-modus</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Demo Banner */}
        <View style={[styles.demoBanner, { backgroundColor: colors.primary + '15' }]}>
          <View style={[styles.demoIcon, { backgroundColor: colors.primary + '30' }]}>
            <Text>ℹ️</Text>
          </View>
          <View style={styles.demoText}>
            <Text style={[styles.demoBannerTitle, { color: colors.primary }]}>Demo-modus</Text>
            <Text style={[styles.demoBannerDesc, { color: colors.text }]}>
              Du ser foreldre-visningen med 3 barn. Trykk på et barn for å se detaljer.
            </Text>
          </View>
        </View>

        {/* My Children */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.myChildren} ({myChildren.length})
          </Text>
          {myChildren.map(child => (
            <ChildCard
              key={child.id}
              child={child}
              onPress={() => setSelectedChildId(child.id)}
              isSelected={selectedChildId === child.id}
            />
          ))}
        </View>

        {/* Today's Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.dailyInfo}
          </Text>
          <DailyInfoView 
            info={mockDailyInfo} 
            targetGroup={selectedChild?.group}
          />
        </View>

        {/* Recent Incidents */}
        {childIncidents.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t.incidents}
            </Text>
            {childIncidents.map(incident => (
              <Card key={incident.id} style={styles.incidentCard}>
                <View style={styles.incidentHeader}>
                  <Badge
                    label={incident.type === 'injury' ? '🩹 Skade' : incident.type === 'illness' ? '🤒 Syk' : 'ℹ️ Info'}
                    variant={incident.severity === 'high' ? 'error' : incident.severity === 'medium' ? 'warning' : 'info'}
                    size="sm"
                  />
                  <Text style={[styles.incidentTime, { color: colors.textSecondary }]}>
                    {new Date(incident.reportedAt).toLocaleDateString('no-NO', { 
                      day: 'numeric', 
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
                <Text style={[styles.incidentTitle, { color: colors.text }]}>{incident.title}</Text>
                <Text style={[styles.incidentDescription, { color: colors.textSecondary }]}>
                  {incident.description}
                </Text>
                {incident.actionTaken && (
                  <View style={[styles.actionTaken, { backgroundColor: colors.success + '10' }]}>
                    <Text style={[styles.actionTakenText, { color: colors.success }]}>
                      ✓ Tiltak: {incident.actionTaken}
                    </Text>
                  </View>
                )}
              </Card>
            ))}
          </View>
        )}

        {/* Bottom Spacing */}
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
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSmall: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoIcon: {
    fontSize: 20,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  demoBanner: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  demoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  demoText: {
    flex: 1,
  },
  demoBannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  demoBannerDesc: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoCard: {
    marginBottom: 12,
  },
  infoHeader: {
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  incidentCard: {
    marginBottom: 12,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incidentTime: {
    fontSize: 12,
  },
  incidentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  incidentDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  actionTaken: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  actionTakenText: {
    fontSize: 13,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 20,
  },
});