# Handoff

Last updated: 2026-04-22

## Current Objective
- Keep the live one-page portfolio stable and make content updates low-risk.

## Current State
- Done and stable: redesigned portfolio is live at `https://yannickspiess.github.io/`.
- Done and stable: `index.html` contains the current production layout (minimal header, bio intro, curated works list, subdued festival tags, footer email).
- Done and stable: festival/exhibition chips follow `Festival · City` formatting, including latest fixes for `No Other Girl` and `Long Distance`.
- Done and stable: homepage footer no longer links to `/decision-model/`; footer now contains only the collaboration email.
- Done and stable: standalone `decision-model/index.html` and `assets/decision-tree-v6.*` still exist in the repo and remain directly accessible if someone visits `/decision-model/`.
- Done and stable: local archive safeguards are active in `.gitignore` (`Old website backup yannickspiess.com/` and `*.pdf`).
- Done and stable: latest content deploy on `main` is `5be6f85 Remove decision model footer link`.
- Blocked: none.

## Validation
- Commands run:
  - `git status --short --branch`
  - `git log --oneline -5`
  - `curl -sS -I https://yannickspiess.github.io/ | head -n 1`
  - `curl -sS https://yannickspiess.github.io/ | rg -n "What is an hour of your life worth\\?|decision-model"`
- Results:
  - Branch `main` is synced with `origin/main`; local machine currently shows untracked `.DS_Store`.
  - Latest commit is `5be6f85 Remove decision model footer link`.
  - Site returns `HTTP/2 200`.
  - Live homepage contains no `decision-model` or `What is an hour of your life worth?` match.

## Open Risks
- `decision-model/` is still publicly reachable by direct URL until the page and related assets are removed or redirected.
- Festival history is manually curated content; future claims should be source-verified before publishing.
- Direct pushes to `main` are still possible for the owner account.

## Next Steps
1. Optional: remove `decision-model/` and related `assets/decision-tree-v6.*` files if that project should no longer be publicly reachable.
2. Optional: add `.DS_Store` to `.gitignore` if local Finder metadata keeps appearing in `git status`.
3. Optional: add more works only when year/runtime/festival data is confirmed.
4. Keep `docs/HANDOFF.md`, `docs/WORKLOG.md`, and `docs/DECISIONS.md` updated after each deploy.
