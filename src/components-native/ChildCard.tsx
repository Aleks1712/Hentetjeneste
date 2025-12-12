import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { useTheme } from '../context-native/ThemeContext';
import { Child } from '../data-native/mockData';

interface ChildCardProps {
  child: Child;
  onPress?: () => void;
  isSelected?: boolean;
  showCheckbox?: boolean;
}

export function ChildCard({ child, onPress, isSelected, showCheckbox }: ChildCardProps) {
  const { colors } = useTheme();

  const isPresent = child.status === 'present';

  return (
    <Card onPress={onPress} style={[
      styles.card,
      isSelected && { borderColor: colors.primary, borderWidth: 2 }
    ]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {child.name.charAt(0)}
          </Text>
        </View>
        
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]}>{child.name}</Text>
          <Text style={[styles.group, { color: colors.textSecondary }]}>
            {child.group} {child.age && `• ${child.age} år`}
          </Text>
        </View>
        
        <Badge
          label={isPresent ? 'Tilstede' : 'Hjemme'}
          variant={isPresent ? 'success' : 'default'}
          size="sm"
        />
      </View>

      {child.checkInTime && (
        <View style={[styles.timeInfo, { borderTopColor: colors.border }]}>
          <Text style={[styles.timeLabel, { color: colors.textSecondary }]}>
            Ankom: {child.checkInTime}
          </Text>
        </View>
      )}

      {child.allergies && child.allergies.length > 0 && (
        <View style={[styles.allergies, { backgroundColor: colors.error + '10' }]}>
          <Text style={[styles.allergiesText, { color: colors.error }]}>
            ⚠️ {child.allergies.join(', ')}
          </Text>
        </View>
      )}

      {child.pickupStatus && (
        <View style={[styles.pickupInfo, { backgroundColor: colors.warning + '15' }]}>
          <Text style={[styles.pickupText, { color: colors.warning }]}>
            🔔 {child.pickupPerson} - {child.pickupStatus === 'pending' ? 'Venter godkjenning' : 'Godkjent'}
          </Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  group: {
    fontSize: 14,
  },
  timeInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  timeLabel: {
    fontSize: 14,
  },
  allergies: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
  },
  allergiesText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pickupInfo: {
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
  },
  pickupText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
