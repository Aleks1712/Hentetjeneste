# 🚀 Quick Start Guide - Hentetjeneste React Native

## ✅ Prerequisites

Din `.env` fil er allerede konfigurert med Supabase credentials! 

```env
EXPO_PUBLIC_SUPABASE_URL=https://gvqxcdcphggotggfvqbe.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_EnfTn1-gpKLmr4GH8EP8NQ_t2rOFEy9
```

---

## 📋 Steg-for-steg

### **Steg 1: Installer pakker** ⏱️ 2 min

```bash
# Kopier native package.json
cp package-native.json package.json

# Installer dependencies
npm install

# Eller med yarn
yarn install
```

**Pakker som installeres:**
- ✅ `@supabase/supabase-js` - Supabase client
- ✅ `@react-native-async-storage/async-storage` - Session storage
- ✅ `react-native-url-polyfill` - URL polyfill
- ✅ `expo-linear-gradient` - Gradienter
- ✅ `@react-navigation/native` + `@react-navigation/bottom-tabs` - Navigation

---

### **Steg 2: Opprett database-tabeller** ⏱️ 1 min

1. **Åpne Supabase Dashboard:**
   ```
   https://app.supabase.com/project/gvqxcdcphggotggfvqbe
   ```

2. **Gå til SQL Editor:**
   - Klikk på "SQL Editor" i venstre meny
   - Klikk "New query"

3. **Kjør SQL-script:**
   - Åpne `SUPABASE-SQL-SETUP.sql` filen
   - Kopier alt innhold
   - Lim inn i SQL Editor
   - Klikk "Run" (eller `Cmd/Ctrl + Enter`)

4. **Bekreft at det fungerte:**
   ```sql
   SELECT * FROM public.profiles;
   SELECT * FROM public.children;
   SELECT * FROM public.daily_info;
   SELECT * FROM public.incidents;
   SELECT * FROM public.approved_persons;
   SELECT * FROM public.attendance_logs;
   SELECT * FROM public.messages;
   ```
   Du skal se demo-data i alle tabellene!

---

### **Steg 3: Kjør appen** ⏱️ 1 min

```bash
# Start Expo
npx expo start

# Eller
npm start
```

**Velg plattform i terminalen:**
- Trykk **`a`** for Android (krever Android Studio/emulator)
- Trykk **`i`** for iOS (kun macOS, krever Xcode)
- Trykk **`w`** for Web (kjører i browser)
- **Skann QR-koden** med Expo Go app på telefonen

---

### **Steg 4: Test login** ⏱️ 30 sek

1. Appen åpner på **login-skjermen**
2. Opprett en bruker:
   ```
   E-post: test@example.com
   Passord: password123
   ```
3. Klikk **"Opprett konto"**
4. Du blir automatisk logget inn!

---

### **Steg 5: Test Daily Info** ⏱️ 1 min

#### **Som forelder:**
1. Du ser nå **ParentHomeScreen**
2. Scroll ned til **"Daglig Info"** seksjonen
3. Se dagens info (menu, aktiviteter, beskjeder)
4. Info er filtrert på barnets gruppe

#### **Som ansatt:**
1. Gå til **Krysselista**-tab (nederst)
2. Trykk på **📅** knappen i headeren
3. Se alle daily info items
4. Trykk **"Legg til ny info"**
5. Velg type, skriv tittel/beskrivelse, velg gruppe
6. Trykk **"Legg til"**
7. Rediger eller slett eksisterende items
8. Trykk **"Lagre alle"**

---

## 🎯 Verifiser at alt fungerer

### ✅ Sjekkliste:

- [ ] `npm install` kjørte uten feil
- [ ] `.env` fil finnes med dine credentials
- [ ] SQL-script kjørte uten feil
- [ ] `npx expo start` startet appen
- [ ] Kan se login-skjermen
- [ ] Kan opprette bruker og logge inn
- [ ] Ser daily info på home-screen
- [ ] Kan åpne daily info editor (📅 knapp)
- [ ] Kan legge til/redigere/slette daily info

---

## 📁 Viktige filer

| Fil | Beskrivelse |
|-----|-------------|
| `.env` | ✅ Supabase credentials (allerede konfigurert) |
| `SUPABASE-SQL-SETUP.sql` | SQL-script for database-oppsett |
| `App-Native-Auth.tsx` | Hovedfil med auth-logikk |
| `src-native/lib/supabase.ts` | Supabase client setup |
| `src-native/components/Auth.tsx` | Login/signup komponent |
| `src-native/hooks/useDailyInfo.ts` | Custom hook for daily info |
| `src-native/api/dailyInfo.ts` | API funksjoner (CRUD) |

---

## 🐛 Feilsøking

### Problem: "Cannot find module '@supabase/supabase-js'"
**Løsning:**
```bash
npm install
# eller
npx expo install @supabase/supabase-js
```

### Problem: "Invalid API key"
**Løsning:**
1. Sjekk at `.env` fil eksisterer
2. Sjekk at nøklene er riktige (kopier fra Supabase Dashboard)
3. Restart Expo: `npx expo start -c`

### Problem: "Table 'daily_info' does not exist"
**Løsning:**
1. Gå til Supabase SQL Editor
2. Kjør `SUPABASE-SQL-SETUP.sql` script
3. Bekreft med: `SELECT * FROM daily_info;`

### Problem: "Network request failed"
**Løsning:**
1. Sjekk internett-tilkobling
2. Sjekk at Supabase-prosjektet er aktivt (ikke paused)
3. Sjekk at URL i `.env` er riktig

### Problem: App crasher på start
**Løsning:**
```bash
# Clear cache og restart
npx expo start -c

# Eller reinstaller
rm -rf node_modules
npm install
npx expo start
```

---

## 📱 Neste steg

### 1. **Test på ekte enhet**
```bash
# Installer Expo Go på telefonen
# iOS: App Store
# Android: Google Play

# Skann QR-koden i terminalen
```

### 2. **Utforsk koden**
- `src-native/` - All kildekode
- `screens-native/` - Skjermer
- `components-native/` - Komponenter
- `context-native/` - Context providers

### 3. **Tilpass appen**
- Endre farger i `ThemeContext.tsx`
- Legg til flere språk i `translations-native/`
- Opprett flere database-tabeller

### 4. **Deploy**
- Bygg for Android: `eas build --platform android`
- Bygg for iOS: `eas build --platform ios`
- Les: [Expo EAS Build docs](https://docs.expo.dev/build/introduction/)

---

## 🎉 Du er i gang!

Din React Native-app er nå koblet til Supabase med:
- ✅ Autentisering (Sign up/Sign in/Sign out)
- ✅ Database (daily_info tabell)
- ✅ Real-time data
- ✅ Row Level Security (RLS)
- ✅ TypeScript support
- ✅ Custom hooks

**Ha det gøy med utviklingen! 🚀**

---

## 📚 Dokumentasjon

- [SUPABASE-SETUP.md](./SUPABASE-SETUP.md) - Detaljert setup-guide
- [README-SUPABASE-AUTH.md](./README-SUPABASE-AUTH.md) - Auth-dokumentasjon
- [Supabase Docs](https://supabase.com/docs)
- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)