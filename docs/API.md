## Hentetjeneste API (kort guide)

Base URL: `http://localhost:8080`

Auth: JWT Bearer. Hent token fra `/api/auth/login` eller `/api/auth/register`, send som header `Authorization: Bearer <token>`.

### Auth
- `POST /api/auth/register` — body: `{ email, password, name, phone, role? }` → returns `{ token, email, name, role, userId }`
- `POST /api/auth/login` — body: `{ email, password }` → returns `{ token, email, name, role, userId }`

### Children (JWT)
- `GET /api/children` — Forelder: egne barn. Ansatt/Admin: alle.
- `GET /api/children/{id}` — Forelder: kun eget barn. Ansatt/Admin: alle.
- `POST /api/children` — Forelder: oppretter barn for seg selv (parent settes automatisk). Ansatt/Admin: kan opprette barn fritt.
- `PUT /api/children/{id}` — Forelder: kan kun oppdatere eget barn (parent tvinges til seg selv). Ansatt/Admin: alle.
- `PATCH /api/children/{id}/check-in` — Forelder: eget barn. Ansatt/Admin: alle.
- `PATCH /api/children/{id}/check-out` — Forelder: eget barn. Ansatt/Admin: alle.

### Swagger / Health
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health: `GET /actuator/health`

### Roller og tilgang (RBAC)
- Forelder (PARENT): kun egne barn.
- Ansatt (STAFF) / Admin: alle barn.
