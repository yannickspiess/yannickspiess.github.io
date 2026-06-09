// How it works — the system / loop. Where the "loop" framing finally appears,
// and the ONLY place AI is mentioned (contained, quality-framed).
// May go full-bleed within the content frame (wide wrap).
function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap wrap--wide">
        <h2 className="h2 reveal">Es funktioniert als <span className="hero__hl">Loop</span>, nicht als Projekt.</h2>
        <p className="how__intro reveal">
          Jedes Video ist ein Einzelprojekt &ndash; kein System, das sich aufbaut. Zuerst verstehen,
          dann handeln. Jede Phase fließt in die nächste, und was wir messen, schärft die nächste Runde.
        </p>
        <div className="reveal">
          <LoopDiagram />
        </div>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;
