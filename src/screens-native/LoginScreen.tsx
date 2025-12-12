import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components-native/ui/Button';
import { useTheme } from '../context-native/ThemeContext';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Demo mode - accept any credentials
    onLogin();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header with Gradient */}
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.header}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>👶</Text>
              </View>
            </View>
            <Text style={styles.title}>Hentetjeneste</Text>
            <Text style={styles.subtitle}>Digital hentetjeneste for barnehager</Text>
          </LinearGradient>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <Text style={[styles.formTitle, { color: colors.text }]}>Velkommen tilbake</Text>
              <Text style={[styles.formSubtitle, { color: colors.textSecondary }]}>
                Logg inn for å fortsette
              </Text>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>E-post</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.surface, 
                    borderColor: colors.border,
                    color: colors.text,
                  }]}
                  placeholder="din.epost@eksempel.no"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>Passord</Text>
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.surface, 
                    borderColor: colors.border,
                    color: colors.text,
                  }]}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <Button
                title="Logg inn"
                onPress={handleLogin}
                variant="primary"
                fullWidth
                style={styles.loginButton}
              />

              <View style={[styles.demoNotice, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[styles.demoText, { color: colors.primary }]}>
                  💡 Demo-modus: Du kan logge inn med hvilken som helst e-post og passord
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  form: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  demoNotice: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
  },
  demoText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
