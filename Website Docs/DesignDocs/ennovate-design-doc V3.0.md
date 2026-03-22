# Ennovate Website — Design & Implementation Spec
**Version:** 3.0  
**Last Updated:** March 2026  
**For use with:** Antigravity (AI coding agent, VS Code)  
**Reference implementation:** `ennovate-v2.html` (approved visual prototype)

---

## 0. How to Read This Document

This is the single source of truth for the Ennovate club website. It covers design decisions, component specifications, motion behavior, and mobile rules. When building, follow this doc over any assumptions. Where a section says **"as prototyped"**, defer to `ennovate-v2.html` for exact CSS values.

---

## 1. Project Overview

**Club:** Ennovate — a college innovation and technology club founded in 2022.  
**Tagline:** *"Innovation for Community"* (from logo lockup)  
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
| `--white` | `#F4F4EF` | Primary text; background on inverted sections |
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

### Section 1 — Hero (Cassette-Style Full Header)

**Inspiration:** cassette.com header — oversized logotype bleeding off all edges, metadata strip below, full-width animated element filling the lower half. Ennovate's version replaces the equalizer bars with the hand-drawn eye animation, and adds film grain across the entire header.

---

#### 1a. Layout Structure

```
[ ennovate — logotype bleeding off both sides        ]
[ BENGALURU   EST. 2022   INNOVATION FOR COMMUNITY  ]  metadata strip
[                                                    ]
[         EYE ANIMATION (hand-drawn frames)          ]
[                                                    ]
[ ↓ scroll                          SYS_ONLINE · V3 ]  footer strip
```

Film grain overlay sits above everything as a fixed pseudo-element covering the entire header.

**Total header height:** `100svh`, `min-height: 700px`.

---

#### 1b. Logotype Layer

The word `ennovate` set at a size that bleeds off both left and right edges of the viewport intentionally.

- Font: Bebas Neue
- Text: `ennovate` (lowercase)
- Size: `clamp(120px, 22vw, 280px)` — tune until it bleeds ~40px off each side on 1440px desktop
- `letter-spacing: -4px`
- `color: var(--white)`
- `line-height: 0.85`
- Parent container: `overflow: hidden; text-align: center` — clips the bleed symmetrically
- `padding-top: 80px` — clears the fixed nav height

Below the logotype: the Ennovate logo mark image (not the full wordmark), centered, `height: 28px`, `filter: invert(1)`, `opacity: 0.45`. Acts as the small identity anchor above the metadata strip.

---

#### 1c. Metadata Strip

Full-width strip directly below the logotype. Mirrors the city-names row in the Cassette header.

- Layout: `display: flex; justify-content: space-between; padding: 12px 40px`
- `border-top: 1px solid var(--border)`, `border-bottom: 1px solid var(--border)`
- Font: JetBrains Mono, `10px`, `letter-spacing: 4px`, uppercase, `color: var(--dim)`

Content (four items evenly spaced):
```
BENGALURU          EST. 2022          INNOVATION FOR COMMUNITY          INDIA
```

Mobile (`<= 480px`): show `BENGALURU` and `EST. 2022` only. Hide the other two with `display: none`.

---

#### 1d. Eye Animation Layer

The primary visual element occupying the lower ~55% of the header. Hand-drawn animated eye created in Ibis Paint X, assembled as a CSS sprite sheet animation.

**Asset specification (what to hand to code):**

| Asset | Canvas Size | Format | Frames | Playback |
|---|---|---|---|---|
| Desktop sprite sheet | `2048 x 600px per frame` | Single PNG, all frames stacked vertically, transparent bg | 12–16 | 12fps |
| Mobile sprite sheet | `800 x 800px per frame` | Single PNG, all frames stacked vertically, transparent bg | 12–16 | 12fps |

File paths: `/public/assets/eye/eye-sprite-desktop.png`, `/public/assets/eye/eye-sprite-mobile.png`

**How to assemble the sprite sheet from Ibis Paint X frames:**
Export each frame as a separate PNG from Ibis Paint X. Stack them vertically in any image editor (even MS Paint). The final PNG height = `frame-height x number-of-frames`.

**CSS implementation:**
```css
.eye-animation {
  width: 100%;
  aspect-ratio: 2048 / 600;
  background-image: url('/assets/eye/eye-sprite-desktop.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: 0 0;
  animation: eyePlay 1.33s steps(16, end) infinite;
}

@keyframes eyePlay {
  to { background-position: 0 -1600%; }
}
```

The `steps(16, end)` value should match your frame count exactly.

**Blend mode:** `mix-blend-mode: screen` on the `.eye-animation` element. Draw the eye in Ibis Paint X on a pure black background — the black becomes transparent when `mix-blend-mode: screen` is applied in browser, leaving only the white/grey eye strokes visible floating on the header.

**Mobile swap:** At `<= 768px`, swap to the square sprite sheet and change `aspect-ratio` to `1 / 1` with a `max-height: 50vw` cap.

**Fallback:** If eye assets are not ready at build time, use the CSS robot eye component from Section 7 as a placeholder. Never ship a blank space.

---

#### 1e. Film Grain Overlay

Covers the entire header. Implemented on the `.hero::after` pseudo-element, `z-index: 10`, `pointer-events: none`.

**Procedural grain — generate in JavaScript on mount (no asset needed):**
```javascript
const canvas = document.createElement('canvas');
canvas.width = canvas.height = 200;
const ctx = canvas.getContext('2d');
const img = ctx.createImageData(200, 200);
for (let i = 0; i < img.data.length; i += 4) {
  const v = Math.random() * 255;
  img.data[i] = img.data[i+1] = img.data[i+2] = v;
  img.data[i+3] = 255;
}
ctx.putImageData(img, 0, 0);
document.documentElement.style.setProperty('--grain-url', `url(${canvas.toDataURL()})`);
```

**CSS:**
```css
.hero::after {
  content: '';
  position: absolute; inset: 0;
  background-image: var(--grain-url);
  background-size: 200px 200px;
  background-repeat: repeat;
  opacity: 0.08;
  pointer-events: none;
  z-index: 10;
  animation: grainShift 0.08s steps(1) infinite;
}

@keyframes grainShift {
  0%   { background-position: 0 0; }
  25%  { background-position: -40px -20px; }
  50%  { background-position: 20px -40px; }
  75%  { background-position: -20px 20px; }
}
```

On mobile: reduce `opacity` to `0.06`.

---

#### 1f. Header Footer Strip

Thin strip at the very bottom edge of the header. `border-top: 1px solid var(--border)`.

- Layout: `display: flex; justify-content: space-between; padding: 10px 40px; align-items: center`
- Left: `↓ scroll` — JetBrains Mono, `9px`, `letter-spacing: 3px`, uppercase, `color: var(--dim)`
- Right: `SYS_ONLINE · V3.0` — JetBrains Mono, `9px`, `letter-spacing: 2px`, `color: var(--dim)`

On mobile: hide the right item. Show left only.

---

#### 1g. Entrance Animations

| Element | Delay | Animation |
|---|---|---|
| Logotype `ennovate` | `0.3s` | `slideUp` clip reveal (`translateY 100% to 0`, `overflow: hidden` on parent) |
| Logo mark | `0.6s` | `fadeUp` |
| Metadata strip items | `0.7s` staggered `+0.05s` each | `fadeUp` |
| Eye animation | `1.0s` | `opacity 0 to 1` |
| Header footer strip | `1.2s` | `fadeUp` |
| Film grain | No delay | Always running |

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
| 01 | ROBOTICS | Servo control to full humanoid builds. Design, fabricate, and program. | ROS, Arduino, Inverse Kinematics, OpenCV, 3D Printing |
| 02 | REAL PROBLEMS | Heritage tourism, accessibility, logistics, public infrastructure. | Deployed, Field Tested, Impact Driven, Cross-disciplinary |
| 03 | SIDE PROJECTS | Weekend experiments. Personal obsessions. Weird ideas. All welcome. | AI Agents, Embedded Systems, Web Apps, Hardware Hacks |

---

### Section 3 — Stats Bar

Full-width, 4-column CSS grid. `border-top` and `border-bottom` at `1px solid var(--border)`. Margin `72px 0`.

Each stat cell: `border-right: 1px solid var(--border)`, last has none. `padding: 52px 28px`. `text-align: center`.

| Stat | Label | Animation |
|---|---|---|
| `3+` | Years Active | Count-up from 0 (data-target="3") |
| `40+` | Members | Count-up from 0 (data-target="40") |
| `20+` | Projects Shipped | Count-up from 0 (data-target="20") |
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
| Featured (span 2) | TEKNOFEST 2026 — Humanoid Robot Competition | Active Build (live dot) | Category: Humanoid Robotics, Team: 9 Members |
| Standard | Smart India Hackathon | Upcoming | Format: 36 Hours |
| Standard | Internal Build Sprint | Upcoming | Open to: All Members |
| Standard | Line Follower and Robowar | Scouting | Category: Competitive Robotics |

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
3. "Robotics, software, hardware, AI — we build across all of it. Some projects ship to real users. Some exist purely because we wanted to see if it was possible. Both count."

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

- Left: `"Club Ennovate · Est. 2022 · Innovation for Community"` — JetBrains Mono, `9px`, `rgba(0,0,0,0.35)`.
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

---

## 8. Assets

| Asset | Path | Notes |
|---|---|---|
| Ennovate Logo (full) | `/public/assets/ennovate-logo.png` | Black logo on transparent background. Rendered in nav with `filter: invert(1)`. Height: `32px` in nav. |
| Ennovate Logo (mark only) | `/public/assets/ennovate-mark.png` | The symbol only, no wordmark. Used below the header logotype. `height: 28px`, `filter: invert(1)`, `opacity: 0.45`. |
| Eye Animation — Desktop | `/public/assets/eye/eye-sprite-desktop.png` | Vertical sprite sheet. All 12–16 frames stacked. Each frame: `2048 x 600px`, transparent background, drawn in Ibis Paint X on black. |
| Eye Animation — Mobile | `/public/assets/eye/eye-sprite-mobile.png` | Vertical sprite sheet. Each frame: `800 x 800px`, transparent background, drawn in Ibis Paint X on black. |
| Film Grain | Generated via JS | Procedural 200x200px noise canvas, no file needed. See Section 1e for generation code. |

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
| Header logotype | Page load | `slideUp` clip reveal, `0.3s` delay |
| Header logo mark | Page load | `fadeUp`, `0.6s` delay |
| Metadata strip | Page load | `fadeUp` staggered, `0.7s` base delay |
| Eye animation | Page load | `opacity 0 to 1`, `1.0s` delay, then CSS sprite loop at 12fps |
| Film grain | Continuous | `background-position` random shift, `0.08s steps(1) infinite` |

---

## 11. Sections Explicitly Excluded

- **Projects / Work Showcase** — removed. No project documentation available yet. Re-add when project cards have real photos, descriptions, and links. The filter tabs (All / Robotics / Software / Hardware) were part of this section and are also excluded.

---

## 12. Advanced Features — To Explore & Decide

These are optional enhancements beyond the current spec. None are committed yet. Browse the reference sites listed, pick the ones that feel right for Ennovate, then confirm before Antigravity builds them. Each feature is rated by implementation effort and visual impact.

---

### 12.1 Magnetic Buttons
**What it is:** Buttons that physically attract toward the cursor as it approaches, then snap back when it leaves. Creates a tactile, alive feeling.
**Seen on:** Most high-end agency sites (Locomotive, Active Theory).
**Effort:** Low — ~20 lines of JS using `mousemove` + `transform: translate()`.
**Where to use:** The `[ Join the Club ]` CTA and `[ Submit Application ]` button only. Not every button — overuse kills the effect.

---

### 12.2 Text Scramble / Glitch Reveal
**What it is:** On page load or hover, letters randomise rapidly before settling into the real word. Like decryption happening live.
**Seen on:** Cyberpunk-adjacent sites, tech agency studios, FNATIC, some A24 campaign pages.
**Effort:** Low — a small JS class that cycles through random characters using `setInterval`.
**Where to use:** The metadata strip on load (`BENGALURU`, `EST. 2022` etc.), and optionally the section labels (`// where we compete next`). Not the hero logotype — that uses the clip reveal instead.

---

### 12.3 Smooth Scroll with Inertia (Lenis)
**What it is:** The page scroll has physical momentum — it eases in and out like a camera on a gimbal instead of stopping abruptly. Makes the whole site feel more cinematic without changing anything visible.
**Library:** Lenis (open source, ~3kb gzipped). Integrates with Framer Motion perfectly.
**Effort:** Very low — `npm install @studio-freight/lenis`, wrap the app.
**Recommendation:** Do this. It costs nothing and every high-quality site uses it.

---

### 12.4 Cursor Trail
**What it is:** Small geometric shapes (dots, crosses, or lines) that trail behind the cursor and fade out. Adds physical presence to movement.
**Seen on:** Resn.co.nz, Active Theory projects, Bruno Simon's portfolio.
**Effort:** Medium — canvas or DOM element pool with position interpolation.
**Options:**
- Dot trail: 8–10 small circles that follow with increasing delay
- Cross/plus trail: more technical, fits the Ennovate aesthetic better
- Line trail: a single smooth SVG path that follows the cursor (most cinematic)

---

### 12.5 Horizontal Scroll Section
**What it is:** One section where scrolling down moves content sideways instead — like a film strip or a timeline. Stops and returns to vertical scroll after the section ends.
**Where it would go:** The future Projects section (when you have documentation). Cards slide horizontally instead of stacking in a grid.
**Effort:** Medium — use Locomotive Scroll or a Framer Motion scroll-linked horizontal track.
**Hold until:** Projects section is ready to build.

---

### 12.6 SVG Path Draw on Scroll
**What it is:** An SVG line or shape that draws itself as you scroll past it — like watching a circuit board trace itself.
**Where it would go:** Between the Stats section and the Challenges section as a visual divider. A circuit-board-style connecting line.
**Effort:** Medium — SVG `stroke-dashoffset` animated by scroll position via Framer Motion's `useScroll`.

---

### 12.7 Variable Font Weight on Scroll
**What it is:** A font that gets heavier or lighter as you scroll. The text physically changes weight in real time.
**Requires:** A variable font with a `wght` axis — Barlow supports this.
**Where it would go:** The manifesto section pull quote — gets heavier as you scroll into it.
**Effort:** Low once understood — `font-variation-settings: 'wght' ${value}` interpolated from a Framer Motion scroll value.

---

### 12.8 Noise-Distorted Hover on Images (when projects section returns)
**What it is:** On hover over a project card image, the image distorts slightly — like static on a screen — before settling.
**Implementation:** A small WebGL shader or CSS `filter: url()` SVG turbulence filter. No Three.js needed.
**Effort:** High — skip for now, revisit for v2.

---

## 13. Inspiration & Research Sites

Browse these specifically to find concepts to build on. Each has a different reason to visit:

**For rare interactions and cursor effects:**
- `awwwards.com` — Site of the Day winners. Filter by "Experimental". Highest density of unusual interactions on the web.
- `godly.website` — Curated dark-theme sites. Closest to Ennovate's aesthetic direction.

**For brutalist / editorial typography in motion:**
- `hoverdev.com` — Component library but the animations are reference-quality. Great for understanding how scramble, magnetic, and clip-reveal are built.
- `dark.design` — Dark-themed site gallery. Browse for header treatments and type-in-motion examples.

**For film-quality motion and scroll behavior:**
- `resn.co.nz` — New Zealand studio. The most cinematic web experiences being made. Study how they use cursor trails and scroll-linked animation.
- `active-theory.com` — Studio behind some of the most technically ambitious sites. Look at their case studies.

**For structural layout inspiration:**
- `minimal.gallery` — Minimal but not boring. Good for understanding how negative space can carry a page.
- `lookup.design` — Search by UI element (e.g. "hero", "navigation", "form"). Useful for benchmarking specific sections.

**For motion systems and libraries:**
- `lottiefiles.com` — If you want to add illustration-based animation (not relevant for the eye, but useful for icons or loading states).
- `motion.dev` — Framer Motion documentation. The "examples" section shows what's achievable.

---

## 14. What Makes It Unforgettable

1. `ennovate` bleeding off both edges of the screen — confident enough not to fit.
2. The hand-drawn eye animation — bespoke, impossible to replicate, looks back at you.
3. Film grain on the header — adds a layer of texture that feels analogue in a digital context.
4. JetBrains Mono everywhere for metadata — the site reads like a terminal output.
5. The outlined word `build` in the manifesto quote — typographic discipline.
6. Inverted CTA section — maximum contrast flip at the end.
7. Zero color. Discipline is the identity.
