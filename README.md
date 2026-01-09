# Festival Map UI

A small front-end package for rendering a level-aware festival map using Mapbox.

## Requirements

- Node.js 18+
- A Mapbox access token

## Install

```bash
npm install
```

## Run the demo with Vite

```bash
npm run dev
```

Then open the URL printed by Vite. Provide your Mapbox token by setting
`MAPBOX_ACCESS_TOKEN` in the browser console or by inlining it in
`demo.js`.

## Run the static demo with `python3 -m http.server`

1. Install dependencies so the `node_modules` folder is available.
2. From the repo root, run:

```bash
python3 -m http.server 8000
```

3. Open http://localhost:8000 to see the demo.

> Note: The static demo uses an import map that points at files inside
> `node_modules/map-ui-common`, so the dependencies must be installed.

## Styling

When using the library directly in the browser (no bundler), include the
stylesheet links manually:

```html
<link rel="stylesheet" href="/node_modules/map-ui-common/src/ui/date-range.css" />
<link rel="stylesheet" href="/node_modules/map-ui-common/src/ui/shared-map-ui.css" />
<link rel="stylesheet" href="/src/styles.css" />
```
