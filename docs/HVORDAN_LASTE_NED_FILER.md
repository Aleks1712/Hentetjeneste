# 📥 Slik laster du ned filene fra Figma Make til din Mac

## 🎯 Situasjonen nå:

- ✅ Alle filene er i **Figma Make** (i nettleseren)
- ❌ Mappen `/Users/sasha/Desktop/hentetjenste-pwa/` på Mac er tom
- 🎯 Vi må få filene fra Figma Make til Mac

---

## ✅ METODE 1: Bruk Figma Make's Nedlastingsfunksjon (Raskest!)

### **I Figma Make (nettleseren):**

**Se etter en knapp/meny med:**
- 📥 "Download Project"
- 📥 "Export"
- 📥 "Download ZIP"
- ⚙️ "Settings" → "Export Project"

**Hvis du finner den:**
1. Trykk på knappen
2. Last ned ZIP-filen
3. Pakk ut ZIP-filen til `/Users/sasha/Desktop/hentetjenste-pwa/`
4. **Ferdig! Gå til "Bekreft at filene er på plass" nedenfor**

---

## ✅ METODE 2: Kopier filer manuelt (hvis ingen nedlastingsknapp)

### **STEG 1: Lag mappestruktur på Mac**

**Åpne Terminal og kjør:**

```bash
cd /Users/sasha/Desktop/hentetjenste-pwa

# Lag mapper
mkdir -p components/ui components/figma data styles public/icons guidelines
```

---

### **STEG 2: Kopier hver fil fra Figma Make til Mac**

**I Figma Make, for HVER fil:**

1. **Åpne filen** (f.eks. `App.tsx`)
2. **Marker alt** (Cmd+A)
3. **Kopier** (Cmd+C)
4. **På Mac:** Åpne TextEdit eller VS Code
5. **Lag ny fil** med samme navn
6. **Lim inn** (Cmd+V)
7. **Lagre** i riktig mappe

**Filer du MÅ kopiere (41 filer totalt):**

#### **Root-filer (7 filer):**
- `App.tsx`
- `index.html`
- `package.json` ✅ (allerede laget)
- `vite.config.ts` ✅ (allerede laget)
- `tsconfig.json` ✅ (allerede laget)
- `tsconfig.node.json` ✅ (allerede laget)
- `README.md` ✅ (allerede laget)

#### **Components (14 filer):**
- `components/ApprovedPersons.tsx`
- `components/BottomNavigation.tsx`
- `components/ChatModal.tsx`
- `components/ChildCard.tsx`
- `components/ConsentModal.tsx`
- `components/DailyInfoView.tsx`
- `components/IncidentList.tsx`
- `components/IncidentReport.tsx`
- `components/InstallPWA.tsx`
- `components/LoginScreen.tsx`
- `components/NotificationsTab.tsx`
- `components/OnboardingScreen.tsx`
- `components/ParentView.tsx`
- `components/PickupLogView.tsx`
- `components/PickupRequest.tsx`
- `components/ProfileTab.tsx`
- `components/QRCodeShare.tsx`
- `components/StaffView.tsx`
- `components/ValueProposition.tsx`

#### **Public (4 filer):**
- `public/manifest.json`
- `public/icon.svg`
- `public/service-worker.js`
- `public/apple-touch-icon.png` (kan være tom/placeholder)

#### **Styles (1 fil):**
- `styles/globals.css`

#### **Data (1 fil):**
- `data/mockData.ts`

---

## ✅ METODE 3: Bruk GitHub direkte fra Figma Make (Beste!)

**Hvis Figma Make har GitHub-integrasjon:**

### **I Figma Make:**

**Se etter:**
- 🔗 "Connect to GitHub"
- 🔗 "Deploy to GitHub"
- 🔗 "Sync with GitHub"

**Hvis du finner det:**
1. Trykk på knappen
2. Logg inn med GitHub
3. Velg repository: `Aleks1712/hentetjeneste-pwa`
4. Trykk "Sync" eller "Push"
5. **Ferdig! Filene er automatisk på GitHub!**

---

## 📊 Bekreft at filene er på plass

**På Mac, kjør:**

```bash
cd /Users/sasha/Desktop/hentetjenste-pwa
ls -la
```

**Du skal nå se:**
```
.git/
App.tsx
index.html
package.json
vite.config.ts
tsconfig.json
README.md
components/
public/
styles/
data/
```

**Hvis du ser dette: ✅ PERFEKT! Gå til "Push til GitHub" nedenfor**

---

## 🚀 Push til GitHub (når filene er på plass)

**Kjør disse kommandoene:**

```bash
cd /Users/sasha/Desktop/hentetjenste-pwa

# Legg til alle filer
git add .

# Sjekk hva som legges til
git status

# Commit
git commit -m "Første versjon av Hentetjeneste PWA med alle filer"

# Push til GitHub
git push -u origin main
```

**Hvis alt gikk bra:**
```
✅ Counting objects: 50, done.
✅ Writing objects: 100% (50/50), done.
✅ To https://github.com/Aleks1712/hentetjeneste-pwa.git
✅  * [new branch]      main -> main
```

**GRATULERER! 🎉 Koden er nå på GitHub!**

---

## 🌐 Deploy til Vercel (siste steg!)

**Nå som koden er på GitHub:**

1. Gå til: https://vercel.com/signup
2. Logg inn med GitHub
3. Trykk "Add New..." → "Project"
4. Velg `hentetjeneste-pwa`
5. Trykk "Deploy"
6. Vent 2-3 minutter
7. ✅ **Ferdig! Du får en URL!**

---

## 🆘 Hjelp! Jeg vet ikke hvordan jeg laster ned fra Figma Make!

**Skriv tilbake til Figma Make-assistenten (meg!) med:**

"Jeg vet ikke hvordan jeg laster ned filene - kan du hjelpe meg?"

**Jeg vil da:**
- Vise deg nøyaktig hvor nedlastingsknappen er
- Eller lage en alternativ løsning
- Eller guide deg gjennom manuell kopiering

---

## ✅ Sjekkliste

- [ ] Filer lastet ned fra Figma Make
- [ ] Filer plassert i `/Users/sasha/Desktop/hentetjenste-pwa/`
- [ ] `ls -la` viser alle filer
- [ ] `git add .` kjørt
- [ ] `git commit` kjørt
- [ ] `git push` kjørt
- [ ] Koden er på GitHub
- [ ] Deployert til Vercel

**Når alle er huket av: 🎉 PERFEKT!**
