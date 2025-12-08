# 🏫 Hentetjeneste

Digital hentetjeneste for barnehager med GDPR-sikkerhet - PRO203 prosjekt

## 🚀 Quick Start

### Frontend (React)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Frontend runs on `http://localhost:5173` (or port shown in terminal)

### Backend (Supabase)

Backend er serverless og bruker Supabase. Se `docs/SUPABASE_SETUP.md` for oppsett.

## 📁 Project Structure

```
Hentetjeneste/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # React components
│   ├── services/           # API client
│   ├── data/              # Mock data
│   ├── public/            # Static assets & PWA files
│   └── styles/            # Global styles
├── supabase/              # Database migrations
│   └── migrations/        # SQL migration scripts
├── docs/                  # Documentation
└── tools/                 # Development tools
```

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **PWA** - Progressive Web App support

### Backend
- **Supabase** - Serverless backend (PostgreSQL + Auth + Storage)
- **PostgreSQL** - Database
- **Row Level Security (RLS)** - Data security
- **Supabase Auth** - Authentication & authorization

## 📱 Features

### 🔐 Ansatt-Modus (Blå #2563EB)
- Digital hentetjeneste med QR-godkjenning
- Krysseliste for inn/ut-registrering
- Daglig info til foreldre
- Hendelsesvarsel ved ulykker
- Chat med foreldre

### 👨‍👩‍👧 Foreldre-Modus (Lilla #8B5CF6)
- Godkjenn hvem som kan hente
- Se krysseliste-status
- Motta hendelsesvarsel
- Chat med ansatte
- Full kontroll over barnets data

## 🔌 API & Database

Applikasjonen bruker **Supabase** som backend:
- **PostgreSQL database** - Se `supabase/migrations/` for schema
- **Supabase Auth** - Autentisering og autorisering
- **Row Level Security** - GDPR-sikker dataadgang
- **Real-time subscriptions** - Live oppdateringer

Se `docs/SUPABASE_SETUP.md` for oppsett og `src/services/supabase.ts` for API-klient.

## 🔐 Security

- **Supabase Auth** - Secure authentication
- **Row Level Security (RLS)** - Database-level security
- **GDPR-compliant** - Se `docs/GDPR_COMPLIANCE.md`
- **Role-based access control** - PARENT, STAFF, ADMIN
- **Data encryption** - In transit and at rest (Supabase)

## 📚 Documentation

See the `docs/` folder for detailed documentation:
- `QUICK_START.md` - Getting started guide
- `PWA_GUIDE.md` - Progressive Web App setup
- `DEPLOY_GUIDE.md` - Deployment instructions

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Supabase)
Backend er serverless via Supabase. Se `docs/SUPABASE_SETUP.md` for oppsett.

Set environment variables for frontend:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## 📝 Development Notes

- Frontend bruker Supabase direkte (ingen egen backend-server)
- Mock data finnes i `src/data/mockData.ts` for testing
- Supabase migrations i `supabase/migrations/`
- Set `VITE_SUPABASE_URL` og `VITE_SUPABASE_ANON_KEY` i `.env`

## 👨‍💻 Developer

**Aleksander** (Aleks1712)  
GitHub: [@Aleks1712](https://github.com/Aleks1712)

---

**⭐ Hvis du liker prosjektet, gi det en stjerne på GitHub!**
  