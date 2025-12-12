import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context-native/ThemeContext';
import { useTranslation } from '../translations-native/translations';
import { Card } from '../components-native/ui/Card';
import { Button } from '../components-native/ui/Button';
import { Badge } from '../components-native/ui/Badge';
import { DailyInfoEditor } from '../components-native/DailyInfoEditor';
import { mockChildren, mockDailyInfo, Child } from '../data-native/mockData';

type Tab = 'all' | 'present' | 'absent';

export function StaffChecklistScreen() {
  const { colors, language } = useTheme();
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [showDailyInfoEditor, setShowDailyInfoEditor] = useState(false);
  const [childrenStatus, setChildrenStatus] = useState<{ [key: string]: Child }>(() => {
    const statusMap: { [key: string]: Child } = {};
    mockChildren.forEach(child => {
      statusMap[child.id] = { ...child };
    });
    return statusMap;
  });

  const handleCheckIn = (childId: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    setChildrenStatus(prev => ({
      ...prev,
      [childId]: {
        ...prev[childId],
        status: 'present',
        checkInTime: timeString,
        checkOutTime: undefined,
      }
    }));
  };

  const handleCheckOut = (childId: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    setChildrenStatus(prev => ({
      ...prev,
      [childId]: {
        ...prev[childId],
        status: 'home',
        checkOutTime: timeString,
      }
    }));
  };

  const children = Object.values(childrenStatus);
  const presentCount = children.filter(c => c.status === 'present').length;
  const absentCount = children.filter(c => c.status === 'home').length;

  const filteredChildren = children.filter(child => {
    if (activeTab === 'present') return child.status === 'present';
    if (activeTab === 'absent') return child.status === 'home';
    return true;
  });

  // Group by group name
  const groupedChildren = filteredChildren.reduce((acc, child) => {
    if (!acc[child.group]) {
      acc[child.group] = [];
    }
    acc[child.group].push(child);
    return acc;
  }, {} as { [key: string]: Child[] });

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
            <Text style={styles.logoIcon}>✓</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>{t.checklist}</Text>
            <Text style={styles.headerSubtitle}>Ansatt-modus</Text>
          </View>
          <TouchableOpacity 
            onPress={() => setShowDailyInfoEditor(true)}
            style={styles.headerButton}
          >
            <Text style={styles.headerButtonText}>📅</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats Bar */}
      <View style={[styles.statsBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.success }]}>{presentCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t.present}</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.textSecondary }]}>{absentCount}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{t.absent}</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>{children.length}</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Totalt</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={[styles.tabs, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && { borderBottomColor: colors.primary }]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'all' ? colors.primary : colors.textSecondary }]}>
            Alle ({children.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'present' && { borderBottomColor: colors.primary }]}
          onPress={() => setActiveTab('present')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'present' ? colors.primary : colors.textSecondary }]}>
            {t.present} ({presentCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'absent' && { borderBottomColor: colors.primary }]}
          onPress={() => setActiveTab('absent')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'absent' ? colors.primary : colors.textSecondary }]}>
            {t.absent} ({absentCount})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedChildren).map(([groupName, groupChildren]) => (
          <View key={groupName} style={styles.group}>
            <Text style={[styles.groupTitle, { color: colors.text }]}>
              {groupName} ({groupChildren.length})
            </Text>
            {groupChildren.map(child => (
              <Card key={child.id} style={styles.childCard}>
                <View style={styles.childRow}>
                  <View style={[styles.childAvatar, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.childAvatarText, { color: colors.primary }]}>
                      {child.name.charAt(0)}
                    </Text>
                  </View>
                  
                  <View style={styles.childInfo}>
                    <Text style={[styles.childName, { color: colors.text }]}>{child.name}</Text>
                    {child.checkInTime && (
                      <Text style={[styles.childTime, { color: colors.textSecondary }]}>
                        Ankom: {child.checkInTime}
                      </Text>
                    )}
                    {child.checkOutTime && (
                      <Text style={[styles.childTime, { color: colors.textSecondary }]}>
                        Hentet: {child.checkOutTime}
                      </Text>
                    )}
                  </View>

                  <View style={styles.childActions}>
                    {child.status === 'home' ? (
                      <Button
                        title="Kryss inn"
                        onPress={() => handleCheckIn(child.id)}
                        variant="primary"
                        size="sm"
                      />
                    ) : (
                      <Button
                        title="Kryss ut"
                        onPress={() => handleCheckOut(child.id)}
                        variant="outline"
                        size="sm"
                      />
                    )}
                  </View>
                </View>
              </Card>
            ))}
          </View>
        ))}

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Daily Info Editor Modal */}
      {showDailyInfoEditor && (
        <DailyInfoEditor
          info={mockDailyInfo}
          onClose={() => setShowDailyInfoEditor(false)}
          onSave={(updatedInfo) => {
            console.log('Daily info updated:', updatedInfo);
            setShowDailyInfoEditor(false);
          }}
        />
      )}
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
    color: '#FFFFFF',
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  headerButtonText: {
    fontSize: 20,
  },
  statsBar: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    marginHorizontal: 16,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  group: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  childCard: {
    marginBottom: 12,
  },
  childRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  childAvatarText: {
    fontSize: 20,
    fontWeight: '600',
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  childTime: {
    fontSize: 14,
  },
  childActions: {
    marginLeft: 12,
  },
  bottomSpacing: {
    height: 20,
  },
});