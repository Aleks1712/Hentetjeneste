# Hentetjeneste - React Native/Expo

**Digital hentetjeneste for barnehager** - En GDPR-sikker, mobiloptimalisert app bygget med React Native og Expo.

## 🚀 Kom i gang

### Forutsetninger
- Node.js 18+ installert
- Expo Go app på telefonen din ([iOS](https://apps.apple.com/app/apple-store/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- iOS Simulator eller Android Emulator (valgfritt)

### Installasjon

1. **Installer dependencies:**
```bash
# Lag backup av gammel package.json (hvis du har den)
cp package.json package-web-backup.json

# Kopier native package.json
cp package-native.json package.json

# Installer dependencies
npm install
```

2. **Start appen:**
```bash
# Start Expo development server
npx expo start
```

3. **Kjør på enheten din:**
   - **På telefon**: Skann QR-koden med Expo Go (iOS) eller Expo Go app (Android)
   - **På simulator**: Trykk `i` for iOS eller `a` for Android i terminalen
   - **På web (for testing)**: Trykk `w` (merk: web-støtte er begrenset)

## 📱 Funksjoner

### ✅ Implementert

**Grunnleggende:**
- ✓ Innlogging (demo-modus)
- ✓ Rollebasert tilgang (Forelder/Ansatt)
- ✓ Bottom tab navigation
- ✓ Mørk modus
- ✓ 12 språk (Norsk, Engelsk, Svensk, Dansk, Finsk, Tysk, Fransk, Spansk, Polsk, Arabisk, Somali, Urdu)
- ✓ GDPR-vennlig design

**Forelder-modus:**
- ✓ Oversikt over egne barn
- ✓ Status (tilstede/hjemme)
- ✓ Daglig info (meny, aktiviteter, kunngjøringer)
- ✓ Hendelsesrapporter (skader, sykdom, info)
- ✓ Allergioversikt
- ✓ Henteforespørsler (pending/godkjent)

**Ansatt-modus:**
- ✓ Krysselista (inn/ut-registrering)
- ✓ Statistikk (tilstede/fraværende)
- ✓ Gruppevisning (Blåklokka, Solstråla)
- ✓ Kryss inn/ut funksjonalitet
- ✓ Sanntids tidsstempel

**Varsler:**
- ✓ Notifikasjoner (hendelser, henting, daglige rapporter)
- ✓ Badge-telling (uleste varsler)
- ✓ Kategorisering (i dag/tidligere)

**Profil & Innstillinger:**
- ✓ Bytt rolle (Forelder ↔ Ansatt)
- ✓ Språkvalg (12 språk)
- ✓ Mørk/lys modus
- ✓ GDPR & Personvern-innstillinger
- ✓ Logg ut

### 🔜 Neste steg (fremtidige features)

- [ ] Chat mellom foreldre og ansatte
- [ ] QR-kode sharing for henting
- [ ] Godkjente hentepersoner-administrasjon
- [ ] Ukeplan-visning
- [ ] Hentelogg
- [ ] Push notifications (Expo Notifications)
- [ ] Bilder/dokumenter upload
- [ ] Supabase backend-integrasjon
- [ ] Offline-støtte med lokal cache
- [ ] Hendelsesrapportering (ansatt)
- [ ] Daglig info-editor (ansatt)

## 🎨 Design System

### Fargepalett

**Forelder-modus (Lilla):**
```
Primary: #8B5CF6
Light:   #A78BFA
Dark:    #7C3AED
```

**Ansatt-modus (Blå):**
```
Primary: #2563EB
Light:   #3B82F6
Dark:    #1E40AF
```

**Semantiske farger:**
```
Success: #10B981 (Grønn)
Warning: #F59E0B (Amber)
Error:   #EF4444 (Rød)
Info:    #3B82F6 (Blå)
```

### Spacing Scale
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `base`: 16px
- `lg`: 20px
- `xl`: 24px
- `2xl`: 32px

### Typography
- **H1**: 24-32px, Bold
- **H2**: 20-24px, Bold
- **H3**: 18-20px, Semibold
- **Body**: 14-16px, Regular
- **Caption**: 12px, Regular

## 📂 Prosjektstruktur

```
/
├── App-Native.tsx                    # Hovedkomponent (Native)
├── index.js                          # Expo entry point
├── app.json                          # Expo config
├── package-native.json               # Native dependencies
│
├── screens-native/                   # Native screens
│   ├── LoginScreen.tsx
│   ├── ParentHomeScreen.tsx
│   └── StaffChecklistScreen.tsx
│
├── screens/                          # Shared screens
│   ├── NotificationsScreen.tsx
│   ├── ProfileScreen.tsx
│   └── index.ts
│
├── components-native/                # Native components
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   └── ChildCard.tsx
│
├── navigation/                       # Navigation setup
│   └── AppNavigator.tsx
│
├── context-native/                   # Context providers
│   └── ThemeContext.tsx
│
├── data-native/                      # Mock data
│   └── mockData.ts
│
└── translations-native/              # Translations (12 languages)
    └── translations.ts
```

## 🛠 Teknologi Stack

- **React Native** - Cross-platform native app framework
- **Expo** (~51.0) - Development platform
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Native navigation (Bottom Tabs)
- **React Context** - State management
- **Expo Linear Gradient** - Gradient support
- **React Native Safe Area Context** - Safe area handling
- **Expo Secure Store** - Secure storage (fremtidig)
- **Supabase** (planlagt) - Backend as a Service

## 📖 Brukerveiledning

### Demo-modus
Appen er satt opp med demo-modus. Logg inn med hvilken som helst e-post/passord.

**Demo-brukere:**
- **Forelder**: Ser 3 barn (Emma, Sofia, Maja)
- **Ansatt**: Ser alle 8 barn i krysselista

### Bytte mellom roller
1. Gå til **Profil**-tab (👤)
2. Trykk på **Bytt modus** under rollekortet
3. Navigasjonen oppdateres automatisk

### Aktivere mørk modus
1. Gå til **Profil**-tab
2. Skru på **Mørk modus**-bryteren under Innstillinger
3. Appen endrer tema umiddelbart

### Bytte språk
1. Gå til **Profil**-tab
2. Velg språk fra listen (12 språk tilgjengelig)
3. Alle tekster oppdateres automatisk

## 🔒 GDPR & Sikkerhet

- ✅ Ingen data lagres lokalt uten brukerens samtykke
- ✅ Rollebasert tilgangskontroll (RLS)
- ✅ Sikker autentisering (planlagt med Supabase)
- ✅ Data-minimering prinsipp
- ✅ Transparent personvern-innstillinger
- ✅ GDPR-kompatibel databehandling

## 🚢 Deployment

### Development Build
```bash
# iOS
npx expo run:ios

# Android  
npx expo run:android
```

### Production Build (EAS Build)
```bash
# Installer EAS CLI
npm install -g eas-cli

# Login
eas login

# Konfigurer build
eas build:configure

# Build for iOS og Android
eas build --platform all

# Submit til App Store / Google Play
eas submit --platform all
```

## 🐛 Feilsøking

### Expo Go viser feilmelding
```bash
# Clear cache
npx expo start -c
```

### Metro bundler problemer
```bash
# Stopp serveren og kjør:
npx expo start --clear
```

### Module not found
```bash
# Reinstaller dependencies
rm -rf node_modules
npm install
```

## 📝 Lisens

Hentetjeneste - Eksamen PRO203 Programvareutvikling  
© 2024 - GDPR-kompatibel løsning for barnehager

---

**Bygget med ❤️ for norske barnehager**

*Inspirert av Spond sin rene UX-stil*