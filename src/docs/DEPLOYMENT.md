# 🚀 Deployment Guide

Komplett guide for å deploye Hentetjeneste PWA til produksjon.

---

## 📋 Oversikt

Denne guiden dekker:
1. **GitHub Setup** - Push kode til GitHub
2. **Vercel Deployment** - Deploy til produksjon
3. **PWA Testing** - Test installasjon på mobil
4. **Supabase Setup** - Koble til backend (valgfritt)

**Estimert tid:** 20-30 minutter

---

## 🎯 Steg 1: GitHub Setup (5 min)

### 1.1 Opprett GitHub Repository

1. Gå til https://github.com/new
2. Fyll ut:
   - **Repository name:** `hentetjeneste-pwa`
   - **Description:** "Digital hentetjeneste for barnehager - PRO203 prosjekt"
   - **Visibility:** Private (anbefalt for skoleopp gaver)
   - **Initialize with:** Ingen (vi har allerede kode)
3. Klikk **"Create repository"**

### 1.2 Push Kode til GitHub

Åpne terminal i prosjektmappen og kjør:

```bash
# Initialiser Git repository
git init

# Legg til alle filer
git add .

# Første commit
git commit -m "Initial commit - Hentetjeneste PWA"

# Sett default branch til main
git branch -M main

# Legg til remote
git remote add origin https://github.com/DIN-BRUKER/hentetjeneste-pwa.git

# Push til GitHub
git push -u origin main
```

**⚠️ VIKTIG:** Bytt ut `DIN-BRUKER` med ditt GitHub-brukernavn!

### 1.3 Verifiser

- Gå til `https://github.com/DIN-BRUKER/hentetjeneste-pwa`
- Sjekk at alle filer er der
- README.md skal vises

---

## 🌐 Steg 2: Vercel Deployment (5 min)

### 2.1 Opprett Vercel-konto

1. Gå til https://vercel.com/signup
2. Velg **"Continue with GitHub"**
3. Autoriser Vercel til å aksessere GitHub-kontoen din

### 2.2 Import Repository

1. På Vercel Dashboard, klikk **"Add New..."** → **"Project"**
2. Finn og velg `hentetjeneste-pwa` fra listen
3. Klikk **"Import"**

### 2.3 Konfigurer Prosjekt

**Framework Preset:** Vite (oppdages automatisk)

**Build & Development Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
- Ikke nødvendig for demo (mock data)
- Legg til senere hvis du kobler til Supabase

**Klikk "Deploy"**

### 2.4 Vent på Deploy

- Deployment tar 2-3 minutter
- Du vil se en fremgangslinje
- ✅ Når ferdig: "Congratulations!"

### 2.5 Få Live URL

Din app er nå live på:
```
https://hentetjeneste-pwa.vercel.app
```

Eller din custom URL:
```
https://hentetjeneste-pwa-din-bruker.vercel.app
```

**✅ Ferdig! Appen er nå tilgjengelig på internett!**

---

## 📱 Steg 3: Test PWA på Mobil (5 min)

### 3.1 Test på Android

1. Åpne **Chrome** på Android-telefonen
2. Gå til din Vercel-URL
3. Vent 3-5 sekunder
4. En banner skal dukke opp: **"Installer Hentetjeneste"**
5. Trykk **"Installer"**
6. Appen legges nå til på hjemskjermen! 🎉

**Hvis banneret ikke dukker opp:**
- Trykk på meny (⋮) → "Installer appen"
- Eller: "Legg til på startskjermen"

### 3.2 Test på iPhone

1. Åpne **Safari** på iPhone
2. Gå til din Vercel-URL
3. Trykk **Del-knappen** (📤) nederst
4. Scroll ned og velg **"Legg til på Hjem-skjerm"**
5. Trykk **"Legg til"**
6. Appen legges nå til på hjemskjermen! 🎉

### 3.3 Verifiser PWA

**Sjekk at:**
- ✅ Ikon vises på hjemskjermen
- ✅ Appen åpner i fullskjerm (ingen browser-bar)
- ✅ Navigasjon fungerer
- ✅ Fungerer offline (lukk Wi-Fi, test at appen fortsatt åpner)

---

## 🗄️ Steg 4: Supabase Setup (VALGFRITT)

Hvis du vil koble appen til en ekte database (backend).

### 4.1 Opprett Supabase-prosjekt

1. Gå til https://supabase.com
2. Klikk **"Start your project"**
3. Logg inn med GitHub
4. Klikk **"New Project"**
5. Fyll ut:
   - **Name:** `hentetjeneste-prod`
   - **Database Password:** Generer sterkt passord (lagre det!)
   - **Region:** `Europe (Frankfurt)` ← **VIKTIG for GDPR!**
   - **Pricing Plan:** Free
6. Klikk **"Create new project"**
7. ⏳ Vent 2-3 minutter

### 4.2 Kjør Database Migrations

#### 4.2.1 Åpne SQL Editor
1. I Supabase Dashboard, gå til **SQL Editor** (ikon til venstre)
2. Klikk **"+ New query"**

#### 4.2.2 Kjør Migration 001 (Schema)
1. Åpne `/supabase/migrations/001_initial_schema.sql` i prosjektet
2. Kopier **alt innhold**
3. Lim inn i SQL Editor
4. Klikk **"Run"** (nede til høyre)
5. ✅ Du skal se "Success. No rows returned"

#### 4.2.3 Kjør Migration 002 (RLS Policies)
1. Åpne `/supabase/migrations/002_rls_policies.sql`
2. Kopier **alt innhold**
3. Lim inn i SQL Editor (ny query)
4. Klikk **"Run"**
5. ✅ Du skal se "Success. No rows returned"

#### 4.2.4 Kjør Migration 003 (Sample Data) - VALGFRITT
**⚠️ Kun for testing! Ikke i produksjon!**

1. Åpne `/supabase/migrations/003_sample_data.sql`
2. Kopier **alt innhold**
3. Lim inn i SQL Editor (ny query)
4. Klikk **"Run"**
5. ✅ Du skal se demo-data i tabellene

#### 4.2.5 Verifiser Tabeller
1. Gå til **Table Editor** (ikon til venstre)
2. Sjekk at disse tabellene eksisterer:
   - ✅ profiles
   - ✅ children
   - ✅ attendance_logs
   - ✅ approved_persons
   - ✅ incidents
   - ✅ daily_info
   - ✅ messages

### 4.3 Hent API-nøkler

1. Gå til **Settings** (tannhjul nederst til venstre)
2. Klikk **API**
3. Kopier:
   - **Project URL** (f.eks. `https://xyzcompany.supabase.co`)
   - **anon public key** (lang JWT-streng)

### 4.4 Legg til Environment Variables

#### Lokalt (development)
1. I prosjektets rot-mappe, opprett `.env`:
   ```env
   VITE_SUPABASE_URL=https://xyzcompany.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

2. Restart dev-server:
   ```bash
   npm run dev
   ```

#### Vercel (production)
1. Gå til Vercel Dashboard
2. Velg prosjektet `hentetjeneste-pwa`
3. Gå til **Settings** → **Environment Variables**
4. Legg til:
   - **Name:** `VITE_SUPABASE_URL`  
     **Value:** `https://xyzcompany.supabase.co`
   - **Name:** `VITE_SUPABASE_ANON_KEY`  
     **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
5. Klikk **"Save"**
6. Gå til **Deployments** og klikk **"Redeploy"**

### 4.5 Oppdater Supabase Authentication Settings

1. Gå til **Authentication** → **URL Configuration** i Supabase
2. Legg til:
   ```
   Site URL: https://hentetjeneste-pwa.vercel.app
   
   Redirect URLs:
   - https://hentetjeneste-pwa.vercel.app/**
   - http://localhost:5173/** (for local dev)
   ```
3. Klikk **"Save"**

### 4.6 Opprett Første Bruker

1. Gå til **Authentication** → **Users** i Supabase
2. Klikk **"Add user"** → **"Create new user"**
3. Fyll ut:
   - **Email:** `demo@example.com`
   - **Password:** `Demo123!@#`
   - **Auto Confirm User:** ✅ Huk av
4. Klikk **"Create user"**

### 4.7 Test Innlogging

1. Åpne appen (lokal eller deployed)
2. Logg inn med:
   - Email: `demo@example.com`
   - Password: `Demo123!@#`
3. ✅ Du skal nå komme inn i appen!

### 4.8 Aktiver Realtime (valgfritt)

1. Gå til **Database** → **Replication** i Supabase
2. Aktiver Realtime på disse tabellene:
   - `children`
   - `attendance_logs`
   - `messages`
   - `incidents`

**Test realtime:**
1. Åpne appen i to browsere
2. Kryss inn et barn i Browser 1
3. Se at statusen oppdateres automatisk i Browser 2! 🎉

---

## ✅ Ferdig!

### Du har nå:
- ✅ Kode på GitHub
- ✅ App deployed til Vercel
- ✅ PWA testet på mobil
- ✅ (Valgfritt) Supabase backend koblet til

---

## 🐛 Feilsøking

### Problem: "Git: command not found"
**Løsning:** Installer Git:
- Windows: https://git-scm.com/download/win
- Mac: `brew install git`
- Linux: `sudo apt install git`

### Problem: "Permission denied (publickey)"
**Løsning:** 
1. Bruk HTTPS i stedet for SSH
2. Eller sett opp SSH-key: https://docs.github.com/en/authentication

### Problem: Vercel build feiler
**Løsning:**
- Sjekk at `package.json` har riktig `build` script
- Sjekk at alle dependencies er i `dependencies` (ikke `devDependencies`)
- Se build-logg for feilmelding

### Problem: PWA installeres ikke
**Løsning:**
- Sjekk at du bruker HTTPS (Vercel gjør dette automatisk)
- Sjekk at manifest.json er tilgjengelig: `https://din-url/manifest.json`
- Sjekk at service-worker.js er tilgjengelig: `https://din-url/service-worker.js`
- Test i inkognito-modus
- Clear browser cache

### Problem: "Invalid API key" (Supabase)
**Løsning:**
- Sjekk at `.env` har riktig `VITE_SUPABASE_ANON_KEY`
- Restart dev-server: `npm run dev`
- Sjekk at key ikke har ekstra mellomrom

### Problem: "Row Level Security policy violation"
**Løsning:**
- Sjekk at du kjørte `002_rls_policies.sql`
- Logg inn med en bruker som har riktig rolle
- Sjekk at RLS er aktivert i Table Editor

### Problem: Deploy til Vercel fungerer, men ikke lokalt
**Løsning:**
- Sjekk at `.env` er opprettet lokalt
- Sjekk at `.env` ikke er commited til Git (skal være i `.gitignore`)
- Restart dev-server

---

## 📊 Testing Checklist

### Før innlevering:
- [ ] Kode pushet til GitHub
- [ ] Deployed til Vercel
- [ ] URL fungerer
- [ ] Testet på Android
- [ ] Testet på iPhone
- [ ] PWA installerer korrekt
- [ ] Offline-funksjonalitet fungerer
- [ ] Alle hovedfunksjoner testet
- [ ] GDPR-kontroller fungerer
- [ ] Screenshots tatt
- [ ] (Valgfritt) Supabase koblet til og testet

---

## 🎤 For Presentasjon

### Demo-forberedelse:
1. Test at app er tilgjengelig (åpne URL)
2. Test at PWA-installasjon fungerer
3. Forbered QR-kode (Profil → Del appen)
4. Test screen mirroring på forhånd
5. Ha backup (screenshots/video) klar

### Under demo:
1. Vis live URL
2. Vis installasjon på mobil (eller video av dette)
3. Demonstrer hovedfunksjoner
4. Vis QR-kode for at andre kan teste

---

## 🔗 Nyttige Lenker

### Vercel
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Support: https://vercel.com/help

### Supabase
- Dashboard: https://app.supabase.com
- Docs: https://supabase.com/docs
- RLS Guide: https://supabase.com/docs/guides/auth/row-level-security

### Testing
- PWA Checker: https://www.pwabuilder.com
- Lighthouse: Chrome DevTools → Lighthouse tab
- Mobile Testing: https://www.browserstack.com (paid)

---

## 💡 Tips

### Custom Domain (valgfritt)
1. Kjøp domene (f.eks. fra Namecheap)
2. I Vercel: Settings → Domains → Add Domain
3. Følg DNS-instruksjonene
4. Vent 10-30 min på propagering

### Automatic Deploys
- Hver `git push` til `main` deployer automatisk til Vercel
- Hver branch får sin egen preview-URL
- Rollback til tidligere versjon i Vercel Dashboard

### Analytics (valgfritt)
1. I Vercel: Analytics → Enable
2. Se besøksstatistikk, performance, etc.

---

**Dokumentasjon opprettet:** 10. desember 2025  
**Sist oppdatert:** 10. desember 2025  
**Estimert tid:** 20-30 minutter  
**Vanskelighetsgrad:** 🟢 Lett (følg stegene!)
