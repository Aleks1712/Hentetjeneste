# 🔐 Supabase Authentication - React Native Implementation

## Oversikt

Denne implementasjonen bruker **Supabase Auth** for å håndtere:
- ✅ Brukerregistrering (Sign up)
- ✅ Innlogging (Sign in)
- ✅ Utlogging (Sign out)
- ✅ Session management
- ✅ Automatisk token refresh
- ✅ Persistent sessions (AsyncStorage)

---

## 📁 Filstruktur

```
src-native/
├─ lib/
│  └─ supabase.ts              # Supabase client setup
├─ api/
│  ├─ supabaseClient.ts        # Auth helper functions
│  └─ dailyInfo.ts             # Daily Info CRUD API
├─ components/
│  └─ Auth.tsx                 # Login/signup component
├─ hooks/
│  └─ useDailyInfo.ts          # Custom hook for daily info
├─ types/
│  └─ dailyInfo.ts             # TypeScript interfaces
└─ utils/
   └─ date.ts                  # Date utility functions
```

---

## 🔧 Setup-filer forklart

### 1. `src-native/lib/supabase.ts`
**Hva den gjør:**
- Oppretter Supabase client
- Konfigurerer AsyncStorage for persistent sessions
- Setter opp auto-refresh av tokens når app går i forgrunn

**Viktige settings:**
```typescript
{
  auth: {
    storage: AsyncStorage,           // Lagrer session lokalt
    autoRefreshToken: true,          // Fornyer token automatisk
    persistSession: true,            // Husker innlogging
    detectSessionInUrl: false,       // Ikke for native apps
  }
}
```

### 2. `src-native/api/supabaseClient.ts`
**Hva den gjør:**
- Eksporterer Supabase client
- Helper functions for auth:
  - `getCurrentUser()` - Hent innlogget bruker
  - `isAuthenticated()` - Sjekk om bruker er logget inn
  - `signOut()` - Logg ut

### 3. `src-native/components/Auth.tsx`
**Hva den gjør:**
- Visuelt login/signup-skjerm
- Håndterer innlogging og registrering
- Viser feilmeldinger
- Vakker UI med gradient og styling

**Funksjoner:**
- `signInWithEmail()` - Logger inn med e-post/passord
- `signUpWithEmail()` - Oppretter ny bruker

---

## 🎯 Hvordan bruke i appen

### App.tsx (hovedfil)

```typescript
import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from './src-native/lib/supabase';
import Auth from './src-native/components/Auth';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Sjekk eksisterende session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Lytt til auth-endringer
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Vis login hvis ikke innlogget
  if (!session) {
    return <Auth />;
  }

  // Vis hovedapp hvis innlogget
  return <AppNavigator />;
}
```

---

## 🔐 Auth-flyt

### 1. **App starter**
```
App.tsx
  ↓
supabase.auth.getSession()
  ↓
Session finnes?
  ├─ JA → Vis AppNavigator
  └─ NEI → Vis Auth component
```

### 2. **Bruker logger inn**
```
Auth.tsx
  ↓
supabase.auth.signInWithPassword({ email, password })
  ↓
Session opprettes
  ↓
onAuthStateChange trigger
  ↓
App.tsx setter session state
  ↓
AppNavigator vises
```

### 3. **Bruker logger ut**
```
ProfileScreen (eller hvor som helst)
  ↓
supabase.auth.signOut()
  ↓
Session fjernes
  ↓
onAuthStateChange trigger
  ↓
App.tsx setter session = null
  ↓
Auth component vises
```

---

## 📊 Bruke data med autentisering

### Eksempel: Hent daily info

```typescript
import { useDailyInfo } from '../hooks/useDailyInfo';

function ParentHomeScreen() {
  const { todayInfo, upcomingInfo, loading } = useDailyInfo({
    targetGroup: 'Blåklokka',
    autoFetch: true,
  });

  if (loading) return <ActivityIndicator />;

  return (
    <View>
      {todayInfo.map(info => (
        <DailyInfoCard key={info.id} info={info} />
      ))}
    </View>
  );
}
```

### Eksempel: Opprett daily info (staff)

```typescript
import { useDailyInfo } from '../hooks/useDailyInfo';

function StaffScreen() {
  const { create, loading } = useDailyInfo({ autoFetch: false });

  const handleCreateInfo = async () => {
    try {
      await create({
        date: '2025-12-12',
        type: 'menu',
        title: 'Lunsj i dag',
        description: 'Fiskeboller med grønnsaker',
        targetGroup: 'Blåklokka',
      });
      Alert.alert('Suksess', 'Daily info opprettet!');
    } catch (error) {
      Alert.alert('Feil', error.message);
    }
  };

  return (
    <Button title="Legg til info" onPress={handleCreateInfo} />
  );
}
```

---

## 🔒 Sikkerhet: Row Level Security (RLS)

### Hva er RLS?
Row Level Security lar deg kontrollere hvem som kan lese/skrive data på rad-nivå.

### Eksempel: daily_info policies

```sql
-- Alle autentiserte brukere kan lese
CREATE POLICY "Allow authenticated users to read"
ON daily_info FOR SELECT
TO authenticated
USING (true);

-- Bare staff kan opprette/redigere/slette
CREATE POLICY "Allow staff to manage"
ON daily_info FOR ALL
TO authenticated
USING (auth.role() = 'staff')  -- Eksempel rolle-sjekk
WITH CHECK (auth.role() = 'staff');
```

---

## 📝 Environment Variables

### `.env` fil struktur:
```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Tilgang i kode:
```typescript
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
```

**Viktig**: Prefix med `EXPO_PUBLIC_` for at Expo skal eksponere variablene.

---

## 🐛 Feilsøking

### Problem: "Session not persisting"
**Årsak**: AsyncStorage ikke konfigurert
**Løsning**: 
```bash
npx expo install @react-native-async-storage/async-storage
```

### Problem: "Invalid API key"
**Årsak**: Feil anon key i `.env`
**Løsning**: 
1. Gå til Supabase Dashboard → Settings → API
2. Kopier **anon public** key
3. Oppdater `.env`

### Problem: "Network request failed"
**Årsak**: Mangler URL polyfill
**Løsning**:
```bash
npx expo install react-native-url-polyfill
```

Legg til i `App.tsx` toppen:
```typescript
import 'react-native-url-polyfill/auto';
```

### Problem: "Auth state not updating"
**Årsak**: Ikke lytter til `onAuthStateChange`
**Løsning**: Se App.tsx eksempel over

---

## 🎨 Styling Auth-komponenten

`Auth.tsx` bruker:
- **LinearGradient** for vakre bakgrunner
- **KeyboardAvoidingView** for å unngå tastatur
- **Norsk språk** for alle tekster
- **Error handling** med Alert

Tilpass styling i `styles` objekt nederst i filen.

---

## 🚀 Best Practices

1. **Alltid bruk HTTPS** i produksjon
2. **Aldri commit `.env`** til Git (legg til `.gitignore`)
3. **Bruk RLS policies** for sikkerhet
4. **Håndter errors** med try/catch
5. **Vis loading states** under API-kall
6. **Auto-refresh tokens** (allerede implementert)
7. **Sign out ved sensitive errors** (401, 403)

---

## 📚 Neste steg

1. **Roller**: Implementer `role` field i `auth.users` (parent/staff)
2. **Profile**: Lag profil-screen med brukerinfo
3. **Password reset**: Legg til "Glemt passord"-funksjonalitet
4. **OAuth**: Vurder Google/Apple sign-in
5. **Multi-tenancy**: Legg til `organization_id` for flere barnehager

---

## 📖 Ressurser

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Expo AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)

---

**Gratulerer! 🎉** Du har nå full autentisering i React Native-appen din med Supabase!
