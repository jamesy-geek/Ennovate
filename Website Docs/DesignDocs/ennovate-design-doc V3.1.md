# Ennovate Website — Design & Implementation Spec
**Version:** 3.1  
**Last Updated:** March 2026  
**Base:** v2.0 (unchanged foundations) + selected v3.0 additions  

---

## 0. How to Read This Document

This is the single source of truth for the Ennovate club website. Sections marked **[FROM v2.0]** are unchanged. Sections marked **[NEW in v3.1]** are additions. When building, follow this doc over any assumptions.

---

## 1. Project Overview [FROM v2.0]

**Club:** Ennovate — a college innovation and technology club founded in 2022.  
**Tagline:** *"Innovation for Life. And Fun."* (from logo lockup)  
**Primary Tagline (hero):** *"We don't wait for the future. We build it."*  
**Site Purpose:** Public-facing club homepage. Goals: communicate identity, showcase upcoming challenges, and recruit new members.  
**Stack:** Next.js 14 — deployed on Vercel.

---

## 2. Design Philosophy [FROM v2.0]

**Core Aesthetic:** *Editorial Brutalism + Technical Precision*
- Strict black and white palette. Zero color.
- Industrial condensed display typography.
- Monospace fonts (`JetBrains Mono`) for all labels, tags, metadata.
- Subtle animated grid overlay as background texture.
- Contrast is the only design luxury.

---

## 3. Color System [FROM v2.0]

| CSS Token | Hex Value | Usage |
|---|---|---|
| `--black` | `#090909` | Primary background |
| `--white` | `#F4F4EF` | Primary text |
| `--mid` | `#141414` | Card backgrounds |
| `--dim` | `#555555` | Muted text, labels |
| `--border` | `rgba(255,255,255,0.1)` | Dividers, outlines |

**Rules:** No gradients. No accent colors. Only `mix-blend-mode: difference` on cursor.

---

## 4. Typography [FROM v2.0]

| Role | Font | Size |
|---|---|---|
| Hero Display | Bebas Neue 400 | `clamp(72px, 13vw, 180px)` |
| Section Headings | Bebas Neue 400 | `44px` |
| Pillar Titles | Bebas Neue 400 | `clamp(48px, 7vw, 92px)` |
| Card Titles | Barlow Condensed 700 | `clamp(22px, 3vw, 32px)` |
| Body | Barlow 400 | `15px–16px` |
| Labels/Metadata | JetBrains Mono 400 | `9px–12px` |
| Stats Numbers | Bebas Neue 400 | `clamp(52px, 7vw, 96px)` |

---

## 5. Global Components

### 5.1 Custom Cursor [FROM v2.0]
- `10px` white circle, `mix-blend-mode: difference`.
- Expands to `40px` on interactive elements.
- Disabled on touch via `@media (hover: none)`.

### 5.2 Background Grid [FROM v2.0]
- `body::before`, fixed, `60px × 60px` grid, `80s` drift animation.

### 5.3 Navigation Bar [FROM v2.0]
- Fixed, `60px` height, blur backdrop, scroll-triggered border.
- Logo: `/assets/logo.png`, `filter: invert(1)`.
- Desktop: 3 links (About, Challenges, Join Us).
- Mobile: drawer with toggle.

### 5.4 Scroll Reveal [FROM v2.0]
- IntersectionObserver, `threshold: 0.08`, `fadeUp` transition.

### 5.5 Lenis Smooth Scroll [NEW in v3.1]
- Install `@studio-freight/lenis`.
- Wrap the application root. Provides inertia-based scrolling.
- Integrates with Framer Motion's `useScroll`.

---

## 6. Page Sections

### Section 0 — Cassette Header [NEW in v3.1]

**Purpose:** A full-viewport cinematic intro that plays the hand-drawn eye sprite animation. This is the **first thing** visitors see. After scrolling past it, they encounter the original WE.BUILD.REAL. hero.

#### Layout Structure
```
[ ennovate — logotype bleeding off both sides        ]
[ MANDYA   EST. 2022   INNOVATION FOR LIVING. AND FUN.   INDIA ]  ← metadata strip (text scramble on load)
[                                                      ]
[         EYE ANIMATION (hand-drawn sprite frames)     ]
[                                                      ]
[ ↓ scroll                          SYS_ONLINE · V3.0 ]  ← footer strip
```

**Total height:** `100svh`, `min-height: 700px`.

#### 0a. Logotype Layer
- Text: `ennovate` (lowercase), Bebas Neue.
- Size: `clamp(120px, 22vw, 280px)`, `letter-spacing: -4px`.
- Intentionally bleeds off both viewport edges (`overflow: hidden; text-align: center`).
- `padding-top: 80px` to clear nav.
- Below: logo mark image (`/assets/ennovate-mark.png`), `height: 28px`, `filter: invert(1)`, `opacity: 0.45`.

#### 0b. Metadata Strip
- Full-width, bordered top and bottom, flex space-between.
- Content: `MANDYA · EST. 2022 · INNOVATION FOR LIVING. AND FUN. · INDIA`
- JetBrains Mono, `10px`, `letter-spacing: 4px`, `color: var(--dim)`.
- **Text scramble animation on load** (each item scrambles then resolves).
- Mobile: show `MANDYA` and `EST. 2022` only.

#### 0c. Eye Animation Layer
- Sprite sheet: `background-image` with CSS `steps()` animation.
- Desktop: `2048 × 600px` per frame, 12–16 frames, 12fps.
- Mobile: `800 × 800px` per frame.
- `mix-blend-mode: screen` (black bg becomes transparent).
- **Fallback:** If sprite assets not ready, display the existing CSS Robot Eye component as placeholder.
- Paths: `/public/assets/eye/eye-sprite-desktop.png`, `/public/assets/eye/eye-sprite-mobile.png`

#### 0d. Film Grain (Hero-Scoped)
- Procedurally generated via JS canvas (200×200px noise).
- Applied as `::after` on `.cassette-header`, `opacity: 0.08`, rapid position shifting at `0.08s steps(1)`.
- Mobile: `opacity: 0.06`.

#### 0e. Footer Strip
- Bottom edge of header, bordered top.
- Left: `↓ scroll` — JetBrains Mono `9px`.
- Right: `SYS_ONLINE · V3.0` — JetBrains Mono `9px`.

#### 0f. Entrance Animations
| Element | Delay | Animation |
|---|---|---|
| Logotype `ennovate` | `0.3s` | `slideUp` clip reveal |
| Logo mark | `0.6s` | `fadeUp` |
| Metadata strip items | `0.7s` staggered | `fadeUp` + **text scramble** |
| Eye animation | `1.0s` | `opacity 0 → 1`, then sprite loop |
| Footer strip | `1.2s` | `fadeUp` |

---

### Section 1 — Hero (WE. BUILD. REAL.) [FROM v2.0]

**This is the original hero.** Visitors see it after scrolling past the Cassette Header.

- Full viewport height, content bottom-left.
- Ghost "03" watermark, Robot Eye (CSS, absolute right), typewriter eyebrow.
- Title: 3-line stacked "WE.", "BUILD.", "REAL." with clip reveals.
- Sub-tagline, two CTA buttons, scroll indicator.
- All from v2.0 — no changes.

---

### Section 2 — What We Do (3 Pillars) [FROM v2.0]

Three bands, alternating black/white/black. Content unchanged:

| # | Title | Description | Tags |
|---|---|---|---|
| 01 | ROBOTICS | Servo control to robots that win in competitions. | ROS, Arduino, Inverse Kinematics, OpenCV, 3D Printing |
| 02 | REAL PROBLEMS | Real world problems that warranted attention. | Deployed, Field Tested, Impact Driven, Cross-disciplinary |
| 03 | SIDE PROJECTS | Weekend experiments. Personal obsessions. Weird ideas. Cool stuff. | AI Agents, Embedded Systems, Web Apps, Hardware Hacks |

---

### Section 3 — Stats Bar [FROM v2.0]

| Stat | Label | data-target |
|---|---|---|
| `3+` | Years Active | 3 |
| `40+` | Members | 40 |
| `20+` | Projects Shipped | 20 |
| `∞` | Ideas Left | Static |

---

### Section 4 — Upcoming Challenges [FROM v2.0]

Featured card: TechTatva 2026 — Flagship Competition.

---

### Section 5 — Manifesto [FROM v2.0]

Pull quote: *"We don't wait for the future. We build the damn thing."*

**[NEW in v3.1]:** Variable font weight on scroll — the pull quote gets heavier (Barlow `wght` axis) as you scroll into it via `font-variation-settings`.

3 body paragraphs unchanged from v2.0.

---

### Section 6 — Join Us CTA [FROM v2.0]

Inverted section. Ghost "BUILD" text. 

**[NEW in v3.1]:** `[ Apply to Ennovate ]` button uses **magnetic effect** — attracts toward cursor on approach, snaps back on leave.

---

### Section 7 — Footer [FROM v2.0]

Footer text: `Club Ennovate · Est. 2022 · Innovation for Living. And Fun.`

---

## 7. Robot Eye Component Spec [FROM v2.0]

Pure CSS, 7 layers. Used as **fallback** in Cassette Header if sprite assets aren't ready, and as the **primary** eye in the WE.BUILD.REAL. hero section.

---

## 8. Tier 1 Interactive Features [NEW in v3.1]

### 8.1 Text Scramble / Glitch Reveal
- Letters randomize rapidly before resolving to final text.
- **Where:** Metadata strip items on load, section labels (`// where we compete next`).
- Implementation: Small JS class cycling random chars via `setInterval`.

### 8.2 Magnetic Buttons
- Buttons attract toward cursor on approach (`mousemove` + `transform: translate()`).
- **Where:** `[ Join the Club ]` hero CTA, `[ Apply to Ennovate ]` CTA button only.
- ~20 lines of JS per button.

### 8.3 Variable Font Weight on Scroll
- Barlow's `wght` axis interpolated from Framer Motion's `useScroll`.
- **Where:** Manifesto pull quote — gets heavier as you scroll into it.

### 8.4 Lenis Smooth Scroll
- `@studio-freight/lenis` wrapping the app root.
- Provides physical momentum to all scrolling.

---

## 9. Assets

| Asset | Path | Notes |
|---|---|---|
| Logo (full) | `/public/assets/logo.png` | Nav, `filter: invert(1)` |
| Logo (mark) | `/public/assets/ennovate-mark.png` | Cassette header, `opacity: 0.45` |
| Eye Desktop | `/public/assets/eye/eye-sprite-desktop.png` | Sprite sheet, **TBD by user** |
| Eye Mobile | `/public/assets/eye/eye-sprite-mobile.png` | Sprite sheet, **TBD by user** |

---

## 10. Responsive Breakpoints [FROM v2.0]

Same as v2.0 + Cassette Header:
- `<= 768px`: Metadata strip shows 2 items. Eye swaps to square sprite. Logotype scales down.
- `<= 480px`: Footer strip hides right item.
