// LoopDiagram — five stages of the video work (Stoff -> Buch -> Regie -> Schnitt -> Übergabe).
// The stages are werkbezogen by design: media planning, ad buying and campaign reporting are
// NOT stages here and must not migrate back in. Yannick removed the explicit "die Ausspielung
// fährst du" disclaimer on 2026-08-18 — the boundary now rests on those stages being absent,
// so adding one back is the regression to watch for. See docs/DECISIONS.md
// "KSK-Linie als Copy-Randbedingung" before touching this array.
// The accent follows hover/focus; stage 01 anchors at rest.
// (No auto-timer: cycling every 1.4s repainted faster than a card could be read and made
// hover/expanded states illegible — the reader drives the motion, not a clock.)
// Click: expand panel below with detail. Bold key terms animate in with staggered delays.
const LOOP_STAGES = [
  {
    n: '01',
    name: 'Recherche & Stoff',
    desc: 'Produkt, Publikum und Anlass verstehen. Woraus das Video gemacht wird.',
    detail: (
      <React.Fragment>
        Bevor ein Bild entsteht, klärt sich der Stoff:{' '}
        <strong className="kw">Produkt, Publikum und der Anlass des Videos</strong>. Daraus wird sichtbar, welche Geschichte überhaupt zu erzählen ist.
      </React.Fragment>
    )
  },
  {
    n: '02',
    name: 'Buch & Konzept',
    desc: 'Treatment, Buch und Storyboard.',
    detail: (
      <React.Fragment>
        Aus der Recherche wird ein Plan:{' '}
        <strong className="kw">Treatment, Buch und Storyboard</strong>, dazu Formatentwürfe für die Längen, die du brauchst.
      </React.Fragment>
    )
  },
  {
    n: '03',
    name: 'Regie & Bildgestaltung',
    desc: 'Der Dreh. Bildsprache, Licht und die Führung vor der Kamera.',
    detail: (
      <React.Fragment>
        Am Set entscheidet sich das Video:{' '}
        <strong className="kw">Bildsprache, Licht, Kadrage und die Führung vor der Kamera</strong>. Für größere Drehs ziehe ich projektbezogen Selbständige hinzu.
      </React.Fragment>
    )
  },
  {
    n: '04',
    name: 'Schnitt & Fassungen',
    desc: 'Montage, Rhythmus, Ton. Mehrere Fassungen aus einem Dreh.',
    detail: (
      <React.Fragment>
        In der Montage entstehen{' '}
        <strong className="kw">Rhythmus, Ton und mehrere Schnittfassungen</strong> — verschiedene Längen und Anfänge für die Plätze, an denen das Video laufen soll.
      </React.Fragment>
    )
  },
  {
    n: '05',
    name: 'Übergabe',
    desc: 'Das fertige Video, in den Formaten, die du brauchst.',
    detail: (
      <React.Fragment>
        Du bekommst die fertigen Fassungen samt Rohmaterial —{' '}
        <strong className="kw">in den Formaten und Längen der Kanäle</strong>, auf denen sie laufen sollen.
      </React.Fragment>
    )
  },
];

function LoopDiagram() {
  const reduce = React.useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [active, setActive] = React.useState(0);
  const [expanded, setExpanded] = React.useState(null);
  const panelRef = React.useRef(null);

  const handleClick = (i) => {
    const opening = expanded !== i;
    setExpanded(opening ? i : null);
    if (opening) setActive(i);
  };

  // Desktop: the shared detail panel sits below all five tiles, so opening a middle
  // tile can drop the text off-screen. Nudge it into view (no-op if already visible;
  // the mobile inline expand is display:none's sibling, guarded via offsetParent).
  React.useEffect(() => {
    const panel = panelRef.current;
    if (expanded === null || !panel || panel.offsetParent === null) return;
    panel.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  }, [expanded, reduce]);

  return (
    <div>
      <div className="loop">
        {LOOP_STAGES.map((s, i) => (
          <div
            key={s.n}
            className={'loop__stage' + (i === active ? ' active' : '') + (expanded === i ? ' loop__stage--expanded' : '')}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => handleClick(i)}
            role="button"
            tabIndex={0}
            aria-expanded={expanded === i}
            aria-controls={'loop-detail-' + s.n}
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
        <div className="loop__expand" key={expanded} id={'loop-detail-' + LOOP_STAGES[expanded].n} ref={panelRef}>
          <span className="loop__expand-label">{LOOP_STAGES[expanded].n} — {LOOP_STAGES[expanded].name}</span>
          <p className="loop__expand-text">{LOOP_STAGES[expanded].detail}</p>
        </div>
      )}
      <div className="loop__return">
        <span>&#8635; Das Ergebnis der ersten Runde fließt in die nächste ein</span>
        <span className="arc"></span>
      </div>
    </div>
  );
}
window.LoopDiagram = LoopDiagram;
