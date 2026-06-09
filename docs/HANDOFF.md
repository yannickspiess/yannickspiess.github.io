# HANDOFF

_For full context (GZS, coaching, business trajectory) see the Obsidian vault:_  
`01 Workspace/Projects/Transition to Freelance/Working Documents/Website — Agent Handoff.md`
_Vault task note: `01 Workspace/Projects/Transition to Freelance/Tasks/Website-Prototyp V2.md`_

Last updated: 2026-06-08 (V2 landing-page iteration shipped, commit `77d192f`)

> **Current state — V2 is live.** The page is now a full agency landing page (was a leaner v0.1).
> Copy reflects Jacob Thomsen's coaching feedback (Sitzung 2, 2026-06-03) plus competitor research.
> Remaining work is mostly **placeholders** (team photos + LinkedIn URLs, Tommaso's surname) and the
> niche-sharpening question for Sitzung 3 (2026-06-18). The honesty calls made during V2 — why the
> stats are NOT attributed to Flowkey, why there is no testimonials section — are recorded in
> `docs/DECISIONS.md`. Read that before changing the stats block or adding social proof.

---

## Quick Reference

| | |
|---|---|
| Live URL | https://yannickspiess.github.io |
| Repo | https://github.com/yannickspiess/yannickspiess.github.io (branch: `main`) |
| Local repo path | `03 Records/Work/Portfolio/Portfolio Website 2026/yannickspiess.github.io/` (inside the Obsidian vault; it is its own git repo, nested in the vault repo — run git from this folder) |
| Local dev | `python3 -m http.server 8765 --directory "<path-to-repo>"` → http://localhost:8765 |
| Deploy | `git push origin main` — GitHub Pages auto-deploys (~1 min) |
| Last deploy | `77d192f` (2026-06-08) — V2 iteration |

---

## Tech Stack

No build step. React 18 + ReactDOM via unpkg CDN. Babel Standalone transpiles JSX in-browser.

- Edit `.jsx` files directly — no compile, no `npm install`.
- Test: start python server, hard-refresh browser. (Opening `index.html` via `file://` fails — Babel must fetch the `.jsx` files over HTTP.)
- Deploy: commit + push to `main`.
- Do NOT use ES module import/export syntax — Babel Standalone in browser mode does not support it. Each component assigns itself to `window` (e.g. `window.Hero = Hero`) and must be registered with a `<script type="text/babel" src="X.jsx">` tag in `index.html` AND rendered inside `App()`.

---

## Section Inventory

Render order in `App()` inside `index.html` (V2, 2026-06-08):

| Order | File | Section ID | Description |
|---|---|---|---|
| 1 | `Header.jsx` | — | Sticky header: wordmark left, CTA link right. Hairline appears on scroll. |
| 2 | `Hero.jsx` | `#top` | Two-col: iPhone mockup + headline/CTA. Mobile: stacks (text first). |
| 3 | `Proof.jsx` | `#platforms` | `PlatformStrip` — Instagram / Facebook / TikTok / YouTube logos. |
| 4 | `StatCallout.jsx` | — | **V2:** "Warum Video" — narrative intro → two research stats (44 % / 612 %, count-up) → credibility line ("über 10 Millionen Euro Ad Spend"). No longer isolated badges. |
| 5 | `ProblemStatements.jsx` | `#problems` | Accordion: 3 problems + solutions. Alt background. |
| 6 | `HowItWorks.jsx` | `#how` | Section shell + heading; renders `<LoopDiagram />`. |
| 7 | `LoopDiagram.jsx` | — | **V2: 5-stage loop** (Audit → Strategie → Produktion → Distribution → Messung & Iteration). Auto-cycles at 1.4 s; click to expand detail; loop-back feeds the Audit. |
| 8 | `WhatThisMeans.jsx` | `#what` | Audit-stack: 3 animated SVG icons + **30-min** audit areas (was 60). Alt background. |
| 9 | `Qualify.jsx` | `#fit` | **V2 (new):** "Für wen das passt" — 3 fit criteria (✓) + 2 not-fit (–). Reuses `.getlist`. |
| 10 | `PilotOffer.jsx` | `#pilot` | **V2 (new):** 4-week sprint entry offer, no fixed price. Alt background. |
| 11 | `Team.jsx` | `#team` | **V2 (new):** 3-person team cards (Yannick / Tommaso / Britney Tan). Initials-avatar + `#` LinkedIn placeholders. |
| 12 | `SoftClose.jsx` | `#lets-talk` | Email input + CTA. Submit opens `mailto:` pre-filled. "30-minütiger Audit". |
| 13 | `Footer.jsx` | — | Wordmark · Berlin · contact · © 2026 |

> Note: `Header.jsx`, `Hero.jsx`, `Proof.jsx`, `ProblemStatements.jsx` are unchanged from v0.1. Any
> hero right-edge clipping at mid widths is pre-existing v0.1 behavior, not introduced by V2.

---

## CSS Architecture

| File | Role |
|---|---|
| `colors_and_type.css` | Design tokens — colors, type scale, spacing, motion. Source of truth. |
| `kit.css` | All layout, component, and animation styles. Reads `--var` names from root. V2 additions live in a clearly-marked block at the end (`V2 ADDITIONS (2026-06-08)`). |

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

**Accent text pattern:** `<span className="hero__hl">` renders text in `--accent`. Used in hero, stats, audit intro, and the V2 credibility line.

**Alt section background:** `className="alt"` on `<section>` → `background: var(--paper-2)`. Active on `#problems`, `#what`, and `#pilot` (alternates rhythm: paper → alt → paper across the new sections).

**Scroll-reveal:** `className="reveal"` on any element. `App()` in `index.html` runs an `IntersectionObserver` that adds `.in` on viewport entry. Honors `prefers-reduced-motion`. (When screenshotting the full page in a headless browser, force `.in` on all `.reveal` elements first — off-screen ones stay at `opacity:0` until scrolled into view.)

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

## Variables & Placeholders to Confirm

| Location | Variable | Current value | Action needed |
|---|---|---|---|
| `index.html` | `WORDMARK` | `Yannick Spiess` | ✅ confirmed correct |
| `index.html` | `CONTACT` | `yannick.spiess@icloud.com` | Temporary — swap when a custom domain/email lands |
| `Team.jsx` | team photos | initials-avatar placeholders (`.team__photo`) | Replace with real photos |
| `Team.jsx` | LinkedIn URLs | `#` placeholders | Replace with real profile URLs |
| `Team.jsx` | Tommaso's surname | first name only | Add surname |
| `StatCallout.jsx` | Flowkey numbers | not used (external-study stats only) | Optional: if real Flowkey internal metrics exist, add as a separate, truthful claim — do NOT relabel the Nielsen/Confect.io numbers as Flowkey's |

---

## Open Next Steps

1. **Yannick review of V2** — fill the placeholders above (team photos, LinkedIn, surname).
2. **Niche question for Jacob (Sitzung 3, 2026-06-18)** — sharpen the offer to a compound niche (e.g. "Performance Creative Testing for Subscription Apps") vs. start broader? See vault task note.
3. OG meta tags — add `og:title`, `og:description`, `og:image` to `<head>` (still open from v0.1).
4. Mobile visual check — loop collapses to vertical at ≤760px; team grid → 1 column at ≤760px.
5. `iphone.png` — swap for real mockup if/when available.
6. Deferred (not V2, by decision): AI-stance section, founder video, campaign examples, use-case landing pages.

---

## Verify Locally

```bash
python3 -m http.server 8765 --directory "/path/to/yannickspiess.github.io"
# open http://localhost:8765 — hard-refresh after edits
```
