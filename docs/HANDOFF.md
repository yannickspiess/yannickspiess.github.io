# HANDOFF

_For full context (GZS, coaching, business trajectory) see the Obsidian vault:_  
`01 Workspace/Projects/Transition to Freelance/Working Documents/Website — Agent Handoff.md`
_Vault task note: `01 Workspace/Projects/Transition to Freelance/Tasks/Website-Prototyp V2.md`_

Last updated: 2026-06-09 (V4.1 UX-audit pass)

> **Current state — V4.1.**
> V4 consolidated 11 → 7 content sections (~36% shorter). V4.1 (Session 4) layered a
> UX-audit pass on top: working form validation + graceful failure states (mailto fallback),
> no dead links (WhatsApp/LinkedIn render only when real), OG/meta tags + brand
> `assets/og-image.png` + `favicon.svg`, header CTA → `/kontakt.html`, loop auto-cycle
> removed (hover-driven), hero video pause toggle + reduced-motion, monochrome platform
> glyphs, global focus rings, scroll-margin under the sticky header, production React.
> See WORKLOG Session 4 + DECISIONS "UX audit pass (V4.1)".
> Validate the section merges with Jacob on 2026-06-18.
> Before writing or iterating any copy, read `docs/COPY.md` (voice guide + full copy in render order). All copy is prototype-stage — write best-effort, Yannick iterates. No review gate (see the 2026-06-09 German-copy decision).

---

## V4 Backlog (parked — not yet designed or scheduled)

| # | Item | File(s) | Notes |
|---|---|---|---|
| 8 | Hero mockup video | `Hero.jsx` / `assets/` | Replace `assets/hero-screen.mp4` with real footage (not yet recorded) |
| 9 | Company name → header wordmark | `index.html` (`WORDMARK`) + `Header.jsx` | Parked until name is decided. Currently `Yannick Spiess`. |

**Explicitly skipped (not V3, revisit later):**
- AI/people framing section
- Team placeholder fill (photos, LinkedIn, Tommaso surname) — Yannick fills manually
- Calendly embed on contact page (was stretch goal for Item 5)

---

## Quick Reference

| | |
|---|---|
| Live URL | https://yannickspiess.github.io |
| Repo | https://github.com/yannickspiess/yannickspiess.github.io (branch: `main`) |
| Local repo path | `03 Records/Work/Portfolio/Portfolio Website 2026/yannickspiess.github.io/` (inside the Obsidian vault; it is its own git repo, nested in the vault repo — run git from this folder) |
| Local dev | `python3 -m http.server 8765 --directory "<path-to-repo>"` → http://localhost:8765 |
| Deploy | `git push origin main` — GitHub Pages auto-deploys (~1 min) |
| Last deploy | `c2ec1b8` (2026-06-11) — Datenschutzerklärung + self-hosted fonts/JS (no third-party page-load requests) |

---

## Tech Stack

No build step. React 18 + ReactDOM + Babel Standalone, **self-hosted from `vendor/`** (2026-06-11 — hashes verified against the previous unpkg integrity pins). Fonts **self-hosted from `fonts/`** (variable woff2 + `fonts.css`, imported by `colors_and_type.css`). **Do not reintroduce third-party CDNs (unpkg, fonts.googleapis) — the Datenschutzerklärung states that no page-load requests leave the site, and Google-Fonts-via-CDN is the classic German Abmahnung vector.** Babel transpiles JSX in-browser.

- Edit `.jsx` files directly — no compile, no `npm install`.
- Test: start python server, hard-refresh browser. (Opening `index.html` via `file://` fails — Babel must fetch the `.jsx` files over HTTP.)
- Deploy: commit + push to `main`.
- Do NOT use ES module import/export syntax — Babel Standalone in browser mode does not support it. Each component assigns itself to `window` (e.g. `window.Hero = Hero`) and must be registered with a `<script type="text/babel" src="X.jsx">` tag in `index.html` AND rendered inside `App()`.

---

## Section Inventory

Render order in `App()` inside `index.html` (V4, 2026-06-09):

| Order | File | Section ID | Description |
|---|---|---|---|
| 1 | `Header.jsx` | — | Sticky header: wordmark left, CTA link right. Optional `homeHref`/`ctaHref`/`ctaLabel` props for contact page. |
| 2 | `Hero.jsx` | `#top` | Two-col: iPhone mockup + headline/CTA. Subline = role line. Primary CTA → `/kontakt.html` (single hop). Mobile: stacks. |
| 3 | `Proof.jsx` | `#platforms` | `PlatformStrip` — IG / FB / TikTok / YouTube logos. **V4:** label removed (folded into hero). |
| 4 | `StatCallout.jsx` | — | "Warum Video" eyebrow + pullquote → two research stats (44 % / 612 %, count-up). |
| 5 | `HowItWorks.jsx` | `#how` | **V4:** merged method section (problem → Loop). No eyebrow. Renders `<LoopDiagram />`. |
| 6 | `LoopDiagram.jsx` | — | 5-stage loop (Audit → Strategie → Produktion → Distribution → Messung & Iteration). **V4.1:** accent follows hover/focus (no auto-cycle); click to expand. **V4:** mobile opens detail inline under the tapped tile (`.loop__inline-expand`, ≤760px); desktop uses the bottom `.loop__expand` panel (scrolled into view on open). |
| 7 | `Qualify.jsx` | `#fit` | "Für wen das passt" — 3 fit criteria (✓) + 2 not-fit (–). |
| 8 | `PilotOffer.jsx` | `#pilot` | 4-week sprint entry offer, no fixed price. **V4:** eyebrow removed. Alt background. |
| 9 | `Team.jsx` | `#team` | 3-person team cards. **V4:** eyebrow removed. Initials-avatar placeholders; LinkedIn links hidden until real URLs are filled (V4.1). |
| 10 | `SoftClose.jsx` | `#lets-talk` | Single CTA button → `/kontakt.html`. |
| 11 | `Footer.jsx` | — | Wordmark · Berlin · contact · © 2026 |

**Unregistered in V4 (files left on disk, not rendered):** `VideoIntro.jsx`, `ProblemStatements.jsx`, `WhatThisMeans.jsx`. Their content was merged into the method section (problem framing + Loop stage 01 audit) or dropped (placeholder video). Delete the files or revive by re-adding the `<script>` tag + render call.

> **Copy:** all copy is prototype-stage; before any copy change read `docs/COPY.md` (voice guide + full copy in render order) and edit it in the same pass.

**Second page — `kontakt.html`:**

| Component | Notes |
|---|---|
| `Header.jsx` | `homeHref="/"` `ctaHref="#contact-form"` `ctaLabel="Zum Formular"` |
| `ContactForm.jsx` | Qualifying form, native browser validation (V4.1: no `noValidate`). Submits live to Formspree (`f/xojznyvg`, filled 2026-06-11); error state falls back to a clickable mailto. Direct channels row (Telefon/WhatsApp `tel:` + E-Mail `mailto:`) sits above the form, Schema-M-style (2026-06-11); prep sentence below the channels divider; adspend is a free text input (Meta / Google / TikTok). Takes a `contact` prop (mailto fallback + displayed email). |
| `Footer.jsx` | Same as main page. |

> No `.reveal` classes on `kontakt.html` — there is no `IntersectionObserver` on that page.

**Third page — `impressum.html`** (added 2026-06-11):

| Component | Notes |
|---|---|
| `Header.jsx` | `homeHref="/"` `ctaHref="/kontakt.html"` `ctaLabel="Audit starten"` |
| `Impressum.jsx` | § 5 DDG provider info + § 18 Abs. 2 MStV + Verbraucherstreitbeilegung. `noindex`. Footer links to it from every page. **Add USt-IdNr. once issued.** |

**Fourth page — `datenschutz.html`** (added 2026-06-11):

| Component | Notes |
|---|---|
| `Header.jsx` | `homeHref="/"` `ctaHref="/kontakt.html"` `ctaLabel="Audit starten"` |
| `Datenschutz.jsx` | GDPR privacy policy (Art. 13 DSGVO), Sie-form. Covers GitHub Pages hosting, Formspree form, direct contact channels; states no cookies/tracking and no third-party page-load requests — true only while fonts + JS stay self-hosted. `noindex`. Footer links to it from every page. |

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

The PNG overlays the video so phone chrome stays sharp. `border-radius` clips video corners to fit the screen opening. Video: `loop muted playsInline preload="metadata"`; autoplay only without `prefers-reduced-motion`, and a pause/play toggle (`.hero__video-toggle`, z-index 2) sits inside the bezel (WCAG 2.2.2).

---

## Variables & Placeholders to Confirm

| Location | Variable | Current value | Action needed |
|---|---|---|---|
| `index.html` | `WORDMARK` | `Yannick Spiess` | ✅ confirmed correct |
| `index.html` | `CONTACT` | `yannick.spiess@icloud.com` | Temporary — swap when a custom domain/email lands |
| `Team.jsx` | team photos | Yannick ✅ (`assets/team-yannick.jpg`, 2026-06-11); Tommaso + Britney still initials avatars | Add `photo:` field per member once photos exist |
| `Team.jsx` | LinkedIn URLs | Yannick ✅ (2026-06-11); Tommaso + Britney still `#` (links hidden while `#`) | Replace with real profile URLs |
| `Team.jsx` | Tommaso's surname | `Tommaso Marinaro` | ✅ filled 2026-06-11 |
| `ContactForm.jsx` | `FORMSPREE_ENDPOINT` | `'https://formspree.io/f/xojznyvg'` | ✅ filled 2026-06-11 — form submits live (verified with a test submission, HTTP 200 + success state) |
| `ContactForm.jsx` | `WHATSAPP_NUMBER` | `'491713120124'` | ✅ filled 2026-06-11 — shown in the channels row above the form (`tel:` link; the old WhatsApp button block was removed) |
| `StatCallout.jsx` | Flowkey numbers | not used (external-study stats only) | Optional: if real internal metrics exist, add as a separate truthful claim — do NOT relabel the Nielsen/Confect.io numbers |

---

## Open Next Steps

1. ~~**Formspree + WhatsApp**~~ — ✅ both filled 2026-06-11; the form submits live (endpoint `xojznyvg`). The misconfigured/mailto branch stays in the code as an inert guard.
2. **Team placeholders** — Tommaso + Britney photos and LinkedIn URLs in `Team.jsx` (links hidden until real). (~~Tommaso's surname~~ ✅ Marinaro; ~~Yannick photo + LinkedIn~~ ✅ — both 2026-06-11.)
3. **Niche question for Jacob (Sitzung 3, 2026-06-18)** — sharpen offer to a compound niche vs. start broader? See vault task note.
4. ~~OG meta tags~~ — done in V4.1 (both heads + `assets/og-image.png`; regenerate via `assets/og-image-gen.html` if the headline changes).
5. Mobile visual check — loop collapses to vertical at ≤760px; team grid → 1 col at ≤760px; contact form 2-col → 1 col at ≤600px.
6. `iphone.png` — swap for real mockup if/when available.
7. Deferred: AI-stance section, founder video, campaign examples, use-case landing pages, Calendly embed on contact page.
8. ~~**Datenschutzerklärung**~~ — ✅ added 2026-06-11 (`datenschutz.html`), together with self-hosting fonts (`fonts/`) and JS libs (`vendor/`) so no page-load request leaves the site. Update the policy if any third-party embed (Calendly, analytics, video CDN) is ever added.

---

## Verify Locally

```bash
python3 -m http.server 8765 --directory "/path/to/yannickspiess.github.io"
# open http://localhost:8765 — hard-refresh after edits
```
