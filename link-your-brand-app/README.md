## Link Your Brand – MVP

Link Your Brand is a full‑stack web app that helps brands and creators manage their online presence and scale events. You can create an account, manage your events from a simple dashboard, and publish a digital flyer page where attendees can register.

This README describes the **MVP scope used for the demo**.

---

## MVP Features (Demo Scope)

- **Basic login / signup**

  - Email + password auth powered by AWS Cognito via Next.js API routes under `src/app/api/auth/*`.
  - Successful sign‑in stores tokens in HTTP‑only cookies and redirects you into the app.

- **Dashboard with my events**

  - `/dashboard` renders a dashboard view showing a "pinned" event with:
    - Event name, date, location, and total RSVPs.
  - Dashboard navbar lets you:
    - Open **Create Event** form (from `CreateEventDropdown`).
    - Open **Manage Events** actions (from `ManageEvntsDropdown`).

- **Create one simple type of event**

  - `CreateEventForm` (in `src/components/createEvent/CreateEventForm.tsx`) posts to `POST /api/database/event`.
  - Stored fields include title, description, location type (in‑person or remote), address/URL, times, contact email, and tags.
  - Events are persisted with Drizzle into Postgres using the `events` table in `src/app/db/schema.ts`.

- **Public flyer page with registration**

  - `/events` lists sample events and shows a QR code + Register button for each.
  - `/events/[eventId]/register` is a public registration page that:
    - Uses the URL parameter `eventId`.
    - Calls `/api/events/${eventId}/register` to record the registration.

- **Registrations stored and visible in dashboard**
  - Registrations are persisted into the `registrations` table in `src/app/db/schema.ts` via `POST /api/database/rsvp`.
  - Each registration row links to an `event_id` and stores an attendee identifier and status.
  - Dashboard pinned event pulls its RSVP count from the database via top‑event API routes under `src/app/api/database/event/*`.

---

## Non‑Goals for the MVP

The following are **explicitly not required for the demo** and can be ignored or disabled if they get in the way:

- Advanced tagging, location filters, or recommendation feeds.
- Social logins, email verification flows, password reset.
- S3 / LocalStack / Docker‑based media storage (local uploads only, if used).
- Extra UIs (the separate Vite app, alternate landing pages, experimental components).
- Any route or feature that is not reachable from the main demo flow.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React.
- **Backend:** Next.js API routes under `src/app/api/*`.
- **Auth:** AWS Cognito integration in `src/app/api/cognito/*`.
- **Database:** PostgreSQL + Drizzle ORM (`src/app/db/*`, `schema.ts`, `migrate.ts`).

---

## Project Structure (MVP‑Relevant)

- `src/app/page.tsx` – Marketing / landing page.
- `src/app/api/auth/*` – Sign in / sign up / token endpoints.
- `src/app/dashboard/*` – Authenticated organizer dashboard.
- `src/app/events/page.tsx` – Public events list + QR codes.
- `src/app/events/[eventId]/register/page.tsx` – Public registration page.
- `src/app/api/database/event/route.ts` – CRUD for events.
- `src/app/api/database/rsvp/route.ts` – CRUD for registrations (RSVPs).
- `src/app/db/schema.ts` – Drizzle schema for `events`, `registrations`, and related tables.

---

## Getting Started (Local Dev)

### 1. Install dependencies

From the `link-your-brand-app` folder:

```powershell
cd "C:\Users\guste\Downloads\webpage\link-your-brand-app"
npm install
```

### 2. Configure environment

Create a `.env.local` file in `link-your-brand-app` with at least:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/linkyourbrand
COGNITO_USER_POOL_ID=your_user_pool_id
COGNITO_CLIENT_ID=your_app_client_id
COGNITO_REGION=your_region
```

Use your actual Postgres and Cognito configuration. For local only, you can point `DATABASE_URL` at a Docker Postgres instance or a local install.

### 3. Run database migrations

From `link-your-brand-app` run:

```powershell
npx ts-node src/app/db/migrate.ts
```

This creates the `events`, `registrations`, and related tables if they do not exist.

### 4. Start the dev server

```powershell
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Demo Flow (What to Show)

1. **Landing → Sign Up / Sign In**

   - Visit `/` and briefly explain the value prop.
   - Click into the auth flow (sign up if new, sign in otherwise).

2. **Dashboard**

   - After login, navigate to `/dashboard`.
   - Show the pinned event card with name, date, location, and attendee count.

3. **Create a New Event**

   - From the dashboard navbar, open **Create Event**.
   - Fill in title, date/time, location type, address or virtual link, and contact email.
   - Submit and confirm the event is stored.

4. **Public Flyer + Registration**

   - Navigate to `/events` to show an example events list.
   - From there, click **Register** (or scan QR) to hit `/events/[eventId]/register`.
   - Complete the registration flow and confirm success.

5. **See Registrations in Dashboard**
   - Return to `/dashboard` and highlight the RSVP count or list as pulled from the `registrations` table.

This covers the MVP requirements: signup/login, dashboard with events, creating an event, public flyer page, and registrations stored in the database.

---

## Notes / Known Limitations (MVP)

- Validation and error messages are intentionally simple to keep scope tight.
- Analytics, advanced filters, and social features are planned for post‑MVP.
- Some UI components exist in the repo but are not wired into the main flow; they are safe to ignore for the demo.
