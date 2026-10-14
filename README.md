# ARCHIVE — A history of us, still unfolding.

Editorial museum site for the ONE-TEN Web Design Challenge. React 18, Vite 5, custom CSS. No UI framework.

## Run
```
npm install
npm run dev      # local dev server
npm run build    # outputs dist/
npm run preview  # serve the build
```

## Structure
- `src/data.js`: all collections, objects and threads
- `src/App.jsx`: sections, collection filter, object records, cultural thread
- `src/styles.css`: tokens (#F2F0E9, #171715, #B6382D), mobile-first layout
- `.github/workflows/deploy.yml`: GitHub Pages deployment

## Provenance policy
Every object is a **placeholder entry**. No maker, date, medium or holder is claimed. To add a real record, fill the fields in `src/data.js`, cite a source in `record.source`, and set `verified: true`. Thread links are curatorial groupings, not historical claims. The plates are original abstract SVG, not reproductions.

## Deploy to GitHub Pages
1. Push to `main`.
2. In the repo: Settings, Pages, Source: **GitHub Actions** (or run `gh api -X POST repos/OWNER/REPO/pages -f build_type=workflow`).
3. The workflow builds and publishes. The URL is `https://OWNER.github.io/REPO/`.
The build uses a relative base (`./`), so no config change is needed. Vercel and Netlify also work: build `npm run build`, output `dist`.

## Accessibility and performance
Skip link, visible focus, 44px targets, reduced motion respected, fonts self-hosted via Fontsource, SVG plates (no image weight).

## Not yet done
Real archival imagery and verified records; a contribution form; this source has not been through a live `vite build` in the authoring sandbox (no network).
