# Boilerplate

A production-ready, full-stack Next.js monorepo boilerplate with authentication, database, tRPC, admin dashboard, and more.

---

## Tech Stack

- **Monorepo:** [TurboRepo](https://turbo.build/) + [pnpm](https://pnpm.io/)
- **Web App:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Agent Service:** Node.js / Express
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Auth:** [Better Auth](https://www.better-auth.com/) (email + social)
- **API:** [tRPC](https://trpc.io/) (end-to-end type safety)
- **Background Jobs:** [Inngest](https://www.inngest.com/)
- **Analytics:** Vercel Analytics + Google Tag Manager
- **GDPR:** Cookie consent banner with consent logging

## Features

- **Authentication** — Email/password + Google/GitHub OAuth, session management, email verification
- **Database** — PostgreSQL with Drizzle ORM, type-safe schema, migrations
- **tRPC API** — End-to-end type-safe API with protected and admin procedures
- **Dashboard** — Sidebar navigation, data tables, pagination, search/filters
- **Admin Panel** — Stats overview, user management, configurable admin domain
- **Example CRUD Module** — Full "Posts" module demonstrating the module pattern
- **Cookie Consent** — GDPR-compliant banner with consent logging
- **Background Jobs** — Inngest integration with example event handler
- **Landing Page** — Hero, features, FAQ, footer
- **Docker Compose** — Local dev with Postgres, Inngest, agent service

## Project Structure

```
├── apps/
│   ├── web/          # Next.js web application
│   └── agent/        # Express agent service
├── packages/
│   └── shared/       # Shared utilities and constants
├── docker-compose.yml
├── turbo.json
└── package.json
```

### Module Pattern

Each feature module lives in `apps/web/src/modules/<name>/` with this structure:

```
modules/<name>/
├── schemas.ts          # Zod validation schemas
├── types.ts            # TypeScript types (inferred from tRPC)
├── params.ts           # URL search params (nuqs)
├── hooks/              # React hooks
├── server/
│   └── procedures.ts   # tRPC router
└── ui/
    ├── views/          # Page-level components
    └── components/     # Reusable UI components
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (v8+)
- Docker (for local services)

### Installation

1. **Clone and install:**
   ```bash
   git clone <your-repo-url>
   cd boilerplate
   pnpm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Configure your database URL, auth secrets, and OAuth provider keys.

3. **Start backend services:**
   ```bash
   docker-compose up -d
   ```
   This starts PostgreSQL, Inngest dev server, and the agent service.

4. **Push database schema:**
   ```bash
   pnpm --filter @boilerplate/web db:push
   ```

5. **Start the web app:**
   ```bash
   pnpm --filter @boilerplate/web dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

See `.env.example` for all required variables:
- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Auth secret key
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — GitHub OAuth
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth
- `ADMIN_EMAIL_DOMAIN` / `NEXT_PUBLIC_ADMIN_EMAIL_DOMAIN` — Admin email domain check
- `INNGEST_SIGNING_KEY` / `INNGEST_EVENT_KEY` — Inngest configuration
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager (optional)
- `IP_SALT` — Salt for hashing IP addresses in consent logs

## Adding a New Module

1. Create the module directory under `apps/web/src/modules/`
2. Define Zod schemas, types, and params
3. Create tRPC procedures in `server/procedures.ts`
4. Register the router in `apps/web/src/trpc/routers/_app.ts`
5. Build UI views and components
6. Add route pages under `apps/web/src/app/dashboard/`

See the `posts` module for a complete reference implementation.

## License

This project is licensed under the PolyForm Noncommercial License 1.0.0.
