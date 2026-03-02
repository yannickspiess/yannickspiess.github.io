# Worklog

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
