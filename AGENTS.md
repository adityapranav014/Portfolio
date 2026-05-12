# AGENTS.md

## Cursor Cloud specific instructions

This is a **single-page React portfolio app** (Vite + TailwindCSS v4 + GSAP). No backend, no database, no Docker.

### Quick reference

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (serves on `http://localhost:5173`) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Preview build | `npm run preview` |

### Notes

- **No test suite exists.** There are no test scripts or test frameworks configured. Validation is manual (browser-based).
- **ESLint has 5 pre-existing errors** (unused variables in `AnimatedHeaderSection.jsx`, `About.jsx`, `Contact.jsx`, `Works.jsx`). These are not regressions from your changes unless you touch those files.
- **Media assets load from ImageKit CDN** (`ik.imagekit.io`). In environments without internet access, images/videos will be missing but the app still renders and navigates.
- **3D model** (`public/models/Planet.glb`, ~18 MB) is served locally. The hero section loads this model via the dev server.
- To expose the dev server for browser testing in Cloud Agent VMs, use `npm run dev -- --host 0.0.0.0`.
