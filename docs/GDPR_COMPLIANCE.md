# GDPR Compliance Checklist

## ✅ Implementert

- [x] Privacy policy mentions Supabase as data processor
- [x] Users can request data deletion (function: `delete_user_data()`)
- [x] Users can export their data (function: `export_user_data()`)
- [x] Data is encrypted in transit and at rest (Supabase handles this)
- [x] User consent is recorded and stored (`user_consents` table)
- [x] Data retention policy can be enforced (function: `anonymize_user_data()`)
- [x] Users can revoke consent anytime (function: `revoke_consent()`)

## 📋 Implementasjonsdetaljer

### Data Processor
- **Supabase** er nevnt som data processor i privacy policy
- Data lagres i EU-region (Frankfurt) for GDPR-compliance

### Data Export (Article 15)
```sql
SELECT export_user_data('user-uuid-here');
```
Returnerer all brukerdata som JSON.

### Data Deletion (Article 17)
```sql
SELECT delete_user_data('user-uuid-here');
```
Sletter all brukerdata (cascade).

### Consent Management
```sql
-- Record consent
SELECT record_consent('user-uuid', 'data_processing', true);

-- Revoke consent
SELECT revoke_consent('user-uuid', 'data_processing');
```

### Row Level Security (RLS)
- Alle tabeller har RLS aktivert
- Parents kan kun se egne barn
- Staff kan se alle barn
- Admins har full tilgang

## 🔒 Security Features

- Password hashing (BCrypt)
- JWT authentication
- HTTPS only (enforced by Supabase)
- Encrypted database connections
- Row Level Security policies

## 📝 Privacy Policy Requirements

Privacy policy må inneholde:
1. Hvilke data vi samler inn
2. Hvorfor vi samler dem
3. Hvordan vi bruker dem
4. Hvem vi deler dem med (Supabase)
5. Brukerens rettigheter (access, deletion, export)
6. Kontaktinformasjon for GDPR-spørsmål

## 🚨 Data Retention

- Aktiv data: Beholdes så lenge brukeren er aktiv
- Inaktive brukere: Anonymiseres etter 2 år
- Slettede brukere: Data slettes permanent (cascade)

