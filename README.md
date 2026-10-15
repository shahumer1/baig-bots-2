# Baig Bots React site

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production bundle, run `npm run build` and serve `dist/` with a host that rewrites unknown paths to `index.html`.

Routes are selected in `src/components/Page.jsx`. Home sections and inner pages are JSX components in `src/components/`. Service names, slugs and descriptions live in `src/components/serviceData.js`. The main routes are `/`, `/services`, `/services/other`, `/services/:slug`, `/industries` and `/contact`. Styles are in `src/styles.css`, while theme colors are defined in `src/theme/colors.css`. The theme button and color helpers are in `src/theme/theme.js`. Animations and interactions are in `src/site.js`, initialized after React mounts the page. Fonts and images are in `public/assets/`.

Animations stay on. The theme button switches between light and dark palettes. If WebGL is unavailable, the hero canvas uses an animated 2D fallback.

Run `npm run test:smoke` to check animation startup, cursor event handling, and the canvas fallback without a browser.
