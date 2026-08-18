// PilotOffer — how an engagement starts. Added in V2 per Jacob feedback:
// show the entry project with form, but no fixed price (dynamic pricing).
// Phrasing kept honest: pre-launch, so "ein typischer Einstieg", not "die meisten Kunden".
function PilotOffer() {
  return (
    <section id="pilot" className="alt">
      <div className="wrap">
        <h2 className="h2 reveal">Ein klarer Einstieg in die Zusammenarbeit.</h2>
        <p className="lead reveal">
          Ein typischer Einstieg ist eine erste Arbeit über sechs Wochen: ein Stoff, ein Dreh,
          drei bis fünf Schnittfassungen für die Formate, die du brauchst. Genug, um zu sehen,
          wie eine Zusammenarbeit sich anfühlt.
        </p>
      </div>
    </section>
  );
}
window.PilotOffer = PilotOffer;
