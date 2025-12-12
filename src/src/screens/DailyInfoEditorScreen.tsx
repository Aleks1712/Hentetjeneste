import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDailyInfo, useDailyInfoMutations } from '../hooks/useDailyInfo';
import { DailyInfoInput, DailyInfoType } from '../types/dailyInfo';
import { theme } from '../theme';
import { getTodayISO } from '../utils/date';

export function DailyInfoEditorScreen() {
  const navigation = useNavigation();
  const { data, isLoading, refetch } = useDailyInfo();
  const { create, update, delete: remove } = useDailyInfoMutations();

  const [newItem, setNewItem] = useState<DailyInfoInput>({
    date: getTodayISO(),
    type: 'announcement',
    title: '',
    description: '',
    target_group: null,
  });

  const handleCreate = async () => {
    if (!newItem.title.trim() || !newItem.description.trim()) {
      Alert.alert('Feil', 'Vennligst fyll ut tittel og beskrivelse');
      return;
    }

    try {
      await create.mutateAsync(newItem);
      setNewItem({
        date: getTodayISO(),
        type: 'announcement',
        title: '',
        description: '',
        target_group: null,
      });
      Alert.alert('Suksess', 'Informasjon lagt til!');
    } catch (error) {
      Alert.alert('Feil', 'Kunne ikke legge til informasjon');
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Slett informasjon',
      'Er du sikker på at du vil slette denne informasjonen?',
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Slett',
          style: 'destructive',
          onPress: async () => {
            try {
              await remove.mutateAsync(id);
              Alert.alert('Slettet', 'Informasjonen er slettet');
            } catch (error) {
              Alert.alert('Feil', 'Kunne ikke slette informasjon');
            }
          },
        },
      ]
    );
  };

  const typeOptions: { value: DailyInfoType; label: string; emoji: string }[] = [
    { value: 'announcement', label: 'Beskjed', emoji: '📢' },
    { value: 'menu', label: 'Meny', emoji: '🍽️' },
    { value: 'activity', label: 'Aktivitet', emoji: '🎨' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Tilbake</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Rediger daglig info</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Create new */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Legg til ny informasjon</Text>

          {/* Type selector */}
          <Text style={styles.label}>Type</Text>
          <View style={styles.typeRow}>
            {typeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.typeButton,
                  newItem.type === option.value && styles.typeButtonActive,
                ]}
                onPress={() => setNewItem({ ...newItem, type: option.value })}
              >
                <Text style={styles.typeEmoji}>{option.emoji}</Text>
                <Text
                  style={[
                    styles.typeLabel,
                    newItem.type === option.value && styles.typeLabelActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Title */}
          <Text style={styles.label}>Tittel</Text>
          <TextInput
            style={styles.input}
            placeholder="F.eks. Lunsj i dag"
            value={newItem.title}
            onChangeText={(text) => setNewItem({ ...newItem, title: text })}
          />

          {/* Description */}
          <Text style={styles.label}>Beskrivelse</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Skriv detaljer her..."
            value={newItem.description}
            onChangeText={(text) => setNewItem({ ...newItem, description: text })}
            multiline
            numberOfLines={4}
          />

          {/* Target group */}
          <Text style={styles.label}>Målgruppe (valgfritt)</Text>
          <TextInput
            style={styles.input}
            placeholder="F.eks. Blåklokka, Solstråla (tom = alle)"
            value={newItem.target_group || ''}
            onChangeText={(text) =>
              setNewItem({ ...newItem, target_group: text || null })
            }
          />

          {/* Create button */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreate}
            disabled={create.isPending}
          >
            <Text style={styles.createButtonText}>
              {create.isPending ? 'Legger til...' : 'Legg til'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Existing items */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Eksisterende informasjon</Text>
          {isLoading ? (
            <Text style={styles.loadingText}>Laster...</Text>
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <View key={item.id} style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemType}>
                    {typeOptions.find((t) => t.value === item.type)?.emoji}{' '}
                    {typeOptions.find((t) => t.value === item.type)?.label}
                  </Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  {item.target_group && (
                    <Text style={styles.itemGroup}>👥 {item.target_group}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>Ingen informasjon lagt til ennå</Text>
          )}
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
  },
  backButton: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: theme.colors.background.default,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  cardTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    marginTop: theme.spacing.sm,
  },
  typeRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border.main,
    gap: theme.spacing.xs,
  },
  typeButtonActive: {
    borderColor: theme.colors.primary[600],
    backgroundColor: theme.colors.primary[50],
  },
  typeEmoji: {
    fontSize: 20,
  },
  typeLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  typeLabelActive: {
    color: theme.colors.primary[600],
    fontWeight: theme.fontWeight.semibold,
  },
  input: {
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text.primary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  createButton: {
    backgroundColor: theme.colors.primary[600],
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  createButtonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
  loadingText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    padding: theme.spacing.lg,
  },
  emptyText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    padding: theme.spacing.lg,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  itemLeft: {
    flex: 1,
  },
  itemType: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  itemTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  itemDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  itemGroup: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  deleteButton: {
    padding: theme.spacing.xs,
  },
  deleteButtonText: {
    fontSize: 20,
  },
});
