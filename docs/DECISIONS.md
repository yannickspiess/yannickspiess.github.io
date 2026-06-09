# DECISIONS

Architectural, product, and implementation decisions with rationale.

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
