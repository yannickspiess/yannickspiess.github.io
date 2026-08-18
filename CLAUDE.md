# CLAUDE.md

## Repo Purpose
- This repository hosts the GitHub Pages user site at `https://yannickspiess.github.io/`.
- The live site is a single-page portfolio implemented in `index.html`.

## Copy rule (READ FIRST)
- **Before ANY copy change — new copy, edits, rewrites, or iteration — you MUST read `docs/COPY.md` first.** No exceptions, even for a one-word change.
- `docs/COPY.md` is the voice guide + the full site copy in render order. Change copy **holistically** (whole narrative arc in view), never line-by-line in isolation.
- All copy is prototype-stage (write best-effort, Yannick iterates — no review gate). Keep `docs/COPY.md` and the `.jsx` files in sync in the **same** commit.

### 🔴 The KSK line is a hard constraint on this site's copy (since 2026-08-18)

**This is not a style preference and it outranks every other copy instruction here.** The
site is evidence in two pending applications: its URL is printed in the Gründungszuschuss
business plan (§3.3, read by the Arbeitsagentur), and it is the only secured
Tätigkeitsnachweis for the Künstlersozialkasse application (Fragebogen Ziffer 2.2).

**The sentence the site defends: „Ich entwerfe Videos. Ich setze keine Vorgaben um."**

- **Write "ich", never "wir".** ⚠️ The voice rule here used to say the exact opposite
  ("company voice, never ich"). It was inverted on 2026-08-18. "wir" implies staff and
  contradicts KSK Ziffer 6 ("keine Beschäftigten"). Collaborators are **projektbezogen
  zugezogene Selbständige**, never a "Team".
- **Lead with the work, not the marketing outcome.** Artistic in the first row, commercial
  in the second. Viability must stay visible — it wins the Gründungszuschuss — it just must
  not lead.
- **Never claim media services as your own.** Mediaplanung, Anzeigeneinkauf,
  Kampagnensteuerung and Reporting belong to the client.
  🔴 **Since 2026-08-18 the page no longer says this anywhere.** Yannick removed the
  explicit stage-05 disclaimer ("Die Ausspielung fährst du") and the "Weniger passend"
  counter-list. **The boundary is now carried purely by absence** — the loop has no
  Distribution stage and no Messung stage, and nothing on the page offers media work.
  There is no slack left: adding a sixth stage, a reporting mention, or a media line
  anywhere re-opens Befund 2 outright. If a boundary sentence is ever wanted back,
  say it positively, never as a "keine X"-negation.
- 🔴 **Banned vocabulary:** Video-Wachstumssysteme · Growth-System · Wachstumskanal · wir ·
  Agentur · Team · Audit · Funnel · Acquisition-Flow · Adspend · Distribution (as *my*
  service) · Kampagnen einrichten · Targeting · Performance-Daten · skalieren · iterieren ·
  Test-Hypothesen · Creatives · Ad-Volumen · Creative-Output.
- 🟢 **Use instead:** Video · filmische Arbeiten · Bildgestaltung · ich · Einzelunternehmen ·
  Recherche und Stoffentwicklung · Konzeption · Stoff · Fassungen · Schnittvarianten ·
  Regieentscheidung · Werk · Formatentwurf.
- 🟡 **"Video", not "Film", on the site (Yannick, 2026-08-18).** The customer-facing noun is
  "Video" — it is what this reader says. The KSK evidence rides on the craft vocabulary
  (Stoff, Buch, Treatment, Storyboard, Regie, Bildgestaltung, Kadrage, Dreh, Schnitt,
  Montage, Fassungen), not on the word "Film", so nothing was given up. "Film"/"filmisch"
  stay correct in the KSK-facing documents.
- **This applies to every public surface**, including unrendered `.jsx` files (GitHub Pages
  serves them verbatim at their own URLs — that is why `ProblemStatements.jsx` and
  `WhatThisMeans.jsx` were deleted, not merely unregistered), the `<title>` and meta tags on
  all four pages, `assets/og-image.png` (regenerate via `assets/og-image-gen.html`), and the
  legal pages.

⚠️ **This is not an instruction to be untruthful** — it is the same work described in craft
vocabulary instead of marketing vocabulary. Every permitted term is covered by the record.

Full reasoning: `docs/DECISIONS.md` → "2026-08-18 — Weg B+". Canonical source is the vault:
`01 Workspace/Projects/Transition to Freelance/Working Documents/KSK Künstlereigenschaft —
Rechtsgrundlagen und Nachweisstrategie.md` §6. **Read §6 before any copy change.** If both
applications are ever decided, this constraint can be revisited — until then it stands.

## Operating Rules

- **Always push after every commit.** Commit and push are a single atomic action in every session — never end a session with an unpushed commit. The remote is the only backup for a solo-developer repo.

## Deploy (Default Flow)
Run this for normal content updates:

```bash
cd "/Users/yannickspiess/Documents/daily app/yannickspiess.github.io"
git status --short
git add <changed files>   # avoid `git add -A`: .DS_Store is untracked and not yet in .gitignore
git commit -m "Update site"
git push origin main
```

## Local Archive Safety
- Keep old backup assets local-only and untracked:
  - `Old website backup yannickspiess.com/`
  - `*.pdf`
- Confirm ignore behavior when needed:

```bash
git check-ignore -v "Old website backup yannickspiess.com/<file>.pdf"
```

## GitHub Pages Setup
- Repository: `yannickspiess/yannickspiess.github.io`
- Source: `main` branch, `/` (root)
- Visibility: `PUBLIC` (required for free-account Pages on user site repos)

## Safety Baseline
- Keep write access restricted to owner account `yannickspiess`.
- Keep branch protection on `main` with force pushes disabled and deletion disabled.
