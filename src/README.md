# 🏫 Hentetjeneste - React Native App

> **⚠️ VIKTIG:** Dette er en React Native app som må kjøres via Expo CLI på din lokale maskin eller mobil. Den kan IKKE kjøres i Figma Make's web-preview.

---

## 🚀 Quick Start

### **Steg 1: Forhåndskrav**

Installer disse først:

```bash
# Node.js (v18 eller nyere)
https://nodejs.org/

# Expo CLI (globalt)
npm install -g expo-cli
```

### **Steg 2: Installer dependencies**

```bash
cd hentetjeneste-rn
npm install
```

### **Steg 3: Opprett database-tabeller**

1. Gå til Supabase SQL Editor:
   ```
   https://app.supabase.com/project/gvqxcdcphggotggfvqbe/sql
   ```

2. Kopier innholdet fra `SUPABASE-SQL-SETUP.sql` og kjør det

3. Bekreft at tabellene er opprettet:
   ```sql
   SELECT * FROM public.daily_info;
   ```

### **Steg 4: Start appen**

```bash
npx expo start
```

### **Steg 5: Velg plattform**

I terminalen, trykk:
- **`a`** for Android (krever Android Studio + emulator)
- **`i`** for iOS (kun macOS, krever Xcode)
- **`w`** for Web (begrenset funksjonalitet)
- **Skann QR-koden** med Expo Go app på telefonen

---

## 📱 Test på ekte telefon (anbefalt!)

### **Android:**
1. Installer "Expo Go" fra Google Play Store
2. Kjør `npx expo start`
3. Skann QR-koden med Expo Go appen

### **iOS:**
1. Installer "Expo Go" fra App Store
2. Kjør `npx expo start`
3. Skann QR-koden med Camera-appen
4. Åpne i Expo Go

---

## 🌐 Web-versjon (begrenset)

React Native apps fungerer best på mobil, men du kan teste i browser:

```bash
npx expo start --web
```

**Merk:** Noen native features vil ikke fungere i web-modus.

---

## ⚙️ Prosjekt-struktur

```
hentetjeneste-rn/
├─ App.tsx                          # Entry point
├─ src/
│  ├─ api/                          # Supabase API calls
│  ├─ hooks/                        # Custom React hooks
│  ├─ components/                   # Reusable components
│  ├─ screens/                      # App screens
│  ├─ navigation/                   # Navigation setup
│  ├─ types/                        # TypeScript types
│  ├─ utils/                        # Utility functions
│  └─ theme/                        # Design system
├─ .env                             # Supabase credentials
├─ SUPABASE-SQL-SETUP.sql           # Database schema
└─ package.json                     # Dependencies
```

---

## 🎯 Hva er implementert?

### **✅ Database (Supabase)**
- 7 tabeller med Row Level Security
- Autentisering
- Real-time updates
- CRUD operations

### **✅ API Layer**
- `src/api/supabaseClient.ts` - Auth
- `src/api/dailyInfo.ts` - Daily info CRUD

### **✅ Screens**
- `ParentHomeScreen` - Foreldre-visning
- `StaffChecklistScreen` - Ansatt-visning
- `DailyInfoEditorScreen` - Rediger daglig info

### **✅ Components**
- `DailyInfoCard` - Info-kort
- `DailyInfoList` - Liste med loading/error
- `EmptyState` - Tom tilstand

### **✅ Hooks**
- `useDailyInfo()` - React Query for caching
- `useTodayDailyInfo()` - Dagens info
- `useDailyInfoMutations()` - Create/Update/Delete

### **✅ Theme**
- Spond-inspirert design
- Blå for ansatte (#2563EB)
- Lilla for foreldre (#8B5CF6)
- Responsive spacing & typography

---

## 🐛 Troubleshooting

### **Problem: "Cannot find module '@supabase/supabase-js'"**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Problem: "Expo CLI not found"**
```bash
npm install -g expo-cli
```

### **Problem: "Network request failed"**
1. Sjekk at `.env` filen finnes med riktige credentials
2. Sjekk internett-tilkobling
3. Kjør `npx expo start --clear`

### **Problem: "Unable to resolve module"**
```bash
npx expo start --clear
```

---

## 📦 Dependencies

```json
{
  "expo": "~50.0.0",
  "react": "18.2.0",
  "react-native": "0.73.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17",
  "@tanstack/react-query": "^5.17.0",
  "@supabase/supabase-js": "^2.39.0",
  "@react-native-async-storage/async-storage": "1.21.0",
  "react-native-url-polyfill": "^2.0.0"
}
```

---

## 🔐 Security

- ✅ `.env` er gitignored
- ✅ RLS policies på alle tabeller
- ✅ API keys er public-safe (anon key)
- ✅ Auth tokens i AsyncStorage (encrypted)

---

## 📚 Dokumentasjon

- **SUPABASE-SQL-SETUP.sql** - Database schema
- **DATABASE-SCHEMA.md** - Database dokumentasjon
- **PROJECT-STRUCTURE.md** - Arkitektur
- **QUICK-START.md** - Quick start guide

---

## 🚧 TODO

- [ ] Implementer full auth-flow
- [ ] Legg til children management
- [ ] Implementer krysselista (check in/out)
- [ ] Legg til henteliste (approved persons)
- [ ] Implementer incidents reporting
- [ ] Legg til messaging system
- [ ] Real-time updates med Supabase Realtime
- [ ] Push notifications
- [ ] Offline support
- [ ] Dark mode

---

## 💡 Tips

### **Utvikle på mobil samtidig som desktop**
```bash
# Terminal 1: Start Expo
npx expo start

# Skann QR-kode med telefonen
# Hver gang du lagrer kode, oppdateres appen automatisk!
```

### **Debug med React Native Debugger**
```bash
# Installer
brew install --cask react-native-debugger

# Kjør
open "rndebugger://set-debugger-loc?host=localhost&port=19000"
```

### **Bygg for produksjon**
```bash
# Installer EAS CLI
npm install -g eas-cli

# Logg inn
eas login

# Bygg
eas build --platform android
eas build --platform ios
```

---

## 📞 Support

**Spørsmål om:**
- Supabase setup: [supabase.com/docs](https://supabase.com/docs)
- Expo: [docs.expo.dev](https://docs.expo.dev/)
- React Navigation: [reactnavigation.org](https://reactnavigation.org/)
- React Query: [tanstack.com/query](https://tanstack.com/query)

---

## ⚡ Kom i gang nå!

```bash
# 1. Installer dependencies
npm install

# 2. Kjør SQL-script i Supabase

# 3. Start appen
npx expo start

# 4. Skann QR-kode med Expo Go på telefonen
```

**Ha det gøy med utviklingen! 🚀**

---

**Last updated:** 12. desember 2024
