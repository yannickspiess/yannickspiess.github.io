// Soft close — low-friction invitation. Links to the dedicated contact page.
function SoftClose() {
  return (
    <section id="lets-talk" className="close">
      <div className="wrap">
        <h2 className="h2 reveal">Dein nächster Schritt: ein 30-minütiger Audit.</h2>
        <p className="close__sub reveal">
          30 Minuten, kostenlos, kein Risiko. Füll das kurze Formular aus — wir melden uns für einen Termin.
        </p>
        <div className="close__cta reveal">
          <a className="btn btn--primary" href="/kontakt.html">Audit starten</a>
        </div>
      </div>
    </section>
  );
}
window.SoftClose = SoftClose;
