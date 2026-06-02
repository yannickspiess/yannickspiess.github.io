// What this means for you — sells the audit as a concrete, valuable next step.
// Vertical stack, alt background; visually distinct from the accordion above.

// --- Animated SVG icons ---------------------------------------------------

// 01 · Play circle — represents video / creative work
function IconPlay() {
  return (
    <svg className="audit-svg audit-icon-play" viewBox="0 0 44 44" width="38" height="38" fill="none" aria-hidden="true">
      <circle className="icon-ring" cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path className="icon-tri" d="M17 14.5 L17 29.5 L31.5 22 Z" fill="#E1492A" />
    </svg>
  );
}

// 02 · Funnel with three converging dots — represents channels & flow
function IconFunnel() {
  return (
    <svg className="audit-svg audit-icon-funnel" viewBox="0 0 44 44" width="38" height="38" fill="none" aria-hidden="true">
      <path className="icon-funnel"
        d="M7 11 L37 11 L27 28 L27 37 L17 37 L17 28 Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle className="icon-dot icon-dot-a" cx="12" cy="8" r="2.5" fill="#E1492A" />
      <circle className="icon-dot icon-dot-b" cx="22" cy="6" r="2.5" fill="#E1492A" />
      <circle className="icon-dot icon-dot-c" cx="32" cy="8" r="2.5" fill="#E1492A" />
    </svg>
  );
}

// 03 · Radar — scanning sweep, represents positioning / direction finding
function IconRadar() {
  return (
    <svg className="audit-svg audit-icon-radar" viewBox="0 0 44 44" width="38" height="38" fill="none" aria-hidden="true">
      <circle className="icon-ring-outer" cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="22" cy="22" r="4"  stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="22" y1="6"  x2="22" y2="38" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.18" />
      <line x1="6"  y1="22" x2="38" y2="22" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.18" />
      <circle cx="22" cy="22" r="2.5" fill="currentColor" />
      <line className="radar-sweep" x1="22" y1="22" x2="22" y2="5" stroke="#E1492A" strokeWidth="2" strokeLinecap="round" />
      <circle className="radar-blip-a" cx="30" cy="13" r="2" fill="#E1492A" />
      <circle className="radar-blip-b" cx="14" cy="31" r="2" fill="#E1492A" />
    </svg>
  );
}

// -------------------------------------------------------------------------

function WhatThisMeans() {
  const areas = [
    {
      icon: <IconPlay />,
      label: 'Creatives & Markenauftritt',
      desc: 'Deine bestehenden Videos, Ads und dein visueller Auftritt nach außen — was kommuniziert, was nicht ankommt.'
    },
    {
      icon: <IconFunnel />,
      label: 'Kanäle & Funnel',
      desc: 'Wo du aktiv bist, wie Kunden durch deinen Funnel laufen — und an welchen Punkten du sie verlierst.'
    },
    {
      icon: <IconRadar />,
      label: 'Positionierung',
      desc: 'Wie du wahrgenommen wirst, wie du dich differenzierst — und ob das mit deinem Angebot übereinstimmt.'
    }
  ];

  return (
    <section id="what" className="alt">
      <div className="wrap">
        <p className="eyebrow reveal">Was das für dich bedeutet</p>
        <p className="lead reveal">
          Bevor irgendjemand ein Video dreht, verstehen wir deine Situation vollständig.
          Im 60-minütigen Audit schauen wir uns drei Bereiche an:
        </p>
        <ol className="audit-stack">
          {areas.map((area, i) => (
            <li key={i} className="audit-item reveal">
              <div className="audit-item__icon">{area.icon}</div>
              <div className="audit-item__content">
                <strong className="audit-item__label">{area.label}</strong>
                <p className="audit-item__desc">{area.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="audit-result reveal">
          <p className="audit-result__label">Das Ergebnis</p>
          <p className="audit-result__text">
            Du weisst, was funktioniert, was fehlt — und ob Video für dich der richtige nächste{' '}
            <span className="audit-result__kw">Wachstumskanal</span> ist.
          </p>
        </div>
      </div>
    </section>
  );
}
window.WhatThisMeans = WhatThisMeans;
