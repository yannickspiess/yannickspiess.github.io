# CLAUDE.md

## Repo Purpose
- This repository hosts the GitHub Pages user site at `https://yannickspiess.github.io/`.
- The live site is a single-page portfolio implemented in `index.html`.

## Copy
- Before writing or iterating ANY copy, read `docs/COPY.md` (voice guide + full copy in render order). Change copy with the whole narrative arc in view, not line-by-line. All copy is prototype-stage; keep `docs/COPY.md` and the `.jsx` files in sync in the same pass.

## Deploy (Default Flow)
Run this for normal content updates:

```bash
# Repo currently lives inside the Obsidian vault (its own git repo, nested in the vault repo):
cd "/Users/yannickspiess/Library/Mobile Documents/iCloud~md~obsidian/Documents/Obsidian/03 Records/Work/Portfolio/Portfolio Website 2026/yannickspiess.github.io"
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
