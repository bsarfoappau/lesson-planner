# Teacher Lesson Planner (Next.js + Supabase + DOCX)

Production-ready web app for teachers to generate lesson plan documents from a DOCX template, using:

- Next.js App Router + TypeScript + Tailwind CSS
- Supabase Authentication (email/password + Google)
- Supabase Postgres + Storage (draft uploads)
- `docxtemplater` + `PizZip` (DOCX population)
- `mammoth` (DOCX text extraction)

## Quick start

1) Install dependencies

```bash
npm install
```

2) Create `.env.local` from `.env.example`

```bash
copy .env.example .env.local
```

Set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3) Apply database + storage policies

Run the SQL in:

- `supabase/migrations/0001_init.sql`

4) Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

### Authentication

- **Email/password**: enabled by default in Supabase Auth settings.
- **Google**:
  - Enable Google provider in Supabase Auth providers.
  - Add redirect URL: `http://localhost:3000/auth/callback`
  - For production, add your real domain callback too.

### Database + Storage

This app stores uploaded draft DOCX files in a **private** bucket named `drafts`, under paths:

- `<userId>/<uuid>-<filename>.docx`

It also inserts a metadata row into `public.draft_uploads` including the extracted text.

## DOCX template

Your template lives at:

- `assets/template.docx`

This project will populate placeholders using `{{ ... }}` and supports your **exact loop structure** by converting it at runtime:

```text
{% for lesson in lessons %}
...
{% endfor %}
```

Internally, the server patches those two tags into docxtemplater loop tags before rendering.

### Copyright footer

On generation, the server attempts a **best-effort** injection of:

```text
(C) Benjamin Sarfo Appau
```

centered at the bottom of any existing footer XML parts in your template.

If your template has no footer parts, add a footer in Word once, and the injection will work automatically.

## Routes

- `/` Landing page
- `/register` Create account
- `/login` Sign in (email/password + Google)
- `/dashboard` Protected dashboard
  - **Create from Form**: dynamic lessons, generates DOCX download
  - **Upload Draft**: uploads a `.docx` and extracts raw text

## Notes

- Generation endpoint: `POST /api/generate` (returns a `.docx`)
- Draft upload endpoint: `POST /api/drafts/upload` (stores file + returns `{ text, path, id }`)
- Optional extraction endpoint: `POST /api/extract` (returns `{ text }`)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
