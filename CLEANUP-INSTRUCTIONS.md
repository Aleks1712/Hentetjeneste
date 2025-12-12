# Oppryddingsinstruksjoner for React Native-only

## Kjør cleanup script

Kjør følgende kommando i terminalen:

```bash
bash cleanup.sh
```

Dette vil:
1. Fjerne alle web-spesifikke filer og mapper
2. Flytte React Native-filer til riktig struktur
3. Sette opp riktig package.json for React Native
4. Fjerne duplikater og unødvendige filer

## Etter cleanup

Strukturen vil være:

```
/workspaces/Hentetjeneste/
├── app.json
├── babel.config.js
├── index.js
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── App.tsx (React Native)
    ├── api/
    ├── components/
    ├── hooks/
    ├── lib/
    ├── types/
    ├── utils/
    ├── context/
    ├── data/
    ├── screens/
    └── translations/
```

## Installere dependencies

Etter cleanup, kjør:

```bash
npm install
# eller
yarn install
```

## Starte appen

```bash
npm start
# eller
expo start
```

## Dokumentasjonsfiler å beholde

Følgende dokumentasjonsfiler er flyttet til src/ og kan gjennomgås:
- README-NATIVE.md
- KJØRE-APPEN.md
- HOW-TO-RUN.md
- DATABASE-SCHEMA.md
- SUPABASE-SETUP.md

Du kan slette de dokumentasjonsfilene du ikke trenger senere.
