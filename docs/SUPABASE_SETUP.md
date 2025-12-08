# Supabase Setup Guide

## 🚀 Quick Start

### 1. Create Supabase Project

1. Gå til [supabase.com](https://supabase.com)
2. Opprett nytt prosjekt
3. Velg region: **EU (Frankfurt)** for GDPR-compliance
4. Noter ned:
   - Project URL: `https://xxxxx.supabase.co`
   - API Key (anon/public): `eyJhbGc...`
   - Service Role Key: `eyJhbGc...` (keep secret!)

### 2. Install Supabase CLI (Optional)

```bash
npm install -g supabase
supabase login
supabase init
```

### 3. Environment Variables

Create `.env` file in root:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # Backend only
```

## 📊 Database Schema

Se `supabase/migrations/` for SQL migrations.

## 🔐 Row Level Security (RLS)

All tables have RLS enabled:
- Parents can only see their own children
- Staff can see all children
- Admins have full access

## 📝 Next Steps

1. Run migrations in Supabase dashboard
2. Seed data using `supabase/seed.sql`
3. Test authentication
4. Update frontend to use Supabase client

