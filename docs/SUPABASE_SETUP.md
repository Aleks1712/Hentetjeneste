# 🔗 Koble til Supabase - Steg-for-steg Guide

## Steg 1: Hent API-nøkkelen fra Supabase Dashboard

1. **Gå til Supabase Dashboard:**
   https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/settings/api
   
   **Note:** Erstatt `[YOUR_PROJECT_ID]` med ditt faktiske Supabase project ID.

2. **Finn "Project API keys"** seksjonen

3. **Kopier "anon" `public`-nøkkelen** (ikke `service_role`!)
   - Den starter med `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Den er trygg å bruke i frontend-kode

---

## Steg 2: Legg inn API-nøkkelen i .env-filen

1. **Åpne `.env`-filen** i prosjektet
2. **Erstatt** `your-anon-key-here` med den faktiske nøkkelen du kopierte

**Eksempel:**
```env
VITE_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note:** Erstatt `[YOUR_PROJECT_ID]` med ditt faktiske Supabase project ID.

---

## Steg 3: Verifiser migrasjoner er kjørt

Sjekk om database-migrasjonene er kjørt:

```bash
# Hvis du har Supabase CLI installert:
supabase migration list

# Eller sjekk i Supabase Dashboard -> SQL Editor
```

Hvis migrasjonene ikke er kjørt, kjør dem:

```bash
supabase link --project-ref [YOUR_PROJECT_ID]
supabase db push
```

**Note:** Erstatt `[YOUR_PROJECT_ID]` med ditt faktiske Supabase project ID.

---

## Steg 4: Test tilkoblingen

1. **Start utviklingsserveren:**
   ```bash
   npm run dev
   ```

2. **Åpne applikasjonen** i nettleseren

3. **Sjekk konsollen** for eventuelle feilmeldinger

4. **Prøv å logge inn** eller se om demo-data vises

---

## Steg 5: Verifiser at alt fungerer

- ✅ Applikasjonen laster uten feil
- ✅ Du kan se data fra Supabase (hvis migrasjoner er kjørt)
- ✅ Eller demo-data vises (hvis Supabase ikke er konfigurert)

---

## Troubleshooting

### Problem: "Invalid API key"
- Sjekk at du kopierte hele nøkkelen (den er veldig lang)
- Sjekk at det ikke er mellomrom eller linjeskift

### Problem: "Failed to fetch"
- Sjekk at Supabase URL er riktig
- Sjekk internett-tilkobling
- Sjekk at Supabase-prosjektet er aktivt

### Problem: "relation does not exist"
- Migrasjonene er ikke kjørt
- Kjør `supabase db push` eller kjør migrasjonene manuelt i SQL Editor

---

## Direkte lenker

Erstatt `[YOUR_PROJECT_ID]` med ditt faktiske Supabase project ID:

- **API Settings:** https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/settings/api
- **SQL Editor:** https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/sql/new
- **Database Tables:** https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/editor

