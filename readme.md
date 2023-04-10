# Edunexus

University management platform for academics, users, timetables, and exams — with a React frontend and an Express + MongoDB API.

## Features

- **Auth** — JWT in HTTP-only cookies, role-based access (`admin`, `teacher`, `student`, `parent`)
- **User management** — students, teachers, parents, and admins
- **Academics** — academic years, classes, and subjects
- **Timetable** — AI-assisted timetable generation (Inngest + Google AI)
- **LMS** — exam creation, taking, and submissions
- **Dashboard** — role-aware stats and activity logs
- **Public landing** — university-facing home page

## Tech stack

| Layer | Stack |
| --- | --- |
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, React Router, Axios |
| Backend | Bun, Express 5, TypeScript, Mongoose |
| Database | MongoDB |
| Auth | JWT (`HS512`), HTTP-only cookies |
| Jobs / AI | Inngest, Vercel AI SDK, Google Generative AI |

## Project structure

```text
Edunexus/
├── frontend/          # Vite + React app
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── lib/
└── backend/           # Express API
    └── src/
        ├── config/
        ├── controllers/
        ├── middleware/
        ├── models/
        ├── routes/
        ├── inngest/
        └── utils/
```

## Prerequisites

- [Bun](https://bun.sh) (backend)
- Node.js 20+ (frontend tooling)
- MongoDB (local or Atlas)
- Google Generative AI API key (for timetable / exam generation)

## Getting started

### 1. Backend

```bash
cd backend
bun install
cp .env.example .env
```

Fill in `.env`:

```env
PORT=5000
STAGE=development
CLIENT_URL=http://localhost:5173
MONGO_URL=mongodb://127.0.0.1:27017/edunexus
JWT_SECRET=replace_with_a_long_random_secret
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
```

Start the API:

```bash
bun run dev
```

Health check: [http://localhost:5000](http://localhost:5000)

### 2. Frontend

```bash
cd frontend
npm install
```

Optional: create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the app:

```bash
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

## Auth overview

1. `POST /api/users/login` verifies email/password and sets an HTTP-only `jwt` cookie (30 days).
2. Protected routes use `protect` to verify the cookie and attach `req.user`.
3. `authorize([...roles])` restricts access by role.
4. `POST /api/users/logout` clears the cookie.

Cookie options: `httpOnly`, `sameSite: strict`, `secure` in production.

## Main API routes

| Prefix | Purpose |
| --- | --- |
| `/api/users` | Login, logout, profile, CRUD users |
| `/api/academic-years` | Academic year settings |
| `/api/classes` | Class management |
| `/api/subjects` | Subject management |
| `/api/timetables` | Timetable generation |
| `/api/exams` | Exams and submissions |
| `/api/dashboard` | Dashboard stats |
| `/api/activities` | Activity logs |
| `/api/inngest` | Background job endpoint |

## Scripts

### Backend (`backend/`)

| Command | Description |
| --- | --- |
| `bun run dev` | Dev server with nodemon |
| `bun run start` | Dev server with Bun watch |

### Frontend (`frontend/`)

| Command | Description |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

## Roles

| Role | Typical access |
| --- | --- |
| `admin` | Full management (users, academics, timetable, exams) |
| `teacher` | Students, subjects, exams, limited admin tools |
| `student` | Exams and own academic views |
| `parent` | Parent-facing access as configured |

## Notes

- The frontend sends credentials with Axios so cookies work across origins when CORS is configured with `credentials: true`.
- Keep `CLIENT_URL` aligned with the frontend origin.
- Never commit `.env` files; use `.env.example` as the template.

## License

Private / unpublished — update this section if you open-source the project.
