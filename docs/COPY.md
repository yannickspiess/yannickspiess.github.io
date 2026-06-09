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
- Subline: **Wie dein internes Video-Team: Strategie, Produktion und Distribution aus einer Hand.**
- CTA primary: **Audit starten** → `/kontakt.html`
- CTA secondary: **So funktioniert es** → `#how`
- Video pause toggle (a11y label): **Video pausieren** / **Video abspielen**

### 2 · Platform strip — `Proof.jsx` `#platforms`
*Job: quiet trust texture under the hero. Logos only, no label.*
- (Instagram · Facebook · TikTok · YouTube logos — no text)

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
  - Gründer:innen und Marketing-Leads bei EdTech- und B2B-SaaS-Unternehmen
  - mit einem Paid-Kanal, der bereits läuft
  - die besseren Creative-Output wollen — nicht einfach mehr Ad-Volumen
- Label: **Weniger passend:**
- Not-fit –:
  - Wer nur einen einzelnen Clip braucht, ohne System dahinter
  - Wer Markt und Produkt noch nicht validiert hat

### 6 · So startet ein Projekt — `PilotOffer.jsx` `#pilot`
*Job: show the entry engagement; no fixed price, no implied customer base. (No eyebrow.)*
- H2: **Ein klarer Einstieg, kein Jahresvertrag.**
- Lead: **Ein typischer Einstieg ist ein 4-Wochen-Sprint: ein Funnel, drei bis fünf Creative-Varianten, eine Iterationsrunde. Genug, um echte Signale zu sehen — ohne großes Commitment im Voraus.**
- Note: **Scope und Investment definieren wir gemeinsam im ersten Gespräch, abhängig von Geschwindigkeit, Projektgröße und Ausgangslage. Keine Pauschale von der Stange — maßgeschneiderte Arbeit braucht einen passenden Rahmen.**

### 7 · Team — `Team.jsx` `#team`
*Job: real people = the proof substitute (no testimonials yet). (No eyebrow.)*
- H2: **Ein kleines, festes Team.**
- Lead: **Keine Abteilungs-Übergaben, keine Brief-Schleifen. Yannick übernimmt die strategische Führung — zusammen mit zwei Leuten, die ihr Handwerk verstehen.**
- Yannick Spiess — *Creative Director & Strategie* — Strategische Führung, Konzept und Creative Direction — das Rückgrat des Systems.
- Tommaso — *Kamera & Videografie* — Produktion auf hohem handwerklichen Niveau, von der Kamera bis zum Schnitt. *(surname TODO)*
- Britney Tan — *Social Media* — Distribution und Präsenz über Meta, TikTok und YouTube — bezahlt und organisch.

### 8 · Soft close — `SoftClose.jsx` `#lets-talk`
*Job: one unambiguous CTA.*
- H2: **Dein nächster Schritt: ein 30-minütiger Audit.**
- Sub: **30 Minuten, kostenlos, kein Risiko. Füll das kurze Formular aus — wir melden uns für einen Termin.**
- CTA: **Audit starten** → `/kontakt.html`

### Footer (every page) — `Footer.jsx`
- Yannick Spiess · Berlin · yannick.spiess@icloud.com · © 2026

---

## Contact page — `kontakt.html` / `ContactForm.jsx`
*Job: qualify before a call. Form + WhatsApp fallback. Formspree/WhatsApp are still TODO_
placeholders, but the failure paths are graceful: the WhatsApp block only renders once the
number is real, and the misconfigured/error states show a clickable mailto fallback.*
- Heading: **Lass uns sprechen.**
- Intro: **Damit wir gut vorbereitet sind: Ein paar Fragen vor unserem Gespräch.**
- Fields: Vorname · Nachname · E-Mail · Telefon (optional) · Brand / Unternehmen ·
  Deine Rolle (optional) · Monatliches Adspend (Meta / TikTok, select) ·
  Projektbeschreibung · Weitere Ansprechpartner (optional)
- Submit: **Anfrage senden** / sending: **Wird gesendet…**
- Success: **Danke für deine Anfrage — wir melden uns in der Regel innerhalb von 24 Stunden.**
- Error: **Etwas ist schiefgelaufen. Bitte versuche es erneut — oder schreib uns direkt an [E-Mail-Adresse].**
- Misconfigured (pre-launch only): **Das Formular ist noch nicht fertig eingerichtet. Schreib uns direkt an [E-Mail-Adresse] — wir melden uns.**
- WhatsApp (renders only once the number is configured): **Du erreichst uns auch direkt per WhatsApp:** → **WhatsApp öffnen**

---

## Known weak spots / open copy questions (prototype)
- The old "Was das für dich bedeutet / what you get" beat was merged away — is the
  offer still paraphrase-able in one sentence without it? (Structural call, not just copy.)
- Mixed register: `du` + English jargon density. Decide how much English stays
  (e.g. "Acquisition-Flow", "Creative-Output", "Ad-Volumen" in the Loop/Qualify copy).
