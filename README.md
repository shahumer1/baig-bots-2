# Baig Bots React site

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. For a production bundle, run `npm run build` and serve `dist/`.

The page is assembled in `src/components/Page.jsx` from reusable section components in `src/components/sections.jsx`. Section markup lives in `src/components/markup/`. Styles are in `src/styles.css`, while every theme color is defined in `src/theme/colors.css`. System theme detection and color helpers are in `src/theme/theme.js`. Animations and interactions are in `src/site.js`, initialized after React mounts the page. Fonts and images are in `public/assets/`.

Animations stay on. The light and dark palette follows the browser or operating system preference and updates when it changes. If WebGL is unavailable, the hero canvas uses an animated 2D fallback.

Run `npm run test:smoke` to check animation startup, cursor event handling, and the canvas fallback without a browser.
