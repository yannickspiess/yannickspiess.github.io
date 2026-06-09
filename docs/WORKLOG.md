# Worklog

> **Note for agents:** This file is reverse-chronological — newest entries are at the top, oldest at the bottom. Always read from the top of the Entries section to find the insertion point. Do not use `tail` to locate where to insert.

## 2026-06-09 (Session 2 — V3 implementation)

- Scope: Implement all 7 items from the V3 backlog in full. Two commits.
- Changes:
  - `StatCallout.jsx` — deleted `stat-callout__cred` paragraph (10M Euro line); replaced `stat-callout__story` body with editorial pullquote "Das Medium, das kalte Märkte erwärmt." (Items 1 + 3).
  - `Team.jsx` — Yannick bio: "ich halte das System zusammen" → "das Rückgrat des Systems."; team intro: ich-form stripped (Item 2).
  - `VideoIntro.jsx` (new) — YouTube embed section, placed after StatCallout. Registered + rendered in `index.html` (Item 4).
  - `Header.jsx` — added optional `homeHref`, `ctaHref`, `ctaLabel` props (defaults preserve existing main-page behaviour) (Item 5 dependency).
  - `ContactForm.jsx` (new) — qualifying contact form (Vorname, Nachname, E-Mail, Telefon, Brand, Rolle, Projektbeschreibung, Adspend dropdown, Weitere Ansprechpartner). Formspree + WhatsApp placeholders gated at submit time with inline error. (Item 5).
  - `kontakt.html` (new) — second page: Header (homeHref="/"), ContactForm, Footer. No `.reveal` classes (no IO on this page). Title: "Kontakt — Yannick Spiess" (Item 5).
  - `SoftClose.jsx` — replaced email input + mailto with link to `/kontakt.html`. Dropped `contact` prop (Item 6).
  - `kit.css` — added `.stat-callout__pullquote`, `.video-intro` embed block, `.wrap--narrow`, full `.contact-form__*` component styles, `.pilot__note` hairline separator, elevated `.audit-result` to card, `#fit` explicit padding (Items 3, 4, 5, 7).
  - `index.html` — registered VideoIntro script; updated `<SoftClose />` (no prop) (Items 4 + 6).
- Deploy commits:
  - `9b69898 V3: Items 1–6 — contact page, VideoIntro, ich-form, StatCallout editorial, SoftClose CTA`
  - `dad7440 V3 Item 7: Visual density pass — PilotOffer separator, audit-result card, Qualify spacing`
- Verification:
  - Local: `python3 -m http.server 8765`; Playwright full-page screenshots of both `index.html` and `kontakt.html`. No JS errors (favicon 404 only). All form fields render; 2-col layout correct; pullquote accent border visible; VideoIntro iframe present.
- Follow-ups:
  - Fill `FORMSPREE_ENDPOINT` in `ContactForm.jsx` (line 3) when Formspree account is created.
  - Fill `WHATSAPP_NUMBER` in `ContactForm.jsx` (line 4) — digits-only, e.g. `4915123456789`.
  - Team placeholders (photos, LinkedIn URLs, Tommaso surname) — Yannick fills manually.
  - OG meta tags still open.

## 2026-06-09 (Session 1 — V3 design)

- Scope: Voice design-review session (Friedenstraße.m4a, ~19 min) + structured Q&A to define V3 scope. No deploy yet — design decisions only, plus one small affordance fix.
- Changes:
  - `LoopDiagram.jsx` — chevron `+` → `Mehr →` (collapsed); `−` stays for expanded. Removed `aria-hidden` so screen readers pick up the label. **Only code change deployed this session.**
- Session output — decisions and open items captured in `docs/DECISIONS.md` (2026-06-09 block) and `docs/HANDOFF.md` (V3 backlog). Nothing else committed yet; all remaining V3 work is design-approved and awaiting an implementation session.
- Follow-ups: see V3 backlog in HANDOFF.md.

## 2026-06-08
- Scope: V2 landing-page iteration — implement Jacob Thomsen's Sitzung-2 feedback + competitor-research integration end-to-end, then refresh continuity docs.
- Changes:
  - `StatCallout.jsx` — de-badged the two research stats into a narrative ("Warum Video" intro + credibility line "über 10 Millionen Euro Ad Spend"). Numbers + sources unchanged (Nielsen, Confect.io).
  - `LoopDiagram.jsx` — 4 → 5 stages: added `Audit` as stage 01, renumbered, loop-back now feeds the Audit.
  - `WhatThisMeans.jsx`, `SoftClose.jsx` — audit 60 → 30 min; close framing "30 Minuten, kostenlos, kein Risiko".
  - `Qualify.jsx` (new) — "Für wen das passt" (3 fit / 2 not-fit). Registered + rendered in `index.html`.
  - `PilotOffer.jsx` (new) — 4-week sprint, no fixed price. Phrasing "ein typischer Einstieg" (not "die meisten Kunden" — pre-launch).
  - `Team.jsx` (new) — 3-person team (Yannick / Tommaso / Britney Tan); initials-avatar + `#` LinkedIn placeholders.
  - `index.html` — registered + rendered the 3 new sections (order: …WhatThisMeans → Qualify → PilotOffer → Team → SoftClose); `CONTACT` → `yannick.spiess@icloud.com`.
  - `kit.css` — appended a marked "V2 ADDITIONS (2026-06-08)" block (stat story/cred, fit list, pilot note, team grid).
  - `docs/HANDOFF.md`, `docs/WORKLOG.md`, `docs/DECISIONS.md` — brought current.
- Deploy commit:
  - `77d192f V2: 5-stage loop (add Audit), stats in narrative + 10M ad-spend proof, 30-min audit, add Qualify/Pilot/Team sections, contact email`
- Verification:
  - Local: `python3 -m http.server 8765`; headless browser (Playwright) → no JS errors (only favicon 404), no horizontal overflow. DOM checks: 5 loop stages, 3 visible team cards (235px, 3-col grid), stat numbers render `44%`/`612%`, contact `yannick.spiess@icloud.com`, audit "30-min".
  - Live: `curl` of `StatCallout.jsx`/`Team.jsx`/`PilotOffer.jsx`/`Qualify.jsx` → HTTP 200; content markers ("10 Millionen Euro", "name: 'Audit'", "Britney Tan") present on the deployed files.
- Follow-ups:
  - Yannick: fill placeholders (team photos, real LinkedIn URLs, Tommaso's surname).
  - Prep niche-sharpening question for Jacob Sitzung 3 (2026-06-18).
  - Optional: add OG meta tags; optionally `.gitignore` `.DS_Store` (still untracked).

## 2026-04-22
- Scope: remove the `decision-model` footer link from the homepage and refresh continuity docs.
- Changes:
  - `index.html`
  - `docs/HANDOFF.md`
  - `docs/WORKLOG.md`
- Deploy commit:
  - `5be6f85 Remove decision model footer link`
- Verification:
  - `git status --short --branch` -> `## main...origin/main` with local untracked `.DS_Store`
  - `curl -sS -I https://yannickspiess.github.io/ | head -n 1` -> `HTTP/2 200`
  - `curl -sS https://yannickspiess.github.io/ | rg -n "What is an hour of your life worth\\?|decision-model"` -> no matches
- Follow-ups:
  - Decide whether to remove the still-reachable `/decision-model/` page and related assets entirely.
  - Optionally ignore `.DS_Store` in `.gitignore` to keep local status clean.

## 2026-03-02
- Scope: initial deployment of GitHub Pages placeholder site and continuity notes.
- Changes:
  - `index.html`
  - `.nojekyll`
  - `AGENTS.md`
  - `docs/HANDOFF.md`
  - `docs/WORKLOG.md`
  - `docs/DECISIONS.md`
- Verification:
  - `gh api repos/yannickspiess/yannickspiess.github.io/pages` -> status `built`, URL `https://yannickspiess.github.io/`
  - `curl -sS -I https://yannickspiess.github.io/ | head -n 1` -> `HTTP/2 200`
  - `gh api repos/yannickspiess/yannickspiess.github.io/collaborators --jq '.[].login'` -> `yannickspiess`
- Follow-ups:
  - Decide whether to enforce signed commits and/or PR-only changes on `main`.

## 2026-03-02 (Session 2)
- Scope: final portfolio build-out, copy refinement, festival credibility formatting, and production deploys.
- Changes:
  - `index.html`
  - `.gitignore`
- Deploy commits:
  - `0992b1b Refine festival tags and final works presentation`
  - `3b968cc Fix festival tag labels for No Other Girl and Long Distance`
- Verification:
  - `git status --short --branch` -> `## main...origin/main`
  - `curl -sS -I https://yannickspiess.github.io/ | head -n 1` -> `HTTP/2 200`
- Follow-ups:
  - Keep festival and screening metadata source-backed before adding new public claims.
> **Note for agents:** This file is reverse-chronological — newest entries are at the top, oldest at the bottom. Always read from the top of the Entries section to find the insertion point. Do not use `tail` to locate where to insert.
