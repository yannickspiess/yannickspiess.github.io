// LoopDiagram — four stages. Active stage cycles via auto-timer.
// Hover: chevron turns vermilion. Click: expand panel below with detail.
// Bold key terms in detail animate in with staggered delays on open.
const LOOP_STAGES = [
  {
    n: '01',
    name: 'Strategie',
    desc: 'Eine Video-Roadmap für Paid Social entwickeln, die zur Situation passt.',
    detail: (
      <React.Fragment>
        Wir analysieren deine Zielgruppe, deine Marktposition und deine aktuellen Kanäle — und bauen daraus eine konkrete{' '}
        <strong className="kw">Video-Roadmap</strong>: welche Formate, welche Botschaften,{' '}
        <strong className="kw">welche Test-Hypothesen zuerst</strong>. Kein Schuss ins Blaue.
      </React.Fragment>
    )
  },
  {
    n: '02',
    name: 'Produktion',
    desc: 'Das Video machen, auf hohem Niveau.',
    detail: (
      <React.Fragment>
        Von <strong className="kw">Brief bis Final Cut</strong>, konzipiert zum Konvertieren. Wir produzieren mehrere{' '}
        <strong className="kw">Formate und Hooks gleichzeitig</strong> — damit die Tests direkt in die Distribution fließen. Handwerk und Strategie in einem Durchgang.
      </React.Fragment>
    )
  },
  {
    n: '03',
    name: 'Distribution',
    desc: 'Auf Meta, TikTok, YouTube und Co. ausspielen. Bezahlt und organisch.',
    detail: (
      <React.Fragment>
        Kampagnen einrichten, Launch starten, laufend anpassen.{' '}
        <strong className="kw">Budget, Targeting und Platzierungen</strong> werden{' '}
        <strong className="kw">kontinuierlich optimiert</strong> — nicht einmal eingerichtet und vergessen.
      </React.Fragment>
    )
  },
  {
    n: '04',
    name: 'Messung & Iteration',
    desc: 'Was funktioniert, skalieren. Die Daten fließen zurück in die Strategie.',
    detail: (
      <React.Fragment>
        Performance-Daten zeigen, was ankommt und was nicht. Was funktioniert, wird{' '}
        <strong className="kw">skaliert</strong>. Was nicht, wird{' '}
        <strong className="kw">iteriert</strong>. Jeder Zyklus macht das System{' '}
        <strong className="kw">schärfer</strong> — das ist der Unterschied zu einem Einzelprojekt.
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
            <span className="loop__chevron" aria-hidden="true">{expanded === i ? '−' : '+'}</span>
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
        <span>&#8635; Messung &amp; Iteration speist zurück in die Strategie</span>
        <span className="arc"></span>
      </div>
    </div>
  );
}
window.LoopDiagram = LoopDiagram;
