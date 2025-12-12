import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../context-native/ThemeContext';
import { DailyInfo } from '../data-native/mockData';

interface DailyInfoEditorProps {
  info: DailyInfo[];
  onClose: () => void;
  onSave: (updatedInfo: DailyInfo[]) => void;
}

export function DailyInfoEditor({ info, onClose, onSave }: DailyInfoEditorProps) {
  const { colors } = useTheme();
  const [items, setItems] = useState<DailyInfo[]>(info);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);

  // New item form
  const [newItem, setNewItem] = useState<Partial<DailyInfo>>({
    type: 'announcement',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Edit state
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

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

  const handleEdit = (item: DailyInfo) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleSaveEdit = (itemId: string) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, title: editTitle, description: editDescription } : item
      )
    );
    setEditingId(null);
  };

  const handleDelete = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  const handleAddNew = () => {
    if (newItem.title && newItem.description) {
      const newDailyInfo: DailyInfo = {
        id: `info-${Date.now()}`,
        type: newItem.type as 'menu' | 'activity' | 'announcement',
        title: newItem.title,
        description: newItem.description,
        date: newItem.date || new Date().toISOString().split('T')[0],
        targetGroup: newItem.targetGroup,
      };
      setItems([...items, newDailyInfo]);
      setNewItem({
        type: 'announcement',
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowAddNew(false);
    }
  };

  const handleSaveAll = () => {
    onSave(items);
    onClose();
  };

  return (
    <Modal visible={true} animationType="slide" presentationStyle="pageSheet">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <View style={styles.headerLeft}>
            <View style={[styles.headerIcon, { backgroundColor: colors.primary + '20' }]}>
              <Text style={styles.headerIconText}>📅</Text>
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: colors.text }]}>Rediger daglig info</Text>
              <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                Oppdater informasjon til foreldre
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={[styles.closeButtonText, { color: colors.textSecondary }]}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Add New Button */}
          <TouchableOpacity
            onPress={() => setShowAddNew(!showAddNew)}
            style={[styles.addButton, { borderColor: colors.border }]}
          >
            <Text style={styles.addButtonIcon}>➕</Text>
            <Text style={[styles.addButtonText, { color: colors.textSecondary }]}>
              Legg til ny info
            </Text>
          </TouchableOpacity>

          {/* Add New Form */}
          {showAddNew && (
            <View style={[styles.formContainer, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '30' }]}>
              <Text style={[styles.formTitle, { color: colors.text }]}>Ny informasjon</Text>

              {/* Type Selector */}
              <Text style={[styles.label, { color: colors.text }]}>Type</Text>
              <View style={styles.typeSelector}>
                {(['announcement', 'menu', 'activity'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setNewItem({ ...newItem, type })}
                    style={[
                      styles.typeButton,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                      newItem.type === type && { backgroundColor: colors.primary, borderColor: colors.primary },
                    ]}
                  >
                    <Text style={[styles.typeButtonText, { color: newItem.type === type ? '#FFFFFF' : colors.text }]}>
                      {getTypeLabel(type)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Title */}
              <Text style={[styles.label, { color: colors.text }]}>Tittel</Text>
              <TextInput
                value={newItem.title}
                onChangeText={(text) => setNewItem({ ...newItem, title: text })}
                placeholder="F.eks: Fiskeboller og grønnsaker"
                placeholderTextColor={colors.textSecondary}
                style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              />

              {/* Description */}
              <Text style={[styles.label, { color: colors.text }]}>Beskrivelse</Text>
              <TextInput
                value={newItem.description}
                onChangeText={(text) => setNewItem({ ...newItem, description: text })}
                placeholder="Skriv mer detaljer..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={3}
                style={[styles.textArea, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
              />

              {/* Group Selector */}
              <Text style={[styles.label, { color: colors.text }]}>Gruppe (valgfritt)</Text>
              <View style={styles.typeSelector}>
                {(['', 'Blåklokka', 'Solstråla'] as const).map((group) => (
                  <TouchableOpacity
                    key={group || 'all'}
                    onPress={() => setNewItem({ ...newItem, targetGroup: group || undefined })}
                    style={[
                      styles.typeButton,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                      (newItem.targetGroup || '') === group && { backgroundColor: colors.primary, borderColor: colors.primary },
                    ]}
                  >
                    <Text style={[styles.typeButtonText, { color: (newItem.targetGroup || '') === group ? '#FFFFFF' : colors.text }]}>
                      {group || 'Alle'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Action Buttons */}
              <View style={styles.formActions}>
                <TouchableOpacity
                  onPress={handleAddNew}
                  disabled={!newItem.title || !newItem.description}
                  style={[
                    styles.primaryButton,
                    { backgroundColor: colors.primary },
                    (!newItem.title || !newItem.description) && styles.buttonDisabled,
                  ]}
                >
                  <Text style={styles.primaryButtonText}>Legg til</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowAddNew(false)} style={[styles.secondaryButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Avbryt</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Existing Items */}
          {items.map((item) => {
            const isEditing = editingId === item.id;

            return (
              <View
                key={item.id}
                style={[styles.itemCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                {isEditing ? (
                  <View>
                    <TextInput
                      value={editTitle}
                      onChangeText={setEditTitle}
                      style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border, marginBottom: 8 }]}
                    />
                    <TextInput
                      value={editDescription}
                      onChangeText={setEditDescription}
                      multiline
                      numberOfLines={3}
                      style={[styles.textArea, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
                    />
                    <View style={styles.editActions}>
                      <TouchableOpacity
                        onPress={() => handleSaveEdit(item.id)}
                        style={[styles.primaryButton, { backgroundColor: '#10B981' }]}
                      >
                        <Text style={styles.primaryButtonText}>💾 Lagre</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setEditingId(null)}
                        style={[styles.secondaryButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                      >
                        <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Avbryt</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={styles.itemHeader}>
                      <View style={[styles.itemIconContainer, { backgroundColor: getTypeBgColor(item.type) }]}>
                        <Text style={styles.itemIcon}>{getInfoIcon(item.type)}</Text>
                      </View>
                      <View style={styles.itemContent}>
                        <View style={styles.itemTitleRow}>
                          <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
                          <View style={[styles.typeBadge, { backgroundColor: getTypeBgColor(item.type) }]}>
                            <Text style={styles.typeBadgeText}>{getTypeLabel(item.type)}</Text>
                          </View>
                        </View>
                        <Text style={[styles.itemDescription, { color: colors.textSecondary }]}>
                          {item.description}
                        </Text>
                        <View style={styles.itemFooter}>
                          {item.targetGroup && (
                            <View style={styles.groupBadge}>
                              <View style={[styles.groupDot, { backgroundColor: colors.primary }]} />
                              <Text style={[styles.groupText, { color: colors.primary }]}>
                                For {item.targetGroup}
                              </Text>
                            </View>
                          )}
                          <Text style={[styles.dateText, { color: colors.textSecondary }]}>
                            {new Date(item.date).toLocaleDateString('no-NO', { day: 'numeric', month: 'long' })}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.itemActions}>
                      <TouchableOpacity
                        onPress={() => handleEdit(item)}
                        style={[styles.actionButton, { backgroundColor: colors.primary + '15' }]}
                      >
                        <Text style={styles.actionButtonText}>✏️ Rediger</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDelete(item.id)}
                        style={[styles.actionButton, { backgroundColor: '#FEE2E2' }]}
                      >
                        <Text style={styles.actionButtonText}>🗑️ Slett</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>

        {/* Footer */}
        <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            {items.length} element{items.length !== 1 ? 'er' : ''}
          </Text>
          <View style={styles.footerActions}>
            <TouchableOpacity onPress={onClose} style={[styles.secondaryButton, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Avbryt</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveAll} style={[styles.primaryButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.primaryButtonText}>💾 Lagre alle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  addButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  addButtonIcon: {
    fontSize: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  formContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  typeButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    marginBottom: 8,
  },
  textArea: {
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    marginBottom: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  formActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  itemCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  itemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIcon: {
    fontSize: 24,
  },
  itemContent: {
    flex: 1,
  },
  itemTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupBadge: {
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
  dateText: {
    fontSize: 12,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 14,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 8,
  },
});
