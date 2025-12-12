import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input, Card } from '../ui';
import { colors, spacing, textStyles } from '../theme';
import { useTheme } from '../context/ThemeContext';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={[styles.logo, isDark && styles.logoDark]}>
              <Text style={styles.logoEmoji}>👨‍👩‍👧</Text>
            </View>
            <Text style={[styles.title, isDark && styles.titleDark]}>Hentetjeneste</Text>
            <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
              Digital hentetjeneste for barnehager
            </Text>
          </View>

          {/* Login Form */}
          <Card darkMode={isDark} padding="lg" style={styles.formCard}>
            <Input
              label="E-post"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="din@epost.no"
              darkMode={isDark}
              containerStyle={styles.inputContainer}
            />
            <Input
              label="Passord"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              darkMode={isDark}
              containerStyle={styles.inputContainer}
            />
            <Button
              title="Logg inn"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              size="lg"
              style={styles.loginButton}
            />
          </Card>

          {/* Demo Info */}
          <View style={styles.demoInfo}>
            <Text style={[styles.demoText, isDark && styles.demoTextDark]}>
              Demo-versjon • GDPR-kompatibel • Sikker innlogging
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing['3xl'],
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.parent.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  logoDark: {
    backgroundColor: colors.parent.dark,
  },
  logoEmoji: {
    fontSize: 40,
  },
  title: {
    ...textStyles.h1,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  titleDark: {
    color: colors.dark.text,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.gray[600],
    textAlign: 'center',
  },
  subtitleDark: {
    color: colors.dark.textSecondary,
  },
  formCard: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.base,
  },
  loginButton: {
    marginTop: spacing.md,
  },
  demoInfo: {
    alignItems: 'center',
  },
  demoText: {
    ...textStyles.caption,
    color: colors.gray[500],
    textAlign: 'center',
  },
  demoTextDark: {
    color: colors.gray[400],
  },
});
