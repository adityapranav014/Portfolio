# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Awwwards-style developer portfolio — a front-end-only React SPA (no backend, no database). All data is hardcoded in `src/constants/index.js`. Media is served from ImageKit CDN (internet required).

### Stack

React 19, Vite 6, Tailwind CSS 4, GSAP, Lenis (smooth scroll), React Router DOM 7. Package manager: **npm** (`package-lock.json`).

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (serves on `http://localhost:5173`) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Preview prod | `npm run preview` |

### Caveats

- **No automated test suite** — there are no `test` scripts in `package.json`. Validation is lint + build + manual browser testing.
- **Lint has 5 pre-existing errors** (unused variables in `AnimatedHeaderSection.jsx`, `About.jsx`, `Contact.jsx`, `Works.jsx`). These are not regressions — they exist on `main`.
- **No `.env` needed** — the ImageKit URL endpoint is hardcoded in `src/App.jsx`.
- **Path alias** — `@` maps to `./src` (configured in `vite.config.js`).
