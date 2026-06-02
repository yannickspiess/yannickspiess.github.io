# Decisions

## 2026-03-02 - Use GitHub Pages user-site deploy on `main`
- Context: goal was to publish a minimal site quickly from a new GitHub account.
- Decision: use repository `yannickspiess/yannickspiess.github.io`, publish from `main` branch root, and keep the repo public for free-account Pages compatibility.
- Consequences: deployment is simple (`git push`), but repository content is publicly visible.

## 2026-03-02 - Apply baseline protection on `main`
- Context: user wanted the repo to be tamper-resistant while still easy to update.
- Decision: enable branch protection on `main` with force pushes disabled and branch deletion disabled.
- Consequences: accidental destructive updates are reduced; direct pushes by owner are still possible.

## 2026-03-02 - Replace placeholder with a static single-page portfolio
- Context: the placeholder page was no longer sufficient and needed a finished, credibility-forward public profile.
- Decision: implement the site as a single static `index.html` page with vanilla HTML/CSS (no runtime JavaScript dependency).
- Consequences: updates remain lightweight and fast to deploy; future scale may require splitting content into additional pages or data files.

## 2026-03-02 - Standardize credibility labels as `Festival · City`
- Context: festival tags initially drew too much visual attention and had inconsistent label formats.
- Decision: keep subdued outline-only tags and normalize label format to `Festival · City`.
- Consequences: improved readability/scannability, clearer metadata consistency across all works.

## 2026-03-02 - Keep legacy backup assets local and excluded from Git
- Context: local backup folder contains large archival files intended for reference only, not deployment.
- Decision: enforce `.gitignore` entries for `Old website backup yannickspiess.com/` and `*.pdf`.
- Consequences: reduces risk of accidental large-file pushes and unintended public exposure of archive materials.
