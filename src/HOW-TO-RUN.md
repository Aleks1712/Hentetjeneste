# ⚠️ VIKTIG: Hvordan kjøre denne appen

## Dette er en React Native app, IKKE en web-app!

Denne appen kan **IKKE** kjøres i Figma Make's web-preview eller i en vanlig nettleser. Den må kjøres via **Expo** på en av følgende måter:

---

## ✅ Metode 1: Test på ekte telefon (anbefalt)

### **Android:**

1. **Installer Expo Go på telefonen**
   - Gå til Google Play Store
   - Søk etter "Expo Go"
   - Installer appen

2. **På datamaskinen:**
   ```bash
   cd hentetjeneste-rn
   npm install
   npx expo start
   ```

3. **Skann QR-koden**
   - Åpne Expo Go appen på telefonen
   - Trykk "Scan QR code"
   - Skann koden som vises i terminalen

4. **Appen lastes og kjører på telefonen! 🎉**

### **iOS:**

1. **Installer Expo Go på telefonen**
   - Gå til App Store
   - Søk etter "Expo Go"
   - Installer appen

2. **På datamaskinen:**
   ```bash
   cd hentetjeneste-rn
   npm install
   npx expo start
   ```

3. **Skann QR-koden**
   - Åpne Camera-appen på iPhone
   - Pek på QR-koden i terminalen
   - Trykk på notifikasjonen som dukker opp
   - Appen åpnes i Expo Go

---

## ✅ Metode 2: Test i Android Emulator

### **Forhåndskrav:**
- Android Studio installert
- Android emulator satt opp

### **Steg:**

1. **Start Android emulator**
   - Åpne Android Studio
   - Tools → Device Manager
   - Start en emulator

2. **Kjør appen**
   ```bash
   cd hentetjeneste-rn
   npm install
   npx expo start
   ```

3. **Trykk "a" i terminalen**
   - Appen installeres automatisk i emulatoren

---

## ✅ Metode 3: Test i iOS Simulator (kun macOS)

### **Forhåndskrav:**
- macOS
- Xcode installert

### **Steg:**

1. **Kjør appen**
   ```bash
   cd hentetjeneste-rn
   npm install
   npx expo start
   ```

2. **Trykk "i" i terminalen**
   - iOS Simulator starter automatisk
   - Appen installeres og kjører

---

## ⚠️ Metode 4: Test i nettleser (begrenset funksjonalitet)

React Native apps fungerer best på mobil, men du kan teste en begrenset versjon i nettleser:

```bash
cd hentetjeneste-rn
npm install
npx expo start --web
```

**NB:** Mange native features vil ikke fungere i web-modus.

---

## 🔧 Første gang oppsett

### **1. Installer Node.js**
```bash
# Last ned fra nodejs.org (v18 eller nyere)
node --version  # Sjekk at det er installert
```

### **2. Installer dependencies**
```bash
cd hentetjeneste-rn
npm install
```

### **3. Sett opp database**

1. Gå til Supabase SQL Editor:
   ```
   https://app.supabase.com/project/gvqxcdcphggotggfvqbe/sql
   ```

2. Kopier alt fra `SUPABASE-SQL-SETUP.sql`

3. Lim inn og kjør

4. Bekreft med:
   ```sql
   SELECT * FROM public.daily_info;
   SELECT * FROM public.profiles;
   ```

### **4. Verifiser .env fil**

Sjekk at `.env` filen inneholder:
```env
EXPO_PUBLIC_SUPABASE_URL=https://gvqxcdcphggotggfvqbe.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_EnfTn1-gpKLmr4GH8EP8NQ_t2rOFEy9
```

---

## 🐛 Feilsøking

### **Feil: "Cannot find module 'react-native-gesture-handler'"**
Dette er nå fikset! Men hvis du ser denne feilen:
```bash
# Reinstaller dependencies
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

**VIKTIG:** Sørg for at `package.json` inneholder:
```json
"react-native-gesture-handler": "~2.14.0",
"@react-navigation/bottom-tabs": "^6.5.11"
```

### **Feil: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

### **Feil: "Network request failed"**
1. Sjekk at `.env` filen eksisterer
2. Sjekk internett-tilkobling
3. Restart Expo:
   ```bash
   npx expo start --clear
   ```

### **Feil: "Unable to connect to Expo Go"**
1. Sjekk at telefonen og datamaskinen er på samme WiFi-nettverk
2. Prøv å skanne QR-koden på nytt
3. Eller velg "Tunnel" mode:
   ```bash
   npx expo start --tunnel
   ```

### **Appen crasher ved oppstart**
```bash
# Clear cache
npx expo start --clear

# Eller reinstaller
rm -rf node_modules
npm install
npx expo start
```

---

## 📱 Anbefalt test-oppsett

**For raskest utvikling:**

1. **Installer Expo Go på din egen telefon**
2. **Koble telefonen til samme WiFi som datamaskinen**
3. **Kjør `npx expo start`**
4. **Skann QR-koden**
5. **Hver gang du lagrer kode, oppdateres appen automatisk!** 🔥

---

## 🚀 Neste steg etter oppstart

Når appen kjører:

1. **Test ParentHomeScreen**
   - Se dagens daglige info
   - Pull-to-refresh for å oppdatere

2. **Test StaffChecklistScreen**
   - Trykk på 📅 knappen
   - Rediger daglig info
   - Legg til ny info
   - Slett eksisterende info

3. **Test i databasen**
   - Gå til Supabase Dashboard
   - Se at data oppdateres real-time

---

## 💡 Pro tips

### **Live reload**
Appen oppdateres automatisk når du lagrer kode!

### **Debug menu**
- **Android:** Shake enheten eller `Cmd + M`
- **iOS:** Shake enheten eller `Cmd + D`

### **Logs**
Se console logs direkte i terminalen der Expo kjører!

### **Flere enheter samtidig**
Skann samme QR-kode på flere telefoner for å teste samtidig!

---

## ❌ IKKE gjør dette

- ❌ Ikke prøv å kjøre appen i Figma Make
- ❌ Ikke åpne `App.tsx` direkte i nettleser
- ❌ Ikke forvent at React Native pakker fungerer i web
- ❌ Ikke bruk `create-react-app` commands

---

## ✅ Gjør dette i stedet

- ✅ Bruk `npx expo start`
- ✅ Test på ekte telefon med Expo Go
- ✅ Eller bruk emulator/simulator
- ✅ Følg React Native / Expo dokumentasjon

---

## 📚 Dokumentasjon

- **Expo Docs:** https://docs.expo.dev/
- **React Native Docs:** https://reactnative.dev/
- **Supabase Docs:** https://supabase.com/docs

---

## 🎯 Oppsummering

```bash
# 1. Installer dependencies
npm install

# 2. Kjør SQL-script i Supabase

# 3. Start Expo
npx expo start

# 4. Skann QR-kode med Expo Go appen på telefonen

# 5. Done! 🎉
```

---

**Lykke til! 🚀**