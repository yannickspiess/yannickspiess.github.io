// LoopDiagram — four stages (Audit is a separate entry point, not in the loop).
// Active stage + data dot in vermilion; cycles at ~1.4s cadence then loops.
// Hover: full tile pop-out (vermilion bg, inverted text).
// Click: expand panel below with stage detail.
// prefers-reduced-motion => static resting state, all stages visible.
const LOOP_STAGES = [
  {
    n: '01',
    name: 'Strategie',
    desc: 'Eine Video-Roadmap für Paid Social entwickeln, die zur Situation passt.',
    detail: 'Wir analysieren deine Zielgruppe, deine Marktposition und deine aktuellen Kanäle — und bauen daraus eine konkrete Video-Roadmap: welche Formate, welche Botschaften, welche Test-Hypothesen zuerst. Kein Schuss ins Blaue.'
  },
  {
    n: '02',
    name: 'Produktion',
    desc: 'Das Video machen, auf hohem Niveau.',
    detail: 'Von Brief bis Final Cut, konzipiert zum Konvertieren. Wir produzieren mehrere Formate und Hooks gleichzeitig — damit die Tests direkt in die Distribution fließen. Handwerk und Strategie in einem Durchgang.'
  },
  {
    n: '03',
    name: 'Distribution',
    desc: 'Auf Meta, TikTok, YouTube und Co. ausspielen. Bezahlt und organisch.',
    detail: 'Kampagnen einrichten, Launch starten, laufend anpassen. Budget, Targeting und Platzierungen werden kontinuierlich optimiert — nicht einmal eingerichtet und vergessen.'
  },
  {
    n: '04',
    name: 'Messung & Iteration',
    desc: 'Was funktioniert, skalieren. Die Daten fließen zurück in die Strategie.',
    detail: 'Performance-Daten zeigen, was ankommt und was nicht. Was funktioniert, wird skaliert. Was nicht, wird iteriert. Jeder Zyklus macht das System schärfer — das ist der Unterschied zu einem Einzelprojekt.'
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
        <div className="loop__expand">
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
