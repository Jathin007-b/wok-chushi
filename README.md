# 🥢 Wok Chushi — The Chinese Food Chain

Full-stack restaurant website with online table booking. Recreated from
<https://wok-chushi-golden-table.lovable.app>.

**Sections:** Hero · About · Services · Today's Offers · Gallery · FAQ · Reservation form · WhatsApp button

## Tech stack
| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite, plain CSS (responsive, dark/gold theme) |
| Backend | Node.js, Express, Helmet, CORS, rate limiting |
| Database | SQLite (`better-sqlite3`) — schema in `backend/schema.sql` |

## Project structure
```
wok-chushi/
├── backend/
│   ├── server.js · app.js · db.js · schema.sql
│   ├── routes/ (reservations.js, offers.js)
│   ├── middleware/ (validate.js, adminAuth.js)
│   └── validate.test.js
├── frontend/
│   ├── index.html · vite.config.js
│   ├── public/images/        ← add your photos here
│   └── src/ (App.jsx, api.js, data.js, styles.css, components/)
└── .github/workflows/ci.yml
```

## Run locally
```bash
# 1. Backend
cd backend
cp .env.example .env        # set ADMIN_KEY
npm install
npm run dev                 # http://localhost:5000

# 2. Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173  (proxies /api to :5000)
```
Add the 4 images listed in `frontend/public/images/README.md`.

## API
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/health` | public | Health check |
| GET | `/api/offers` | public | Active offers |
| GET | `/api/reservations/slots` | public | Time slots |
| POST | `/api/reservations` | public (rate-limited) | Create booking |
| GET | `/api/reservations?status=&date=` | admin | List bookings |
| PATCH | `/api/reservations/:id/status` | admin | `pending / confirmed / cancelled` |
| DELETE | `/api/reservations/:id` | admin | Delete booking |
| POST/DELETE | `/api/offers` | admin | Manage offers |

Admin routes need header `x-admin-key: <ADMIN_KEY>`.

```bash
curl -X POST localhost:5000/api/reservations -H "Content-Type: application/json" \
 -d '{"name":"Asha","phone":"+919876543210","date":"2026-12-01","time":"7:00 PM","guests":4,"branch":"Main Branch"}'
curl localhost:5000/api/reservations -H "x-admin-key: YOUR_KEY"
```

## Database
`branches (id, name, address, phone)` ← `reservations (id, name, phone, email, reservation_date, reservation_time, guests, branch_id FK, special_requests, status, created_at)` · `offers (id, tag, title, description, active)`

## Deploy
- **Frontend:** Vercel/Netlify — root `frontend`, build `npm run build`, output `dist`, env `VITE_API_URL=<api url>`.
- **Backend:** Render/Railway — root `backend`, start `npm start`, env `CORS_ORIGIN=<frontend url>`, `ADMIN_KEY`, and a persistent disk for `DB_PATH`.

## Push to GitHub
```bash
cd wok-chushi
git init && git add . && git commit -m "Initial commit: Wok Chushi full-stack site"
git branch -M main
git remote add origin https://github.com/<your-username>/wok-chushi.git
git push -u origin main
```
