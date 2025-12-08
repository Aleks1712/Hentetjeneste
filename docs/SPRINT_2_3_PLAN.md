# Sprint 2-3 Planlegging

## 🎯 GULL Oppgaver (Deadline: Fredag 12. desember)
**Skal legges inn på Scrumwise**

### Backend/Database
- [ ] Set up Supabase project (EU region)
- [ ] Run database migrations (`supabase/migrations/`)
- [ ] Seed mock data into Supabase
- [ ] Test database connections
- [ ] Verify RLS policies work correctly

### Frontend Integration
- [ ] Install Supabase client (`@supabase/supabase-js`)
- [ ] Create Supabase service (`src/services/supabase.ts`)
- [ ] Replace mock data with Supabase queries
- [ ] Test authentication flow
- [ ] Test data fetching

### GDPR Compliance
- [ ] Implement GDPR functions in Supabase
- [ ] Add privacy policy page
- [ ] Add "Export my data" button
- [ ] Add "Delete my account" button
- [ ] Add consent checkboxes
- [ ] Test GDPR functions

## 🔵 BLÅ Oppgaver (Deadline: Søndag 14. desember)

### Documentation
- [ ] Update README.md with Supabase info
- [ ] Add LICENSE file ✅ (Done)
- [ ] Create GDPR_COMPLIANCE.md ✅ (Done)
- [ ] Create SUPABASE_SETUP.md ✅ (Done)

### Testing
- [ ] Test all Supabase queries
- [ ] Test GDPR functions
- [ ] Test RLS policies
- [ ] Test authentication

### Polish
- [ ] Error handling for Supabase
- [ ] Loading states
- [ ] Offline fallback to mock data

## 📝 Notater

### Tech Stack Klarifisering
- **Frontend**: React + TypeScript (PWA) ✅
- **Backend**: Java/Spring Boot ✅ (ikke Kotlin)
- **Database**: Supabase (PostgreSQL) ✅
- **Mobile**: PWA (ikke native Swift/Kotlin apps)

### Supabase Setup
1. Opprett prosjekt på supabase.com
2. Velg EU-region (Frankfurt)
3. Kjør migrations fra `supabase/migrations/`
4. Sett environment variables i `.env`

### Mock Data Migration
All mock data fra `src/data/mockData.ts` er konvertert til SQL i:
- `supabase/migrations/002_seed_data.sql`

## ✅ Ferdig
- [x] LICENSE file
- [x] GDPR compliance functions
- [x] Supabase migrations
- [x] Supabase client setup
- [x] Documentation

