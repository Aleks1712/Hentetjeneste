# 🖨️ SPRINT 2-3 PLANLEGGINGSSJEKLISTE

(Utskriftsvennlig sjekkliste for gruppa)

---

## ✅ 1. Sprint 2 – Planleggings-sjekkliste

### Backlog & mål
- [ ] Sprintmål definert
- [ ] Stories prioritert i Scrumwise
- [ ] Alle stories har akseptansekriterier
- [ ] Oppgaver brutt ned i tasks og tildelt
- [ ] Estimert i story points

### Teknisk planlegging
- [x] Valgt arkitektur: **Java/Spring Boot backend** ✅
- [x] Valgt struktur: **React + TypeScript frontend (PWA)** ✅
- [x] Enig om dataflyt mellom frontend ⇄ backend ✅
- [x] Enig om API-format (JSON/REST) ✅
- [x] Enig om minstekrav for MVP av backend ✅

### Design & funksjonelle krav
- [ ] UI-ferdigstilling for inn/ut-kryssing
- [ ] Design ferdig for profilvisning
- [ ] Navigasjonsflyt låst (React Router)
- [ ] Responsivitet testet i browser/devtools

---

## 🔐 2. GDPR Compliance Checklist

**(Dette er sterkt vektlagt i eksamen/rapport!)**

### Databehandling
- [x] Privacy Policy oppdatert med Supabase som databehandler ✅
- [ ] DPA (Data Processing Agreement) akseptert hos Supabase
- [x] Databehandling kun i EU / EØS-region (Frankfurt) ✅
- [x] Supabase migrations med GDPR-funksjoner ✅

### Brukerrettigheter
- [x] Brukere kan be om dataportabilitet (`export_user_data()` function) ✅
- [x] Brukere kan be om sletting (`delete_user_data()` function) ✅
- [x] Brukere kan trekke tilbake samtykke (`revoke_consent()` function) ✅
- [ ] Brukere informert om lagringstid (i Privacy Policy)

### Teknisk sikkerhet
- [x] Data kryptert i transit (HTTPS) ✅
- [x] Data kryptert i rest (Supabase default encryption) ✅
- [x] Passord hashing (BCrypt i Spring Boot) ✅
- [x] RBAC implementert (PARENT vs STAFF vs ADMIN) ✅
- [x] Ingen sensitive data i frontend/source code ✅
- [x] Row Level Security (RLS) policies i Supabase ✅

### Policy & kontroll
- [x] Data retention policy dokumentert ✅
- [ ] Logg av inn/ut-hendelser uten personidentifiserende info
- [ ] Risikoanalyse gjennomført (kort versjon er nok)

---

## 🧱 3. Java/Spring Boot Backend – MVP Oppsett

### Teknologi
- ✅ **Java 17**
- ✅ **Spring Boot 3.2**
- ✅ **Spring Data JPA**
- ✅ **Supabase PostgreSQL** (eller H2 for dev)
- ✅ **JWT Authentication**

### Backend – sjekkliste
- [x] Prosjektet opprettet (Maven) ✅
- [x] Konfigurert Spring Boot server ✅
- [x] Supabase URL + keys konfigurert (i application.yml) ✅
- [x] Datamodeller definert:
  - [x] User ✅
  - [x] Child ✅
  - [x] ApprovedPerson ✅
  - [x] Incident ✅
  - [x] PickupLog ✅
  - [x] DailyInfo ✅

### API-endepunkter
- [x] `POST /api/auth/login` ✅
- [x] `POST /api/auth/register` ✅
- [x] `GET /api/children` ✅
- [x] `GET /api/children/{id}` ✅
- [x] `PATCH /api/children/{id}/check-in` ✅
- [x] `PATCH /api/children/{id}/check-out` ✅
- [ ] `GET /api/children?parentId={id}` (filter by parent)
- [ ] `POST /api/incidents` (report incident)
- [ ] `GET /api/incidents?childId={id}` (get incidents)
- [ ] `GET /api/pickup-logs?childId={id}` (get pickup history)
- [ ] `GET /api/daily-info` (get daily info)

### Sikkerhet
- [x] JWT-auth implementert ✅
- [x] Role-checking i SecurityConfig (RBAC) ✅
- [x] CORS konfigurert ✅
- [ ] Alle API-responser returnerer kun nødvendig data
- [ ] Input validation på alle endpoints

### Testing
- [x] Test controllers opprettet ✅
- [ ] Alle API-ruter testet i Postman
- [ ] 1 test per rute (minimum)
- [x] Backend logikk dokumentert i README ✅

---

## 📱 4. React Frontend – MVP Plan

### Teknologi
- ✅ **React 18 + TypeScript**
- ✅ **Vite** (Build tool)
- ✅ **Tailwind CSS** (Styling)
- ✅ **PWA** (Progressive Web App)

### Frontend – sjekkliste
- [x] Prosjekt opprettet ✅
- [x] Model interfaces laget (Child, User, etc.) ✅
- [x] API-service laget (`src/services/api.ts`) ✅
- [x] Supabase client opprettet (`src/services/supabase.ts`) ✅
- [ ] LoginView fungerer mot backend
- [ ] HomeView henter liste over barn
- [ ] StaffView viser inn/ut status
- [ ] Tasting UI for innsjekking/utsjekking

### Navigasjon
- [x] Viktigste Views opprettet:
  - [x] LoginScreen ✅
  - [x] ParentView ✅
  - [x] StaffView ✅
  - [x] ProfileTab ✅
  - [x] NotificationsTab ✅
- [x] AppState håndtering (login/logout) ✅
- [x] BottomNavigation ✅

### Sikkerhet
- [x] Tokens lagres i localStorage ✅
- [x] API client håndterer auth automatisk ✅
- [ ] Kun API-svar styrer tilstanden (ikke lokal manipulation)
- [ ] Token refresh håndtering

### Testing
- [ ] Test av API-kall i browser DevTools
- [ ] Test av navigasjonsflyt
- [ ] Responsive test (mobile/tablet/desktop)
- [ ] PWA install test (Android/iOS)

---

## 🗄️ 5. Database & Supabase

### Supabase Setup
- [ ] Supabase prosjekt opprettet
- [ ] EU-region valgt (Frankfurt)
- [ ] Migrations kjørt (`001_initial_schema.sql`)
- [ ] Seed data lastet inn (`002_seed_data.sql`)
- [ ] GDPR functions installert (`003_gdpr_functions.sql`)
- [ ] RLS policies testet

### Database Schema
- [x] Users table ✅
- [x] Children table ✅
- [x] Approved_persons table ✅
- [x] Incidents table ✅
- [x] Pickup_logs table ✅
- [x] Daily_info table ✅
- [x] User_consents table (GDPR) ✅

---

## 📋 6. Dokumentasjon

- [x] README.md oppdatert ✅
- [x] LICENSE fil lagt til ✅
- [x] GDPR_COMPLIANCE.md ✅
- [x] SUPABASE_SETUP.md ✅
- [x] SPRINT_2_3_PLAN.md ✅
- [ ] API dokumentasjon (Swagger/OpenAPI)
- [ ] Deployment guide oppdatert

---

## ✅ Ferdig (Sprint 1)
- [x] Prosjektstruktur opprettet
- [x] Backend med Spring Boot
- [x] Frontend med React
- [x] Database schema designet
- [x] GDPR compliance funksjoner
- [x] Supabase migrations
- [x] Dokumentasjon organisert

---

## 🎯 Neste Steg (Sprint 2-3)

### Prioritet 1 (GULL - Fredag 12. des)
1. Set up Supabase project
2. Run migrations
3. Connect frontend to Supabase
4. Test authentication flow

### Prioritet 2 (BLÅ - Søndag 14. des)
1. Implement all API endpoints
2. Add GDPR UI features
3. Test everything
4. Update documentation

---

**Status:** ✅ Klar for Sprint 2-3!

