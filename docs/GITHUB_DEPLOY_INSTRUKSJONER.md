# 🚀 GitHub Deploy - Steg-for-steg

## ✅ Før vi starter - Sjekkliste:

- [x] **Ikoner er ferdig!** (SVG-ikon i `/public/icon.svg`)
- [x] **Manifest oppdatert** (peker til SVG)
- [x] **Apple-ikon laget** (for iPhone)
- [x] **`.gitignore` opprettet** (så vi ikke committer node_modules)

**Du er klar for deploy! 🎉**

---

## 📦 STEG 1: Opprett GitHub Repository

### **1.1 Gå til GitHub**
Åpne: https://github.com/new

### **1.2 Fyll ut informasjon**
- **Repository name:** `hentetjeneste-pwa`
- **Description:** "Digital hentetjeneste for barnehager med GDPR-sikkerhet - PRO203 prosjekt"
- **Visibility:** Velg **Private** (for skoleprosjekt)
- **VIKTIG:** IKKE huk av "Add a README file"
- **VIKTIG:** IKKE huk av "Add .gitignore"
- **VIKTIG:** IKKE velg "Choose a license"

### **1.3 Trykk "Create repository"**
Du får nå en side med instruksjoner. **IKKE følg dem ennå!**

---

## 💻 STEG 2: Push koden til GitHub

### **2.1 Åpne terminal i prosjektmappen**

**Windows:**
- Høyreklikk i prosjektmappen → "Open in Terminal" eller "Git Bash Here"
- Eller: Åpne Command Prompt og naviger til mappen

**Mac/Linux:**
- Høyreklikk i prosjektmappen → "New Terminal at Folder"
- Eller: Åpne Terminal og `cd` til mappen

### **2.2 Kjør disse kommandoene (én om gangen)**

**VIKTIG: Bytt ut `DITT-GITHUB-BRUKERNAVN` med ditt faktiske GitHub-brukernavn!**

```bash
# 1. Initialiser Git (hvis ikke allerede gjort)
git init

# 2. Legg til alle filer
git add .

# 3. Commit (lagre endringer)
git commit -m "Første versjon av Hentetjeneste PWA - med ikoner og manifest"

# 4. Endre branch til 'main'
git branch -M main

# 5. Koble til GitHub (BYTT UT 'DITT-GITHUB-BRUKERNAVN'!)
git remote add origin https://github.com/DITT-GITHUB-BRUKERNAVN/hentetjeneste-pwa.git

# 6. Push til GitHub
git push -u origin main
```

### **2.3 Hvis du får feilmelding om autentisering:**

**Du må kanskje logge inn med GitHub:**

**Alternativ A (anbefalt): GitHub CLI**
```bash
# Installer GitHub CLI hvis du ikke har det
# Deretter kjør:
gh auth login
# Følg instruksjonene på skjermen
```

**Alternativ B: Personal Access Token**
1. Gå til: https://github.com/settings/tokens/new
2. Gi den navnet "Hentetjeneste Deploy"
3. Velg scope: `repo` (full control)
4. Generer token
5. Kopier tokenet (vises kun én gang!)
6. Når du pusher, bruk:
   - **Username:** Ditt GitHub-brukernavn
   - **Password:** Tokenet du nettopp kopierte

---

## ✅ STEG 3: Bekreft at koden er på GitHub

### **3.1 Gå til GitHub-repo'et ditt**
Åpne: `https://github.com/DITT-GITHUB-BRUKERNAVN/hentetjeneste-pwa`

### **3.2 Sjekk at du ser:**
- ✅ `/public/` mappe
- ✅ `/components/` mappe
- ✅ `/App.tsx`
- ✅ `/manifest.json`
- ✅ `/icon.svg`
- ✅ Alle dine filer!

**Hvis du ser dette: GRATULERER! 🎉**

---

## 🌐 STEG 4: Deploy til Vercel

### **4.1 Gå til Vercel**
Åpne: https://vercel.com/signup

### **4.2 Logg inn med GitHub**
- Trykk **"Continue with GitHub"**
- Godkjenn Vercel's tilgang

### **4.3 Import prosjektet**
1. På Vercel Dashboard, trykk **"Add New..."** → **"Project"**
2. Du skal se `hentetjeneste-pwa` i listen
3. Hvis ikke, trykk "Adjust GitHub App Permissions" og gi tilgang
4. Trykk **"Import"** ved siden av `hentetjeneste-pwa`

### **4.4 Konfigurer (la alt stå som default)**
- **Framework Preset:** Vite (auto-detected)
- **Root Directory:** `.` (root)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- Trykk **"Deploy"**

### **4.5 Vent på deploy (2-3 minutter)**
Du ser nå:
- 🔨 Building...
- ✅ Build Complete
- 🚀 Deploying...
- 🎉 **Confetti! Deploy successful!**

### **4.6 Få din URL**
Du får en URL som: `https://hentetjeneste-pwa.vercel.app`

**Kopier denne URL-en!**

---

## 📱 STEG 5: Test på Mobil

### **På Android (Chrome):**
1. Åpne Chrome på mobil
2. Gå til din Vercel-URL
3. Vent 3-5 sekunder
4. **En blå/lilla banner dukker opp nederst:** "📥 Installer appen"
5. Trykk **"Installer"**
6. ✅ **Appen er nå på hjemskjermen!**
7. Åpne appen → Fungerer som native app!

### **På iPhone (Safari):**
1. Åpne Safari på iPhone
2. Gå til din Vercel-URL
3. Trykk Del-knappen (📤) nederst
4. Velg **"Legg til på Hjem-skjerm"**
5. Trykk **"Legg til"** øverst til høyre
6. ✅ **Appen er nå på hjemskjermen!**
7. Åpne appen → Fungerer som native app!

---

## 🎉 GRATULERER!

Du har nå:
- ✅ Koden på GitHub
- ✅ Appen live på Vercel
- ✅ En installerbar PWA
- ✅ Fungerer på iPhone og Android

**Din app:** `https://hentetjeneste-pwa.vercel.app`

---

## 📊 Hva kan du gjøre nå?

### **1. Del med andre (QR-kode)**
- Åpne appen → Gå til Profil
- Scroll ned til "Del appen"
- Trykk "Vis QR"
- La folk scanne med mobil-kamera!

### **2. Se Vercel Analytics**
- Gå til Vercel Dashboard
- Velg prosjektet ditt
- Se antall besøk, laste-tid, etc.

### **3. Oppdater appen**
Når du gjør endringer:
```bash
git add .
git commit -m "Beskrivelse av endring"
git push
```
**Vercel deployer automatisk!** (2-3 min)

---

## 🐛 Feilsøking

### **Problem: "Failed to push"**
**Løsning:**
- Sjekk at du byttet ut `DITT-GITHUB-BRUKERNAVN`
- Prøv: `git remote -v` for å se om URL er riktig
- Prøv: `git remote remove origin` → Legg til på nytt

### **Problem: "Permission denied"**
**Løsning:**
- Du må autentisere med GitHub
- Bruk GitHub CLI (`gh auth login`)
- Eller: Bruk Personal Access Token

### **Problem: Vercel build feiler**
**Løsning:**
- Sjekk at `package.json` finnes
- Sjekk at `npm run build` fungerer lokalt
- Se build logs på Vercel for feilmeldinger

### **Problem: Install-banner vises ikke**
**Løsning:**
- Vent 3-5 sekunder
- Refresh siden
- Sjekk at du bruker HTTPS (Vercel gjør dette automatisk)

---

## ✅ Sjekkliste - Er alt OK?

- [ ] Koden er på GitHub
- [ ] Vercel deploy var vellykket
- [ ] URL fungerer
- [ ] Testet på Android
- [ ] Testet på iPhone
- [ ] Install-banner dukker opp
- [ ] Appen kan installeres
- [ ] QR-kode fungerer

**Hvis alle er huket av: PERFEKT! 🎉**

---

## 📚 Neste steg

### **For presentasjon:**
Les: `/DEMO_SCRIPT.md`

### **For rapport:**
- Inkluder live URL
- Inkluder GitHub-link
- Ta screenshots
- Kjør Lighthouse PWA-test

---

**Du er ferdig med deploy! Bra jobba! 🚀**
