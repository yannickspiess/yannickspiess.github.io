# Handoff

Last updated: 2026-03-02

## Current Objective
- Keep `yannickspiess.github.io` deployed and make future updates simple.

## Current State
- Done and stable: placeholder page is live at `https://yannickspiess.github.io/`.
- Done and stable: deploy flow works from local repo using standard `git add/commit/push`.
- Done and stable: `main` branch protection blocks force pushes and branch deletion.
- In progress: decide whether to apply stricter protections (signed commits, PR-only flow).
- Blocked: none.

## Validation
- Commands run:
  - `gh api repos/yannickspiess/yannickspiess.github.io/pages --jq '{status:.status,url:.html_url,source_branch:.source.branch,source_path:.source.path,https_enforced:.https_enforced}'`
  - `curl -sS -I https://yannickspiess.github.io/ | head -n 1`
  - `gh api repos/yannickspiess/yannickspiess.github.io/collaborators --jq '.[].login'`
  - `gh api repos/yannickspiess/yannickspiess.github.io/branches/main/protection --jq '{allow_force_pushes:.allow_force_pushes.enabled,allow_deletions:.allow_deletions.enabled}'`
- Results:
  - Pages status `built`, source `main` + `/`, HTTPS enforced.
  - Site returns `HTTP/2 200`.
  - Only collaborator login is `yannickspiess`.
  - `allow_force_pushes=false`, `allow_deletions=false`.

## Open Risks
- Direct pushes to `main` are still allowed for owner account.
- Signed commits are not enforced.

## Next Steps
1. Choose hardening profile: balanced, strict (signed commits), or very strict (PR-only).
2. Replace placeholder `index.html` with real initial homepage content.
3. Keep this handoff updated whenever deployment/security settings change.
