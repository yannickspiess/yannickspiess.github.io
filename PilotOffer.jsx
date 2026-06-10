// PilotOffer — how an engagement starts. Added in V2 per Jacob feedback:
// show the entry project with form, but no fixed price (dynamic pricing).
// Phrasing kept honest: pre-launch, so "ein typischer Einstieg", not "die meisten Kunden".
function PilotOffer() {
  return (
    <section id="pilot" className="alt">
      <div className="wrap">
        <h2 className="h2 reveal">Ein klarer Einstieg, kein Jahresvertrag.</h2>
        <p className="lead reveal">
          Ein typischer Einstieg ist ein 6-Wochen-Sprint: ein Funnel, drei bis fünf
          Creative-Varianten, eine Iterationsrunde. Genug, um echte Signale zu sehen —
          ohne großes Commitment im Voraus.
        </p>
      </div>
    </section>
  );
}
window.PilotOffer = PilotOffer;
