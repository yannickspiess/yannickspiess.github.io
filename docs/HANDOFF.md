# Handoff

Last updated: 2026-03-02

## Current Objective
- Keep the live one-page portfolio stable and make content updates low-risk.

## Current State
- Done and stable: redesigned portfolio is live at `https://yannickspiess.github.io/`.
- Done and stable: `index.html` contains the current production layout (minimal header, bio intro, curated works list, subdued festival tags, footer email).
- Done and stable: festival/exhibition chips follow `Festival · City` formatting, including latest fixes for `No Other Girl` and `Long Distance`.
- Done and stable: local archive safeguards are active in `.gitignore` (`Old website backup yannickspiess.com/` and `*.pdf`).
- Done and stable: latest deploy commits on `main` are `0992b1b` and `3b968cc`.
- Blocked: none.

## Validation
- Commands run:
  - `git status --short --branch`
  - `git log --oneline -5`
  - `curl -sS -I https://yannickspiess.github.io/ | head -n 1`
- Results:
  - Branch `main` is synced with `origin/main`.
  - Latest commit is `3b968cc Fix festival tag labels for No Other Girl and Long Distance`.
  - Site returns `HTTP/2 200`.

## Open Risks
- Festival history is manually curated content; future claims should be source-verified before publishing.
- Direct pushes to `main` are still possible for the owner account.

## Next Steps
1. Optional: add more works only when year/runtime/festival data is confirmed.
2. Optional: capture desktop/mobile screenshots after future copy changes to guard spacing/readability.
3. Keep `docs/HANDOFF.md`, `docs/WORKLOG.md`, and `docs/DECISIONS.md` updated after each deploy.
