// Qualify — who this is for (and who it isn't). Added in V2 per Jacob feedback:
// the page was missing an explicit fit statement. Honest, no track-record claims.
function Qualify() {
  const fit = [
    'Gründer:innen und Marketing-Leads bei EdTech- und B2B-SaaS-Unternehmen',
    'mit einem Paid-Kanal, der bereits läuft',
    'die besseren Creative-Output wollen — nicht einfach mehr Ad-Volumen',
  ];
  const notFit = [
    'Wer nur einen einzelnen Clip braucht, ohne System dahinter',
    'Wer Markt und Produkt noch nicht validiert hat',
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
        <p className="fit__not-label reveal">Weniger passend:</p>
        <ul className="getlist fit__list fit__list--no reveal">
          {notFit.map((t, i) => (
            <li key={i}>
              <span className="fit__mk fit__mk--no" aria-hidden="true">–</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
window.Qualify = Qualify;
