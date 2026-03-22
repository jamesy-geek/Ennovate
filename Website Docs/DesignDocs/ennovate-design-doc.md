# Ennovate Website — Design & Implementation Spec
**Version:** 2.0  
**Last Updated:** March 2026  
**For use with:** Antigravity (AI coding agent, VS Code)  
**Reference implementation:** `ennovate-v2.html` (approved visual prototype)

---

## 0. How to Read This Document

This is the single source of truth for the Ennovate club website. It covers design decisions, component specifications, motion behavior, and mobile rules. When building, follow this doc over any assumptions. Where a section says **"as prototyped"**, defer to `ennovate-v2.html` for exact CSS values.

---

## 1. Project Overview

**Club:** Ennovate — a college innovation and technology club founded in 2022.  
**Tagline:** *"Innovation for Life. And Fun."* (from logo lockup)  
**Primary Tagline (hero):** *"We don't wait for the future. We build it."*  
**Site Purpose:** Public-facing club homepage. Goals: communicate identity, showcase upcoming challenges, and recruit new members.  
**Stack:** Static HTML/CSS/JS or Next.js — deploy on Vercel.

---

## 2. Design Philosophy

**Inspiration:** robot.com — cinematic hero, bold minimal type, proof-through-stats, strong philosophy anchor.

**Ennovate's Distinction:** Where robot.com is clinical and product-forward, Ennovate is raw, energetic, and student-made. The site should feel built by people obsessed with building — not a polished corporate brand.

**Core Aesthetic:** *Editorial Brutalism + Technical Precision*
- Strict black and white palette. Zero color.
- Industrial condensed display typography.
- Monospace fonts (`JetBrains Mono`) for all labels, tags, metadata, and UI chrome — reinforces the "made by engineers" identity.
- Subtle animated grid overlay as background texture throughout.
- Contrast is the only design luxury.

---

## 3. Color System

| CSS Token | Hex Value | Usage |
|---|---|---|
| `--black` | `#090909` | Primary background; text on white sections |
| `--white` | `#F5F5F5` | Primary text; background on inverted sections |
| `--mid` | `#141414` | Card backgrounds, secondary surfaces |
| `--dim` | `#555555` | Muted text, labels, metadata, inactive states |
| `--border` | `rgba(255,255,255,0.1)` | Section dividers, card outlines, grid lines |

**Rules:**
- No gradients anywhere.
- No accent colors.
- Inverted sections (white bg, black text) are used intentionally and sparingly — CTA section only.
- The only "color" effect allowed is `mix-blend-mode: difference` on the custom cursor.

---

## 4. Typography

| Role | Font Family | Weight | Responsive Size |
|---|---|---|---|
| Hero Display | Bebas Neue | 400 | `clamp(72px, 13vw, 180px)` |
| Section Headings | Bebas Neue | 400 | `44px` fixed |
| Pillar Titles | Bebas Neue | 400 | `clamp(48px, 7vw, 92px)` |
| Card / Component Titles | Barlow Condensed | 700 | `clamp(22px, 3vw, 32px)` |
| Body Paragraphs | Barlow | 400 | `15px–16px` |
| All Labels, Tags, Metadata | JetBrains Mono | 400 | `9px–12px` |
| Stats Numbers | Bebas Neue | 400 | `clamp(52px, 7vw, 96px)` |

**Google Fonts import string:**
```
Bebas+Neue&family=Barlow+Condensed:wght@400;700&family=Barlow:wght@400;500&family=JetBrains+Mono:wght@400;500
```

---

## 5. Global Components

### 5.1 Custom Cursor
- Small white filled circle, `10px x 10px`, `border-radius: 50%`.
- `mix-blend-mode: difference` — creates inversion effect on hover over light elements.
- On hover over interactive elements (`a`, `button`, cards): expands to `40px x 40px` (CSS transition, 0.2s).
- **Disabled on touch devices** — detect with `@media (hover: none)` and `body { cursor: auto }`.

### 5.2 Background Grid Texture
- Applied via `body::before` pseudo-element, `position: fixed`, covers entire viewport.
- Two layered CSS `linear-gradient` lines at 1px, `rgba(255,255,255,0.025)`, spaced `60px x 60px`.
- Animated: `background-position` shifts from `0 0` to `60px 60px` over `80s`, loops infinitely.
- `pointer-events: none`, `z-index: 0`.

### 5.3 Navigation Bar
- `position: fixed`, full width, `height: 60px`, `z-index: 100`.
- Background: `rgba(9,9,9,0.88)` with `backdrop-filter: blur(14px)`.
- On scroll past `40px`: `border-bottom: 1px solid var(--border)` appears (CSS transition).
- **Left:** Ennovate logo image (`/assets/ennovate-logo.png`), `height: 32px`, `filter: invert(1)` (logo is black on transparent; invert makes it white).
- **Right (desktop):** Three text links in JetBrains Mono, `10px`, `letter-spacing: 2px`, uppercase — `About`, `Challenges`, `Join Us`. Color: `var(--dim)`, hover: `var(--white)`.
- **Right (mobile):** Links hidden; replaced with `[ = ]` toggle button (JetBrains Mono, bordered).
- Mobile nav drawer: `position: fixed`, `top: 60px`, full width, stacked links, closes on link tap.

### 5.4 Scroll Reveal
- All major sections have class `reveal`.
- Initial state: `opacity: 0; transform: translateY(40px)`.
- On intersection (`threshold: 0.08`): class `visible` added — `opacity: 1; transform: translateY(0)`.
- Transition: `opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1)`.
- Implemented via `IntersectionObserver`.

---

## 6. Page Sections (in order)

### Section 1 — Hero

**Layout:** Full viewport height (`100svh`), `min-height: 640px`. Content anchored to bottom-left (`justify-content: flex-end`, `padding-bottom: 80px`).

**Ghost Watermark:** Text `"03"` (years active), Bebas Neue, `clamp(160px, 28vw, 400px)`, `color: rgba(255,255,255,0.03)`. Positioned `absolute`, right-aligned, vertically centered. Hidden on mobile (`display: none`).

**Robot Eye (see Section 7 for full spec):** Positioned `absolute`, right side of hero, vertically centered on desktop. Repositions to inline above hero text on mobile.

**Eyebrow text:** `"Club Ennovate · Est. 2022"` — JetBrains Mono, `11px`, `letter-spacing: 4px`, `color: var(--dim)`. Animates in with `fadeUp` on load (delay `0.3s`).

**Hero Title:** Three stacked lines — `"WE."`, `"BUILD."`, `"REAL."`. Each line uses a clip reveal (`overflow: hidden` on `.line`, child `span` animates `translateY(100%) to 0`). Third line `"REAL."` is outlined text (`color: transparent; -webkit-text-stroke: 1.5px var(--white)`). Animation delays: `0.5s`, `0.65s`, `0.8s`.

**Sub-tagline:** JetBrains Mono, `12px`, `color: var(--dim)`, `max-width: 380px`. Content: `"Robots, code, and real-world problems. / Three years of building things that actually matter."`. Animates in at `1.1s`.

**CTAs:** Two buttons side by side, flex-wrap on mobile.
- `[ What We Do ]` — outlined style (border `1px solid rgba(255,255,255,0.3)`, hover fills slightly). Scrolls to pillars section.
- `[ Join the Club ]` — filled white, black text. Scrolls to CTA section.
- Both: JetBrains Mono, `10px`, `letter-spacing: 2px`, `padding: 13px 24px`. Animate in at `1.3s`.

**Scroll Indicator:** `"down Scroll"` — JetBrains Mono, `9px`, `writing-mode: vertical-rl`, positioned `absolute bottom-right`. Animated vertical line above it pulses height `40px to 60px`. Animates in at `1.6s`.

---

### Section 2 — What We Do (3 Pillars)

Three full-width horizontal bands. Each is a flex row. `border-top: 1px solid var(--border)`, last one also has `border-bottom`.

**Alternating scheme:**
- Band 1 (ROBOTICS): black background, white text.
- Band 2 (REAL PROBLEMS): white background (`var(--white)`), black text. All sub-elements inverted.
- Band 3 (SIDE PROJECTS): black background, white text.

**Each band contains:**
- **Left column:** numbered tag `[ 01 ]` etc., JetBrains Mono `10px`. Min-width `110px`. Right border `1px solid var(--border)`.
- **Main column:** category label (Mono, `10px`, uppercase, dimmed), pillar title (Bebas Neue, large), description paragraph (Barlow, `15px`), tag pills row (Mono, `9px`, bordered).
- **Left edge accent:** `3px` wide bar, `position: absolute left-0`, `height: 100%`. CSS `scaleY(0) to scaleY(1)` on hover (`transform-origin: top`, `0.4s` ease). White on dark bands, black on white band.

**Content:**

| # | Title | Description | Tags |
|---|---|---|---|
| 01 | ROBOTICS | Servo control to robots that win in competitions. Design, fabricate, and program. | ROS, Arduino, Inverse Kinematics, OpenCV, 3D Printing |
| 02 | REAL PROBLEMS | Real world problems that warranted attention now come to us for solution. | Deployed, Field Tested, Impact Driven, Cross-disciplinary |
| 03 | SIDE PROJECTS | Weekend experiments. Personal obsessions. Weird ideas. Cool stuff. | AI Agents, Embedded Systems, Web Apps, Hardware Hacks |

---

### Section 3 — Stats Bar

Full-width, 4-column CSS grid. `border-top` and `border-bottom` at `1px solid var(--border)`. Margin `72px 0`.

Each stat cell: `border-right: 1px solid var(--border)`, last has none. `padding: 52px 28px`. `text-align: center`.

| Stat | Label | Animation |
|---|---|---|
| `3+` | Years Active | Count-up from 0 (data-target="3") |
| `40+` | Members | Count-up from 0 (data-target="20") |
| `20+` | Projects Shipped | Count-up from 0 (data-target="10") |
| infinity | Ideas Left | Static (no data-target) |

Count-up: triggered by `IntersectionObserver` (`threshold: 0.5`). Increments in ~40 steps over ~1.2s using `setInterval` at `30ms`.

**Mobile:** Wraps to `2x2` grid. Bottom border added to top two cells.

---

### Section 4 — Upcoming Challenges

**Section header:** Flex row — `"UPCOMING CHALLENGES"` (Bebas Neue, `44px`) + `"// where we compete next"` (JetBrains Mono, `10px`, dimmed). Separated by `border-bottom`.

**Grid:** CSS grid, `grid-template-columns: repeat(3, 1fr)`, `gap: 1px`, `background: var(--border)` (creates 1px gap lines between cards).

**Card anatomy:**
- Background `var(--mid)`, padding `36px 32px`, flex column.
- Top accent bar: `height: 2px`, `position: absolute top-0`, `background: var(--white)`, `scaleX(0) to scaleX(1)` on hover (left origin, `0.4s` ease).
- Status badge: dot + label. Active = pulsing filled dot. Upcoming = hollow dot (border only). Scouting = hollow dot.
- Challenge name: Barlow Condensed 700, `clamp(22px, 3vw, 32px)`.
- Description: Barlow, `14px`, `color: var(--dim)`.
- Tag pills: same style as pillar tags.
- Meta block: `border-top: 1px solid var(--border)`, key-value rows in JetBrains Mono `9px`. Keys dimmed, values white.

**Current challenges to display:**

| Card | Title | Status | Notable Meta |
|---|---|---|---|
| Featured (span 2) | TechTatva 2026 — Flagship Competition | Active Build (live dot) | Category: Hackathons, robotics and a everything you need |

**Note:** Featured card uses `grid-column: span 2`. On mobile, reverts to `span 1`.

---

### Section 5 — Manifesto

Two-column grid, `grid-template-columns: 1fr 1fr`, `gap: 72px`. `border-top: 1px solid var(--border)`, `padding: 80px 40px`.

**Left column — pull quote:**
```
"We don't wait for the future.
We [outlined]build[/outlined] the damn thing."
// Club Ennovate · 2022–present
```
Font: Barlow Condensed 700, `clamp(28px, 3.5vw, 48px)`. The word "build" is outlined text (`color: transparent; -webkit-text-stroke: 1px var(--white)`). Attribution line: JetBrains Mono, `10px`, `rgba(255,255,255,0.25)`.

**Right column — body copy (3 paragraphs):**
1. "Ennovate started three years ago with a simple belief: the best way to learn how technology works is to build something with it that actually matters."
2. "We're not a coding bootcamp. We're not a research lab. We're a group of students who would rather spend a Saturday debugging servo firmware than doing almost anything else."
3. "Robotics, software, hardware, AI — we build across all of it. Some exist to help the people of the world that need it. Some exist purely because we wanted to see if it was possible. Both count."

Font: Barlow, `15px`, `color: var(--dim)`, `line-height: 1.85`.

**Mobile:** Columns stack to single column.

---

### Section 6 — Join Us CTA

Full-section inverted block. `background: var(--white)`, `color: var(--black)`. `min-height: 96vh`. Centered column layout.

- Background ghost text: `"BUILD"`, Bebas Neue, `clamp(100px, 18vw, 280px)`, `color: rgba(0,0,0,0.04)`. `position: absolute`.
- Eyebrow: `"// Applications open"` — JetBrains Mono, `10px`, `rgba(0,0,0,0.4)`.
- Title: `"READY TO BUILD SOMETHING REAL?"` — Bebas Neue, `clamp(52px, 9vw, 130px)`, `line-height: 0.9`.
- CTA Button: `[ Apply to Ennovate ]` — filled black, white text. JetBrains Mono, `11px`, `letter-spacing: 3px`, `padding: 16px 36px`.

---

### Section 7 — Footer

`background: var(--white)`, `color: var(--black)`. `padding: 28px 40px`. Flex row, space-between.

- Left: `"Club Ennovate · Est. 2022 · Innovation for Living. And Fun."` — JetBrains Mono, `9px`, `rgba(0,0,0,0.35)`.
- Right: Link list — `Instagram`, `LinkedIn`, `GitHub` — same font, hover darkens to full black.

---

## 7. Robot Eye Component Spec

This is a pure CSS animated component. No canvas, no SVG, no JS required.

**Container:** `.robot-eye`, square, `clamp(160px, 22vw, 300px)`. Position context for all children.

**Layers (bottom to top):**

| Layer | Class | Description |
|---|---|---|
| 1 | `.eye-ring` x3 | Concentric circles at `inset: 0`, `12%`, `24%`. `border-radius: 50%`. Border at increasing opacity. Pulse animation (scale `1 to 1.02`, opacity `0.5 to 1`), `4s ease-in-out infinite`, staggered `0.4s` each. |
| 2 | `.eye-crosshair` | Circle at `inset: 28%`. `border: 1px dashed rgba(255,255,255,0.1)`. Rotates `360deg` over `12s`, reversed direction. |
| 3 | `.eye-ticks` | Circle at `inset: 18%`. `::before` and `::after` = tick marks at top and side. Rotates `360deg` over `20s`. |
| 4 | `.eye-iris` | Circle at `inset: 32%`. Radial gradient fill. `border: 1px solid rgba(255,255,255,0.35)`. `overflow: hidden` (clips scan and pupil). |
| 5 | `.eye-scan` | Inside iris. Full-size div. Gradient horizontal band (white `0.15` opacity at center). Animates `translateY(-100% to 100%)` over `3s linear infinite`. Scanline sweep effect. |
| 6 | `.eye-pupil` | `36% x 36%` of iris. White filled circle. Centered. `box-shadow: 0 0 20px rgba(255,255,255,0.4)`. Animates through 8 positions over `8s ease-in-out infinite` (looking around behavior). |
| 7 | `.eye-blink` | Same size/position as iris. Black fill. `scaleY(0)` normally. Animates to `scaleY(1)` for ~0.2s every `7s` — creates blink. |

**Label:** `.eye-label` — `"SYS_ONLINE · V3.0"`, JetBrains Mono, `9px`, `letter-spacing: 3px`, `color: var(--dim)`. Positioned below the eye container.

**Mobile behavior:** On `max-width: 768px`, the eye container exits absolute positioning. It becomes a relative-flow element above the hero text. Size reduces to `120px x 120px`.

**Note:** This is a prototype and will almost certainly be changed in the process.

---

## 8. Assets

| Asset | Path | Notes |
|---|---|---|
| Ennovate Logo | `/public/assets/ennovate-logo.png` | Black logo on transparent background. Rendered in nav with `filter: invert(1)` to appear white. Height: `32px` in nav. |

---

## 9. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 768px` | Full desktop layout as described above |
| `<= 768px` | Nav links hidden — mobile drawer. Hero ghost hidden. Eye repositions inline. Pillars stack vertically (number row goes top, loses right border). Stats — 2x2 grid. Challenge grid — 1 column (featured loses span). Manifesto — 1 column. Padding reduced to `20px`. |
| `<= 480px` | Hero title — `58px`. Buttons smaller (`padding: 11px 18px`, `font-size: 9px`). |

**Cursor:** Disabled entirely on `(hover: none)` devices (touch screens). `body { cursor: auto }`.

---

## 10. Motion Summary

| Element | Trigger | Animation |
|---|---|---|
| Nav eyebrow text | Page load | `fadeUp` (translateY 20px to 0, opacity 0 to 1), `0.3s` delay |
| Hero title lines | Page load | `slideUp` per line (translateY 100% to 0), `0.5s / 0.65s / 0.8s` delays |
| Hero sub + CTAs | Page load | `fadeUp`, `1.1s / 1.3s` delays |
| Scroll indicator | Page load | `fadeUp`, `1.6s` delay |
| All `.reveal` sections | Scroll into view | `fadeUp` (translateY 40px to 0), `threshold: 0.08` |
| Pillar left bar | Hover | `scaleY(0 to 1)`, `transform-origin: top`, `0.4s` |
| Challenge card top bar | Hover | `scaleX(0 to 1)`, `transform-origin: left`, `0.4s` |
| Stats numbers | Scroll into view | Count-up over ~1.2s, `threshold: 0.5` |
| Robot eye pupil | Continuous | 8-position scan loop, `8s ease-in-out infinite` |
| Robot eye scanline | Continuous | `translateY` sweep, `3s linear infinite` |
| Robot eye blink | Continuous | `scaleY` blink, every `7s`, `3s` initial delay |
| Robot eye rings | Continuous | Pulse scale+opacity, `4s`, staggered |
| Background grid | Continuous | `background-position` drift, `80s linear infinite` |

---

## 11. Sections Explicitly Excluded

- **Projects / Work Showcase** — removed. No project documentation available yet. Re-add when project cards have real photos, descriptions, and links. The filter tabs (All / Robotics / Software / Hardware) were part of this section and are also excluded.

---

## 12. What Makes It Unforgettable

1. `"WE BUILD. REAL."` hero — three words, one outlined. Pure aggression.
2. The robot eye — the single most memorable element. Looks back at the visitor.
3. Ghost `03` watermark — quietly signals three years of existence.
4. JetBrains Mono everywhere for metadata — the site reads like a terminal output.
5. The outlined word `build` in the manifesto quote — typographic discipline.
6. Inverted CTA section — maximum contrast flip at the end.
7. Zero color. Discipline is the identity.
