# 🗄️ Database Schema - Hentetjeneste

## Oversikt

Hentetjeneste databasen består av 7 hovedtabeller med Row Level Security (RLS) policies for rollebasert tilgang.

---

## 📊 Tabeller

### 1. **profiles**
Brukerprofildata som automatisk opprettes når en bruker registrerer seg.

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,                    -- Refererer til auth.users(id)
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'parent',    -- 'parent', 'staff', 'admin'
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Indexes:**
- `idx_profiles_role` - Rask filtrering på rolle
- `idx_profiles_email` - Rask oppslag på e-post

**RLS Policies:**
- ✅ Brukere kan se egen profil
- ✅ Brukere kan oppdatere egen profil
- ✅ Staff kan se alle profiler
- ✅ Auto-opprett profil ved registrering

---

### 2. **children**
Barneinformasjon knyttet til foreldre.

```sql
CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID REFERENCES public.profiles(id) NOT NULL,
  name TEXT NOT NULL,
  date_of_birth DATE,
  "group" TEXT,                           -- F.eks. "Blåklokka", "Solstråla"
  status TEXT NOT NULL DEFAULT 'absent',  -- 'present', 'absent'
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  notes TEXT,
  allergies TEXT,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Indexes:**
- `idx_children_parent_id` - Finn barn per forelder
- `idx_children_status` - Filtrering på tilstedeværelse
- `idx_children_group` - Filtrering på gruppe

**RLS Policies:**
- ✅ Foreldre kan se egne barn
- ✅ Staff kan se alle barn
- ✅ Foreldre kan oppdatere egne barn
- ✅ Staff kan oppdatere alle barn

---

### 3. **attendance_logs**
Logger for inn- og ut-kryssing.

```sql
CREATE TABLE public.attendance_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES public.children(id) NOT NULL,
  action TEXT NOT NULL,                   -- 'check_in', 'check_out'
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verified_by UUID REFERENCES public.profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Indexes:**
- `idx_attendance_logs_child_id` - Finn logger per barn
- `idx_attendance_logs_timestamp` - Sortering på tid
- `idx_attendance_logs_action` - Filtrering på handling

**RLS Policies:**
- ✅ Foreldre kan se logger for egne barn
- ✅ Staff kan se alle logger
- ✅ Staff kan opprette logger
- ✅ Foreldre kan opprette logger for egne barn

---

### 4. **approved_persons**
Godkjente personer som kan hente barn.

```sql
CREATE TABLE public.approved_persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES public.children(id) NOT NULL,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,                 -- F.eks. "Mor", "Far", "Bestemor"
  phone TEXT NOT NULL,
  can_pick_up BOOLEAN NOT NULL DEFAULT true,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'approved', 'pending', 'rejected'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Indexes:**
- `idx_approved_persons_child_id` - Finn personer per barn
- `idx_approved_persons_status` - Filtrering på status

**RLS Policies:**
- ✅ Foreldre kan se godkjente personer for egne barn
- ✅ Staff kan se alle godkjente personer
- ✅ Foreldre kan legge til/redigere for egne barn
- ✅ Staff kan godkjenne/avvise

---

### 5. **incidents**
Hendelser (skader, sykdom, oppførsel).

```sql
CREATE TABLE public.incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES public.children(id) NOT NULL,
  type TEXT NOT NULL,                     -- 'injury', 'illness', 'behavior', 'other'
  description TEXT NOT NULL,
  severity TEXT NOT NULL,                 -- 'low', 'medium', 'high'
  action_taken TEXT,
  reported_by UUID REFERENCES public.profiles(id),
  notified_parents BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Indexes:**
- `idx_incidents_child_id` - Finn hendelser per barn
- `idx_incidents_created_at` - Sortering på tid
- `idx_incidents_severity` - Filtrering på alvorlighetsgrad

**RLS Policies:**
- ✅ Foreldre kan se hendelser for egne barn
- ✅ Staff kan se alle hendelser
- ✅ Staff kan opprette/redigere hendelser

---

### 6. **daily_info**
Daglig informasjon (meny, aktiviteter, beskjeder).

```sql
CREATE TABLE public.daily_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  type TEXT NOT NULL,                     -- 'menu', 'activity', 'announcement'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_group TEXT,                      -- NULL = alle grupper
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Indexes:**
- `idx_daily_info_date` - Sortering på dato
- `idx_daily_info_type` - Filtrering på type

**RLS Policies:**
- ✅ Alle autentiserte brukere kan lese
- ✅ Staff kan opprette/redigere/slette

---

### 7. **messages**
Meldinger mellom foreldre og ansatte.

```sql
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES public.profiles(id) NOT NULL,
  receiver_id UUID REFERENCES public.profiles(id) NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

**Indexes:**
- `idx_messages_sender_id` - Finn sendte meldinger
- `idx_messages_receiver_id` - Finn mottatte meldinger
- `idx_messages_created_at` - Sortering på tid
- `idx_messages_read` - Filtrering på lest/ulest

**RLS Policies:**
- ✅ Brukere kan se egne meldinger (sendt + mottatt)
- ✅ Brukere kan sende meldinger
- ✅ Brukere kan markere mottatte meldinger som lest

---

## 🔐 Row Level Security (RLS)

Alle tabeller har RLS aktivert for å sikre at brukere kun får tilgang til data de har lov til å se.

### Roller:
- **parent** - Kan se/redigere egne barn og relatert data
- **staff** - Kan se/redigere alle barn og opprette hendelser/info
- **admin** - Full tilgang til alt

### Nøkkelfunksjoner:
```sql
-- Sjekk om bruker er staff
CREATE FUNCTION public.is_staff() RETURNS BOOLEAN;

-- Sjekk om bruker er forelder til barn
CREATE FUNCTION public.is_parent_of(child_uuid UUID) RETURNS BOOLEAN;
```

---

## 🔄 Triggers

### Auto-update `updated_at`
Alle tabeller med `updated_at` felt har en trigger som automatisk oppdaterer timestampen ved UPDATE.

```sql
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

### Auto-create profile
Når en bruker registrerer seg via Supabase Auth, opprettes automatisk en profil.

```sql
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 📈 Relasjoner

```
profiles (1) ─────< (N) children
    │                   │
    │                   ├─────< (N) attendance_logs
    │                   ├─────< (N) approved_persons
    │                   └─────< (N) incidents
    │
    ├─────< (N) daily_info (created_by)
    ├─────< (N) messages (sender_id)
    └─────< (N) messages (receiver_id)
```

---

## 🎯 Vanlige queries

### Hent mine barn
```typescript
import { getMyChildren } from '@/api/children';
const children = await getMyChildren();
```

### Hent dagens info
```typescript
import { getTodayDailyInfo } from '@/api/dailyInfo';
const info = await getTodayDailyInfo('Blåklokka');
```

### Kryss inn barn
```typescript
import { checkIn } from '@/api/attendance';
await checkIn(childId, 'Hentet av mor');
```

### Opprett hendelse
```typescript
import { createIncident } from '@/api/incidents';
await createIncident({
  child_id: childId,
  type: 'injury',
  description: 'Falt på lekeplassen',
  severity: 'low',
  action_taken: 'Renset og plastre',
});
```

---

## 📚 API Referanse

Se `/src-native/api/` for alle API-funksjoner:

- **profiles.ts** - Profilhåndtering
- **children.ts** - Barnehåndtering
- **attendance.ts** - Inn/ut-kryssing
- **approvedPersons.ts** - Henteliste
- **incidents.ts** - Hendelser
- **dailyInfo.ts** - Daglig info
- **messages.ts** - Meldinger

---

## 🔧 Vedlikehold

### Backup
```sql
-- Backup alle tabeller
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### Clear test data
```sql
-- Slett demo-data (VORSIKTIG!)
DELETE FROM public.messages;
DELETE FROM public.daily_info;
DELETE FROM public.incidents;
DELETE FROM public.approved_persons;
DELETE FROM public.attendance_logs;
DELETE FROM public.children;
DELETE FROM public.profiles WHERE email LIKE '%@example.com';
```

### Performance monitoring
```sql
-- Sjekk index usage
SELECT * FROM pg_stat_user_indexes WHERE schemaname = 'public';

-- Sjekk table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

## ✅ Checklist for produksjon

- [ ] RLS policies testet for alle roller
- [ ] Indexes opprettet for alle queries
- [ ] Backup-strategi på plass
- [ ] Monitoring satt opp
- [ ] Test-data fjernet
- [ ] API rate limits konfigurert
- [ ] Connection pooling optimalisert

---

**Dokumentasjonen oppdatert:** 12. desember 2024
