# Decisions

## 2026-03-02 - Use GitHub Pages user-site deploy on `main`
- Context: goal was to publish a minimal site quickly from a new GitHub account.
- Decision: use repository `yannickspiess/yannickspiess.github.io`, publish from `main` branch root, and keep the repo public for free-account Pages compatibility.
- Consequences: deployment is simple (`git push`), but repository content is publicly visible.

## 2026-03-02 - Apply baseline protection on `main`
- Context: user wanted the repo to be tamper-resistant while still easy to update.
- Decision: enable branch protection on `main` with force pushes disabled and branch deletion disabled.
- Consequences: accidental destructive updates are reduced; direct pushes by owner are still possible.
