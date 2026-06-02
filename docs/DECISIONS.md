# DECISIONS

Architectural, product, and implementation decisions with rationale.

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
