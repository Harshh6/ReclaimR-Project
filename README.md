# ReclaimR — Frontend

React frontend prototype for the campus lost & found system.

## Run locally
```
npm install
npm run dev
```
Open http://localhost:5173

## Admin login
Username: `Admin` · Password: `Admin123` (select "Admin" tab on login page)

## Structure
- `src/pages` — user-facing pages, `src/pages/admin` — admin pages
- `src/components` — reusable UI (Navbar, Footer, ItemCard, AdminSidebar, etc.)
- `src/services` — placeholder API functions to swap for real REST calls later
- `src/data/mockData.js` — mock data (items, users, stats)

## Next steps
Replace functions in `src/services/*.js` with real `fetch`/`axios` calls to the Express + PostgreSQL backend.
