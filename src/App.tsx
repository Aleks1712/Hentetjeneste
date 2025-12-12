import React from 'react';

export default function App() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: 1.6,
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white',
        marginBottom: '32px',
      }}>
        <h1 style={{ margin: '0 0 16px 0', fontSize: '32px' }}>
          🏫 Hentetjeneste - React Native App
        </h1>
        <p style={{ margin: 0, fontSize: '18px', opacity: 0.9 }}>
          Digital hentetjeneste for barnehager med GDPR-sikkerhet
        </p>
      </div>

      <div style={{
        background: '#FEF3C7',
        border: '2px solid #F59E0B',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px',
      }}>
        <h2 style={{ margin: '0 0 12px 0', color: '#B45309', fontSize: '20px' }}>
          ⚠️ Dette er en React Native app
        </h2>
        <p style={{ margin: 0, color: '#92400E', fontSize: '16px' }}>
          Denne appen kan <strong>IKKE</strong> kjøres i Figma Make's preview. 
          Den må kjøres via <strong>Expo CLI</strong> på din lokale maskin eller mobil.
        </p>
      </div>

      <div style={{
        background: '#DCFCE7',
        border: '2px solid #16A34A',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px',
      }}>
        <h2 style={{ margin: '0 0 12px 0', color: '#15803D', fontSize: '20px' }}>
          ✅ BUG FIKSET! (12. Des 2024)
        </h2>
        <p style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '16px' }}>
          Hvis appen crashet tidligere i dag, er det nå fikset! De manglende dependencies 
          er lagt til i <code style={{ background: '#BBF7D0', padding: '2px 6px', borderRadius: '4px' }}>package.json</code>:
        </p>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#166534' }}>
          <li><strong>react-native-gesture-handler</strong> ✅</li>
          <li><strong>@react-navigation/bottom-tabs</strong> ✅</li>
        </ul>
        <p style={{ margin: '12px 0 0 0', color: '#166534', fontSize: '14px' }}>
          📖 Les <strong>QUICK-FIX.md</strong> for instruksjoner!
        </p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px',
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#111827', fontSize: '20px' }}>
          🚀 Slik kjører du appen:
        </h3>
        
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ color: '#2563EB', marginBottom: '8px' }}>
            Metode 1: Test på ekte telefon (anbefalt)
          </h4>
          <ol style={{ margin: 0, paddingLeft: '20px', color: '#4B5563' }}>
            <li style={{ marginBottom: '8px' }}>
              Installer <strong>Expo Go</strong> fra App Store / Google Play
            </li>
            <li style={{ marginBottom: '8px' }}>
              Last ned prosjektfilene fra Figma Make
            </li>
            <li style={{ marginBottom: '8px' }}>
              Kjør i terminal:
              <pre style={{
                background: '#F3F4F6',
                padding: '12px',
                borderRadius: '8px',
                overflow: 'auto',
                fontSize: '14px',
              }}>
{`cd hentetjeneste-rn
npm install
npx expo start`}
              </pre>
            </li>
            <li style={{ marginBottom: '8px' }}>
              Skann QR-koden med Expo Go appen
            </li>
          </ol>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ color: '#2563EB', marginBottom: '8px' }}>
            Metode 2: Test i Android Emulator / iOS Simulator
          </h4>
          <ol style={{ margin: 0, paddingLeft: '20px', color: '#4B5563' }}>
            <li style={{ marginBottom: '8px' }}>
              Installer Android Studio (Android) eller Xcode (iOS/macOS)
            </li>
            <li style={{ marginBottom: '8px' }}>
              Start en emulator/simulator
            </li>
            <li style={{ marginBottom: '8px' }}>
              Kjør <code style={{ background: '#F3F4F6', padding: '2px 6px', borderRadius: '4px' }}>npx expo start</code>
            </li>
            <li style={{ marginBottom: '8px' }}>
              Trykk <strong>a</strong> (Android) eller <strong>i</strong> (iOS)
            </li>
          </ol>
        </div>

        <div style={{
          background: '#DBEAFE',
          borderLeft: '4px solid #2563EB',
          padding: '16px',
          borderRadius: '8px',
        }}>
          <p style={{ margin: 0, color: '#1E40AF', fontSize: '14px' }}>
            💡 <strong>Pro tip:</strong> Testing på ekte telefon med Expo Go er raskest! 
            Hver gang du lagrer kode, oppdateres appen automatisk.
          </p>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px',
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#111827', fontSize: '20px' }}>
          📦 Hva er implementert?
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <h4 style={{ color: '#2563EB', margin: '0 0 8px 0', fontSize: '16px' }}>
              ✅ Database (Supabase)
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', fontSize: '14px' }}>
              <li>7 tabeller med RLS</li>
              <li>Autentisering</li>
              <li>CRUD operations</li>
              <li>Sample data</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#8B5CF6', margin: '0 0 8px 0', fontSize: '16px' }}>
              ✅ UI Components
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', fontSize: '14px' }}>
              <li>ParentHomeScreen</li>
              <li>StaffChecklistScreen</li>
              <li>DailyInfoEditor</li>
              <li>Theme system</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#10B981', margin: '0 0 8px 0', fontSize: '16px' }}>
              ✅ API Layer
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', fontSize: '14px' }}>
              <li>Supabase client</li>
              <li>React Query hooks</li>
              <li>Type-safe API</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: '#F59E0B', margin: '0 0 8px 0', fontSize: '16px' }}>
              ✅ Utils & Theme
            </h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', fontSize: '14px' }}>
              <li>Norsk datoformatering</li>
              <li>Spond-inspirert design</li>
              <li>TypeScript types</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '24px',
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#111827', fontSize: '20px' }}>
          📚 Viktige filer
        </h3>
        
        <div style={{ fontSize: '14px' }}>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#2563EB' }}>📖 README.md</strong>
            <p style={{ margin: '4px 0 0 0', color: '#6B7280' }}>
              Komplett guide for å komme i gang
            </p>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#8B5CF6' }}>🚀 HOW-TO-RUN.md</strong>
            <p style={{ margin: '4px 0 0 0', color: '#6B7280' }}>
              Detaljerte instruksjoner for 4 metoder
            </p>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#10B981' }}>📊 SUPABASE-SQL-SETUP.sql</strong>
            <p style={{ margin: '4px 0 0 0', color: '#6B7280' }}>
              Database schema - kjør dette i Supabase SQL Editor
            </p>
          </div>
          
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#F59E0B' }}>🏗️ PROJECT-STRUCTURE.md</strong>
            <p style={{ margin: '4px 0 0 0', color: '#6B7280' }}>
              Arkitektur og mappestruktur
            </p>
          </div>
          
          <div>
            <strong style={{ color: '#EF4444' }}>⚙️ .env.example</strong>
            <p style={{ margin: '4px 0 0 0', color: '#6B7280' }}>
              Template for Supabase credentials
            </p>
          </div>
        </div>
      </div>

      <div style={{
        background: '#F3F4F6',
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center',
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#111827', fontSize: '20px' }}>
          🎯 Quick Start
        </h3>
        <pre style={{
          background: '#1F2937',
          color: '#F9FAFB',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'left',
          overflow: 'auto',
          fontSize: '14px',
        }}>
{`# 1. Last ned filene fra Figma Make

# 2. Installer dependencies
cd hentetjeneste-rn
npm install

# 3. Kjør SQL-script i Supabase
# Gå til: https://app.supabase.com/project/gvqxcdcphggotggfvqbe/sql
# Kopier innhold fra SUPABASE-SQL-SETUP.sql

# 4. Start Expo
npx expo start

# 5. Skann QR-kode med Expo Go appen på telefonen
# Eller trykk 'a' for Android emulator / 'i' for iOS simulator`}
        </pre>
      </div>

      <div style={{
        marginTop: '32px',
        padding: '24px',
        background: 'linear-gradient(135deg, #2563EB 0%, #8B5CF6 100%)',
        borderRadius: '12px',
        color: 'white',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: '18px' }}>
          📱 <strong>Last ned filene og kjør appen lokalt!</strong>
        </p>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '14px' }}>
          React Native apps må kjøres via Expo CLI på mobil eller emulator
        </p>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
        <p>
          📚 Les <strong>HOW-TO-RUN.md</strong> for detaljerte instruksjoner
        </p>
        <p style={{ marginTop: '8px' }}>
          💡 Support: <a href="https://docs.expo.dev/" style={{ color: '#2563EB' }}>Expo Docs</a> | 
          {' '}<a href="https://supabase.com/docs" style={{ color: '#2563EB' }}>Supabase Docs</a>
        </p>
      </div>
    </div>
  );
}