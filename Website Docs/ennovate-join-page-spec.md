# Ennovate — Join Page Design & Implementation Spec
**Version:** 1.0
**Last Updated:** March 2026
**For use with:** Antigravity (AI coding agent, VS Code)
**Read alongside:** `ennovate-design-doc.md`, `ennovate-stack-spec.md`
**Route:** `/join`

---

## 0. How to Read This Document

This document covers the design, layout, content, and interaction spec for the Ennovate club membership application page. It is a standalone route (`/join`) that shares the global nav, footer, font stack, CSS variables, and motion system defined in `ennovate-design-doc.md`. Do not redefine global tokens here — import them.

---

## 1. Page Purpose

This page has one job: convert a genuine candidate into a submitted application. It is not a marketing page — that work is done by the homepage. By the time someone lands on `/join` they already want in. The page's job is to make the form feel worth filling out, remove anxiety about what happens after, and reflect the same visual identity as the rest of the site.

**Tone shift from homepage:** The homepage is aggressive and declarative. This page is direct and human. Less shouting, more conversation. The form copy should feel like it was written by a person on the team, not a committee.

---

## 2. Visual Identity — Carried Over

All of the following are inherited directly from `ennovate-design-doc.md`. Do not override:

- Color tokens: `--black`, `--white`, `--mid`, `--dim`, `--border`
- Font stack: Bebas Neue (display), Barlow (body), JetBrains Mono (labels/meta)
- Background grid texture (`body::before`)
- Custom cursor behavior
- Nav component (fixed, identical to homepage)
- Footer component (identical to homepage)
- Scroll reveal system (`.reveal` class + IntersectionObserver)

**One addition specific to this page:**
A secondary surface color for the form container: `#0E0E0E` — one step lighter than `--black`. This creates separation between the page background and the form area without introducing any color.

---

## 3. Page Layout — Desktop

The page is a single scrollable column. No full-viewport sections. Scrolls naturally from top to bottom like a document. Max content width: `1100px`, centered.

**Vertical order:**

```
[ Nav — fixed, inherited ]
[ Page Header ]
[ Split Layout: Form (left 55%) + Sidebar (right 40%) ]
[ Footer — inherited ]
```

The split layout holds together from hero to footer. On mobile it stacks — form first, sidebar second.

---

## 4. Page Header

**Height:** Auto — not full-viewport. Roughly `260px` tall.
**Background:** `--black` with grid texture continuing from homepage.
**Layout:** Left-aligned, `padding: 80px 60px 48px`.

**Content (top to bottom):**

Breadcrumb line — JetBrains Mono, `9px`, `letter-spacing: 3px`, uppercase, `color: var(--dim)`:
```
ennovate / join
```

Page title — Bebas Neue, `clamp(64px, 10vw, 120px)`, `line-height: 0.88`, `letter-spacing: -2px`, `color: var(--white)`. Two stacked lines:
```
JOIN THE
CLUB.
```

Sub-copy — Barlow, `15px`, `color: var(--dim)`, `max-width: 520px`, `line-height: 1.8`. Appears below the title with a `margin-top: 20px`:
```
We review applications on a rolling basis. If you're selected you'll hear back within a week. No CV. No portfolio. Just tell us what you build.
```

Bottom edge — `border-bottom: 1px solid var(--border)` separates the header from the form section.

**Entrance animation:**
- Breadcrumb: `fadeUp`, `0.3s` delay
- Title line 1: `slideUp` clip reveal, `0.5s` delay
- Title line 2: `slideUp` clip reveal, `0.65s` delay
- Sub-copy: `fadeUp`, `0.9s` delay

---

## 5. Form Section — Left Column (55%)

**Container:**
- `background: #0E0E0E`
- `border: 1px solid var(--border)`
- `padding: 48px`
- No border-radius — consistent with the rest of the site's hard-edge aesthetic

**Form fields — in order:**

### 5.1 Personal Details Row
Two fields side by side (`display: grid; grid-template-columns: 1fr 1fr; gap: 20px`).

| Field | Label | Placeholder | Type | Required |
|---|---|---|---|---|
| Full Name | `FULL NAME` | `Your name` | text | Yes |
| Email | `EMAIL` | `you@college.edu` | email | Yes |

### 5.2 Academic Details Row
Two fields side by side.

| Field | Label | Placeholder / Options | Type | Required |
|---|---|---|---|---|
| Department | `DEPARTMENT` | `CSE / ECE / Mech / Civil / Other` | select | Yes |
| Year of Study | `YEAR` | `1st / 2nd / 3rd / 4th` | select | Yes |

### 5.3 Interest Tags
**Label:** `WHAT DO YOU WANT TO WORK ON` — JetBrains Mono, `8px`, uppercase, `letter-spacing: 2px`, `color: var(--dim)`. Subtext to the right: `// pick all that apply` in same font, dimmer.

**Tags** (pill-style toggle buttons, multi-select):
```
Robotics · Embedded Systems · AI / ML · Web & Apps · Hardware · Fabrication · Design
```

**Tag styling:**
- Default: `border: 1px solid var(--border)`, `color: var(--dim)`, `background: transparent`, `padding: 7px 14px`, JetBrains Mono `9px`, `letter-spacing: 1.5px`, uppercase
- Selected: `border-color: var(--white)`, `color: var(--white)`, `background: rgba(255,255,255,0.05)`
- Transition: `all 0.15s ease` on click
- No border-radius — hard edges consistent with site

At least one tag must be selected for form submission. Show inline error if none selected: `// select at least one area` in JetBrains Mono, `9px`, `color: var(--dim)`.

### 5.4 Divider
`border-top: 1px solid var(--border)`, `margin: 28px 0`

### 5.5 Build History Textarea
**Label:** `SOMETHING YOU'VE BUILT`
**Sub-label (right):** `// optional`
**Placeholder:** `A project, a script, a circuit — anything. Even if it didn't work.`
**Height:** `100px`
**Character limit:** 400 — show live counter: `JetBrains Mono, 9px, color: var(--dim)` in bottom-right of field. Turns `color: var(--white)` when under 50 chars remaining.

### 5.6 Motivation Textarea
**Label:** `WHY ENNOVATE`
**Sub-label (right):** `// 2–3 sentences`
**Placeholder:** `What do you want to build here that you can't build alone?`
**Height:** `120px`
**Character limit:** 600. Same counter behavior as above.
**Required:** Yes. Minimum 40 characters before submit is allowed.

### 5.7 Input Field Styling (all fields)

```css
height: 44px;                              /* text inputs */
border: 1px solid var(--border);
background: rgba(255,255,255,0.02);
padding: 0 14px;
font-family: 'Barlow', sans-serif;
font-size: 14px;
color: var(--white);
outline: none;
transition: border-color 0.2s;

/* Focus state */
border-color: rgba(255,255,255,0.4);

/* Error state */
border-color: rgba(255,255,255,0.6);       /* white, not red — stays monochrome */
```

Labels above each field: JetBrains Mono, `8px`, `letter-spacing: 2px`, uppercase, `color: var(--dim)`, `margin-bottom: 7px`.

No border-radius on any input. Hard edges.

Textarea resize: `resize: vertical` only. Min-height respected.

### 5.8 Submit Button

Full width of the form container. Height: `52px`.

**Default state:**
- `background: var(--white)`, `color: var(--black)`
- Text: `[ Submit Application ]` — JetBrains Mono, `11px`, `letter-spacing: 3px`, uppercase
- Transition: `background 0.2s`

**Hover state:**
- `background: rgba(244, 244, 239, 0.88)`

**Loading state (after click, before response):**
- Replace text with animated ellipsis: `processing...` in same font
- Disable button: `pointer-events: none`, `opacity: 0.7`

**Disabled state (form incomplete):**
- `background: rgba(255,255,255,0.08)`, `color: rgba(255,255,255,0.25)`
- `cursor: not-allowed`
- Do not show as disabled until the user has attempted submission once — don't punish before they've tried

### 5.9 Form Footer Note

Below the submit button, `margin-top: 16px`:

```
// no CV needed  ·  no experience required  ·  rolling review  ·  response within 7 days
```

JetBrains Mono, `9px`, `color: var(--dim)`, `letter-spacing: 1px`.

---

## 6. Sidebar — Right Column (40%)

**Styling:**
- `padding: 48px 40px`
- `border-left: 1px solid var(--border)`
- Sticky on desktop: `position: sticky; top: 80px` (clears the fixed nav)

### 6.1 "What Happens After" Block

**Heading:** `// what happens after` — JetBrains Mono, `9px`, `letter-spacing: 3px`, uppercase, `color: var(--dim)`, `margin-bottom: 20px`.

Four numbered steps. Each step:
- Left: step number in JetBrains Mono, `9px`, `color: var(--dim)` — `01`, `02`, `03`, `04`
- Right: step content — Barlow, `14px`, `color: rgba(255,255,255,0.45)`, `line-height: 1.75`
- Step title in `color: rgba(255,255,255,0.75)`, `font-weight: 500`
- Separated by `border-bottom: 1px solid var(--border)` (last one has no border)

**Step content:**

| # | Title | Body |
|---|---|---|
| 01 | We read every application. | Not a filter algorithm. Actual people from the core team review what you write. |
| 02 | You hear back within a week. | A welcome email with onboarding details, or honest feedback if the timing isn't right. |
| 03 | First session is a build sprint. | No slides, no orientation. You show up and start working on something real. |
| 04 | You pick your track. | Robotics, software, hardware, or cross-disciplinary. Tracks are flexible. |

### 6.2 Divider
`border-top: 1px solid var(--border)`, `margin: 32px 0`

### 6.3 "What We Look For" Block

**Heading:** `// what we look for` — same style as above.

Body copy — Barlow, `14px`, `color: var(--dim)`, `line-height: 1.85`:
```
Not grades. Not a portfolio. We want people who get uncomfortable when they're not building something. If you've ever stayed up past 2am because a project wasn't working — you're exactly the right kind of person.
```

### 6.4 Stats Micro-Block

Three small stats in a row, separated by `border-right: 1px solid var(--border)`:

| Number | Label |
|---|---|
| `7` | Days to hear back |
| `3` | Years running |
| `40+` | Active members |

Number: Bebas Neue, `36px`, `color: var(--white)`
Label: JetBrains Mono, `8px`, uppercase, `letter-spacing: 2px`, `color: var(--dim)`

---

## 7. Success State

When the form submits successfully, the entire form container (`#0E0E0E` panel) is replaced in-place with the success state. No page navigation. No reload. The sidebar remains unchanged.

**Success panel layout:**
- Same dimensions and border as the form container
- Centered vertically and horizontally with flexbox
- `min-height: 480px`

**Content:**

A thin animated ring (pure CSS):
- `width: 56px; height: 56px; border-radius: 50%`
- `border: 1px solid rgba(255,255,255,0.2)`
- After 0.4s: a checkmark draws in using `stroke-dashoffset` animation on an SVG path
- Do not use emoji checkmarks

Below the ring:

Headline — Bebas Neue, `52px`, `color: var(--white)`:
```
You're in.
```

Sub-text — JetBrains Mono, `11px`, `letter-spacing: 2px`, `color: var(--dim)`, `line-height: 2`:
```
We'll be in touch at your email.
Keep building.
```

Back link — `margin-top: 32px`:
```
← Back to ennovate
```
JetBrains Mono, `9px`, `letter-spacing: 2px`, `color: var(--dim)`, hover: `color: var(--white)`. Links to `/`.

**Transition:** The form panel fades out (`opacity 0.3s`), then the success state fades in (`opacity 0.3s`). Do not use a hard swap.

---

## 8. Error Handling

**Field-level errors:** Appear below the relevant field after a failed submission attempt. JetBrains Mono, `9px`, `color: var(--dim)` (not red — monochrome system). Prefix with `//`:
```
// this field is required
// please enter a valid email
// minimum 40 characters
// select at least one area
```

**Network error (form submission fails):** Replace submit button area with:
```
// something went wrong. try again or email us at hello@ennovate.club
```
Same mono style. Button reactivates for retry.

**No toast notifications.** Errors appear inline, not as floating popups — consistent with the site's static, non-flashy identity.

---

## 9. Mobile Behavior (`≤ 768px`)

- `padding` on all containers reduces to `20px`
- Split layout collapses: form stacks on top, sidebar stacks below
- Sidebar loses `sticky` positioning — scrolls normally
- Field row grids (`1fr 1fr`) collapse to `1fr` (single column)
- Interest tags wrap naturally — no change needed
- Page header title reduces: `clamp(52px, 14vw, 80px)`
- Submit button remains full-width
- Sidebar stats micro-block: wraps to a single column with borders between items

---

## 10. Backend — Form Submission

**Recommended:** Vercel Serverless Function at `/app/api/join/route.js`.

On submit, POST the form data as JSON to `/api/join`. The function:
1. Validates required fields server-side (never trust client validation alone)
2. Sends a notification email to the club's email address via **Resend** (free tier: 3,000 emails/month)
3. Sends a confirmation email to the applicant
4. Returns `{ success: true }` or `{ error: "message" }`

**Do not use:** Google Forms embed. It breaks the visual system and cannot be styled to match the site. A Vercel function is ~25 lines and keeps the experience fully on-brand.

**Resend setup:** `npm install resend`. API key in `.env.local` as `RESEND_API_KEY`. Never commit the key.

**Confirmation email copy (sent to applicant):**

Subject: `You applied to Ennovate`

Body (plain text or minimal HTML):
```
Hi [Name],

We got your application. Someone from the core team will read it and get back to you within a week.

In the meantime — keep building.

// Club Ennovate
```

---

## 11. Motion Summary

| Element | Trigger | Animation |
|---|---|---|
| Breadcrumb | Page load | `fadeUp`, `0.3s` delay |
| Title line 1 | Page load | `slideUp` clip, `0.5s` delay |
| Title line 2 | Page load | `slideUp` clip, `0.65s` delay |
| Sub-copy | Page load | `fadeUp`, `0.9s` delay |
| Form container | Scroll into view | `reveal` fadeUp, `threshold: 0.08` |
| Sidebar | Scroll into view | `reveal` fadeUp, `threshold: 0.08`, `0.15s` delay |
| Interest tags | Click | `border-color` + `background` transition, `0.15s` |
| Char counters | Typing | Live update, no animation |
| Submit button disabled→active | Form valid | `background` transition, `0.2s` |
| Form→success swap | Submit | `opacity` fade out `0.3s`, fade in `0.3s` |
| Success checkmark | After fade in | SVG `stroke-dashoffset` draw, `0.6s`, `0.4s` delay |

---

## 12. Content — Final Copy

All copy is final. Do not use placeholder text in production.

**Page title:** `JOIN THE CLUB.`
**Sub-copy:** `We review applications on a rolling basis. If you're selected you'll hear back within a week. No CV. No portfolio. Just tell us what you build.`
**Build textarea placeholder:** `A project, a script, a circuit — anything. Even if it didn't work.`
**Motivation placeholder:** `What do you want to build here that you can't build alone?`
**Footer note:** `// no CV needed · no experience required · rolling review · response within 7 days`
**What we look for:** `Not grades. Not a portfolio. We want people who get uncomfortable when they're not building something. If you've ever stayed up past 2am because a project wasn't working — you're exactly the right kind of person.`
**Success headline:** `You're in.`
**Success sub:** `We'll be in touch at your email. Keep building.`

---

## 13. File Location in Project Structure

```
app/
└── join/
    ├── page.jsx              ← Join page (this spec)
    └── JoinPage.module.css   ← Page-specific styles

components/
└── JoinForm/
    ├── JoinForm.jsx          ← Form component with all fields + submission logic
    └── JoinForm.module.css

app/
└── api/
    └── join/
        └── route.js          ← Serverless function: validate + send emails via Resend
```
