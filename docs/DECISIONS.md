# DECISIONS

Architectural, product, and implementation decisions with rationale.

---

## 2026-08-18 (later) — Yannick's revision: "Video", and the boundary goes implicit

**Decision:** Ship B+, with four changes Yannick made after reading the rendered preview.
Two are cosmetic. Two move KSK evidence off the page, knowingly.

**1 · "Video", not "Film", as the customer-facing noun.** Yannick: "Video ist so ein bisschen
der gängigere Begriff." Applied throughout — H1, section 4, all five stages, the fit list,
`<title>`/OG, the contact-form field, the OG image. **Cost: near zero.** The KSK evidence was
never in the word "Film"; it is in Stoff, Buch, Treatment, Storyboard, Regie, Bildgestaltung,
Kadrage, Dreh, Schnitt, Montage, Fassungen — all unchanged. "Warum Video" and the pullquote
already said "Video" and were never flagged in §6.4.

**2 · The stage-05 disclaimer is gone.** "Die Ausspielung fährst du — Mediaplanung und
Kampagnensteuerung liegen bei dir oder deiner Agentur" → "in den Formaten und Längen der
Kanäle, auf denen sie laufen sollen." A quieter replacement ("Geschaltet werden sie von dir")
was offered and **explicitly declined**.

**3 · The "Weniger passend" counter-list is gone entirely.** Both lines removed. The first was
the *eigenschöpferischer Spielraum* test from §3.2; the second declined media services.

> 🔴 **2 and 3 together are the real cost of this round, and it was named before the call was
> made.** The page now contains **no sentence anywhere** that says media work is not his. What
> defends Befund 2 is purely structural: the loop has no Distribution stage and no Messung
> stage, and nothing on offer is a media service. That is genuinely the larger half of the
> original finding — Befund 2 was about the *shape* of the loop — but the explicit half is
> gone, and there is no slack left. Any sixth stage, reporting mention, or media line re-opens
> it outright.
>
> 🟢 **The Spielraum signal survives** in fit bullet 3: "die gestalterischen Spielraum geben —
> und dafür eine eigene Handschrift bekommen." Same test, stated positively. That string is now
> load-bearing on its own.

**4 · "wir" was proposed and withdrawn.** Yannick's spoken wording for the platform label was
"die Kanäle, auf die **wir** spezialisiert sind". Flagged as Befund 1 — the exact word the
whole review turned on — and he switched to "ich" immediately. Shipped as "Die Kanäle, auf die
ich mich spezialisiert habe." Worth recording because it shows how naturally the company voice
returns in speech.

**Also in this round:** the hero subline lost "Die Kampagne fährst du" (per 2) and gained "Für
Werbekampagnen auf Paid Social" — Yannick's own concern that the page otherwise never says
what kind of work this is. ⚠️ **That sentence is the agent's wording, not his**; he said he was
"noch nicht so sicher" about the subline and signed off on shipping anyway. It is the one open
string on the page. Naming the advertising purpose is Layer 2 (harmless, never denied) — it
says where the videos run, not what he operates — but it should be re-read before the KSK
bundle is printed.

Three "Wir" survivors were also found and fixed in `Impressum.jsx` and `Datenschutz.jsx`
(legal boilerplate the morning pass missed). "Lass uns sprechen" / "unserem Gespräch" in the
contact form are second-person-plural *us*, not company voice, and stay.

## 2026-08-18 — Weg B+: the KSK line becomes a standing constraint on the copy

**Status: SHIPPED 2026-08-18.** Yannick chose **B+** after reviewing a rendered preview,
then revised the copy in a second round (see "2026-08-18 (later) — Yannick's revision"
below). Deployed with those revisions folded in.

**Decision:** Rebuild the site's copy so it is consistent with the KSK Künstlereigenschaft
line, and record that line as a permanent constraint on all future copy — in `CLAUDE.md`,
in `docs/COPY.md`, and here. This is **Weg B+** from the vault note `KSK Künstlereigenschaft
— Rechtsgrundlagen und Nachweisstrategie` §6.4.

**Rationale.** On 2026-08-02 this looked like a ten-minute job: change the `<title>`, then
print the page as evidence (Weg B). On 2026-08-04 the *source* was read for the first time
rather than the rendered page, and the finding was structural — three problems, each
independently sufficient:

1. **The site was deliberately a company voice.** The voice rule in `docs/COPY.md` read, in
   full: *"Company voice, never 'ich' … the site is a company, not a personal portfolio."*
   That is the exact opposite of what the KSK application claims, and "wir" works against
   Fragebogen Ziffer 6 ("keine Beschäftigten") and the one-employee ceiling of § 1 Nr. 2 KSVG.
2. **The Loop described the full performance-marketing cycle.** Audit → Strategie →
   Produktion → Distribution → Messung & Iteration. Of five stages, **one** was making a
   film. Stages 1, 4 and 5 were, by name, the three services that §5 of the KSK
   Tätigkeitsbeschreibung explicitly disclaims.
3. **The contact form collected "Monatliches Adspend (Meta / Google / TikTok)."** A form that
   asks for the client's media budget reads as a media-services intake, not a commission for
   a work.

**Why "just don't submit the page" was never an option.** The URL is printed in the
Gründungszuschuss business plan §3.3 and therefore reaches the Arbeitsagentur; the Impressum
is public and indexed; the domain is trivially findable from the name. The KSK asks for "ein
möglichst genaues Bild von Ihrer Tätigkeit" and takes three to six months to look. Leaving
the page out of the evidence bundle does not hide it. Conversely BSG 04.06.2019 – B 3 KS 2/18
R names an "Internetauftritt" as admissible proof of serious professional intent — so the
question was never whether to expose the site, only whether it would count for or against.

**The trade-off, stated honestly:** this is the live client-acquisition surface, and the
business plan claims viability in the paid-social video market. Giving up the claim on media
management could cost clients. Three things make the cost smaller than it looks — the site's
own voice guide already listed "Growth-System" as a buzzphrase to avoid; the defined reader is
a **warm referral**, not a media buyer, who wants to understand the offer in 30–60 seconds;
and the media-management claim was independently flagged in the vault's KSK ↔ Businessplan
consistency matrix §C as the line that burdens the KV-Hauptberuf test. "Ich entwerfe und
produziere die Filme; die Kampagne fährst du" is **clearer** for that reader, not weaker.

### What changed

| Area | Before | After |
|---|---|---|
| **Voice** | "wir", company voice, no first person singular | **"ich"** throughout, incl. `Datenschutz.jsx` |
| **`<title>`** | Yannick Spiess — Video-Wachstumssysteme | Yannick Spiess — Filme für Marken und Kampagnen |
| **Hero H1** | Mach *Video* zu deinem verlässlichen Kanal für neue Kunden. | Ich entwerfe und produziere die *Filme* für deine Kampagnen. |
| **Hero subline** | Strategie, Produktion und Distribution aus einer Hand. | … bis zum Schnitt — aus einer Hand. **Die Kampagne fährst du.** |
| **Method section** | "Es funktioniert als Loop, nicht als Projekt" | **So entsteht ein Film.** |
| **The five stages** | Audit · Strategie · Produktion · Distribution · Messung & Iteration | **Recherche & Stoff · Buch & Konzept · Regie & Bildgestaltung · Schnitt & Fassungen · Übergabe** |
| **CTA (all six places)** | Audit starten | Erstgespräch anfragen |
| **Contact form** | Monatliches Adspend (Meta / Google / TikTok), required | **Wo soll der Film laufen? (Kanäle, Längen, Formate)** |
| **Not-fit list** | einzelner Clip ohne System · Markt nicht validiert | **fertiges Storyboard, sucht nur eine Kamera · will Mediaplanung mitbestellen** |
| **OG image** | old headline + "Strategie · Produktion · Distribution" | regenerated: new headline + "Stoff · Buch · Regie · Schnitt" |

**Stage 05 "Übergabe" is where the boundary is drawn** — "Die Ausspielung fährst du —
Mediaplanung und Kampagnensteuerung liegen bei dir oder deiner Agentur." It states the scope
positively rather than as a "keine X"-negation, which the voice guide also forbids. If a
future edit lets media work migrate back into stages 01–04, the section has regressed.

**The two not-fit lines are load-bearing.** "Wer ein fertiges Storyboard hat und nur noch eine
Kamera sucht" says he is not a hand for hire executing someone else's board — which is exactly
the *eigenschöpferischer Spielraum* test from §3.2 (Bayerisches LSG 20.05.2025 i. V. m. BFH
15.10.1998) that decides the case. It reads as ordinary qualification copy. Keep it.

### 🔴 Reverses a "kept on purpose" from 2026-08-01

The people-section decision below explicitly kept `ProblemStatements.jsx` and
`WhatThisMeans.jsx` on disk, reasoning that "the only 'Team' wording in them is about the
reader's internal team." **That assessment was correct on the Team axis and wrong on every
other one.** Both files are tracked, unrendered since V4, and therefore served verbatim by
GitHub Pages at their own URLs. `ProblemStatements.jsx` contained:

> "Ein echtes **Growth-System** bedeutet: Jedes Video lernt vom letzten. **Wir iterieren**
> kontinuierlich auf Basis echter **Performance-Daten**…"
> "Wir denken Strategie, Produktion und **Distribution** als Einheit — und liefern so, **als
> wären wir dein internes Team**."

and `WhatThisMeans.jsx` carried "30-minütiger **Audit**", "Kanäle & **Funnel**", "**Creatives**
& Markenauftritt". That is the redlist almost in its entirety, publicly fetchable, on the
single axis that matters most here. **Both files are deleted** (`git rm`) rather than left in
place. They are recoverable from history if the V4 merge ever needs re-examining.

`VideoIntro.jsx` is also unregistered but contains no redlisted copy; it is left alone. Its
stale comment pointing at the deleted files was fixed.

### Cost and open items

- **The proof gap widens.** The Loop's specificity was carrying part of the credibility load;
  the craft stages are more honest but less differentiating to a founder. The right answer is
  now clearly a **Werkliste or reel of actual films** — which would serve the reader and the
  KSK evidence bundle simultaneously. Needs assets that do not exist on the site yet.
- **Downstream vault work, not done here:** `KSK ↔ Businessplan — Konsistenzmatrix` §E, and
  the Businessplan §3.3 website status (Jacob's draft says "In Aufbau"; the site is live since
  06/2026 and now also KSK-conforming).
- **Position 8 of the KSK Nachweisbündel** can now be printed as an asset rather than a
  liability — but that is a separate decision in the bundle's own montage plan §5.

---

## 2026-08-01 (later same day) — Remove the people section entirely

**Decision:** Delete the section instead of reframing it. `Team.jsx` is removed from the repo, its
`<script>` tag and `<Team />` render call are gone from `index.html`, and the `team__*` CSS block is
deleted from `kit.css`. The page now runs Hero → Platforms → Warum Video → Loop → Für wen das passt
→ Pilot → Soft close. Yannick's call, reversing the reframing shipped in `236e9f7` a few minutes
earlier (which stays in history and remains the reference if the section ever returns).

**Rationale:** Yannick judged removal the safer option. The reframing made the page *accurate* —
"freiberuflich / selbstständig / pro Projekt beauftragt" — but accuracy still leaves two other
names on a page that a Gründungszuschuss or KSK caseworker opens as evidence for a solo operation.
No named third parties means no question to answer. The site loses nothing structural: the offer,
method, and qualification sections carry the argument, and the section existed only as a
proof substitute after testimonials were ruled out.

**Known cost — the page now has no proof section.** Testimonials were rejected (no fake proof) and
the real-people substitute is gone. Proof rests entirely on the two sourced research stats
(Nielsen, Confect.io) and the specificity of the Loop. If the page starts feeling thin on
credibility, the answer is real client work or a founder video — not a reinstated people section.

**Also changed:** the `index.html` meta description said "Wie dein internes Video-Team: …". It
referred to the *reader's* internal team, not Yannick's, but it was the last "Team" string on a
public surface and it no longer matched the V4 hero copy. Replaced with "Video Ads für Paid
Social — Strategie, Produktion und Distribution aus einer Hand. …".

**Kept on purpose:** `assets/team-yannick.jpg` (Yannick's own portrait, now unreferenced) stays —
it carries no risk and is likely wanted again for a founder photo. The unrendered legacy files
`ProblemStatements.jsx` / `WhatThisMeans.jsx` / `VideoIntro.jsx` also stay as they are; the only
"Team" wording in them is about the reader's internal team.

---

## ~~2026-08-01 — The people section is project-based collaboration, not a team~~ (superseded same day by the removal decision above; kept for the reasoning and the recoverable copy)

**Decision:** The `#team` section becomes `#zusammenarbeit`. The rendered page no longer contains
the word "Team" anywhere. Tommaso Marinaro and Britney Tan stay on the page, but are presented as
self-employed people engaged per project: role lines carry `· projektbezogen`, the lead says
"Freiberufler:innen … projektbezogen beauftragt", and a closing note under the grid states it
plainly — *"Yannick Spiess arbeitet freiberuflich. Tommaso und Britney sind selbstständig und
werden pro Projekt beauftragt."*

**Rationale:** This is not a copy preference, it is a consistency requirement across three
documents. Yannick decided on 2026-07-30 that Tommaso and Britney are project-based contractors,
never employees. The Gründungszuschuss business plan says "Solo-Betrieb ohne Angestellte" and
names them under "freie Kamera- und Tonleute" (§2.3); the KSK questionnaire has Ziffer 6 set to
`Nein` with a standing constraint of max. 1 employee. This site is public, its URL is printed in
the business plan (§3.3), and it is the only secured KSK Tätigkeitsnachweis for Ziffer 2.2 — a
caseworker at the Agentur für Arbeit or the KSK opens it with one click. A "Team" heading next to
those applications is a visible contradiction.

**What must NOT change:** Tommaso and Britney stay on the page. The existing production capacity
is an asset in both applications; only the legal shape of the collaboration had to be stated
correctly. Any future rewrite of this section has to keep "freiberuflich / selbstständig / pro
Projekt beauftragt" intact — see the hard constraint noted in `docs/COPY.md` §7.

**Scope note:** CSS classes and the component file keep their `team__*` / `Team.jsx` names. They
are styling hooks, not a claim about the setup, and renaming them would be churn with no effect on
what a reader or a caseworker sees. The site-wide company "wir" voice is unchanged — with the
collaboration framing in place it reads as Yannick plus project partners, which is accurate.

---

## 2026-06-10 — Always push after every commit in the same session

**Decision:** Every commit must be followed by `git push origin main` in the same session. Never leave a commit without pushing before ending a session.

**Rationale:** For a solo-developer repo hosted on GitHub Pages, an unpushed commit is effectively lost if the machine fails — the remote is the only backup. Pushing is the last step of every deploy flow; skipping it also means the live site is not updated. This rule is enforced at the session level: commit and push are treated as a single atomic action.

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
