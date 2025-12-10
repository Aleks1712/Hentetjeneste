# 🏫 Hentetjeneste PWA

Digital hentetjeneste for barnehager med GDPR-sikkerhet - PRO203 prosjekt

## 🚀 Quick Start

### Lokal Utvikling
```bash
# Installer avhengigheter
npm install

# Start dev server
npm run dev

# Bygg for produksjon
npm run build

# Preview produksjonsbygg
npm run preview
```

### Live Demo
**Deployed:** [https://hentetjeneste-pwa.vercel.app](https://hentetjeneste-pwa.vercel.app)

### 📱 Installer som App

**På Android:**
1. Åpne linken i Chrome
2. Trykk "Installer" når banner dukker opp
3. Appen legges til på hjemskjermen

**På iPhone:**
1. Åpne linken i Safari
2. Trykk Del (📤) → "Legg til på Hjem-skjerm"
3. Appen legges til på hjemskjermen

---

## ✨ Hovedfunksjoner

### 🔐 Ansatt-Modus (Blå #2563EB)
- **Krysseliste** - Inn/ut-registrering med tidsstempel
- **Godkjenning** - QR-scanning for hentetjeneste
- **Daglig info** - Send oppdateringer til foreldre
- **Hendelsesrapporter** - Varsle ved ulykker/hendelser
- **Chat** - Kommuniser med foreldre per barn
- **Ukeplaner** - Vis aktiviteter for uken

### 👨‍👩‍👧 Foreldre-Modus (Lilla #8B5CF6)
- **Status** - Se om barn er inne eller ute
- **Hentetjeneste** - Godkjenn hvem som kan hente
- **Meldinger** - Chat med ansatte
- **Varslinger** - Motta hendelsesrapporter
- **Ukeplaner** - Se kommende aktiviteter
- **Personvern** - Full kontroll over barnets data

### 📱 PWA-funksjoner
- ✅ Installer på hjemskjerm
- ✅ Fungerer offline (service worker)
- ✅ App-lignende opplevelse
- ✅ Automatisk installasjonsbanner
- ✅ Rask lasting

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **PWA:** Service Worker + Manifest
- **Backend (optional):** Supabase
- **Deploy:** Vercel

---

## 📁 Prosjektstruktur

```
hentetjeneste-pwa/
├── public/
│   ├── icons/                    # PWA-ikoner
│   ├── manifest.json             # PWA manifest
│   └── service-worker.js         # Service worker
│
├── src/
│   ├── services/                 # Supabase-integrasjon
│   │   ├── supabase.ts          # Supabase client
│   │   └── api-types.ts         # TypeScript types
│   ├── App.tsx                  # Hovedapp
│   └── main.tsx                 # Entry point
│
├── components/
│   ├── StaffView.tsx            # Ansatt-visning
│   ├── ParentView.tsx           # Foreldre-visning
│   ├── StaffChatModal.tsx       # Chat for ansatte
│   ├── ChatModal.tsx            # Chat for foreldre
│   ├── QRCodeShare.tsx          # QR-kode deling
│   ├── InstallPWA.tsx           # PWA install-banner
│   ├── PrivacySettings.tsx      # GDPR-kontrollpanel
│   └── ...                      # Flere komponenter
│
├── data/
│   └── mockData.ts              # Mock data for demo
│
├── translations/
│   └── translations.ts          # 12 språk
│
├── supabase/
│   └── migrations/              # Database migrations
│       ├── 001_initial_schema.sql
│       ├── 002_rls_policies.sql
│       └── 003_sample_data.sql
│
├── docs/                        # Dokumentasjon
│   ├── DEPLOYMENT.md            # Deploy-guide
│   ├── DOCUMENTATION.md         # Krav, GDPR, presentasjon
│   └── Attributions.md          # Credits
│
└── README.md                    # 👈 Du er her
```

---

## 🎯 Designprinsipper

- **Spond-inspirert UX:** Ren, moderne, mobilvennlig
- **Fargesystem:**
  - Blå (#2563EB): Ansatt-modus
  - Lilla (#8B5CF6): Foreldre-elementer
- **GDPR-compliant:** Rollebasert tilgang + RLS
- **Mobile-first:** Designet for touch og små skjermer
- **Tilgjengelig:** 12 språk + mørk modus

---

## 🔐 GDPR & Sikkerhet

- ✅ Rollebasert tilgang (RBAC)
- ✅ Row Level Security (RLS) i Supabase
- ✅ Kryptert datalagring (AES-256)
- ✅ Passordkrav (min. 8 tegn, store/små, tall, spesialtegn)
- ✅ Data lagres i EU (Frankfurt)
- ✅ GDPR-rettigheter (last ned, slett data)
- ✅ Personvernerklæring + vilkår for bruk

---

## 📊 Funksjoner

### ✅ Implementert (100% av MÅ-krav)
- [x] Inn/ut-kryssing med tidsstempel
- [x] Hentetjeneste med godkjente personer
- [x] QR-kode for sikker henting
- [x] Rollebasert tilgang (foreldre/ansatt/admin)
- [x] Chat mellom foreldre og ansatte
- [x] Hendelsesrapportering
- [x] Daglig info til foreldre
- [x] Ukeplaner
- [x] Personvernkontroller (GDPR)
- [x] Varslinger
- [x] PWA (installerbar app)
- [x] Flerspråklig (12 språk)
- [x] Mørk modus
- [x] Offline-støtte

### 🚀 Ekstra funksjoner (utover case)
- [x] Profil med profilbilde
- [x] Endre passord med validering
- [x] QR-deling av app
- [x] Installa PWA-banner
- [x] Service worker for offline
- [x] Onboarding-screens
- [x] Responsivt design
- [x] Chat-funksjonalitet
- [x] GDPR-kontrollpanel
- [x] Juridiske dokumenter
- [x] Supabase-integrasjon klar
- [x] TypeScript types
- [x] Database migrations

---

## 📚 Dokumentasjon

- **[README.md](./README.md)** (denne filen) - Oversikt og quick start
- **[/docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deploy til GitHub, Vercel, og Supabase-setup
- **[/docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md)** - Kravanalyse, GDPR-rapport, presentasjon
- **[/docs/Attributions.md](./docs/Attributions.md)** - Credits for biblioteker og ressurser

---

## 🎓 Bruk av Applikasjonen

### Demo-brukere (mock data)
**Forelder:**
- Velg "Foreldre-modus" ved oppstart
- Se egne barn, send meldinger, godkjenn hentepersoner

**Ansatt:**
- Velg "Ansatt-modus" ved oppstart
- Se alle barn, krysse inn/ut, sende daglig info

**Bytte modus:**
- Gå til Profil → Endre visning → Velg ny rolle

---

## 🚀 Deploy

Se **[/docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** for fullstendig guide til:
- GitHub oppsett
- Vercel deployment
- PWA-testing
- Supabase-integrasjon

**Kort versjon:**
```bash
# 1. Push til GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DIN-BRUKER/hentetjeneste-pwa.git
git push -u origin main

# 2. Deploy til Vercel
# Gå til https://vercel.com
# Import repository
# Klikk "Deploy"
```

---

## 🆘 Feilsøking

### PWA installeres ikke
- Sjekk at du bruker HTTPS (eller localhost)
- Sjekk at manifest.json er tilgjengelig
- Sjekk at service-worker.js er registrert
- Test i inkognito-modus

### Supabase-feil
- Sjekk at `.env` har riktige nøkler
- Restart dev-server etter .env-endringer
- Sjekk at RLS policies er aktivert

### Build-feil
```bash
# Slett node_modules og reinstaller
rm -rf node_modules
npm install

# Clear cache og rebuild
npm run build
```

---

## 📄 Lisens

MIT License - Laget for PRO203 ved HVL

---

## 👨‍💻 Utvikler

**Aleksander** (Aleks1712)  
GitHub: [@Aleks1712](https://github.com/Aleks1712)

---

## 🌟 Status

- ✅ **100% av MÅ-krav** fra FrostByte-case oppfylt
- ✅ **Alle BØR-krav** implementert
- ✅ **13 ekstra funksjoner** utover case
- ✅ **PWA-klar** (installbar app)
- ✅ **GDPR-compliant** (RLS, kryptering, personvern)
- ✅ **Produksjonsklar** (deployert til Vercel)
- ✅ **Supabase-integrasjon** klar

---

**⭐ Hvis du liker prosjektet, gi det en stjerne på GitHub!**
