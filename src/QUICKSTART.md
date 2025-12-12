# 🚀 Quickstart - Hentetjeneste React Native

## Start appen på 3 minutter

### 1️⃣ Installer dependencies
```bash
# Kopier native package.json
cp package-native.json package.json

# Installer
npm install
```

### 2️⃣ Start Expo
```bash
npx expo start
```

### 3️⃣ Åpne på telefonen
1. Last ned **Expo Go** fra App Store (iOS) eller Google Play (Android)
2. Skann QR-koden som vises i terminalen
3. Appen starter automatisk!

---

## 📱 Demo-funksjonalitet

### Logg inn
- Bruk **hvilken som helst** e-post og passord
- Demo-modus aktiveres automatisk

### Test Forelder-modus
1. Se 3 barn (Emma, Sofia, Maja)
2. Les daglig info og hendelsesrapporter
3. Sjekk varsler

### Test Ansatt-modus
1. Gå til **Profil**-tab → **Bytt modus**
2. Se Krysselista med 8 barn
3. Kryss barn inn/ut
4. Se sanntidsstatistikk

### Test andre funksjoner
- **Mørk modus**: Profil → Mørk modus
- **Språk**: Profil → Språk → Velg mellom 12 språk
- **Varsler**: Se badge med antall uleste varsler

---

## 🎨 Hovedfunksjoner

| Funksjon | Status | Beskrivelse |
|----------|--------|-------------|
| **Innlogging** | ✅ | Demo-modus |
| **Forelder-modus** | ✅ | Oversikt, hendelser, daglig info |
| **Ansatt-modus** | ✅ | Krysselista, inn/ut-registrering |
| **Varsler** | ✅ | Kategoriserte notifikasjoner |
| **12 språk** | ✅ | Norsk, Engelsk, Svensk, +9 |
| **Mørk modus** | ✅ | Automatisk temabytte |
| **GDPR** | ✅ | Personvern og sikkerhet |

---

## 🐛 Problemer?

```bash
# Clear cache
npx expo start -c

# Reinstall
rm -rf node_modules && npm install
```

---

**Les full dokumentasjon i [README-NATIVE.md](./README-NATIVE.md)**
