// Qualify — who this is for. Added in V2 per Jacob feedback: the page was missing an
// explicit fit statement. Honest, no track-record claims.
// The "Weniger passend" counter-list was removed 2026-08-18 on Yannick's call. Bullet 3
// ('gestalterischen Spielraum geben') is what now carries the eigenschöpferischer-Spielraum
// signal — see docs/DECISIONS.md "KSK-Linie als Copy-Randbedingung" before rewriting it.
function Qualify() {
  const fit = [
    'Gründer:innen und Marketing-Leads bei Startups und Scale-ups',
    'die ihre Kanäle bereits bespielen und jetzt bessere Videos brauchen',
    'die gestalterischen Spielraum geben — und dafür eine eigene Handschrift bekommen',
  ];
  return (
    <section id="fit">
      <div className="wrap">
        <p className="eyebrow reveal">Für wen das passt</p>
        <h2 className="h2 reveal">Am besten passt das, wenn …</h2>
        <ul className="getlist fit__list reveal">
          {fit.map((t, i) => (
            <li key={i}>
              <span className="fit__mk" aria-hidden="true">✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div id="lernvideos" className="fit__learning reveal">
          <h3>Lern- und Erklärvideos</h3>
          <p className="lead">
            Du möchtest Wissen vermitteln oder einen Ablauf verständlich machen? Ich entwickle
            das Konzept und die visuelle Didaktik: Was wird gezeigt, in welcher Reihenfolge,
            aus welcher Perspektive? Daraus gestalte ich Lern- und Erklärvideos — von Buch
            und Regie über Bildgestaltung bis zum Schnitt. Für einzelne Themen oder
            zusammenhängende Lernreihen.
          </p>
        </div>
      </div>
    </section>
  );
}
window.Qualify = Qualify;
