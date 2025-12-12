import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context-native/ThemeContext';
import { useTranslation, Language } from '../translations-native/translations';
import { Card } from '../components-native/ui/Card';
import { Badge } from '../components-native/ui/Badge';

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'so', name: 'Soomaali', flag: '🇸🇴' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
];

interface ProfileScreenProps {
  onLogout: () => void;
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const { colors, language, setLanguage, isDarkMode, toggleDarkMode, role, toggleRole } = useTheme();
  const t = useTranslation(language);

  const handleLogout = () => {
    Alert.alert(
      t.logout,
      'Er du sikker på at du vil logge ut?',
      [
        { text: t.cancel, style: 'cancel' },
        { text: t.logout, style: 'destructive', onPress: onLogout },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>{t.profile}</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <Card style={styles.userCard}>
          <View style={[styles.userAvatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.userAvatarText}>👤</Text>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>Demo Bruker</Text>
          <Badge
            label={role === 'parent' ? t.parent : t.staff}
            variant={role === 'parent' ? 'info' : 'success'}
          />
        </Card>

        {/* Role Toggle */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.switchMode}</Text>
          <Card>
            <TouchableOpacity style={styles.settingRow} onPress={toggleRole}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {role === 'parent' ? '👨‍👩‍👧 Forelder-modus' : '👔 Ansatt-modus'}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Trykk for å bytte til {role === 'parent' ? 'ansatt' : 'forelder'}-modus
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>🔄</Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.settings}</Text>
          
          {/* Language */}
          <Card style={{ marginBottom: 12 }}>
            <Text style={[styles.settingLabel, { color: colors.text, marginBottom: 12 }]}>
              {t.language}
            </Text>
            <View style={styles.languageGrid}>
              {LANGUAGES.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    { 
                      backgroundColor: language === lang.code ? colors.primary + '20' : colors.background,
                      borderColor: language === lang.code ? colors.primary : colors.border,
                    }
                  ]}
                  onPress={() => setLanguage(lang.code)}
                >
                  <Text style={styles.languageFlag}>{lang.flag}</Text>
                  <Text style={[
                    styles.languageName,
                    { color: language === lang.code ? colors.primary : colors.text }
                  ]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Dark Mode */}
          <Card>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  {isDarkMode ? '🌙' : '☀️'} {t.darkMode}
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  {isDarkMode ? 'Mørkt tema aktivert' : 'Lyst tema aktivert'}
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>
          </Card>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>{t.privacy}</Text>
          <Card>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>
                  🔒 GDPR & Personvern
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Se personverninnstillinger og databeskyttelse
                </Text>
              </View>
              <Text style={{ color: colors.textSecondary }}>›</Text>
            </View>
          </Card>
        </View>

        {/* Logout */}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.error + '15' }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: colors.error }]}>
            🚪 {t.logout}
          </Text>
        </TouchableOpacity>

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
  userCard: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 24,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userAvatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    marginRight: 8,
  },
  languageFlag: {
    fontSize: 16,
    marginRight: 6,
  },
  languageName: {
    fontSize: 14,
    fontWeight: '500',
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});