// Soft close — low-friction invitation. Links to the dedicated contact page.
function SoftClose() {
  return (
    <section id="lets-talk" className="close">
      <div className="wrap">
        <h2 className="h2 reveal">Dein nächster Schritt: ein 30-minütiges Erstgespräch.</h2>
        <p className="close__sub reveal">
          Dreißig Minuten, kostenlos. Füll das kurze Formular aus, ich melde mich für einen Termin.
        </p>
        <div className="close__cta reveal">
          <a className="btn btn--primary" href="/kontakt.html">Erstgespräch anfragen</a>
        </div>
      </div>
    </section>
  );
}
window.SoftClose = SoftClose;
