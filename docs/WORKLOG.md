# Worklog

> **Note for agents:** This file is reverse-chronological — newest entries are at the top, oldest at the bottom. Always read from the top of the Entries section to find the insertion point. Do not use `tail` to locate where to insert.

## 2026-08-18 (Session 8 — Yannick's review round, then deploy) — ✅ DEPLOYED

- Built a static single-file preview of the staged B+ version (rendered DOM of `/` and
  `/kontakt.html`, fonts and images inlined as data URIs, loop details forced open, hero video
  as a still) and published it as a private artifact so Yannick could read the change on his
  phone. He reviewed it there and dictated the revisions below.
- **"Film" → "Video" across every customer-facing string.** `Hero.jsx` (H1 accent word, iPhone
  alt), `HowItWorks.jsx` (H2 accent word), `LoopDiagram.jsx` (stages 01, 03, 04, 05),
  `Qualify.jsx`, `ContactForm.jsx` field label, `index.html` `<title>` + meta + OG,
  `assets/og-image-gen.html`. Craft vocabulary untouched — that is where the KSK evidence sits.
- `Hero.jsx` — subline lost "Die Kampagne fährst du" and gained **"Für Werbekampagnen auf Paid
  Social."** ⚠️ Yannick asked for the paid-media context ("sonst ist nicht ganz so klar, worum
  es eigentlich geht") but said he was unsure of the wording; **this sentence is the agent's,
  not his.** Flagged in COPY.md as the one open string on the page. Secondary CTA "So arbeite
  ich" → **"Mehr erfahren"**.
- `Proof.jsx` — "Die Kanäle, auf denen deine Filme laufen." → **"Die Kanäle, auf die ich mich
  spezialisiert habe."** 🔴 Yannick's spoken version was "auf die **wir** spezialisiert sind";
  he switched to "ich" as soon as the Befund-1 conflict was named.
- `LoopDiagram.jsx` — stage 02 desc lost "Die Form, bevor gedreht wird."; its detail opener
  "Aus dem Stoff wird eine Form:" → "Aus der Recherche wird ein Plan:". **Stage 05's explicit
  boundary sentence removed** ("Die Ausspielung fährst du — Mediaplanung und Kampagnensteuerung
  liegen bei dir oder deiner Agentur") in favour of "in den Formaten und Längen der Kanäle, auf
  denen sie laufen sollen." A quieter replacement was offered and declined. Return line →
  "Das Ergebnis der ersten Runde fließt in die nächste ein". Header comment rewritten to warn
  that the boundary is now structural only.
- `Qualify.jsx` — **"Weniger passend" block deleted entirely** (label, `notFit` array, second
  `<ul>`). Both lines were load-bearing KSK evidence; fit bullet 3 ("gestalterischen Spielraum
  geben") now carries the *eigenschöpferischer Spielraum* signal alone. Header comment says so.
- `Impressum.jsx` + `Datenschutz.jsx` — **three "Wir" survivors** the morning pass missed
  (Streitbeilegung, Formspree-Speicherdauer, Stand). Now "ich". "Lass uns sprechen" and "vor
  unserem Gespräch" in `ContactForm.jsx` are second-person-plural *us* and correctly stay.
- `assets/og-image.png` regenerated for the "Videos" headline (headless Chrome, 1200×630);
  render checked, fonts and vermilion accent correct.
- Docs — `CLAUDE.md`, `docs/COPY.md`, `docs/DECISIONS.md` all updated. The two guard-rails that
  changed meaning are called out explicitly rather than quietly edited: the media-services rule
  now states the page says this nowhere, and COPY.md §5 records what the deleted counter-list
  used to carry.
- Verification: local `python3 -m http.server`, both pages rendered — 0 console errors, Babel
  compiled every component, full rendered text read back against the redlist, grep sweep for
  banned vocabulary and for `wir/uns/unser` across all `.jsx`/`.html` (excluding `legacy/`,
  `vendor/`, `docs/`) clean.
- **Known, accepted:** the page now contains no sentence stating that media planning and
  campaign management are not his work. Befund 2 is defended structurally (no Distribution
  stage, no Messung stage) and nothing else. Named before the decision; Yannick accepted it.

## 2026-08-18 (Session 7 — Weg B+: copy rebuilt on the KSK line) — ✅ SHIPPED, WITH REVISIONS

> **Superseded in part by Session 8 above.** This entry describes what was *staged* on the
> morning of 08-18. Yannick chose B+ that afternoon but revised the copy first — "Video"
> instead of "Film", and both explicit media-boundary strings removed. **Where this entry
> and Session 8 disagree, Session 8 is what is live.** Rationale in DECISIONS
> "2026-08-18 — Weg B+" and "2026-08-18 (later) — Yannick's revision".

- Scope: every public copy surface. Driven by the finding in the vault note `KSK
  Künstlereigenschaft — Rechtsgrundlagen und Nachweisstrategie` §6.4 — the site was
  structurally arguing the opposite of the KSK application, and the `<title>` was the
  smallest part of it.
- `index.html` — `<title>`, meta description, `og:title`, `og:description`.
- `Hero.jsx` — H1, subline (now carries the boundary: "Die Kampagne fährst du"), both CTAs, iPhone alt text.
- `Proof.jsx` — platform label reframed so the channels are where the films *play*, not a service offered.
- `HowItWorks.jsx` — H2 "Es funktioniert als Loop, nicht als Projekt" → "So entsteht ein Film"; intro rewritten off the measurement framing.
- `LoopDiagram.jsx` — **the structural change.** All five stages replaced: Audit · Strategie · Produktion · Distribution · Messung & Iteration → **Recherche & Stoff · Buch & Konzept · Regie & Bildgestaltung · Schnitt & Fassungen · Übergabe.** Stage 05 states the scope boundary. Return line rewritten. Header comment now warns future agents not to let media work migrate back into stages 01–04. `.loop` is a flexbox, so the tile count was never load-bearing — five kept for rhythm.
- `Qualify.jsx` — both not-fit lines replaced with ones that do double duty as KSK evidence (no hand-for-hire execution; no media services); fit list off "Creative-Output"/"Ad-Volumen".
- `PilotOffer.jsx` — H2 dropped its "kein"-negation; lead rewritten off Funnel/Creative-Varianten/Iterationsrunde onto Stoff/Dreh/Schnittfassungen.
- `SoftClose.jsx`, `Header.jsx`, `impressum.html`, `datenschutz.html` — "Audit starten" → "Erstgespräch anfragen" in all six places it appeared (two were hardcoded `ctaLabel` overrides on the legal pages, easy to miss).
- `ContactForm.jsx` — **"Monatliches Adspend (Meta / Google / TikTok)" field removed** (Befund 3), replaced by "Wo soll der Film laufen? (Kanäle, Längen, Formate)"; Projektbeschreibung → "Worum geht es? (Produkt, Anlass, Idee)"; "wir" → "ich" in the prep line, success, error and misconfigured states. Formspree field name `adspend` → `einsatz`.
- `kontakt.html` — meta description and `og:description` still advertised the 30-minute Audit.
- `Datenschutz.jsx` — "wir/uns" → "ich/mir" (6 places). Legal substance unchanged; a sole trader in the plural was inaccurate anyway and it was the last "wir" on a public indexed page. **Flagging this one for Yannick — it is legal text and the only edit here that is arguably out of scope.**
- **Deleted `ProblemStatements.jsx` and `WhatThisMeans.jsx`** (`git rm`). Unrendered since V4 but tracked, so GitHub Pages served them verbatim — carrying "Ein echtes Growth-System", "Wir iterieren … Performance-Daten", "als wären wir dein internes Team", "30-minütiger Audit", "Kanäle & Funnel", "Creatives & Markenauftritt". This **reverses** the explicit "kept on purpose" from the 2026-08-01 entry below, which assessed them on the Team axis only. `VideoIntro.jsx` has no redlisted copy and stays; its stale comment was fixed, as was one in `StatCallout.jsx`.
- `assets/og-image-gen.html` + **`assets/og-image.png` regenerated** — the share card still showed the old headline and "Strategie · Produktion · Distribution". Rendered headless at 1200×630 (`Google Chrome --headless=new --screenshot --window-size=1200,630`), fonts and vermilion accent verified in the output.
- Docs — `CLAUDE.md` now carries the KSK line as a hard constraint block that explicitly outranks the other copy rules and flags that the voice rule was **inverted**; `docs/COPY.md` gets the same constraint at the top, the flipped voice rule, and the full copy updated in render order with notes on which lines are load-bearing; `DECISIONS.md` gets the full rationale. `AGENTS.md` is `@CLAUDE.md`, so it inherits.
- Verification: local `python3 -m http.server 8765`, both pages loaded in a browser — **0 console errors**, Babel compiled all components, full rendered text of `/` and `/kontakt.html` read back and checked against the redlist. Grep sweep for the banned vocabulary across all `.jsx`/`.html` (excluding `legacy/`, `vendor/`, `docs/`) returns clean.
- **Not done (vault-side, deliberately out of repo scope):** `KSK ↔ Businessplan — Konsistenzmatrix` §E, and the Businessplan §3.3 website status which still reads "In Aufbau".

## 2026-08-01 (Session 6b — people section removed entirely)

- Yannick reversed the reframing shipped an hour earlier: remove the section instead of rewording it. Rationale in DECISIONS "2026-08-01 (later same day)". Net effect: no third-party names anywhere on the site, which is the unambiguous read for the GZS and KSK applications.
- `Team.jsx` — **deleted** (`git rm`), not just unregistered. The V4 convention leaves dead files on disk, but this one stayed publicly fetchable at `/Team.jsx` with two people's names in it, which is the whole thing being removed. Recover from history (`236e9f7`) if the section ever returns.
- `index.html` — `<script src="Team.jsx">` tag and `<Team />` render call removed. Section order is now Hero → Platforms → Warum Video → Loop → Für wen das passt → Pilot → Soft close.
- `index.html` meta description — "Wie dein internes Video-Team: …" → "Video Ads für Paid Social — Strategie, Produktion und Distribution aus einer Hand. …". It referred to the reader's internal team, not Yannick's, but it was the last "Team" string on a public surface and it no longer matched the V4 hero copy. `og:description` was already clean.
- `kit.css` — the whole `.team__*` block and the `@media` 1-col override deleted; `.team__note` taken back out of the `.pilot__note` rule; V2-additions header comment updated.
- Docs — COPY.md §7 replaced by a removal note plus the do-not-reintroduce constraint and a flag that the page now has no proof section at all; HANDOFF section inventory renumbered (SoftClose 10→9, Footer 11→10) with a removal callout, placeholder rows and open-step 2 retired. Also fixed two stale HANDOFF facts found in passing: the local repo path still pointed inside the Obsidian vault, and the V4 backlog still listed the team placeholder fill.
- Kept on purpose: `assets/team-yannick.jpg` (Yannick's own portrait, now unreferenced — no risk, likely wanted for a founder photo later) and the unrendered legacy files `ProblemStatements.jsx` / `WhatThisMeans.jsx` / `VideoIntro.jsx`.
- Verification: local `python3 -m http.server` **on a fresh port** — the first check on the old port showed 3 phantom errors (`Team.jsx` 404 + `ReferenceError: Team is not defined`) purely from Babel's per-origin `.jsx` cache serving the stale page; on a fresh origin, 0 console errors. `main > section` order confirmed as the 6 sections above, `#team`/`#zusammenarbeit` both absent, `document.body.innerText.match(/team|tommaso|britney/gi)` → `null`, no horizontal overflow, page height 4352px → 3859px (−11%). Tail screenshot checked: tinted pilot block into the close CTA reads fine with no adjacent same-background clash.

## 2026-08-01 (Session 6 — "Team" → Zusammenarbeit, application-consistency fix) — *superseded the same day by the removal above; kept as the reference if a people section ever returns*

- Scope: one section. Driven by the vault task `website-team-sektion-auf-zusammenarbeit-umstellen` and Yannick's 2026-07-30 decision that Tommaso and Britney are project-based contractors, never employees. The page is public, its URL is in the Gründungszuschuss business plan (§3.3), and it is the only secured KSK Tätigkeitsnachweis (Ziffer 2.2) — a "Team" heading contradicted both applications. Rationale in DECISIONS "2026-08-01".
- `Team.jsx`:
  - Section id `#team` → `#zusammenarbeit` (no inbound anchors existed — grepped `href="#team"`, zero hits).
  - H2 "Wer das umsetzt." → **"Für jedes Projekt die richtige Besetzung."**
  - Lead rewritten to name the arrangement: "… Für Dreh und Distribution kommen erfahrene Freiberufler:innen dazu — projektbezogen beauftragt, je nachdem, was die Produktion braucht."
  - Role lines: Tommaso `Kamera & Schnitt · projektbezogen`, Britney `Social Media · projektbezogen`, Yannick `Creative Director & Strategie` → `Creative Direction & Strategie` (function, not job title). Britney's role shortened after the first render wrapped to two lines and pushed her card out of alignment with the other two.
  - Bios reworded from standing-role phrasing to "kommt dazu, wenn …".
  - New closing note under the grid: **"Yannick Spiess arbeitet freiberuflich. Tommaso und Britney sind selbstständig und werden pro Projekt beauftragt."** This is the line that resolves the contradiction — flagged in the component comment and in `docs/COPY.md` §7 so a future copy pass doesn't drop it.
- `kit.css` — `.team__note` added to the existing `.pilot__note` rule (muted note, hairline top rule). No other CSS change; `team__*` class names deliberately kept (styling hooks, invisible to a reader).
- `docs/COPY.md` §7 retitled to Zusammenarbeit, full copy synced, and given a "hard constraint" block so the KSK/GZS requirement survives future rewrites.
- Not done on purpose: Tommaso and Britney were **not** removed — the production capacity is an asset in both applications; only the legal shape had to be stated correctly.
- Verification (local `python3 -m http.server 8765`, Playwright): 0 console errors; `#zusammenarbeit` present, `#team` gone; `document.body.innerText.match(/Team/gi)` → `null` (the word appears nowhere on the rendered page); 3-col grid at 1280px (308px cards, aligned), 1-col at 390px, no horizontal overflow at either width; section screenshot reviewed.

## 2026-06-09 (Session 4 — UX audit + V4.1 conversion-plumbing pass)

- Scope: Structured UX audit (ui-ux-designer subagent critique + interactive Playwright testing at 1152px/390px), then one implementation pass. Audit verdict: the editorial system is strong; the failures were in the conversion path (chat unfurl → CTA → form) — exactly the journey of the warm-referral audience. Full decision detail in DECISIONS "UX audit pass (V4.1)".
- Conversion/trust fixes:
  - `ContactForm.jsx` — removed `noValidate` (native validation now blocks empty/garbage submits; verified: empty submit focuses Vorname, no fetch fires); misconfigured gate checks only the Formspree TODO; error/misconfigured states link `mailto:` (new `contact` prop from `kontakt.html`); Telefon + Rolle now optional and labeled; WhatsApp block hidden until the number is real.
  - `Team.jsx` — LinkedIn links render only with a real URL (no more styled `#` dead links).
  - `index.html` + `kontakt.html` — meta description, OG/Twitter tags, `og:image` → new brand `assets/og-image.png` (1200×630; generator at `assets/og-image-gen.html`, rendered via headless Chrome), `favicon.svg` (vermilion loop-ring mark).
  - Header CTA on home → `/kontakt.html` (was `#lets-talk`; identical "Audit starten" labels now share one destination). Default changed in `Header.jsx`.
- Interaction/craft fixes:
  - `LoopDiagram.jsx` — auto-cycle (1.4s) removed; accent follows hover/focus, stage 01 anchors at rest; tiles get hover background; "Mehr →" restyled 22px → 15px link-underline (affordance, not competition with the stage name); desktop panel `scrollIntoView({block:'nearest'})` on open; `aria-controls`/panel `id` added.
  - `Hero.jsx` — video autoplays only without `prefers-reduced-motion`; quiet pause/play toggle in the bezel (`.hero__video-toggle`), WCAG 2.2.2.
  - `Proof.jsx` — colored raster PNGs → monochrome ink-soft SVG glyphs (`currentColor`; the `.pstrip__logo svg` CSS was already written for this).
  - `StatCallout.jsx` — accent highlight removed from stat descriptions (accent scarcity).
  - `kit.css` — global `:focus-visible` ring (WCAG 2.4.7); `scroll-margin-top: 80px` for anchors under the sticky header; stat source 12→13px; mobile hero mockup capped `min(54vw, 260px)` (width-only; max-height would misalign the %-positioned screen video).
  - `index.html` — deep-link `/#how` fix (hash re-scroll after React mounts; native scroll no-ops because the target doesn't exist pre-render); React dev UMD → production UMD (fresh SRI hashes; still CDN, no build step).
- Verification: fresh ports (8799/8801 — Babel-fetched `.jsx` caches per origin); 0 console errors; loop static + expands with correct panel id; form validation blocks empty submit; no horizontal overflow at 390px; full-page screenshots desktop + mobile.
- Follow-ups unchanged: Formspree endpoint + WhatsApp number (form now fails gracefully with mailto until then); Team photos/LinkedIn URLs/Tommaso surname; hero mockup video footage; company name/wordmark. Validate section merges with Jacob 2026-06-18.

## 2026-06-09 (Session 3 — V4 consolidation, de-stuffing, copy + mobile loop)

- Scope: Owner felt the site was "too stuffy / TMI" and copy "half-baked." Office-hours diagnosis: 11 sections / 8.5 screens vs. the north star (clarity machine for a warm referral, 30–60s, "one message per screen"). Owner chose aggressive consolidation. Design doc: `~/.gstack/projects/yannickspiess-yannickspiess.github.io/yannickspiess-main-design-20260609-174714.md`.
- Structure (11 → 7 content sections, page height ~6930px → ~4411px, −36%):
  - Merged `ProblemStatements` + `HowItWorks` + `WhatThisMeans` → one method section (`HowItWorks` + `LoopDiagram`). Audit detail now carried by Loop stage 01. `ProblemStatements.jsx` / `WhatThisMeans.jsx` unregistered in `index.html` (files left on disk).
  - Deleted `VideoIntro` placeholder section (unregistered in `index.html`; file left on disk).
  - Folded platform strip into hero (dropped `.plat__label` in `Proof.jsx`).
  - Dropped eyebrows on method/Pilot/Team → only 2 eyebrows remain (Warum Video, Für wen das passt). Broke the pitch-deck rhythm.
  - Motion reduced 5 → 2 systems (kept Loop + stat count-up; the 3 animated SVG icons were in `WhatThisMeans`, now removed).
- Hero: subline → "Wie dein internes Video-Team: Strategie, Produktion und Distribution aus einer Hand." (was a jargon stack). Primary CTA single-hop → `/kontakt.html` (was `#lets-talk`).
- Copy iteration (owner-selected):
  - Warum-Video pullquote → "Auf Social entscheidet das beste Video, nicht das größte Budget." (positioning: quality over spend).
  - Loop intro → clean mechanic line; removed a merge artifact where the body ("Jedes Video ist ein Einzelprojekt") contradicted the headline ("…nicht als Projekt").
- Mobile loop UX fix: tapping a stage now opens its detail **inline, directly under the tapped tile** (`.loop__inline-expand`, shown only ≤760px); the single bottom `.loop__expand` panel is hidden on mobile. Desktop unchanged (bottom panel, single-row loop). Verified both widths via Playwright (real click; programmatic `.click()` does not trigger React here).
- Process changes:
  - **Copy rule loosened.** All copy is prototype-stage; write best-effort, owner iterates. No advisor/native-review gate. New durable rule: read `docs/COPY.md` before ANY copy change.
  - Added `docs/COPY.md` — voice guide + full copy in render order (the holistic copy surface). Keep it in sync with `.jsx` in the same commit.
  - `CLAUDE.md` is now the agent entry point (hard "Copy rule (READ FIRST)"); `AGENTS.md` reduced to `@CLAUDE.md`.
- Deploy commits: `0686cfd` (hero subline + first pullquote pass), `6d83fbb` (pullquote #7 + loop intro + mobile loop UX). Earlier in session: `e93d005` (V4 consolidation), `7a9adfe` (COPY.md + rule), `0e88f0c` (CLAUDE.md entry point), `3e17b60` (strengthen copy rule).
- Verification: Playwright at 1440px + 390px, fresh ports (Babel caches `.jsx`; use a new port or hard-refresh). No JS errors (favicon 404 only). No mobile horizontal overflow. Live deploy confirmed.
- Follow-ups (unchanged + new): Formspree/WhatsApp `TODO_` in `ContactForm.jsx` (form errors on submit until filled); Team photos/LinkedIn/Tommaso surname; OG meta tags; open copy questions parked at bottom of `docs/COPY.md` (English-jargon density; whether the offer still paraphrases in one sentence without the old "what you get" beat). Validate the section merges with Jacob on 2026-06-18.

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
