# 📁 Hentetjeneste - Project Structure

## Overview

This React Native app follows a clean, organized architecture with clear separation of concerns.

```
hentetjeneste-rn/
├─ App.tsx                          # Minimal entry: Navigation + QueryClient + Theme
├─ .env                             # Supabase credentials (gitignored)
├─ .env.example                     # Template for .env
├─ package.json                     # Dependencies
├─ tsconfig.json                    # TypeScript config with path aliases
├─ app.json                         # Expo config
│
├─ src/
│  ├─ api/                          # API layer (Supabase calls)
│  │  ├─ supabaseClient.ts          # Supabase client + auth helpers
│  │  └─ dailyInfo.ts               # Daily info CRUD operations
│  │
│  ├─ hooks/                        # Custom React hooks
│  │  └─ useDailyInfo.ts            # React Query hooks for daily info
│  │
│  ├─ components/                   # Reusable UI components
│  │  ├─ DailyInfoCard.tsx          # Single daily info card
│  │  ├─ DailyInfoList.tsx          # List with loading/error states
│  │  └─ EmptyState.tsx             # Empty state placeholder
│  │
│  ├─ screens/                      # App screens
│  │  ├─ ParentHomeScreen.tsx       # Parent view: shows daily info
│  │  ├─ StaffChecklistScreen.tsx   # Staff view: checklist + editor button
│  │  └─ DailyInfoEditorScreen.tsx  # Staff: create/update/delete daily info
│  │
│  ├─ navigation/                   # Navigation setup
│  │  └─ AppNavigator.tsx           # Stack navigator with role-based routing
│  │
│  ├─ types/                        # TypeScript types
│  │  └─ dailyInfo.ts               # Daily info types
│  │
│  ├─ utils/                        # Utility functions
│  │  └─ date.ts                    # Date formatting (Norwegian)
│  │
│  └─ theme/                        # Design system
│     ├─ colors.ts                  # Color palette (Spond-inspired)
│     └─ index.ts                   # Theme object (spacing, fonts, shadows)
│
├─ assets/                          # Static assets
│  ├─ icons/
│  └─ fonts/
│
└─ docs/                            # Documentation
   ├─ SUPABASE-SQL-SETUP.sql        # Database schema
   ├─ DATABASE-SCHEMA.md            # Database documentation
   ├─ QUICK-START.md                # Quick start guide
   └─ README-SUPABASE-AUTH.md       # Auth implementation guide
```

---

## 🎯 Architecture Principles

### **1. Separation of Concerns**
- **API layer** (`src/api/`) - All Supabase calls
- **Hooks** (`src/hooks/`) - React Query wrappers for caching/mutations
- **Components** (`src/components/`) - Reusable UI elements
- **Screens** (`src/screens/`) - Full-page views
- **Navigation** (`src/navigation/`) - Routing logic

### **2. Type Safety**
- TypeScript everywhere
- Shared types in `src/types/`
- Type-safe navigation with `RootStackParamList`

### **3. Design System**
- Centralized theme in `src/theme/`
- Spond-inspired color palette:
  - **Blue (#2563EB)** - Staff mode
  - **Purple (#8B5CF6)** - Parent mode
- Consistent spacing, typography, shadows

### **4. Data Fetching**
- React Query for caching/mutations
- Optimistic updates
- Automatic refetching
- Loading/error states

---

## 📦 Key Dependencies

```json
{
  "expo": "~50.0.0",
  "react-native": "0.73.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17",
  "@tanstack/react-query": "^5.17.0",
  "@supabase/supabase-js": "^2.39.0",
  "@react-native-async-storage/async-storage": "1.21.0"
}
```

---

## 🎨 Design System

### Colors
```typescript
// Staff mode - Blue
primary: '#2563EB'

// Parent mode - Purple
secondary: '#8B5CF6'

// Daily info types
menu: '#F59E0B'      // Amber
activity: '#10B981'  // Green
announcement: '#6366F1' // Indigo
```

### Spacing
```typescript
xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48
```

### Border Radius
```typescript
sm: 4, md: 8, lg: 12, xl: 16, full: 9999
```

---

## 🔄 Data Flow

### Parent View
```
ParentHomeScreen
  ↓
useTodayDailyInfo(group)
  ↓
React Query (cache)
  ↓
getDailyInfo() API
  ↓
Supabase (daily_info table)
  ↓
DailyInfoList component
  ↓
DailyInfoCard (each item)
```

### Staff View
```
StaffChecklistScreen
  ↓
📅 button → Navigate to DailyInfoEditorScreen
  ↓
useDailyInfo() + useDailyInfoMutations()
  ↓
Create/Update/Delete operations
  ↓
React Query invalidates cache
  ↓
UI updates automatically
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
# Already configured in .env
EXPO_PUBLIC_SUPABASE_URL=https://gvqxcdcphggotggfvqbe.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_EnfTn1-gpKLmr4GH8EP8NQ_t2rOFEy9
```

### 3. Set up database
```bash
# Run SUPABASE-SQL-SETUP.sql in Supabase SQL Editor
```

### 4. Start app
```bash
npx expo start
```

---

## 🧪 Development Workflow

### Adding a new feature

1. **Create types** in `src/types/`
2. **Create API functions** in `src/api/`
3. **Create custom hook** in `src/hooks/`
4. **Create components** in `src/components/`
5. **Create screen** in `src/screens/`
6. **Add to navigation** in `src/navigation/AppNavigator.tsx`

### Example: Adding "Messages" feature

```typescript
// 1. src/types/messages.ts
export interface Message { ... }

// 2. src/api/messages.ts
export async function getMessages() { ... }

// 3. src/hooks/useMessages.ts
export function useMessages() { ... }

// 4. src/components/MessageCard.tsx
export function MessageCard() { ... }

// 5. src/screens/MessagesScreen.tsx
export function MessagesScreen() { ... }

// 6. src/navigation/AppNavigator.tsx
<Stack.Screen name="Messages" component={MessagesScreen} />
```

---

## 📝 Code Style

### File naming
- **Components**: PascalCase (e.g., `DailyInfoCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useDailyInfo.ts`)
- **Utils**: camelCase (e.g., `date.ts`)
- **Types**: camelCase (e.g., `dailyInfo.ts`)

### Component structure
```typescript
// 1. Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

// 2. Types/Interfaces
interface Props { ... }

// 3. Component
export function ComponentName({ prop }: Props) {
  // Hooks
  // Event handlers
  // Render
  return <View>...</View>;
}

// 4. Styles
const styles = StyleSheet.create({ ... });
```

---

## 🔐 Security

- ✅ `.env` is gitignored
- ✅ RLS policies enabled on all tables
- ✅ API keys are public-safe (publishable key)
- ✅ Auth tokens stored in AsyncStorage (encrypted)
- ✅ HTTPS for all API calls

---

## 📚 Next Steps

- [ ] Implement full authentication flow
- [ ] Add children management
- [ ] Implement checklist functionality
- [ ] Add approved persons (henteliste)
- [ ] Implement incidents reporting
- [ ] Add messaging system
- [ ] Implement real-time updates
- [ ] Add offline support
- [ ] Implement push notifications
- [ ] Add dark mode support

---

**Documentation last updated:** 12. desember 2024
