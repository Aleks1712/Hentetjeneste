# ⚡ QUICK FIX - Appen funker ikke?

## 🔴 Hvis appen crasher med "Cannot find module"

### **Løsning (30 sekunder):**

```bash
# 1. Slett old cache
rm -rf node_modules package-lock.json

# 2. Installer dependencies på nytt
npm install

# 3. Start Expo med cache-clearing
npx expo start --clear
```

---

## ✅ Hva ble fikset?

Appen manglet to viktige pakker i `package.json`:

1. ✅ `react-native-gesture-handler` - For touch gestures
2. ✅ `@react-navigation/bottom-tabs` - For bottom navigation

**Disse er nå lagt til automatisk!**

---

## 🚀 Start appen

```bash
npx expo start
```

Deretter:
- **📱 Telefon:** Skann QR-koden med Expo Go
- **🤖 Android emulator:** Trykk `a`
- **🍎 iOS simulator:** Trykk `i`

---

## 🐛 Andre vanlige problemer

### **Problem: "Network request failed"**

**Løsning:**
```bash
# Sjekk at .env filen finnes
cat .env

# Hvis ikke, lag den:
echo 'EXPO_PUBLIC_SUPABASE_URL=https://gvqxcdcphggotggfvqbe.supabase.co' > .env
echo 'EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_EnfTn1-gpKLmr4GH8EP8NQ_t2rOFEy9' >> .env
```

### **Problem: "Unable to connect to Expo Go"**

**Løsning:**
```bash
# Prøv tunnel mode
npx expo start --tunnel
```

Eller sjekk at:
- ✅ Telefon og datamaskin er på samme WiFi
- ✅ Expo Go er oppdatert til nyeste versjon

### **Problem: Appen er helt hvit**

**Løsning:**
```bash
# Sjekk console logs i terminalen
# Vanligvis er det manglende Supabase-data

# Kjør SQL-scriptet på nytt:
# 1. Gå til https://app.supabase.com/project/gvqxcdcphggotggfvqbe/sql
# 2. Kopier innhold fra SUPABASE-SQL-SETUP.sql
# 3. Kjør scriptet
```

---

## 📱 Test at alt funker

Når appen starter:

1. ✅ Login-skjermen vises
2. ✅ Ingen røde feilmeldinger
3. ✅ Bottom navigation vises
4. ✅ Kan bytte mellom tabs

**Hvis alt over funker = SUCCESS! 🎉**

---

## 🆘 Fortsatt problemer?

1. Les **HOW-TO-RUN.md** for detaljert guide
2. Sjekk **CHANGELOG.md** for hva som er fikset
3. Sjekk console logs for feilmeldinger

---

**TL;DR:**

```bash
npm install
npx expo start --clear
# Skann QR-kode med Expo Go
```

**Done! 🚀**
