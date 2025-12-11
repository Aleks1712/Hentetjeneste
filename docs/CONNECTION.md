# How to connect the Hentetjeneste frontend to Supabase

This is a quick, clear guide for connecting your Vite/React app to Supabase and verifying that everything works.

## 1) Environment variables
- Add these values to `.env` (root):

VITE_SUPABASE_URL=https://[YOUR_PROJECT_ID].supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key-from-supabase>

**Note:** Erstatt `[YOUR_PROJECT_ID]` med ditt faktiske Supabase project ID.

- Do NOT commit `.env` with secret keys. Add `.env` to `.gitignore`.

## 2) Frontend client initialization
The app uses `src/services/supabase.ts`. It reads the env vars and creates the supabase client with:

```ts
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

No changes are needed for the client when you set env var values correctly.

## 3) Service keys and server-side operations
- `VITE_*` env variables are public and only for the client. They use the `anon` key.
- If you need server-side admin operations (seed users, invite users, manage roles), create an env variable in your server or deployment env:

SUPABASE_SERVICE_ROLE_KEY=<your-service_role-key>

**DO NOT** expose `SUPABASE_SERVICE_ROLE_KEY` in the browser or commit to git.

## 4) Running local dev
1. Install dependencies (on a machine with Node):
```bash
npm install
```
2. Start dev server:
```bash
npm run dev
```
3. Open the app in your browser (Vite shows a URL, usually http://localhost:5173)

## 5) Run migrations and seed data (2 options)
- Option A (UI): Use Supabase dashboard -> SQL Editor, paste SQL from `/scripts/seed.sql` and run.
- Option B (CLI): If you have the Supabase CLI and Docker installed:
```bash
npm install -g supabase
supabase login
supabase link --project-ref [YOUR_PROJECT_ID]
supabase db push
```

**Note:** Erstatt `[YOUR_PROJECT_ID]` med ditt faktiske Supabase project ID.

If you cannot use the CLI in Codespaces, use SQL Editor in the dashboard.

## 6) Add test users in Auth (Dashboard)
1. Go to Supabase Dashboard -> Authentication -> Users -> Add user.
2. Record the returned `id` (UUID) for each new account.
3. Use the `INSERT` SQL in the `seed.sql` to create `profiles` and `children` using the same UUID values for `profiles.id`.

## 7) Verify role-based access
- Log in as `parent` and check you only see child records connected to the parent's `profile.id`.
- Log in as `staff` and ensure you can view all children.
- If a query gets `403`, check RLS policies in the Dashboard (Table Editor -> Policies) and check the relevant policy `using` and `check` statements.

## 8) Useful code samples
Sign up:
```js
let { data, error } = await supabase.auth.signUp({ email: 'parent@example.com', password: 'P@ssw0rd!' })
```
Sign in:
```js
let { data, error } = await supabase.auth.signInWithPassword({ email: 'parent@example.com', password: 'P@ssw0rd!' })
```
Get current user:
```js
const { data: { user } } = await supabase.auth.getUser()
```

## 9) Debugging tips
- Check browser devtools network tab for failing queries.
- Use the Supabase dashboard Logs -> Requests for errors.
- If RLS denies access: try to temporarily disable the policy to isolate the issue, or run the query via the serviceRole key (server-side) for debugging.
- If migrations fail due to FK constraint, create profiles first or run the SQL in order.

---

If you wish, I can:
- Create a small Node script that seeds DB using the service role key (safe to execute locally), or
- Create a SQL seed file and add it to `/scripts/seed.sql` (so you can paste it into Supabase SQL Editor).

Which would you prefer?