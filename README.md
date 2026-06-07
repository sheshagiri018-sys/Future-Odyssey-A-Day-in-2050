# Future Odyssey — A Day in 2050

> *"The future is not a destination. It is a responsibility."*

A world-class cinematic scroll-driven storytelling experience — built to Awwwards standards.

🌐 **Live Site:** [sheshagiri018-sys.github.io/Future-Odyssey-A-Day-in-2050](https://sheshagiri018-sys.github.io/Future-Odyssey-A-Day-in-2050/)

---

## ✦ Overview

**A Day in 2050** is a scroll-driven cinematic web experience where users travel through the future one chapter at a time. It is not a blog, portfolio, or landing page — it is a science-fiction movie you scroll through.

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| 3D Graphics | Three.js |
| Scroll Animation | GSAP 3 + ScrollTrigger |
| UI Animation | Framer Motion 11 |
| Smooth Scroll | @studio-freight/lenis |
| Deployment | GitHub Actions → GitHub Pages |

---

## ✦ Features

- 🌌 **Three.js Galaxy** — 12,000 spiral particles with GSAP cinematic intro
- 🔭 **3D Space Scene** — Mars, orbital ring station, moon, asteroids
- 🌍 **Rotating Earth** — Procedurally generated with atmosphere glow
- 🧬 **SVG DNA Helix** — Animated double helix with base pair colors
- 🏙️ **Growing City** — SVG megacity with scroll-triggered building animation
- 🕸️ **Canvas Knowledge Graph** — Real-time particle network
- 🖱️ **Magnetic Cursor** — Custom cursor that reacts to interactive elements
- 🌊 **Lenis Smooth Scroll** — Ultra-smooth, physics-based scrolling
- 🎬 **GSAP ScrollTrigger** — Cinematic scroll-driven animations throughout
- 🤲 **Framer Motion** — Hover effects, stagger reveals, micro-interactions
- 📊 **Animated Counters** — Numbers animate on scroll enter
- 🎯 **Holographic Panels** — Mouse-reactive holo UI in Chapter 3
- ✈️ **Animated Vehicles** — Flying vehicle trails across the city

---

## ✦ Chapters

| # | Chapter | Highlights |
|---|---------|-----------|
| Intro | Hero | Three.js galaxy, cinematic title |
| 01 | The World Today | Animated stats, urgency |
| 02 | The Great Transition | 2024→2050 timeline |
| 03 | Morning in 2050 | Mouse-reactive holo home |
| 04 | Transportation | Parallax city, flying vehicles |
| 05 | Healthcare | DNA helix, AI diagnostics |
| 06 | Education | Canvas knowledge graph |
| 07 | Megacities | SVG skyline growth |
| 08 | Space | Three.js Mars scene |
| 09 | Humanity | Particle burst, manifesto |
| End | Final Scene | Three.js Earth + quote |

---

## ✦ Deployment — GitHub Actions

This project auto-deploys to GitHub Pages on every push to `main`.

### First-time setup (do this once in GitHub)

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **"GitHub Actions"**
3. Click **Save**

That's it. The workflow at `.github/workflows/deploy.yml` handles everything else.

### How it works

```
Push to main
     ↓
GitHub Actions triggers
     ↓
ubuntu-latest runner
     ↓
npm install → npm run build
     ↓
dist/ uploaded as Pages artifact
     ↓
Deployed to GitHub Pages
     ↓
Live at: https://sheshagiri018-sys.github.io/Future-Odyssey-A-Day-in-2050/
```

---

## ✦ Local Development

```bash
git clone https://github.com/sheshagiri018-sys/Future-Odyssey-A-Day-in-2050.git
cd Future-Odyssey-A-Day-in-2050
npm install
npm run dev
# → http://localhost:5173
```

### Build locally

```bash
npm run build
npm run preview
# → http://localhost:4173/Future-Odyssey-A-Day-in-2050/
```

---

## ✦ Project Structure

```
Future-Odyssey-A-Day-in-2050/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← GitHub Actions workflow
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Hero.jsx          Three.js galaxy + GSAP intro
│   │   ├── Navigation.jsx    Fixed sidebar with IntersectionObserver
│   │   ├── ScrollProgress.jsx  Gradient progress bar
│   │   ├── Chapter1.jsx      World Today — problem stats
│   │   ├── Chapter2.jsx      Transition — tech timeline
│   │   ├── Chapter3.jsx      Morning — holographic UI
│   │   ├── Chapter4.jsx      Transport — parallax city
│   │   ├── Chapter5.jsx      Healthcare — DNA helix
│   │   ├── Chapter6.jsx      Education — knowledge graph
│   │   ├── Chapter7.jsx      Megacities — SVG skyline
│   │   ├── Chapter8.jsx      Space — Three.js scene
│   │   ├── Chapter9.jsx      Humanity — particle burst
│   │   └── FinalScene.jsx    Earth + closing quote
│   ├── hooks/
│   │   └── useScrollAnimation.js
│   ├── App.jsx               Lenis + cursor + composition
│   ├── main.jsx              React entry + GSAP register
│   └── index.css             Design system + global styles
├── index.html
├── package.json
├── vite.config.js            base: '/Future-Odyssey-A-Day-in-2050/'
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

---

## ✦ Design System

```
Colors:
  --void:     #000000   pure black
  --electric: #00B8FF   electric blue (primary)
  --plasma:   #00FFFF   cyan
  --aurora:   #7B2FFF   purple
  --nova:     #FF6B2B   orange
  --gold:     #FFB800   gold
  --stellar:  #C8E6FF   body text

Fonts:
  Bebas Neue    dramatic display titles
  Syne          UI text and body
  JetBrains Mono  data labels and code
  Cinzel        cinematic quotes
```

---

## ✦ License

MIT — build freely, share generously.

---

*Built by [Sheshagiri](https://github.com/sheshagiri018-sys) · ECE @ Sona College of Technology*
