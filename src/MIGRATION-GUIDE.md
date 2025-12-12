# 📱 Migreringsguide: Web → React Native

## Oversikt over endringer

Du hadde en **React web-app** (Vite + Tailwind CSS) og har nå fått en **React Native/Expo-app** med samme funksjonalitet.

---

## 📂 Filstruktur

### Før (Web)
```
/src/App.tsx                 # Web entry point
/components/                 # Web components (Tailwind CSS)
/data/mockData.ts           # Mock data
/translations/translations.ts
```

### Nå (Native)
```
/App-Native.tsx              # Native entry point
/index.js                    # Expo entry point
/screens-native/             # Native screens
/components-native/          # Native components (StyleSheet)
/data-native/                # Mock data (samme struktur)
/translations-native/        # Oversettelser (komprimert)
/context-native/             # ThemeContext (rolle + mørk modus)
```

---

## 🔄 Hovedforskjeller

| Aspekt | Web (Gammel) | Native (Ny) |
|--------|--------------|-------------|
| **Framework** | Vite + React | Expo + React Native |
| **Styling** | Tailwind CSS | StyleSheet API |
| **Navigation** | State-basert | React Navigation (Bottom Tabs) |
| **Entry point** | `src/main.tsx` | `index.js` → `App-Native.tsx` |
| **Package manager** | `package.json` | `package-native.json` |
| **Start command** | `npm run dev` | `npx expo start` |
| **Components** | `<div>`, `<button>` | `<View>`, `<TouchableOpacity>` |
| **Icons** | lucide-react | Text emojis (kan byttes til Expo Icons) |

---

## ✨ Nye features i Native-appen

### 1. **Automatisk rollebytte i navigasjon**
- Forelder-modus: Hjem → Varsler → Profil
- Ansatt-modus: Krysselista → Varsler → Profil
- Navigasjonen endres automatisk når du bytter rolle i Profil

### 2. **Forbedret ThemeContext**
```typescript
// Gammel (web): Kun mørk modus
const [darkMode, setDarkMode] = useState(false);

// Ny (native): Rolle + Språk + Mørk modus + Farger
const { 
  isDarkMode, 
  role, 
  language, 
  colors,
  toggleDarkMode,
  toggleRole,
  setLanguage
} = useTheme();
```

### 3. **Reaktive farger basert på rolle**
- **Forelder**: Lilla (#8B5CF6)
- **Ansatt**: Blå (#2563EB)
- Alle komponenter bruker `colors` fra ThemeContext

### 4. **Native komponenter**
```typescript
// Button, Card, Badge med native styling
<Button 
  title="Kryss inn" 
  variant="primary" 
  onPress={handleCheckIn} 
/>
```

---

## 🎯 Funksjonsparitet

### ✅ Portert til Native
- [x] Innlogging (LoginScreen)
- [x] Forelder-visning (ParentHomeScreen)
- [x] Ansatt-visning (StaffChecklistScreen)
- [x] Varsler (NotificationsScreen)
- [x] Profil (ProfileScreen)
- [x] Mørk modus
- [x] Rollebytte
- [x] 12 språk
- [x] Mock data
- [x] ChildCard
- [x] Hendelsesrapporter
- [x] Daglig info
- [x] Krysselista (inn/ut)
- [x] Statistikk (tilstede/fraværende)

### 🔜 Ikke portert ennå
- [ ] Chat (ChatModal, StaffChatModal)
- [ ] QR-kode (QRCodeShare)
- [ ] Godkjente personer (ApprovedPersons)
- [ ] Henteforespørsler (PickupRequest)
- [ ] Ukeplan (WeeklyPlan)
- [ ] Hentelogg (PickupLogView)
- [ ] Hendelsesrapportering (IncidentReport)
- [ ] Daglig info-editor (DailyInfoEditor)
- [ ] Onboarding

Disse kan legges til som native komponenter ved behov!

---

## 📱 Kjøre appen

### Web (Gammel)
```bash
npm run dev
# Åpner i nettleser på http://localhost:5173
```

### Native (Ny)
```bash
npx expo start
# Skann QR-kode med Expo Go
# Eller trykk 'i' for iOS simulator / 'a' for Android emulator
```

---

## 🔧 Endre package.json

### Manuell endring
```bash
# Backup gammel
cp package.json package-web.json

# Bruk native
cp package-native.json package.json

# Installer
npm install
```

### Bytt tilbake til web
```bash
cp package-web.json package.json
npm install
npm run dev
```

---

## 🎨 Styling-konvertering

### Web (Tailwind)
```tsx
<div className="bg-white rounded-lg p-4 shadow-md">
  <h2 className="text-xl font-bold text-gray-900">Tittel</h2>
  <p className="text-gray-600">Beskrivelse</p>
</div>
```

### Native (StyleSheet)
```tsx
<View style={[styles.card, { backgroundColor: colors.surface }]}>
  <Text style={[styles.title, { color: colors.text }]}>Tittel</Text>
  <Text style={[styles.description, { color: colors.textSecondary }]}>
    Beskrivelse
  </Text>
</View>

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
  },
});
```

---

## 🚀 Deployment

### Web (Gammel)
```bash
npm run build
# Deploy dist/ til Vercel/Netlify
```

### Native (Ny)
```bash
# Development
npx expo start

# Production (EAS Build)
eas build --platform all
eas submit --platform all
```

---

## 📚 Ressurser

- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnavigation.org
- **React Navigation**: https://reactnavigation.org

---

## ❓ FAQ

### Kan jeg kjøre native-appen i nettleser?
Ja, trykk `w` i Expo DevTools, men opplevelsen er begrenset. Native komponenter fungerer best på telefon.

### Hvordan legger jeg til nye screens?
1. Lag fil i `/screens-native/`
2. Legg til i `/navigation/AppNavigator.tsx`
3. Bruk `useTheme()` for farger

### Hvordan legger jeg til nye oversettelser?
Rediger `/translations-native/translations.ts` og legg til nøkler i alle språk.

### Hvordan tester jeg uten telefon?
Installer iOS Simulator (Mac) eller Android Emulator og trykk `i` eller `a` i terminalen.

---

**Lykke til med React Native-appen! 🎉**
