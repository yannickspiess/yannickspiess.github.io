# COPY — voice guide + full site copy in render order

> **Read this before writing or iterating ANY copy on the site.** It exists so
> copy is changed holistically (with the whole narrative arc in view), not
> line-by-line in isolation.
>
> **Status: everything here is prototype-stage.** Nothing is "signed off" or
> reviewed. Write the best version you can; Yannick iterates and corrects where
> he sees fit. There is no advisor/native-review gate.
>
> **Keep this in sync:** when you change a string in a `.jsx` file, change it
> here in the same pass (and vice-versa). This doc and the components must agree.

---

## Who reads the site (one person)

A **warm referral** — a founder or marketing lead someone told "you should talk
to Yannick." They arrive already half-trusting, give the page **30–60 seconds**,
and silently ask: *Is this legit? Do I get what he does? Is it for me?*

## The one job

When they close the tab, one thought must remain:
**"I understand exactly what he does — and I could explain it to my team in one
sentence."** The page is a **clarity machine**, not a persuasion pitch. Every
section serves that one test.

## Voice rules

- **Company voice, never "ich".** "wir" or impersonal. No first-person singular
  (no ich/mein/mir). The site is a company, not a personal portfolio.
- **`du`/`dein`** — informal, direct. Right for a warm referral.
- **Outcome first.** Lead with what the reader gets, then the mechanism.
- **Plain over jargon.** Industry terms that a marketer uses daily are fine
  (Funnel, Creatives, Paid Social). Avoid stacked English buzzphrases
  ("Growth Partner", "Growth-System") — say it plainly.
- **Concrete over abstract.** Prefer a specific image to a clever metaphor.
- **No fake proof.** No invented metrics, no testimonials that don't exist, no
  "unsere Kunden / die meisten" phrasing that implies a customer base.
- **Calm, not loud.** Fewer words, less shouting. The page should feel
  confident, not like it's performing.
- **No negation patterns.** Never use "Keine X, keine/sondern Y" constructions
  (e.g. "Keine Abteilungs-Übergaben, keine Brief-Schleifen"). This is an AI
  copy trope. State what you do — not what you don't do.

## Section rhythm (anti-stuffy)

- Only ~2 sections carry the small mono **eyebrow** label (currently *Warum Video*
  and *Für wen das passt*). Others open with a statement, a question, or the
  visual. Don't add eyebrows back to every section — that's what made it feel
  like a pitch deck.

---

## Full copy, in render order

### Header (every page)
- Wordmark: **Yannick Spiess**
- CTA (home): **Audit starten** → `/kontakt.html`
- CTA (kontakt page): **Zum Formular** → `#contact-form`

### 1 · Hero — `Hero.jsx` `#top`
*Job: land the outcome in 5 seconds; one clear CTA.*
- H1: **Mach _Video_ zu deinem verlässlichen Kanal für neue Kunden.** ("Video" in accent)
- Subline: **Video Ads für Paid Social — Strategie, Produktion und Distribution aus einer Hand.**
- CTA primary: **Audit starten** → `/kontakt.html`
- CTA secondary: **So funktioniert es** → `#how`
- Video pause toggle (a11y label): **Video pausieren** / **Video abspielen**

### 2 · Platform strip — `Proof.jsx` `#platforms`
*Job: quiet trust texture under the hero.*
- Label: **Die Kanäle, auf denen wir arbeiten.**
- (Instagram · Facebook · TikTok · YouTube logos — SVGs, monochrome)

### 3 · Warum Video — `StatCallout.jsx`
*Job: one impact beat — why video works. Not an argument.*
- Eyebrow: **Warum Video**
- Pullquote: **Auf Social entscheidet das beste Video, nicht das größte Budget.**
- Stat 1: **44 %** — mehr Kaufabsicht nach nur 3 Sekunden Video-Werbung.
  - Source: Nielsen BrandEffect-Studie · 173 Kampagnen · Meta
- Stat 2: **612 %** — mehr Engagement mit Video als Bild-Anzeigen auf Meta.
  - Source: Confect.io · 12,7 Mrd. Impressionen · 2023
- (No accent highlight inside the stat descriptions — the numerals + vermilion % carry
  the emphasis; the accent stays reserved for the hero "Video" and the Loop "Loop".)

### 4 · So arbeiten wir — `HowItWorks.jsx` + `LoopDiagram.jsx` `#how`
*Job: the method, as one merged section. The Loop is the centerpiece. (No eyebrow.)*
- H2: **Es funktioniert als _Loop_, nicht als Projekt.**
- Intro: **Zuerst verstehen, dann handeln. Jede Phase fließt in die nächste – und was wir messen, schärft die nächste Runde.**
- Loop stage 01 · **Audit** — Produkt, Kunden, Kanäle und Acquisition-Flow verstehen. Bevor ein Video entsteht.
  - Detail: Bevor ein Video entsteht, klären wir die Ausgangslage: **Produkt, Zielgruppe, bestehende Kanäle und Acquisition-Flow**. So wissen wir, wo Video wirklich etwas bewegt — und wo nicht.
- Loop stage 02 · **Strategie** — Eine Video-Roadmap für Paid Social entwickeln, die zur Situation passt.
  - Detail: Wir entwickeln aus dem Audit eine konkrete **Video-Roadmap**: welche Formate, welche Botschaften, welche Test-Hypothesen zuerst. Kein Schuss ins Blaue.
- Loop stage 03 · **Produktion** — Das Video machen, auf hohem Niveau.
  - Detail: Von Brief bis Final Cut, konzipiert zum Konvertieren. Wir produzieren **mehrere Formate und Hooks gleichzeitig** — damit die Tests direkt in die Distribution fließen. Handwerk und Strategie in einem Durchgang.
- Loop stage 04 · **Distribution** — Auf Meta, TikTok, YouTube und Co. ausspielen. Bezahlt und organisch.
  - Detail: Kampagnen einrichten, Launch starten, laufend anpassen. **Budget, Targeting und Platzierungen werden kontinuierlich optimiert** — nicht einmal eingerichtet und vergessen.
- Loop stage 05 · **Messung & Iteration** — Was funktioniert, skalieren. Die Daten fließen zurück in den Audit.
  - Detail: Performance-Daten zeigen, was ankommt und was nicht. Was funktioniert, wird **skaliert**. Was nicht, wird **iteriert**. Jeder Zyklus macht das System schärfer — das ist der Unterschied zu einem Einzelprojekt.
- Return line: ↺ Messung & Iteration speist zurück in den Audit

### 5 · Für wen das passt — `Qualify.jsx` `#fit`
*Job: honest fit / not-fit. Differentiates, no track-record claims.*
- Eyebrow: **Für wen das passt**
- H2: **Am besten passt das, wenn …**
- Fit ✓:
  - Gründer:innen und Marketing-Leads bei Startups und Scale-ups
  - mit einem Paid-Kanal, der bereits läuft
  - die besseren Creative-Output wollen — nicht einfach mehr Ad-Volumen
- Label: **Weniger passend:**
- Not-fit –:
  - Wer nur einen einzelnen Clip braucht, ohne System dahinter
  - Wer Markt und Produkt noch nicht validiert hat

### 6 · So startet ein Projekt — `PilotOffer.jsx` `#pilot`
*Job: show the entry engagement; no fixed price, no implied customer base. (No eyebrow.)*
- H2: **Ein klarer Einstieg, kein Jahresvertrag.**
- Lead: **Ein typischer Einstieg ist ein 6-Wochen-Sprint: ein Funnel, drei bis fünf Creative-Varianten, eine Iterationsrunde. Genug, um echte Signale zu sehen — ohne großes Commitment im Voraus.**

### ~~7 · People section~~ — **removed 2026-08-01**
*The section that named Tommaso Marinaro and Britney Tan is gone; `Team.jsx` was deleted and the
page goes straight from the pilot offer to the soft close. Reason: the site is public, its URL is
printed in the Gründungszuschuss business plan (§3.3) and it is the only secured KSK
Tätigkeitsnachweis (Ziffer 2.2) — both applications describe a solo operation without employees,
and naming other people invites a question the page cannot fully answer in a caption. Full
rationale in `docs/DECISIONS.md`.*

**Do not reintroduce a people/team section without checking the vault first** (`01 Workspace/
Projects/Transition to Freelance/`). If one ever returns, it must read as project-based
collaboration between self-employed people — never a standing team or employment — and stay
consistent with Businessplan §2.3. The removed copy is recoverable from git history (commit
`236e9f7` and its successor).

*Consequence for the arc: the site currently has **no proof section at all** — testimonials were
ruled out (no fake proof) and the real-people substitute is now gone. The proof burden sits
entirely on the two research stats in §3 and on the specificity of the method in §4.*

### 7 · Soft close — `SoftClose.jsx` `#lets-talk`
*Job: one unambiguous CTA.*
- H2: **Dein nächster Schritt: ein 30-minütiger Audit.**
- Sub: **30 Minuten, kostenlos, kein Risiko. Füll das kurze Formular aus — wir melden uns für einen Termin.**
- CTA: **Audit starten** → `/kontakt.html`

### Footer (every page) — `Footer.jsx`
- Yannick Spiess · Berlin · yannick.spiess@icloud.com · Impressum · Datenschutz · © 2026

---

## Contact page — `kontakt.html` / `ContactForm.jsx`
*Job: qualify before a call — but the form is one option, not the only one. Direct channels
(phone/WhatsApp + email) sit above the form, Schema-M-style (2026-06-11). The form submits
live to Formspree (filled 2026-06-11); the error state shows a clickable mailto fallback.*
- Heading: **Lass uns sprechen.**
- Intro: **Füll das Formular aus — oder melde dich direkt per Telefon, WhatsApp oder E-Mail.**
- Channels row: **Telefon / WhatsApp** → +49 171 3120124 (`tel:`) · **E-Mail** → yannick.spiess@icloud.com (`mailto:`)
- Prep line (below the channels divider — only relevant once you commit to the form):
  **Damit wir gut vorbereitet sind: ein paar Fragen vor unserem Gespräch.**
- Fields: Vorname · Nachname · E-Mail · Telefon (optional) · Brand / Unternehmen ·
  Deine Rolle (optional) · Monatliches Adspend (Meta / Google / TikTok — free input, no preset ranges) ·
  Projektbeschreibung · Weitere Ansprechpartner (optional)
- Submit: **Anfrage senden** / sending: **Wird gesendet…**
- Success: **Danke für deine Anfrage — wir melden uns in der Regel innerhalb von 24 Stunden.**
- Error: **Etwas ist schiefgelaufen. Bitte versuche es erneut — oder schreib uns direkt an [E-Mail-Adresse].**
- Misconfigured (pre-launch only): **Das Formular ist noch nicht fertig eingerichtet. Schreib uns direkt an [E-Mail-Adresse] — wir melden uns.**

---

## Legal page — `impressum.html` / `Impressum.jsx`
*Job: provider identification required by German law (§ 5 DDG, § 18 Abs. 2 MStV). Factual,
no marketing copy. `noindex`. Linked from the footer on every page. Add USt-IdNr. once issued.*
- Heading: **Impressum**
- Sections: Angaben gemäß § 5 DDG (name + address) · Kontakt (Telefon, E-Mail) ·
  Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV · Verbraucherstreitbeilegung
  (nicht bereit oder verpflichtet)

## Privacy page — `datenschutz.html` / `Datenschutz.jsx`
*Job: GDPR privacy policy (Art. 13 DSGVO), standard legal text in Sie-form. Truthful because
fonts + JS are self-hosted (2026-06-11) — if a third-party embed is ever added, update §2 here.*
- Heading: **Datenschutzerklärung**
- Sections: 1 Verantwortlicher · 2 Allgemeine Hinweise (keine Cookies/kein Tracking/lokale
  Fonts) · 3 Hosting GitHub Pages · 4 Kontaktformular Formspree · 5 E-Mail/Telefon/WhatsApp ·
  6 SSL/TLS · 7 Ihre Rechte (Art. 15–21, 77 DSGVO; Berliner Aufsichtsbehörde) · 8 Stand

---

## Known weak spots / open copy questions (prototype)
- The old "Was das für dich bedeutet / what you get" beat was merged away — is the
  offer still paraphrase-able in one sentence without it? (Structural call, not just copy.)
- Mixed register: `du` + English jargon density. Decide how much English stays
  (e.g. "Acquisition-Flow", "Creative-Output", "Ad-Volumen" in the Loop/Qualify copy).
