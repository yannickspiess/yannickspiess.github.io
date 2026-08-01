# CLAUDE.md

## Repo Purpose
- This repository hosts the GitHub Pages user site at `https://yannickspiess.github.io/`.
- The live site is a single-page portfolio implemented in `index.html`.

## Copy rule (READ FIRST)
- **Before ANY copy change — new copy, edits, rewrites, or iteration — you MUST read `docs/COPY.md` first.** No exceptions, even for a one-word change.
- `docs/COPY.md` is the voice guide + the full site copy in render order. Change copy **holistically** (whole narrative arc in view), never line-by-line in isolation.
- All copy is prototype-stage (write best-effort, Yannick iterates — no review gate). Keep `docs/COPY.md` and the `.jsx` files in sync in the **same** commit.

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
