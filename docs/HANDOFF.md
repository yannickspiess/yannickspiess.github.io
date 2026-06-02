# HANDOFF

## Current State

Live site: https://yannickspiess.github.io  
Branch: `main` — clean, up to date with origin  
Last commit: `482919c` — Design: center problems section content — equal padding-block

The landing page is fully live. All five content sections are in place:
Hero → PlatformStrip → ProblemStatements → HowItWorks → WhatThisMeans → SoftClose

## Key Files

| File | Role |
|---|---|
| `index.html` | Root shell — loads React via CDN (Babel + unpkg), mounts `App` |
| `kit.css` | All layout and component styles |
| `colors_and_type.css` | Design tokens (colors, type scale, spacing) |
| `ProblemStatements.jsx` | "Kommt dir das bekannt vor?" accordion section |
| `WhatThisMeans.jsx` | "Was das für dich bedeutet" audit-stack section |
| `HowItWorks.jsx` | "So funktioniert es" loop diagram section |
| `LoopDiagram.jsx` | Auto-cycling + expandable loop component |
| `Hero.jsx` | Hero with iPhone mockup, headline, CTA |
| `SoftClose.jsx` | Email capture / CTA close |
| `Footer.jsx`, `Header.jsx` | Site chrome |
| `legacy/` | Old portfolio — kept for reference, not linked from nav |

## Recent Changes (2026-06-02 session)

- `ProblemStatements.jsx`: added `className="alt"` → section now has `--paper-2` (#F2ECE1) background, matching the visual weight of the WhatThisMeans section.
- `kit.css`: added `#problems { padding-block: clamp(64px, 8vh, 112px); }` — overrides the default `--section-y` to reduce the section height and center the content block within the tile.

## Working Tree

Clean. No uncommitted changes.

## Next Steps

- Review full page on mobile viewport — `HowItWorks` loop collapses to vertical stack on ≤760px, worth a visual check.
- Decide on real contact email: `CONTACT` variable in `index.html` is currently `hello@yannickspiess.com` (placeholder).
- The `iphone.png` hero image is a placeholder — swap when real mockup is ready.
- Consider adding `og:image` and `og:description` meta tags for social sharing.

## Verify Locally

```bash
cd /tmp/ys-site   # or wherever the repo is cloned
python3 -m http.server 8765
# open http://localhost:8765
```
