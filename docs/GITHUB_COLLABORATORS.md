# 👥 Legge til GitHub Collaborators

## Steg-for-steg guide

### 1. Gå til GitHub Repository Settings

1. Åpne repoet: https://github.com/Aleks1712/Hentetjeneste
2. Klikk på **"Settings"** (øverst i repoet, ved siden av "Code")
3. I venstre meny, klikk på **"Collaborators"** (under "Access")

### 2. Legg til Collaborators

1. Klikk på **"Add people"** (eller "Invite a collaborator")
2. Skriv inn GitHub-brukernavnet eller e-postadressen til personen du vil legge til
3. Velg rolle:
   - **Read** - Kan kun lese/se kode
   - **Triage** - Kan lese + opprette issues/PRs
   - **Write** - Kan lese + pushe kode (anbefalt for utviklere)
   - **Maintain** - Kan administrere repoet (uten å slette)
   - **Admin** - Full tilgang (inkludert sletting)

4. Klikk **"Add [username] to this repository"**

### 3. Personen mottar invitasjon

- Personen får en e-post med invitasjon
- Eller de kan se invitasjonen på GitHub
- De må akseptere invitasjonen før de får tilgang

---

## Alternativ: Bruk GitHub Teams

Hvis dere er flere, kan du opprette et team:

1. Gå til organisasjonen din (hvis du har en)
2. Opprett et team
3. Legg til teamet som collaborator i stedet

---

## Anbefalte roller

- **Utviklere:** Write (kan pushe kode)
- **Code reviewers:** Triage eller Write
- **Designere/PM:** Read eller Triage

---

## Sjekke hvem som har tilgang

1. Gå til Settings → Collaborators
2. Se listen over alle som har tilgang
3. Du kan endre roller eller fjerne tilgang her

---

## Viktig

- Kun repo-eieren kan legge til collaborators
- Invitasjoner utløper etter 7 dager hvis de ikke aksepteres
- Du kan sende ny invitasjon hvis den utløper

---

**Når collaborators er lagt til, kan de:**
- Klone repoet: `git clone https://github.com/Aleks1712/Hentetjeneste.git`
- Pushe endringer direkte til repoet
- Opprette pull requests
- Se alle filer og historikk


