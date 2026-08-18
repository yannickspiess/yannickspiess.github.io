// How it works — the system / loop. Where the "loop" framing finally appears,
// and the ONLY place AI is mentioned (contained, quality-framed).
// May go full-bleed within the content frame (wide wrap).
function HowItWorks() {
  return (
    <section id="how">
      <div className="wrap wrap--wide">
        <h2 className="h2 reveal">So entsteht ein <span className="hero__hl">Video</span>.</h2>
        <p className="how__intro reveal">
          Jede Arbeit beginnt beim Stoff und endet beim fertigen Schnitt. Was in der einen
          Arbeit entsteht, prägt die Bildsprache der nächsten.
        </p>
        <div className="reveal">
          <LoopDiagram />
        </div>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;
