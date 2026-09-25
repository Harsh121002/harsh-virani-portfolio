# Harsh Virani — Portfolio

Production-ready personal portfolio for **Harsh Virani**, Software Developer.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **React Three Fiber**, **drei**, **Framer Motion**, and **Simple Icons**.

## Features

- Interactive 3D hero scene (icosahedrons, torus, octahedrons, particles, mouse-orbit / auto-rotate)
- Smooth-scroll single-page sections: Hero, About, Skills, Experience, Projects, Education, Contact
- Dark navy + cyan/violet accent design system with glass surfaces
- Accessible focus states, skip link, reduced-motion support
- Fully responsive layout

## Prerequisites

- Node.js 18+ (20 recommended)
- npm 9+

## Setup

```bash
cd harsh-virani-portfolio
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Production build

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push this repo to GitHub (or import the folder).
2. In [Vercel](https://vercel.com), **Add New Project** → import the repo.
3. Framework Preset: **Next.js** (auto-detected).
4. Build command: `npm run build` · Output: Next.js default.
5. Deploy. No env vars required for the static portfolio content.

Or with the Vercel CLI:

```bash
npx vercel
```

## Project structure

```
src/
  app/                 # App Router layout + page
  components/
    HeroScene.tsx      # R3F Canvas + 3D objects
    Hero.tsx           # Hero copy + dynamic scene
    About.tsx
    Skills.tsx
    Experience.tsx
    Projects.tsx
    Education.tsx
    Contact.tsx
    Navbar.tsx
    Footer.tsx
    TechIcon.tsx
    SectionHeading.tsx
  lib/
    data.ts            # Resume content (edit here)
    icons.ts           # Simple Icons mapping
```

## TODOs before going live

- [x] LinkedIn URL set in `src/lib/data.ts`
- [ ] Replace `#github` in `src/lib/data.ts` with the real GitHub profile URL
- [ ] (Optional) Add project live/demo links and screenshots

## License

Personal portfolio — all rights reserved by Harsh Virani.
