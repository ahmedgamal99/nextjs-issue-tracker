# Next.js Issue Tracker

Modern issue management dashboard built with the Next.js App Router, Prisma, and NextAuth. Track bugs across their lifecycle, visualize throughput, and collaborate with your team using real-time updates and secure authentication.

## Highlights
- Live dashboard with counts, trend charting, and the latest activity for fast project overviews.
- Full CRUD workflow for issues: create with rich Markdown, edit inline, assign teammates, and archive with confirmation flows.
- Google OAuth via NextAuth and JWT sessions; protected API routes enforce authenticated access to mutation endpoints.
- MySQL persistence managed by Prisma, including automated migrations and typed client generation.
- Polished UI powered by Radix UI, Tailwind CSS, and React Query for responsive, loading-friendly experiences.

## Tech Stack
- **Framework**: Next.js 14 (App Router, Server Components, Route Handlers)
- **Database**: MySQL with Prisma ORM and generated TypeScript client
- **Auth**: NextAuth (Google provider, JWT strategy)
- **UI**: Radix UI Themes, Tailwind CSS, Radix Icons, Recharts, React SimpleMDE
- **State & Data**: React Query, React Hook Form, Axios, Zod validation
- **DX & Quality**: TypeScript, ESLint, Prettier, Sentry (optional instrumentation)

## Project Structure

```
app/
  page.tsx                # Dashboard landing page
  issues/                 # Issues listing, creation, and detail routes
	 _components/          # Client-side form + helpers
	 [id]/                 # Issue detail, edit and assignment flows
  api/                    # Next.js route handlers (issues, users, auth)
prisma/
  schema.prisma           # Database schema definition
  migrations/             # Generated SQL migrations
```

Key shared components live in `app/components`, while authentication context is bootstrapped in `app/auth`. React Query and session providers wrap the app in `app/layout.tsx` via `QueryClientProvider` and `AuthProvider`.

## Getting Started

### Prerequisites
- Node.js 18.17+ (Next.js 14 requirement)
- npm (or pnpm/yarn/bun if preferred)
- MySQL-compatible database (local or hosted)

### Initial Setup
1. Install dependencies:
	```bash
	npm install
	```
2. Copy the environment template and fill in secrets:
	```bash
	cp .env.example .env
	```
3. Configure the `.env` values (see table below) including a valid `DATABASE_URL` and Google OAuth credentials.
4. Apply database migrations and generate the Prisma client:
	```bash
	npx prisma migrate deploy
	npx prisma generate
	```
5. Start the development server:
	```bash
	npm run dev
	```
	Visit `http://localhost:3000` and sign in with a Google account tied to your OAuth configuration.

### Environment Variables

| Variable | Description |
| --- | --- |
| `NODE_ENV` | Runtime mode. Use `development` locally. |
| `DATABASE_URL` | MySQL connection string (e.g. `mysql://user:pass@host:3306/db`). |
| `NEXTAUTH_URL` | Base URL for NextAuth callbacks (`http://localhost:3000` in dev). |
| `NEXTAUTH_SECRET` | Random string used to sign NextAuth JWTs (`openssl rand -base64 32`). |
| `GOOGLE_CLIENT_ID` | OAuth client ID from Google Cloud Console. |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret paired with the client ID. |

Optional Sentry settings can be added as described in the `sentry.*.config.ts` files if error monitoring is required.

## Core Features

- **Issues Dashboard**: Aggregates counts for Open, In Progress, and Closed issues, renders a Recharts bar visualization, and surfaces the five latest tickets with assignee avatars.
- **Issue Management**: Server-rendered listing with pagination, status filtering, sortable columns, and responsive layouts. Individual issue pages show Markdown-rendered descriptions and a management sidebar.
- **Assignments & Status**: Authenticated users can assign teammates through a Radix Select fed by a React Query-powered `/api/users` endpoint. Status badges reflect Prisma-backed enum values.
- **Rich Editing Experience**: Issue forms use React Hook Form + Zod for validation, SimpleMDE for Markdown editing, and toast notifications for feedback.
- **Secure API Routes**: `POST`, `PATCH`, and `DELETE` handlers validate payloads server-side and enforce session checks via NextAuth before mutating the database.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Launches Next.js in development mode. |
| `npm run build` | Runs `prisma generate` then builds the production bundle. |
| `npm run start` | Starts the production server (after `npm run build`). |
| `npm run lint` | Executes Next.js lint rules (ESLint + TypeScript). |

## Database & Prisma

The Prisma schema defines an `Issue` model with status enum (`OPEN`, `IN_PROGRESS`, `CLOSED`), timestamps, and optional `assignedToUser` relationship. NextAuth models (`User`, `Account`, `Session`, `VerificationToken`) are included via Prisma adapter conventions.

When updating the schema:
1. Modify `prisma/schema.prisma`.
2. Create a migration with `npx prisma migrate dev --name <migration_name>`.
3. Commit the generated SQL and run `npx prisma generate` to refresh the client.

## Authentication Notes

- Configure Google OAuth credentials with `Authorized redirect URI` pointing to `http://localhost:3000/api/auth/callback/google` for local development.
- Session strategy is JWT-based, so no database sessions are required in production deployment.
- The navigation bar adapts to auth state, showing login links, avatar dropdown, and sign-out as appropriate.

## Deployment

1. Provision a MySQL database and update `DATABASE_URL` for the target environment.
2. Set all environment variables in your hosting platform (e.g., Vercel project settings).
3. Run Prisma migrations (`npx prisma migrate deploy`) as part of your release pipeline.
4. Build the app (`npm run build`) and start the server (`npm run start`) or rely on Vercel’s managed Next.js runtime.
5. Optionally enable Sentry by following the configuration steps in `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts`.

## Troubleshooting
- **Database connection errors**: Verify `DATABASE_URL` (host, port, credentials) and ensure the database is reachable from your environment.
- **OAuth consent errors**: Confirm the Google OAuth redirect URI and that the project is in production mode if using restricted scopes.
- **Prisma client version mismatch**: Re-run `npm install` and `npx prisma generate` whenever dependencies change.
- **Unexpected API 401 responses**: Ensure you are authenticated; NextAuth protects mutation routes by default.

## Contributing

Contributions are welcome! Please open an issue describing the proposed change or bug. For code changes, include context, testing notes, and relevant screenshots or recordings when helpful.

---

Built and maintained by Ahmed Gamal. Feel free to fork, extend, or adapt for your team’s workflow.
