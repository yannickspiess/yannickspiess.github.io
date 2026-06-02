# HANDOFF

_For full context (GZS, coaching, business trajectory) see the Obsidian vault:_  
`01 Workspace/Projects/Transition to Freelance/Working Documents/Website — Agent Handoff.md`

Last updated: 2026-06-02

---

## Quick Reference

| | |
|---|---|
| Live URL | https://yannickspiess.github.io |
| Repo | https://github.com/yannickspiess/yannickspiess.github.io (branch: `main`) |
| Local dev | `python3 -m http.server 8765 --directory "<path-to-repo>"` → http://localhost:8765 |
| Deploy | `git push origin main` — GitHub Pages auto-deploys |

---

## Tech Stack

No build step. React 18 + ReactDOM via unpkg CDN. Babel Standalone transpiles JSX in-browser.

- Edit `.jsx` files directly — no compile, no `npm install`.
- Test: start python server, hard-refresh browser.
- Deploy: commit + push to `main`.
- Do NOT use ES module import/export syntax — Babel Standalone in browser mode does not support it. Each component assigns itself to `window` (e.g. `window.Hero = Hero`).

---

## Section Inventory

Render order in `App()` inside `index.html`:

| Order | File | Section ID | Description |
|---|---|---|---|
| 1 | `Header.jsx` | — | Sticky header: wordmark left, CTA link right. Hairline appears on scroll. |
| 2 | `Hero.jsx` | `#top` | Two-col: iPhone mockup + headline/CTA. Mobile: stacks (text first). |
| 3 | `Proof.jsx` | `#platforms` | `PlatformStrip` — Instagram / Facebook / TikTok / YouTube logos. |
| 4 | `StatCallout.jsx` | — | Two stats: 44 % / 612 %. Count-up animation on scroll-in. |
| 5 | `ProblemStatements.jsx` | `#problems` | Accordion: 3 problems + solutions. Alt background. |
| 6 | `HowItWorks.jsx` | `#how` | Section shell + heading for the loop diagram. |
| 7 | `LoopDiagram.jsx` | — | 4-stage loop (Strategie → Produktion → Distribution → Messung). Auto-cycles at 1.4 s; click to expand detail. |
| 8 | `WhatThisMeans.jsx` | `#what` | Audit-stack: 3 animated SVG icons + 60-min audit areas. Alt background. |
| 9 | `SoftClose.jsx` | `#lets-talk` | Email input + CTA. Submit opens `mailto:` pre-filled. |
| 10 | `Footer.jsx` | — | Wordmark · Berlin · contact · © 2026 |

---

## CSS Architecture

| File | Role |
|---|---|
| `colors_and_type.css` | Design tokens — colors, type scale, spacing, motion. Source of truth. |
| `kit.css` | All layout, component, and animation styles. Reads `--var` names from root. |

### Key tokens

| Token | Value | Usage |
|---|---|---|
| `--accent` | `#E1492A` | Vermilion — CTA fill, stat numbers, accent text |
| `--accent-ink` | `#B83A1F` | Darker vermilion — links, hover |
| `--paper` | `#FAF6EF` | Page background |
| `--paper-2` | `#F2ECE1` | Alt section background |
| `--ink` | `#1A1613` | Primary text |
| `--ink-soft` | `#6B635A` | Secondary text |
| `--hair` | `#E2D9C9` | Borders, dividers |
| `--font-display` | Bricolage Grotesque | Headings |
| `--font-body` | Hanken Grotesk | Body, UI |
| `--font-mono` | Geist Mono | Stage numbers, eyebrows |

**Accent text pattern:** `<span className="hero__hl">` renders text in `--accent`. Used in hero, stats, audit intro.

**Alt section background:** `className="alt"` on `<section>` → `background: var(--paper-2)`. Active on `#problems` and `#what`.

**Scroll-reveal:** `className="reveal"` on any element. `App()` in `index.html` runs an `IntersectionObserver` that adds `.in` on viewport entry. Honors `prefers-reduced-motion`.

---

## iPhone Mockup + Hero Video Composite

`iphone.png` — transparent-screen PNG. `assets/hero-screen.mp4` (3.6 MB, 9:16 screen-recording) is positioned absolutely behind it.

```css
.hero__phone-screen { position: relative; display: inline-block; line-height: 0; }
.hero__iphone       { height: clamp(360px, 58vh, 620px); position: relative; z-index: 1; }
.hero__screen-video {
  position: absolute;
  top: 2%; left: 4.85%; width: 90.3%; height: 96%;
  object-fit: cover;
  border-radius: 15% / 5.5%;
  z-index: 0;
}
```

The PNG overlays the video so phone chrome stays sharp. `border-radius` clips video corners to fit the screen opening. Video: `autoPlay loop muted playsInline`.

---

## Variables to Confirm

| Location | Variable | Current value | Action needed |
|---|---|---|---|
| `index.html` | `CONTACT` | `hello@yannickspiess.com` | Replace with real email |
| `index.html` | `WORDMARK` | `Yannick Spiess` | Confirm correct |

---

## PROVISIONAL Copy

Hero headline, problem statements, and soft-close copy are pending review after the 2026-06-03 Jacob coaching session. No literal `[PROVISIONAL]` markers in code — these sections are the semantic placeholders.

---

## Open Next Steps

1. Copy iteration — share live URL with Jacob at 2026-06-03 session; revise based on feedback.
2. Real contact email — replace `CONTACT` value in `index.html`.
3. OG meta tags — add `og:title`, `og:description`, `og:image` to `<head>`.
4. Mobile visual check — loop section collapses to vertical stack at ≤760px.
5. `iphone.png` — swap for real mockup if/when available.

---

## Verify Locally

```bash
python3 -m http.server 8765 --directory "/path/to/yannickspiess.github.io"
# open http://localhost:8765
```
