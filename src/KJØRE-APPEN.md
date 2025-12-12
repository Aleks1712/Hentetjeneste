# 🚀 Slik kjører og tester du appen

## ✅ Rask sjekkliste

Du har allerede:
- ✅ Fikset dependencies (react-native-gesture-handler, @react-navigation/bottom-tabs)
- ✅ Komplett Supabase backend (7 tabeller, RLS, sample data)
- ✅ Full React Native/Expo struktur
- ✅ Bottom tab navigation
- ✅ Forelder-modus og Ansatt-modus
- ✅ 12 språk støtte
- ✅ Mørk modus

---

## 📱 Kjøre appen

### 1. Start Expo
```bash
cd hentetjeneste-rn
npm install
npx expo start
```

### 2. Åpne på telefon (anbefalt)
- Last ned **Expo Go** fra App Store / Google Play
- Skann QR-koden i terminalen
- Appen åpner automatisk!

### 3. Eller bruk emulator
- Android: Trykk **a** i terminalen
- iOS: Trykk **i** i terminalen

---

## 🔐 Logg inn

1. Appen starter med **login-skjermen**
2. Skriv inn HVILKEN SOM HELST e-post og passord (demo-modus)
3. Trykk **"Logg inn"**
4. Du er nå i appen! 🎉

---

## 🏠 DETTE ER HENTETJENESTEN!

Etter login ser du **ParentHomeScreen** (Forelder-modus) - dette ER hentetjenesten! Den viser:

### 📋 Forelder-modus (standard)
- **🏠 Hjem** - Hentetjenesten for foreldre
  - Mine barn (3 barn: Emma, Sofia, Maja)
  - Daglig info fra barnehagen
  - Hendelser/incidents
  - Status på barna
- **🔔 Varsler** - Notifikasjoner og varsler
- **👤 Profil** - Innstillinger og språk

### ✅ Ansatt-modus (staff)
- **✓ Krysselista** - Krysselista for ansatte
  - Alle barn i barnehagen (8 barn)
  - Inn/ut kryssing
  - Henteforespørsler
  - Oversikt per gruppe
- **🔔 Varsler** - Notifikasjoner
- **👤 Profil** - Innstillinger

---

## 🔄 BYTT MELLOM FORELDER OG ANSATT-MODUS

### Slik bytter du:
1. Trykk på **👤 Profil** (nederst til høyre)
2. Se på "Bytt modus"-seksjonen
3. Trykk på **"👨‍👩‍👧 Forelder-modus"** (eller "👔 Ansatt-modus")
4. Rollen byttes automatisk! 🔄
5. Gå tilbake til første tab for å se endringen

### Forskjellen:
| Forelder-modus 🟣 | Ansatt-modus 🔵 |
|------------------|----------------|
| Lilla fargetema | Blå fargetema |
| Ser kun egne barn (3 stk) | Ser alle barn (8 stk) |
| "Hjem"-tab | "Krysselista"-tab |
| Kun lese-tilgang | Full tilgang til kryssing |

---

## 🌍 BYTT SPRÅK

Appen støtter **12 språk**:
1. 🇳🇴 Norsk (standard)
2. 🇬🇧 English
3. 🇸🇪 Svenska
4. 🇩🇰 Dansk
5. 🇫🇮 Suomi
6. 🇩🇪 Deutsch
7. 🇫🇷 Français
8. 🇪🇸 Español
9. 🇵🇱 Polski
10. 🇸🇦 العربية (Arabisk)
11. 🇸🇴 Soomaali (Somali)
12. 🇵🇰 اردو (Urdu)

### Slik bytter du språk:
1. Gå til **👤 Profil**
2. Scroll ned til "Språk"-seksjonen
3. Trykk på flagget for ønsket språk
4. Appen oppdateres automatisk! 🌐

---

## 🌙 BYTT TIL MØRK MODUS

1. Gå til **👤 Profil**
2. Under "Innstillinger" - finn "Mørk modus"
3. Trykk på **switch-knappen**
4. Appen skifter til mørkt tema! 🌙

---

## 🧪 DEMO-DATA

Appen er forhåndsutfylt med demo-data:

### 👶 Barn i databasen:
**Foreldre ser kun sine egne barn:**
- Emma Hansen (4 år) - Blåklokka - Tilstede
- Sofia Larsen (5 år) - Solstråla - Tilstede (hentes av bestemor)
- Maja Johansen (4 år) - Solstråla - Tilstede (godkjent henting)

**Ansatte ser alle 8 barn:**
- + Lucas Berg (5 år) - Blåklokka
- + Olivia Andersen (3 år) - Solstråla (hjemme)
- + Noah Nilsen (4 år) - Blåklokka
- + William Olsen (3 år) - Blåklokka (hjemme)
- + Filip Pedersen (5 år) - Blåklokka

### 📋 Godkjente personer (for Emma):
- Kari Nordmann (Mor) ✅
- Ola Nordmann (Far) ✅
- Mormor Anne (Besteforelder) ✅
- Tante Lisa (Tante) ✅
- Stine Henting (Annen) ⏳ Venter på godkjenning

### 🩹 Hendelser:
- Emma: Mindre fall på lekeplassen (9. des)
- Emma: Glemt matboks (8. des)
- Sofia: Skrubbsår på albuen (9. des)
- Maja: Veldig sliten i dag (9. des)

### 📰 Daglig info:
- Lunsj: Fiskesuppe med grovbrød
- Aktivitet: Utetur til skogen kl 10:00 (Blåklokka)
- Kunngjøring: Julegranpynt neste uke
- Kunngjøring: Lucia-feiring 12. des kl 11:00

---

## 🐛 Feilsøking

### Problem: Appen crasher
**Løsning:** 
```bash
# Slett node_modules og reinstaller
rm -rf node_modules
npm install
npx expo start --clear
```

### Problem: Jeg ser ikke hentetjenesten
**Svar:** Jo, du gjør! 😊
- ParentHomeScreen (🏠 Hjem-fanen) ER hentetjenesten for foreldre
- StaffChecklistScreen (✓ Krysselista-fanen) ER hentetjenesten for ansatte
- Bytt rolle i Profil-fanen for å se begge

### Problem: Appen er på feil språk
**Løsning:** Gå til 👤 Profil → Språk → Velg 🇳🇴 Norsk

### Problem: Expo Go fungerer ikke
**Løsning:**
1. Sjekk at telefonen og PC er på samme WiFi
2. Prøv å skanne QR-koden på nytt
3. Eller trykk "w" i terminalen for å åpne i nettleser

---

## 📖 Neste steg

### Koble til Supabase (for ekte data):
1. Gå til [https://app.supabase.com](https://app.supabase.com)
2. Opprett et nytt prosjekt
3. Kjør SQL fra `SUPABASE-SQL-SETUP.sql` i SQL Editor
4. Kopier Supabase URL og anon key
5. Opprett `.env` fil:
```bash
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```
6. Restart appen!

### Utvide funksjonalitet:
- [ ] Implementer ekte autentisering med Supabase Auth
- [ ] Koble screens til ekte API-er (allerede implementert i `src-native/api/`)
- [ ] Legg til push-varsler med Expo Notifications
- [ ] Implementer QR-kode scanning for henting
- [ ] Legg til foto-upload for hendelser
- [ ] Implementer chat-funksjonalitet
- [ ] Bygg PWA-versjon for web

---

## ✅ Alt er klart!

Appen din fungerer nå perfekt og viser hentetjenesten! 🎉

**VIKTIG:** Du er allerede i hentetjenesten når du ser ParentHomeScreen. Det er ikke noe mer å vente på - det er hele poenget med appen! 😊

**Hvis du vil se ansatt-modusen (krysselista):**
→ Gå til Profil → Bytt modus → Trykk på rollen → Gå tilbake til første tab

---

📱 **Lykke til med utviklingen!**
