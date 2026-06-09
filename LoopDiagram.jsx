// LoopDiagram — five stages. Active stage cycles via auto-timer.
// Hover: chevron turns vermilion. Click: expand panel below with detail.
// Bold key terms in detail animate in with staggered delays on open.
const LOOP_STAGES = [
  {
    n: '01',
    name: 'Audit',
    desc: 'Produkt, Kunden, Kanäle und Acquisition-Flow verstehen. Bevor ein Video entsteht.',
    detail: (
      <React.Fragment>
        Bevor ein Video entsteht, klären wir die Ausgangslage:{' '}
        <strong className="kw">Produkt, Zielgruppe, bestehende Kanäle und Acquisition-Flow</strong>. So wissen wir, wo Video wirklich etwas bewegt — und wo nicht.
      </React.Fragment>
    )
  },
  {
    n: '02',
    name: 'Strategie',
    desc: 'Eine Video-Roadmap für Paid Social entwickeln, die zur Situation passt.',
    detail: (
      <React.Fragment>
        Wir entwickeln aus dem Audit eine konkrete{' '}
        <strong className="kw">Video-Roadmap</strong>: welche Formate, welche Botschaften, welche Test-Hypothesen zuerst. Kein Schuss ins Blaue.
      </React.Fragment>
    )
  },
  {
    n: '03',
    name: 'Produktion',
    desc: 'Das Video machen, auf hohem Niveau.',
    detail: (
      <React.Fragment>
        Von Brief bis Final Cut, konzipiert zum Konvertieren. Wir produzieren{' '}
        <strong className="kw">mehrere Formate und Hooks gleichzeitig</strong> — damit die Tests direkt in die Distribution fließen. Handwerk und Strategie in einem Durchgang.
      </React.Fragment>
    )
  },
  {
    n: '04',
    name: 'Distribution',
    desc: 'Auf Meta, TikTok, YouTube und Co. ausspielen. Bezahlt und organisch.',
    detail: (
      <React.Fragment>
        Kampagnen einrichten, Launch starten, laufend anpassen.{' '}
        <strong className="kw">Budget, Targeting und Platzierungen werden kontinuierlich optimiert</strong> — nicht einmal eingerichtet und vergessen.
      </React.Fragment>
    )
  },
  {
    n: '05',
    name: 'Messung & Iteration',
    desc: 'Was funktioniert, skalieren. Die Daten fließen zurück in den Audit.',
    detail: (
      <React.Fragment>
        Performance-Daten zeigen, was ankommt und was nicht. Was funktioniert, wird{' '}
        <strong className="kw">skaliert</strong>. Was nicht, wird{' '}
        <strong className="kw">iteriert</strong>. Jeder Zyklus macht das System schärfer — das ist der Unterschied zu einem Einzelprojekt.
      </React.Fragment>
    )
  },
];

function LoopDiagram() {
  const reduce = React.useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [active, setActive] = React.useState(reduce ? -1 : 0);
  const [expanded, setExpanded] = React.useState(null);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % LOOP_STAGES.length);
    }, 1400);
    return () => clearInterval(id);
  }, [reduce, paused]);

  const handleClick = (i) => {
    const opening = expanded !== i;
    setExpanded(opening ? i : null);
    setPaused(opening);
    if (opening) setActive(i);
  };

  return (
    <div>
      <div className="loop">
        {LOOP_STAGES.map((s, i) => (
          <div
            key={s.n}
            className={'loop__stage' + (reduce || i === active ? ' active' : '') + (expanded === i ? ' loop__stage--expanded' : '')}
            onMouseEnter={() => { if (!reduce) setActive(i); }}
            onClick={() => handleClick(i)}
            role="button"
            tabIndex={0}
            aria-expanded={expanded === i}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(i); } }}
          >
            <span className="loop__dot"></span>
            <span className="loop__num">{s.n}</span>
            <h3 className="loop__name">{s.name}</h3>
            <p className="loop__desc">{s.desc}</p>
            <span className="loop__chevron">{expanded === i ? '−' : 'Mehr →'}</span>
            {/* Mobile: detail opens directly under the tapped tile (CSS shows this only ≤760px; */}
            {/* desktop uses the single .loop__expand panel below the row instead). */}
            {expanded === i && (
              <div className="loop__inline-expand">
                <p>{s.detail}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {expanded !== null && (
        <div className="loop__expand" key={expanded}>
          <span className="loop__expand-label">{LOOP_STAGES[expanded].n} — {LOOP_STAGES[expanded].name}</span>
          <p className="loop__expand-text">{LOOP_STAGES[expanded].detail}</p>
        </div>
      )}
      <div className="loop__return">
        <span>&#8635; Messung &amp; Iteration speist zurück in den Audit</span>
        <span className="arc"></span>
      </div>
    </div>
  );
}
window.LoopDiagram = LoopDiagram;
