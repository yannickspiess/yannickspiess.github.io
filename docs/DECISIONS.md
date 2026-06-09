# DECISIONS

Architectural, product, and implementation decisions with rationale.

---

## 2026-06-09 — UX audit pass: conversion plumbing + craft fixes (V4.1)

**Decision:** After a structured UX audit (NN/g-heuristic review + interactive testing), ship one pass of usability/trust fixes:

1. **Loop auto-cycle removed.** The 1.4s timer repainted the active tile faster than a card could be read and made hover/expanded states illegible. The accent now follows hover/focus (stage 01 anchors at rest); tiles get a hover background + link-styled, smaller "Mehr →" so the whole tile reads as clickable. Desktop detail panel scrolls into view (`block:'nearest'`) so opening a middle tile doesn't drop the text off-screen; `aria-controls` added.
2. **Contact form validates.** `noValidate` removed — native browser validation (localized) now enforces `required`/`type=email`. Required set reduced: Telefon and Rolle are optional and labeled "(optional)". The misconfigured gate checks only the Formspree TODO (a TODO WhatsApp number no longer blocks submissions); error/misconfigured states show a clickable `mailto:` fallback.
3. **No dead links.** WhatsApp block and team LinkedIn links render only when a real URL/number exists — a styled `#` link is worse than no link for a credibility-checking referral.
4. **Chat unfurl is the first impression.** Meta description + OG/Twitter tags on both pages, plus a brand 1200×630 `assets/og-image.png` (generator kept at `assets/og-image-gen.html`) and `favicon.svg` (loop-ring mark). The audience receives this link in WhatsApp/Slack — previously it unfurled as a bare URL.
5. **Header CTA = same label, same destination.** "Audit starten" in the header now goes to `/kontakt.html` like hero and soft close (was `#lets-talk` — identical labels did different things).
6. **Hero video: WCAG 2.2.2.** Autoplay only when `prefers-reduced-motion` allows; quiet pause/play toggle inside the phone bezel.
7. **Platform strip monochrome.** Colored raster PNGs replaced with ink-soft `currentColor` SVG glyphs — the CSS was already written for this; the saturated logos were the only off-system element and out-shouted the vermilion accent.
8. **Accent stays scarce.** Removed the `hero__hl` highlight on "Video" inside the two stat descriptions (numerals + vermilion % carry the emphasis).
9. **A11y/platform hygiene.** Global `:focus-visible` ring (CTAs/links/inputs had none), `scroll-margin-top` under the sticky header, deep-link `/#how` re-scroll after React mounts (target doesn't exist at native scroll time), stat source lines 12→13px (AA contrast edge), mobile hero mockup capped (width-only — a max-height would misalign the %-positioned screen video), production React UMD builds (still CDN, no build step).

**Rationale:** The audit's core finding: the editorial system is doing its job, but the conversion path (chat unfurl → CTA → form) had a failure at every step for the exact target user. Fixes prioritize plumbing over aesthetics; no documented design decision (section count, eyebrows, no-build, voice) was overridden.

---

## 2026-06-09 — V4: consolidate 11 → 7 sections (de-stuff)

**Decision:** Merge `ProblemStatements` + `HowItWorks` + `WhatThisMeans` into one method section (Loop as centerpiece; audit detail carried by Loop stage 01); remove the `VideoIntro` placeholder section; fold the platform strip into the hero (no label); drop eyebrows everywhere except `StatCallout` and `Qualify`; reduce motion systems from 5 to 2. Page height dropped ~36%.

**Rationale:** Owner felt the site was "stuffy / TMI." The page (11 sections / 8.5 screens) had drifted from its own north star — a clarity machine for a warm referral giving 30–60s, "one message per screen." The eight-in-a-row mono-eyebrow rhythm read like a pitch deck; three sections re-explained the method; a placeholder video sat in a trust slot. The merges touch sections originally added on Jacob's advice → flagged to validate with Jacob on 2026-06-18. Owner explicitly chose the aggressive consolidation over tightening in place.

---

## 2026-06-09 — Mobile: loop detail opens inline under the tapped tile

**Decision:** On ≤760px, `LoopDiagram` renders each expanded stage's detail inline inside that stage (`.loop__inline-expand`), and the single bottom `.loop__expand` panel is hidden. Desktop is unchanged (single-row loop + bottom panel).

**Rationale:** On mobile the loop stacks vertically, but the detail rendered in one panel below all five stages — so tapping "01 Audit" flipped the chevron while the actual text appeared off-screen far below, making the interaction unintelligible. Inline-under-tile keeps tap and result together. Kept the desktop bottom-panel because inline expansion would break the horizontal single-row layout.

## 2026-06-09 — German copy: prototype-stage, write best-effort, iterate holistically (supersedes the advisor-gate rule)

**Decision:** All site copy is prototype-stage — nothing is "signed off" or reviewed. Write the best version you can; Yannick iterates and corrects where he sees fit. There is **no** advisor/native-review gate. Before writing or iterating ANY copy, read `docs/COPY.md` (voice guide + full copy in render order) so changes are made with the whole narrative arc in view, not line-by-line in isolation. Keep `docs/COPY.md` and the `.jsx` files in sync in the same pass.

**Rationale:** Yannick: the earlier review-gate rule was "too tight." The real reviewer is Yannick (native speaker); his iteration loop replaces the gate. The risk the old rule guarded against (bad literal translation) is better handled by writing copy with the full page in view than by blocking on review. Earlier rule (call advisor, no direct translation, native review required) is overridden.

---

## 2026-06-09 — Remove "10 Millionen Euro" credibility line from StatCallout

**Decision:** Delete the credibility line `"Und es ist mein Handwerk: Creatives, die ich produziert habe, haben über 10 Millionen Euro an Ad Spend bewegt."` from `StatCallout.jsx`.

**Rationale:** Overrides the 2026-06-08 decision that kept this line. Two reasons: (1) the site must not use "ich"-form language — it is a company site, not a personal portfolio; (2) Yannick said in the design review "I wouldn't put that 10 million number anywhere." The stats block should end after the two research numbers.

---

## 2026-06-09 — Strip all "ich"-form language site-wide

**Decision:** Remove any first-person singular ("ich", "mein", "mir", etc.) from all visible copy. The site speaks as a company, not as an individual.

**Rationale:** Stated explicitly in the voice design review. Any copy referencing "I" is a holdover from an earlier personal-portfolio framing. The company voice should be "we" or impersonal where possible.

---

## 2026-06-09 — "Warum Video" body copy: editorial callout style, not body text

**Decision:** The narrative paragraph in `StatCallout` ("Video schlägt Bild-Anzeigen besonders dort…") should be replaced with a short punchy tagline, styled as a magazine editorial callout — larger text, not bold header, not plain body. Think pull-quote or magazine cover callout. Research numbers follow.

**Rationale:** Current body text is too long and reads like an explanation. The section's job is to create impact, not to argue. The user's reference: "like in magazine covers — a callout text, highlighted, called out."

---

## 2026-06-09 — New section: podcast/interview video placeholder after StatCallout

**Decision:** Add a new section between `StatCallout` and `ProblemStatements`. It contains a landscape YouTube embed as a placeholder video (https://youtu.be/gSNFJbgoaHI). The section is visible from day one with the placeholder. Purpose: introduce Yannick in interview/podcast format to build trust.

**Rationale:** A trust-building "meet the person" video was missing. Placing it right after "Warum Video" gives it context: first you understand why video works, then you see Yannick talk. The placeholder keeps the layout accurate while the real video is produced.

---

## 2026-06-09 — New contact page: schema-m style, form + WhatsApp

**Decision:** Replace / supplement the current `SoftClose` mailto flow with a dedicated contact page. The page uses a qualifying form with schema-m.com/contacts questions as the starting template: Vorname, Nachname, E-Mail, Telefon, Brand/Unternehmensname, Rolle, Projektbeschreibung + Ziele, monatliches Adspend (Meta/TikTok), Weitere Ansprechpartner. Alongside the form: a WhatsApp number as a direct-contact alternative. Stretch: Calendly embed after submission.

**Rationale:** The current mailto CTA is too frictionless in the wrong direction — it gives no information before a call is booked. A qualifying form pre-filters clients and signals seriousness on both sides. Schema-m was cited by Yannick as the reference for the method. The static site needs a form-submission service (Formspree or equivalent) since there is no backend — to be decided in the implementation session.

---

## 2026-06-09 — AI/people framing section: skip for this iteration

**Decision:** Do not add a dedicated section about "AI is the engine, humans are the secret" for this iteration.

**Rationale:** Three options were explored (inside Team, inside HowItWorks, standalone bridge section). None felt right and the concept risks over-emphasising AI on an unproven brand. The north-star doc already says the launch stays person-fronted and not AI-first. Revisit in a later iteration once the brand has traction.

---

## 2026-06-09 — Company name: parked

**Decision:** No company name decided. Exploration continues separately.

**Rationale:** Broad brainstorm in session covered loop-direct, lab/learning, fractal, seed, novel, method, single-word attitude, German words. Nothing clicked. Strong near-misses: Loop Lab (taken), Delta Lab (probably taken), Agentur Kreisrund (too German-only). Direction is: internationally portable, internet-first, loops/iteration/learning concept. Parking until a name lands naturally or a dedicated naming session surfaces a winner.

---

## 2026-06-08 — Stats stay external-sourced; no Flowkey attribution

**Decision:** The two `StatCallout` numbers (44 % Kaufabsicht, 612 % Engagement) keep their real provenance — Nielsen BrandEffect and Confect.io — and are wrapped in narrative context ("Warum Video"). They are **not** relabeled as Flowkey results. Credibility instead comes from a true first-person line: "Creatives, die ich produziert habe, haben über 10 Millionen Euro an Ad Spend bewegt."

**Rationale:** A draft wanted "Bei Flowkey … 44 % CPL / 612 % ROAS-Lift", but those are external studies, and 612 % measures *Engagement*, not ROAS — so that framing conflated both source and meaning. Inventing a Flowkey provenance violates the no-fake-proof rule (see next entry). If genuine Flowkey internal metrics exist, add them as a separate, clearly-attributed claim rather than restamping these numbers. **Do not re-attribute the research stats when editing this section.**

---

## 2026-06-08 — No testimonials section (no fabricated social proof)

**Decision:** The originally-planned testimonials section was dropped. The site shows a **Team** section (real people, real roles) instead — no quotes, no client logos, no invented metrics. Owner instruction: "no fake testimonials."

**Rationale:** Pre-launch, there are no real client testimonials yet. Fabricated or placeholder quotes would be dishonest and undercut trust with warm referrals (the page's actual audience). Real social proof can be added later once it exists.

---

## 2026-06-08 — Pilot copy avoids implying a customer base

**Decision:** The Pilot offer reads "ein typischer Einstieg ist ein 4-Wochen-Sprint", not "die meisten Kunden starten…". No fixed price is published (dynamic by speed/scope/size).

**Rationale:** "Most clients" asserts a customer base that doesn't exist yet. Same no-fake-proof principle as above, applied to copy that could read as a track record. Keep new copy free of unearned "unsere Kunden / die meisten / wir haben schon" phrasing.

---

## 2026-06-08 — Loop gains an Audit stage (4 → 5)

**Decision:** `LoopDiagram` now starts with `Audit` (stage 01), per the implementation spec §5.3: Audit → Strategie → Produktion → Distribution → Messung & Iteration; the loop-back feeds the Audit.

**Rationale:** "Understand before acting" is the core promise; the audit was sold in `WhatThisMeans` but missing from the system loop. `.loop` is flexbox (`flex: 1` per stage), so a 5th stage reflows without CSS changes. Auto-cycle uses `% LOOP_STAGES.length`, so it adapts automatically.

---

## 2026-06-02 — No build step: CDN React + Babel

**Decision:** Load React 18 and Babel standalone from unpkg CDN; write JSX directly as `type="text/babel"` script tags. No bundler, no npm.

**Rationale:** Zero local tooling required. Single-owner site with infrequent edits. GitHub Pages serves static files; no CI/CD needed. Trade-off: slower initial load (Babel transforms at runtime), no tree-shaking. Acceptable for a low-traffic portfolio.

---

## 2026-06-02 — Component-per-section file structure

**Decision:** Each page section is its own `.jsx` file (Hero, WhatThisMeans, HowItWorks, etc.), loaded individually via `<script>` tags, exposing components as `window.*` globals.

**Rationale:** Matches the no-bundler constraint. Each file is independently editable and diffable. Globals work because there's only one page and one React root.

---

## 2026-06-02 — Alt background on ProblemStatements

**Decision:** Apply `.alt` class (`background: var(--paper-2)`) to the ProblemStatements section, matching WhatThisMeans.

**Rationale:** The two accordion/list sections benefit from visual grouping against the plain paper background of Hero and HowItWorks. Alternating backgrounds create rhythm without adding decorative elements. Section padding overridden to `clamp(64px, 8vh, 112px)` (vs. default `--section-y: clamp(96px, 12vh, 160px)`) to keep the tile compact and content centered.
