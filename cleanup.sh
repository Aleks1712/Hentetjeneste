#!/bin/bash

# Naviger til prosjektmappen
cd /workspaces/Hentetjeneste/src

# Fjern web-spesifikke filer og mapper
rm -rf App.tsx context/ data/ docs/ guidelines/ public/ screens/ src/ styles/ supabase/ translations/ ui/ vite.config.ts generate-icons.html tsconfig.node.json

# Flytt React Native filer til riktig plass
mv src-native/* ./ 2>/dev/null || true
rmdir src-native 2>/dev/null || true

mv components-native/* ./components/ 2>/dev/null || true
rmdir components-native 2>/dev/null || true

mv context-native/* ./context/ 2>/dev/null || true
rmdir context-native 2>/dev/null || true

mv data-native/* ./data/ 2>/dev/null || true
rmdir data-native 2>/dev/null || true

mv screens-native/* ./screens/ 2>/dev/null || true
rmdir screens-native 2>/dev/null || true

mv translations-native/* ./translations/ 2>/dev/null || true
rmdir translations-native 2>/dev/null || true

# Flytt React Native hovedfiler til rot
cd /workspaces/Hentetjeneste
mv src/App-Native.tsx src/App.tsx 2>/dev/null || true
rm -f src/App-Native-Auth.tsx 2>/dev/null || true

# Flytt package-native.json til package.json
mv src/package-native.json package.json 2>/dev/null || true

# Flytt tsconfig-native.json til tsconfig.json
mv src/tsconfig-native.json tsconfig.json 2>/dev/null || true

# Flytt babel.config.js og index.js til rot
mv src/babel.config.js . 2>/dev/null || true
mv src/index.js . 2>/dev/null || true
mv src/app.json . 2>/dev/null || true

echo "Cleanup fullført!"
