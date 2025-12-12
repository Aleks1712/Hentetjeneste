# 🚀 Setup Instruksjoner - React Native/Expo

## Problem
Du hadde bygget appen som en React web-app (Vite, React DOM, Tailwind) i stedet for React Native/Expo.

## Løsning
Jeg har laget en komplett React Native/Expo struktur med alle riktige komponenter og dependencies.

---

## 📋 Steg-for-steg Setup

### 1. Installer Expo CLI globalt (valgfritt)
```bash
npm install -g expo-cli
```

### 2. Bytt til Native Package.json
```bash
# Backup gammel web package.json
cp package.json package-web-backup.json

# Bruk den nye native package.json
cp package-native.json package.json
```

### 3. Installer Dependencies
```bash
# Fjern node_modules og package-lock hvis nødvendig
rm -rf node_modules package-lock.json

# Installer alle dependencies
npm install
```

### 4. Installer Expo Go på telefonen
- **iOS**: [App Store](https://apps.apple.com/app/apple-store/id982107779)
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### 5. Start Development Server
```bash
npx expo start
```

### 6. Åpne på enheten din
Du får en QR-kode i terminalen:
- **iOS**: Skann QR-koden med kamera-appen
- **Android**: Skann QR-koden i Expo Go appen

Eller kjør i simulator:
```bash
# iOS Simulator (krever Xcode)
npx expo start --ios

# Android Emulator (krever Android Studio)
npx expo start --android
```

---

## 📁 Nye Filer Opprettet

### Core App Files
- `/App-Native.tsx` - Hovedkomponent for React Native
- `/index.js` - Expo entry point
- `/app.json` - Expo config
- `/babel.config.js` - Babel config for Expo
- `/package-native.json` - Native dependencies
- `/tsconfig-native.json` - TypeScript config

### Theme System
- `/theme/colors.ts` - Fargepalett (Blå for ansatt, Lilla for foreldre)
- `/theme/typography.ts` - Typography system
- `/theme/spacing.ts` - Spacing & shadows
- `/theme/index.ts` - Theme exports

### UI Components (React Native)
- `/ui/Button.tsx` - Knapper med varianter
- `/ui/Card.tsx` - Kort-komponenter
- `/ui/Input.tsx` - Input-felter
- `/ui/Badge.tsx` - Status badges
- `/ui/index.ts` - UI exports

### Screens
- `/screens/LoginScreen.tsx` - Innloggingsside
- `/screens/HomeScreen.tsx` - Hjem med barn-oversikt
- `/screens/NotificationsScreen.tsx` - Varsler
- `/screens/ProfileScreen.tsx` - Profil og innstillinger
- `/screens/index.ts` - Screen exports

### Navigation
- `/navigation/AppNavigator.tsx` - Bottom tab navigation

### State Management
- `/context/ThemeContext.tsx` - Theme og rolle state

### Documentation
- `/README-NATIVE.md` - Native-spesifikk dokumentasjon
- `/SETUP-INSTRUCTIONS.md` - Denne filen

---

## 🎨 Viktige Forskjeller fra Web-versjon

### JSX Elements
❌ **Web (feil)**:
```jsx
<div className="container">
  <h1 className="text-2xl">Tittel</h1>
  <button onClick={handleClick}>Klikk</button>
</div>
```

✅ **Native (riktig)**:
```jsx
<View style={styles.container}>
  <Text style={styles.title}>Tittel</Text>
  <TouchableOpacity onPress={handleClick}>
    <Text>Klikk</Text>
  </TouchableOpacity>
</View>
```

### Styling
❌ **Web (feil)**:
```jsx
className="bg-blue-500 p-4 rounded-lg"
```

✅ **Native (riktig)**:
```jsx
style={[styles.button, { backgroundColor: colors.staff.primary }]}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
  },
});
```

### Imports
❌ **Web (feil)**:
```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
```

✅ **Native (riktig)**:
```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
```

---

## 🔑 Key Features Implementert

### ✅ Theme System
- Blå (#2563EB) for ansatt-modus
- Lilla (#8B5CF6) for foreldre-modus
- Mørk modus support
- Context-basert state management

### ✅ Navigation
- Bottom tab navigation
- 3 hovedskjermer (Hjem, Varsler, Profil)
- Icon-badges for varsler
- Rolle-basert UI

### ✅ UI Components
- Button med varianter (primary, secondary, outline, ghost)
- Card med mørk modus
- Input med labels og error states
- Badge med semantic colors

### ✅ Screens
- **LoginScreen**: E-post/passord innlogging
- **HomeScreen**: Barn-oversikt, dagens plan, siste aktivitet
- **NotificationsScreen**: Varselliste med badges
- **ProfileScreen**: Brukerinfo, innstillinger, om appen

---

## 🔧 Feilsøking

### Problem: "Expo Go not found"
**Løsning**: Installer Expo Go fra App Store/Google Play

### Problem: "Metro bundler error"
**Løsning**: 
```bash
npx expo start --clear
```

### Problem: "Module not found"
**Løsning**:
```bash
rm -rf node_modules
npm install
```

### Problem: "Can't scan QR code"
**Løsning**: Bruk tunnel mode:
```bash
npx expo start --tunnel
```

### Problem: "Component not working on device"
**Løsning**: Sjekk at du ikke bruker web-only APIs (DOM, window, document)

---

## 📦 Neste Steg - Funksjoner å Legge Til

### 1. Krysselista (Check-in/out)
```bash
# Opprett ny screen
/screens/ChecklistScreen.tsx
```

### 2. Henteforespørsler
```bash
# Opprett ny screen
/screens/PickupRequestScreen.tsx
```

### 3. Supabase Backend
```bash
# Opprett Supabase client
/services/supabase.ts

# Installer dependencies
npm install @supabase/supabase-js @react-native-async-storage/async-storage
```

### 4. Push Notifications
```bash
# Installer Expo notifications
npx expo install expo-notifications
```

### 5. Flerspråklig (i18n)
```bash
# Opprett translations
/translations/no.ts
/translations/en.ts
/translations/index.ts
```

---

## 📚 Ressurser

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Supabase Docs](https://supabase.com/docs)

---

## ✅ Sjekkliste

- [ ] Installert dependencies (`npm install`)
- [ ] Installert Expo Go på telefon
- [ ] Startet development server (`npx expo start`)
- [ ] Testet appen på telefon/simulator
- [ ] Bekreftet at alle 3 tabs fungerer
- [ ] Testet mørk modus toggle
- [ ] Testet rolle-bytte (Forelder ↔ Ansatt)

---

**Du er nå klar til å utvikle en ekte React Native app! 🎉**

Neste steg: Kjør `npx expo start` og skann QR-koden med Expo Go på telefonen din.
