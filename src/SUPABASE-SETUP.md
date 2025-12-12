# Supabase Setup Guide - React Native

## 📋 Forutsetninger

1. **Supabase-prosjekt**: Opprett gratis på [supabase.com](https://supabase.com)
2. **Node.js**: Versjon 18+ installert
3. **Expo CLI**: Installert globalt (`npm install -g expo-cli`)

---

## 🚀 Steg 1: Opprett Supabase-prosjekt

1. Gå til [app.supabase.com](https://app.supabase.com)
2. Klikk **"New Project"**
3. Fyll inn:
   - **Name**: `hentetjeneste-rn`
   - **Database Password**: Velg et sterkt passord
   - **Region**: `North Europe (Stockholm)` (nærmest Norge)
4. Klikk **"Create new project"**
5. Vent 1-2 minutter mens prosjektet settes opp

---

## 🔑 Steg 2: Hent API-nøkler

1. Gå til **Settings** → **API**
2. Du trenger to verdier:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

3. Opprett `.env` fil i rot-mappen:
```bash
cp .env.example .env
```

4. Lim inn dine verdier i `.env`:
```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ Steg 3: Opprett database-tabeller

1. Gå til **SQL Editor** i Supabase Dashboard
2. Kjør følgende SQL for å opprette `daily_info` tabell:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create daily_info table
CREATE TABLE daily_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('menu', 'activity', 'announcement')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_group TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES auth.users(id)
);

-- Create index for faster queries
CREATE INDEX idx_daily_info_date ON daily_info(date DESC);
CREATE INDEX idx_daily_info_target_group ON daily_info(target_group);

-- Enable Row Level Security (RLS)
ALTER TABLE daily_info ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read daily_info (authenticated users)
CREATE POLICY "Allow authenticated users to read daily_info"
ON daily_info FOR SELECT
TO authenticated
USING (true);

-- Allow staff to insert/update/delete daily_info
-- (You'll need to add role checking in production)
CREATE POLICY "Allow staff to manage daily_info"
ON daily_info FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Seed data (demo)
INSERT INTO daily_info (date, type, title, description, target_group) VALUES
('2025-12-12', 'menu', 'Lunsj i dag', 'Fiskesuppe med grovbrød og smør. Dessert: Frukt og yoghurt.', NULL),
('2025-12-12', 'activity', 'Utetur til skogen', 'I dag skal vi på tur til skogen klokken 10:00. Husk ekstra klær!', 'Blåklokka'),
('2025-12-12', 'announcement', 'Julegranpynt neste uke', 'Neste uke skal vi pynte juletreet sammen. Alle er velkomne!', NULL),
('2025-12-13', 'menu', 'Lunsj i morgen', 'Pasta Bolognese med salat. Dessert: Eplekake.', NULL),
('2025-12-14', 'announcement', 'Lucia-feiring', 'Lørdag 14. desember feirer vi Lucia med sang og lussekatter kl. 11:00.', NULL);
```

---

## 📦 Steg 4: Installer pakker

```bash
# Kopier package-native.json til package.json
cp package-native.json package.json

# Installer dependencies
npm install

# Eller med yarn
yarn install
```

---

## 🎯 Steg 5: Kjør appen

```bash
# Start Expo
npx expo start

# Eller
npm start
```

### Velg plattform:
- Trykk **`a`** for Android
- Trykk **`i`** for iOS (kun macOS)
- Trykk **`w`** for Web
- Skann QR-koden med Expo Go-appen på telefonen

---

## 🔐 Steg 6: Test autentisering

1. Appen åpner på login-skjermen
2. Opprett en bruker:
   - **E-post**: `test@example.com`
   - **Passord**: `password123` (minimum 6 tegn)
3. Klikk **"Opprett konto"**
4. Du blir logget inn automatisk
5. Se bruker-ID i konsollen

---

## 📱 Steg 7: Test Daily Info

### Som forelder:
1. Logg inn
2. Gå til **Home**-tab
3. Se "Daglig Info" seksjonen
4. Info er filtrert på barnets gruppe

### Som ansatt:
1. Logg inn
2. Gå til **Krysselista**-tab
3. Trykk på 📅 knappen i headeren
4. Legg til/rediger/slett daily info
5. Velg type, tittel, beskrivelse, og gruppe
6. Klikk **"Lagre alle"**

---

## 🔧 Feilsøking

### Problem: "Supabase URL is invalid"
**Løsning**: Sjekk at `.env` filen er opprettet og inneholder riktige verdier

### Problem: "Auth error: Invalid login credentials"
**Løsning**: Sjekk at e-post og passord er korrekt, eller opprett ny bruker

### Problem: "Failed to fetch daily info"
**Løsning**: 
1. Sjekk at `daily_info` tabellen er opprettet
2. Sjekk at RLS policies er aktivert
3. Sjekk at du er logget inn

### Problem: App crasher på start
**Løsning**:
```bash
# Slett node_modules og reinstaller
rm -rf node_modules
npm install

# Clear Expo cache
npx expo start -c
```

---

## 📚 Nyttige ressurser

- [Supabase Docs](https://supabase.com/docs)
- [Supabase React Native Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Expo Docs](https://docs.expo.dev/)

---

## 🎨 Filstruktur

```
hentetjeneste-rn/
├─ src-native/
│  ├─ lib/
│  │  └─ supabase.ts           # Supabase client
│  ├─ api/
│  │  ├─ supabaseClient.ts      # Auth helpers
│  │  └─ dailyInfo.ts           # CRUD operations
│  ├─ components/
│  │  ├─ Auth.tsx               # Login/signup
│  │  ├─ DailyInfoView.tsx      # Display daily info
│  │  └─ DailyInfoEditor.tsx    # Edit daily info
│  ├─ screens/
│  │  ├─ LoginScreen.tsx
│  │  ├─ ParentHomeScreen.tsx
│  │  └─ StaffChecklistScreen.tsx
│  ├─ hooks/
│  │  └─ useDailyInfo.ts        # Custom hook
│  ├─ types/
│  │  └─ dailyInfo.ts           # TypeScript types
│  └─ utils/
│     └─ date.ts                # Date utilities
├─ .env                          # Supabase credentials
└─ App-Native-Auth.tsx           # Main app with auth
```

---

## ✅ Checklist

- [ ] Supabase-prosjekt opprettet
- [ ] `.env` fil opprettet med riktige verdier
- [ ] Database-tabeller opprettet (daily_info)
- [ ] Pakker installert (`npm install`)
- [ ] App kjører (`npx expo start`)
- [ ] Kan logge inn
- [ ] Kan se daily info
- [ ] Kan opprette/redigere daily info (ansatt)

---

## 🎉 Ferdig!

Din Hentetjeneste-app er nå koblet til Supabase med:
- ✅ Autentisering (Sign up/Sign in/Sign out)
- ✅ Real-time database (Daily Info CRUD)
- ✅ Row Level Security (RLS)
- ✅ TypeScript support
- ✅ Custom hooks for data fetching

**Neste steg**: Implementer flere tabeller (children, incidents, pickup_logs, etc.)
