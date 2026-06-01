@AGENTS.md

# TalentBridge — Project Guide

## What This Is

TalentBridge is a lead-capture platform for international students and freelancers planning to work in Germany. Visitors learn about the services offered, fill a contact form, and the team reaches out to them manually.

There is no user authentication, no admin dashboard, and no self-serve booking — the product is a polished marketing site with a working lead form.

## Services Offered (use this for copy)

1. **Interview Preparation** — mock interviews and coaching tailored to German employer expectations
2. **Portfolio & LinkedIn Optimization** — help building personal landing pages, websites, and optimized LinkedIn profiles
3. **HR Connections** — access to HR professionals and internal contacts at German companies
4. **Job Placement Support** — leveraging internal connections to set up targeted meetings and interviews with companies the client is pursuing

## Tech Stack

- **Framework**: Next.js 16 (App Router) — read `node_modules/next/dist/docs/` before writing routing or API code
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: None yet — Supabase will be added later. For now, leads are captured via email only.
- **Email**: Resend — for notifying the team when a new lead submits the form
- **Forms**: react-hook-form + zod

## What NOT to Use or Add

- No Prisma, no `prisma/` directory
- No NextAuth / `next-auth`
- No Stripe or payment flows
- No Socket.io or real-time features
- No Cloudinary or file uploads
- No Docker / docker-compose
- No admin login or protected routes

## Database

No database yet. Supabase will be added later to store leads. When added, use a single `leads` table:

| column | type | notes |
|---|---|---|
| id | uuid | primary key, default gen_random_uuid() |
| name | text | required |
| email | text | required |
| phone | text | nullable |
| location | text | nullable (city, country) |
| interests | text | required |
| created_at | timestamptz | default now() |

## Environment Variables

```
RESEND_API_KEY=
RESEND_TO_EMAIL=       # the email address that receives lead notifications
```

## File Structure (target)

```
src/
  app/
    page.tsx            # landing page (single page)
    layout.tsx
    globals.css
    api/
      contact/
        route.ts        # POST: save lead to Supabase + send email via Resend
  components/
    ContactFormEmail.tsx  # Resend email template
  lib/
    resend.ts           # Resend client singleton
```

## Cleanup Tasks (do before new feature work)

- [ ] Delete `src/app/page.tsx.backup`, `src/app/page_fixed.tsx`, `src/app/page_rest.tsx`
- [ ] Delete `venv/` directory (Python venv accidentally committed)
- [ ] Remove unused dependencies: `prisma`, `@prisma/client`, `next-auth`, `@next-auth/prisma-adapter`, `stripe`, `@stripe/stripe-js`, `cloudinary`, `socket.io`, `socket.io-client`
- [ ] Delete `prisma/`, `prisma.config.ts`, `docker-compose.yml`
- [ ] Fix `.env` — replace `DATABASE_URL` with Supabase + Resend vars
- [ ] Add `venv/` to `.gitignore`

## Coding Rules

- No comments unless the WHY is non-obvious
- No placeholder `href="#"` links that go nowhere — use scroll anchors (`href="#services"`) or omit the link
- All form validation must use zod schemas
- API routes must return consistent JSON: `{ success: true }` or `{ error: "message" }`
- Tailwind only — no inline styles, no CSS modules
- Keep the single-page structure: everything on `/`, no separate routes unless explicitly requested
