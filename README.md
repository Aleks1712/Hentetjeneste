# 🏫 Hentetjeneste

Digital hentetjeneste for barnehager med GDPR-sikkerhet - PRO203 prosjekt

## 🚀 Quick Start

### Frontend (React)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Frontend runs on `http://localhost:3000` (or port shown in terminal)

### Backend (Spring Boot)

```bash
cd backend

# Install dependencies (requires Java 17+ and Maven)
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

## 📁 Project Structure

```
Hentetjeneste/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # React components
│   ├── services/           # API client
│   ├── data/              # Mock data
│   ├── public/            # Static assets & PWA files
│   └── styles/            # Global styles
├── backend/                # Backend (Spring Boot)
│   ├── src/main/java/     # Java source code
│   └── src/main/resources/ # Configuration
├── docs/                  # Documentation
└── tools/                 # Development tools
```

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **PWA** - Progressive Web App support

### Backend
- **Java 17**
- **Spring Boot 3.2**
- **Spring Data JPA** - Database access
- **Spring Security** - Authentication
- **H2 Database** (dev) / **PostgreSQL** (prod)
- **JWT** - Token-based auth

## 📱 Features

### 🔐 Ansatt-Modus (Blå #2563EB)
- Digital hentetjeneste med QR-godkjenning
- Krysseliste for inn/ut-registrering
- Daglig info til foreldre
- Hendelsesvarsel ved ulykker
- Chat med foreldre

### 👨‍👩‍👧 Foreldre-Modus (Lilla #8B5CF6)
- Godkjenn hvem som kan hente
- Se krysseliste-status
- Motta hendelsesvarsel
- Chat med ansatte
- Full kontroll over barnets data

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Children
- `GET /api/children` - Get all children
- `GET /api/children/{id}` - Get child by ID
- `POST /api/children` - Create new child
- `PUT /api/children/{id}` - Update child
- `PATCH /api/children/{id}/check-in` - Check in child
- `PATCH /api/children/{id}/check-out` - Check out child

## 🗄️ Database

Development uses H2 database (stored in `backend/data/`).

Access H2 Console at: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/hentetjeneste`
- Username: `sa`
- Password: (empty)

For production, use PostgreSQL (see `backend/src/main/resources/application-prod.yml`)

## 🔐 Security

- JWT-based authentication
- Password encryption (BCrypt)
- CORS configured for frontend
- Role-based access control (PARENT, STAFF, ADMIN)
- GDPR-compliant data handling

## 📚 Documentation

See the `docs/` folder for detailed documentation:
- `QUICK_START.md` - Getting started guide
- `PWA_GUIDE.md` - Progressive Web App setup
- `DEPLOY_GUIDE.md` - Deployment instructions

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
cd backend
mvn clean package
# Deploy target/hentetjeneste-backend-1.0.0.jar
```

Set environment variables:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `JWT_SECRET`
- `PORT`

## 📝 Development Notes

- Backend uses H2 database in development
- Frontend uses mock data when backend is not available
- API client automatically handles authentication tokens
- Set `VITE_API_URL=http://localhost:8080/api` in `.env` if needed

## 👨‍💻 Developer

**Aleksander** (Aleks1712)  
GitHub: [@Aleks1712](https://github.com/Aleks1712)

---

**⭐ Hvis du liker prosjektet, gi det en stjerne på GitHub!**
  