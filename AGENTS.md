# AGENTS.md

## Repo Purpose
- This repository hosts the GitHub Pages user site at `https://yannickspiess.github.io/`.
- The live site is a single-page portfolio implemented in `index.html`.

## Deploy (Default Flow)
Run this for normal content updates:

```bash
cd /Users/yannickspiess/Documents/yannickspiess.github.io
git status --short
git add -A
git commit -m "Update site"
git push
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
