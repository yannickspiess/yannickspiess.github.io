# AGENTS.md

## Repo Purpose
- This repository hosts the GitHub Pages user site at `https://yannickspiess.github.io/`.

## Deploy (Default Flow)
Run this for normal content updates:

```bash
cd /Users/yannickspiess/Documents/yannickspiess.github.io
git add .
git commit -m "Update site"
git push
```

## GitHub Pages Setup
- Repository: `yannickspiess/yannickspiess.github.io`
- Source: `main` branch, `/` (root)
- Visibility: `PUBLIC` (required for free-account Pages on user site repos)

## Safety Baseline
- Keep write access restricted to owner account `yannickspiess`.
- Keep branch protection on `main` with force pushes disabled and deletion disabled.
