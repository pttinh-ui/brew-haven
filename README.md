# BrewHaven – Coffee Shop Landing Page

A responsive landing page for a specialty coffee shop, built with **Angular 19** (standalone components, signals, new control flow) and **SCSS**.

## Features
- Sticky navigation with smooth scrolling and a mobile hamburger menu
- Menu section with category filter (Angular signals + computed)
- Reservation form with Reactive Forms validation
- Pure-CSS animated coffee cup illustration (no image assets)
- Fully responsive (desktop, tablet, mobile)

## Run locally
```bash
npm install
npm start        # http://localhost:4200
npm run build    # output: dist/brew-haven/browser
```

## Deploy
- **Vercel:** import the repo → Framework: Angular → Output directory: `dist/brew-haven/browser`
- **Netlify:** Build command `npm run build`, publish directory `dist/brew-haven/browser`
