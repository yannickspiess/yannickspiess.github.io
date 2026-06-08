// PilotOffer — how an engagement starts. Added in V2 per Jacob feedback:
// show the entry project with form, but no fixed price (dynamic pricing).
// Phrasing kept honest: pre-launch, so "ein typischer Einstieg", not "die meisten Kunden".
function PilotOffer() {
  return (
    <section id="pilot" className="alt">
      <div className="wrap">
        <p className="eyebrow reveal">Wie ein Projekt startet</p>
        <h2 className="h2 reveal">Ein klarer Einstieg, kein Jahresvertrag.</h2>
        <p className="lead reveal">
          Ein typischer Einstieg ist ein 4-Wochen-Sprint: ein Funnel, drei bis fünf
          Creative-Varianten, eine Iterationsrunde. Genug, um echte Signale zu sehen —
          ohne großes Commitment im Voraus.
        </p>
        <p className="pilot__note reveal">
          Scope und Investment definieren wir gemeinsam im ersten Gespräch, abhängig von
          Geschwindigkeit, Projektgröße und Ausgangslage. Keine Pauschale von der Stange —
          maßgeschneiderte Arbeit braucht einen passenden Rahmen.
        </p>
      </div>
    </section>
  );
}
window.PilotOffer = PilotOffer;
