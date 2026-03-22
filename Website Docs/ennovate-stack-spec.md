# Ennovate Website — Tech Stack & Implementation Spec
**Version:** 1.0  
**Last Updated:** March 2026  
**For use with:** Antigravity (AI coding agent, VS Code)  
**Read alongside:** `ennovate-design-doc.md` (visual and design spec)

---

## 0. How to Read This Document

This document covers every technology decision for the Ennovate website build — what to use, what not to use, and exactly why. It is written to be fed directly to Antigravity as context before any code is generated. Read `ennovate-design-doc.md` for visual spec, animation detail, and component breakdown. This file covers the engineering layer only.

**Non-negotiable constraint running through every decision:**  
The website must look exceptional. Not "good for a student club." Exceptional — the kind of site that makes someone stop scrolling and show their friend. It is public-facing, linked to a competition that will attract hundreds of visitors, and the majority of those visitors will be on phones. Every technology choice below is made in service of that standard.

---

## 1. Project Context

**What this is:** A public-facing marketing and recruitment website for Club Ennovate, a college robotics and innovation club. The site will be the primary face of an upcoming inter-college competition and must perform flawlessly under real traffic from real people on real phones.

**Who will see it:** Students, potential competition participants, judges, and faculty — many arriving on mobile devices with average network conditions.

**Success criteria:**
- Loads fast on a 4G mobile connection (target: under 2 seconds to first meaningful paint)
- Looks as good on a 375px phone screen as on a 1440px desktop
- Zero broken interactions. Every button, every scroll, every hover state works exactly as designed
- Passes a basic Lighthouse audit (Performance, Accessibility, SEO)
- Can be updated quickly by the team without touching production infrastructure

---

## 2. The Stack — Decisions and Reasoning

### 2.1 Framework — Next.js 14 (App Router)

**Use:** Next.js 14 with the App Router.  
**Do not use:** Create React App, Vite + React alone, plain HTML files, Gatsby.

**Why Next.js:**  
Next.js is built by Vercel — the same company running the deployment. This is not a coincidence. The integration is zero-config: every push to `main` auto-deploys, every pull request gets a live preview URL, and the build pipeline just works. There is no setup friction between writing code and seeing it live.

More importantly, Next.js uses **Static Site Generation (SSG) by default**. The page is pre-rendered into a pure HTML file at build time. When a visitor on a phone hits the site, the server sends them finished HTML — not JavaScript that then has to run and build the page. This is the difference between a site that feels instant and one that feels sluggish. For a marketing site with no dynamic per-user data, SSG is exactly right.

**App Router specifically because:**
- `layout.jsx` handles fonts, metadata, and the nav globally — write it once, it applies everywhere
- Easy to add new pages later (`/competition`, `/register`) without restructuring
- Built-in `next/image` and `next/font` (see sections 2.4 and 2.5) are only fully optimized inside the App Router

---

### 2.2 Styling — CSS Modules

**Use:** CSS Modules, one `.module.css` file per component.  
**Do not use:** Tailwind CSS, styled-components, plain global CSS for component styles.

**Why CSS Modules and not Tailwind:**  
The design for this site is bespoke. It uses custom CSS variables, complex `clamp()` expressions for responsive typography, multi-step keyframe animations (robot eye, hero line reveal, scanline sweep), `mix-blend-mode` effects, and `writing-mode` for the scroll indicator. Tailwind is built for composing common utility patterns quickly — it is not built for this level of custom animation and visual precision.

Forcing this design into Tailwind means writing `[#090909]` arbitrary values, `[clamp(72px,13vw,180px)]` class names, and fighting the animation system for every keyframe. The prototype (`ennovate-v2.html`) already has all the CSS written correctly. CSS Modules let that CSS be copied directly into component files with zero translation.

CSS Modules also scope styles per component automatically — no class name collisions, no global leakage.

**Global CSS (`globals.css`) handles:**
- CSS custom property definitions (all `--black`, `--white`, `--mid`, `--dim`, `--border` tokens)
- CSS reset
- `body::before` grid texture (must be global — it covers the entire viewport)
- `@keyframe` definitions used across multiple components
- `@font-face` fallback behavior

Everything else is in the component's own `.module.css` file.

---

### 2.3 Animation — Framer Motion

**Use:** Framer Motion for scroll-triggered reveals, hero entrance animations, and any page transitions.  
**Do not use:** GSAP (licensing), anime.js (unnecessary), raw CSS for scroll-triggered animations.

**Why Framer Motion:**  
CSS animations alone cannot respond to scroll position or element visibility — you need JavaScript for that. The design requires scroll-triggered section reveals (every `.reveal` section fades up on enter) and the hero text needs a staggered line-by-line entrance. Framer Motion handles both cleanly with React's component model.

Critically, Framer Motion only animates `transform` and `opacity` by default. These properties are GPU-accelerated and do not trigger browser layout recalculation. On a mid-range Android phone, this is the difference between a smooth 60fps animation and a janky one. Libraries that animate `height`, `margin`, or `top` cause layout thrashing — Framer Motion steers away from this by design.

**What Framer Motion handles:**
- Hero title: staggered line reveals (`initial: { y: "100%" }` per line, `animate: { y: 0 }` with delays)
- Section reveals: `whileInView` with `viewport: { once: true, amount: 0.08 }` replaces the IntersectionObserver pattern from the prototype
- Stats count-up: trigger via `useInView` hook
- Any future page transitions if additional routes are added

**What stays as pure CSS animation:**
- Robot eye (all layers — rings, pupil, scanline, blink) — these are continuous loops that do not depend on user interaction or scroll, so CSS `@keyframes` is correct and more performant
- Background grid drift — same reason
- Nav border-bottom on scroll — handled with a scroll event listener and a class toggle, not Framer

---

### 2.4 Images — next/image

**Use:** The `Image` component from `next/image` for every image on the site.  
**Do not use:** Raw `<img>` tags for any asset served from the project.

**Why next/image:**  
`next/image` does four things automatically that matter enormously on mobile:

1. **Format conversion:** Serves WebP to browsers that support it, falls back to JPEG/PNG. WebP is typically 25-30% smaller than JPEG at the same visual quality.
2. **Responsive sizing:** Generates multiple sizes of each image and serves the right one based on the device's actual screen width. A phone does not download a 2400px wide image.
3. **Lazy loading:** Images below the fold are not downloaded until the user scrolls toward them. The hero loads instantly; the footer image loads when needed.
4. **Layout shift prevention:** Reserves the correct space for the image before it loads, so the page does not jump around as images appear.

**Ennovate logo specifically:** The logo (`/public/assets/ennovate-logo.png`) is a black logo on a transparent background. In the nav, render it with `style={{ filter: "invert(1)" }}` to make it white against the dark background. Do not create a separate white version of the logo file.

---

### 2.5 Fonts — next/font

**Use:** `next/font/google` for all three typefaces.  
**Do not use:** A raw `<link>` tag to Google Fonts in the HTML head.

**Why next/font:**  
A raw Google Fonts link tag causes a flash of unstyled text (FOUT) on slow connections — the page renders with a fallback system font, then jumps to the correct font when it loads. On mobile this is visually jarring and ruins first impressions.

`next/font/google` downloads the font files at build time, hosts them on the same domain as the site, and injects the correct `font-display` behavior automatically. The font is always available immediately — no external request, no flash.

**Font configuration (in `layout.jsx`):**
```javascript
import { Barlow, Barlow_Condensed, JetBrains_Mono } from 'next/font/google'

// Bebas Neue is imported separately — it only has one weight
import localFont from 'next/font/local'
// OR use the Google version:
import { Bebas_Neue } from 'next/font/google'
```

All font CSS variables should be defined in `layout.jsx` and applied to `<body>` so every component can reference them via CSS.

---

### 2.6 Deployment — Vercel

**Use:** Vercel. Connect the GitHub repo directly.  
**Do not use:** Netlify, GitHub Pages, Railway, or any manual server setup.

**Why Vercel:**  
The project is Next.js. Vercel built Next.js. The deployment pipeline is the same team — there is no configuration gap. Every push to `main` triggers a production deploy automatically. Every pull request branch gets its own live preview URL for testing before merging.

Vercel's CDN serves the static files from edge nodes globally. A visitor from another city or country gets the site from a node physically close to them, not from a single server in one location.

**Custom domain:** Connect the domain in Vercel dashboard under Project Settings → Domains. If migrating from an old project: remove the domain from the old project first (it releases immediately), then add it to the new project.

---

### 2.7 Backend — None (by design)

**Do not build:** A custom Express/Node server, a database, a CMS, or any persistent backend infrastructure.

**Why no backend:**  
This is a static marketing site. There is no user data to store, no authentication, and no content that changes frequently enough to need a database. Adding backend infrastructure adds deployment complexity, cost, and failure points — all for no user-facing benefit.

**For competition registration:**  
Use a Google Form. Embed it in the Join Us section or link to it from the CTA button. Submissions go directly into a Google Sheet the team can read without any infrastructure. This is not a compromise — it is the correct tool for the job.

**For a contact/inquiry form (if needed later):**  
A single Vercel Serverless Function in `/app/api/contact/route.js` calling Resend (free tier: 3,000 emails/month) is the entire backend. One file, ~25 lines, zero servers to manage.

---

## 3. What Not to Install

Be explicit with Antigravity about what to exclude. These are common defaults that will conflict with or bloat this specific setup:

| Package | Why to exclude |
|---|---|
| Tailwind CSS | Conflicts with CSS Modules approach; wrong tool for this design |
| styled-components | Server-side rendering conflicts with Next.js App Router by default |
| GSAP | Commercial license required for some features; Framer Motion covers all needs |
| Redux / Zustand | No global state needed on a static marketing site |
| Axios | Fetch API is built into the browser; no HTTP library needed |
| Express | No custom server; Vercel handles routing |
| Any UI component library (MUI, Chakra, shadcn) | The design is 100% custom; component libraries will fight it |

---

## 4. Project File Structure

Scaffold this structure before writing any component code. Every file should exist (even if empty) before Antigravity begins filling it in.

```
ennovate-website/
├── app/
│   ├── layout.jsx          ← Root layout: fonts, metadata, Nav, body wrapper
│   ├── page.jsx            ← Homepage: imports and sequences all sections
│   ├── globals.css         ← CSS variables, reset, grid texture keyframe
│   └── api/
│       └── contact/
│           └── route.js    ← Serverless function (placeholder, build later)
│
├── components/
│   ├── Nav/
│   │   ├── Nav.jsx
│   │   └── Nav.module.css
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   └── Hero.module.css
│   ├── RobotEye/
│   │   ├── RobotEye.jsx    ← Isolated, pure CSS component
│   │   └── RobotEye.module.css
│   ├── Pillars/
│   │   ├── Pillars.jsx
│   │   └── Pillars.module.css
│   ├── Stats/
│   │   ├── Stats.jsx
│   │   └── Stats.module.css
│   ├── Challenges/
│   │   ├── Challenges.jsx
│   │   └── Challenges.module.css
│   ├── Manifesto/
│   │   ├── Manifesto.jsx
│   │   └── Manifesto.module.css
│   └── CTA/
│       ├── CTA.jsx
│       └── CTA.module.css
│
├── public/
│   └── assets/
│       └── ennovate-logo.png   ← Black logo, transparent bg. Inverted in nav via CSS.
│
├── next.config.js
├── package.json
└── .gitignore
```

---

## 5. Build Order for Antigravity

Build one component at a time in this exact order. Do not ask Antigravity to generate the full site in one prompt — the output quality drops significantly and corrections take longer than building incrementally.

| Step | Task | Notes |
|---|---|---|
| 1 | Scaffold file structure | All files created, empty. `globals.css` CSS variables defined. |
| 2 | `layout.jsx` | Fonts loaded via `next/font`. Metadata set. Nav imported. |
| 3 | `Nav` component | Logo, desktop links, mobile drawer, scroll border behavior. |
| 4 | `RobotEye` component | Pure CSS, self-contained. No JS logic. Verify animation on mobile before continuing. |
| 5 | `Hero` section | Eye positioned, ghost watermark, title lines, CTAs, scroll indicator. Hero entrance animation via Framer Motion. |
| 6 | `Pillars` section | Three alternating bands, hover accent bar, tag pills. |
| 7 | `Stats` section | 4-column grid, count-up animation via Framer `useInView`. |
| 8 | `Challenges` section | 3-column grid, featured card spans 2, all card states. |
| 9 | `Manifesto` section | Two-column pull quote + body. Outlined text effect. |
| 10 | `CTA` section | Inverted block, ghost text, apply button. |
| 11 | `page.jsx` | Assemble all sections in order. Add scroll reveal via Framer `whileInView`. |
| 12 | Mobile audit | Test every breakpoint (375px, 390px, 768px, 1024px, 1440px). Fix before shipping. |
| 13 | Lighthouse audit | Run in Chrome DevTools. Target 90+ Performance on mobile. Fix any flagged issues. |

---

## 6. How to Prompt Antigravity

When starting each step, give Antigravity this context block at the top of your prompt:

```
Context files (read before generating code):
- ennovate-design-doc.md — visual spec, all measurements, animation detail, content
- ennovate-stack-spec.md — tech decisions, file structure, this document
- ennovate-v2.html — approved visual prototype, reference for CSS values

Current task: [describe the single component you are building]

Rules:
- Use Next.js 14 App Router
- Use CSS Modules for all styles
- Use Framer Motion for scroll-triggered and entrance animations
- Use next/image for all images
- Do not install Tailwind, styled-components, or any UI component library
- Match the visual prototype exactly — this site must look exceptional
```

For the RobotEye component specifically, add:
```
The robot eye is pure CSS — no JS, no canvas, no SVG. All animation via @keyframes.
Reference Section 7 of ennovate-design-doc.md for the full layer-by-layer breakdown.
```

---

## 7. Visual Standard — Non-Negotiable

This section exists to make one thing explicit for anyone building this site, human or AI:

**The bar is not "functional." The bar is "exceptional."**

The Ennovate website will be seen by hundreds of students evaluating whether to participate in the club's competition. Many will open it on their phone in under ten seconds, form an impression, and decide. That impression is shaped entirely by how the site looks and feels in those ten seconds.

Every detail from the design spec exists for a reason:
- The robot eye is not decorative — it is the first thing a visitor remembers
- The `WE BUILD. REAL.` stacked hero with the outlined third line is intentionally aggressive — it communicates confidence immediately
- JetBrains Mono everywhere signals technical credibility without saying a word
- The zero-color discipline makes every element feel intentional rather than arbitrary
- The mobile experience must be as considered as the desktop — no collapsed sections, no broken layouts, no horizontal scroll

If Antigravity generates something that looks generic, ask it to revise. If an animation feels off, fix it before moving to the next component. The prototype (`ennovate-v2.html`) is the visual benchmark — do not ship anything that looks less considered than what is in that file.

---

## 8. Dependencies List

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "framer-motion": "^11.x"
  },
  "devDependencies": {
    "eslint": "^8.x",
    "eslint-config-next": "14.x"
  }
}
```

That is the complete dependency list. Four production packages. Keep it this way.
