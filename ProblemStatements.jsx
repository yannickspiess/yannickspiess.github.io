// Problem Statements — framing title + accordion: click a problem to reveal its solution.
function ProblemStatements() {
  const [open, setOpen] = React.useState(null);

  const items = [
    {
      num: '01',
      problem: 'Du hast Videos produziert\u00a0\u2014 aber sie bringen keine Kunden.',
      solution: 'Videos ohne klare Strategie sind Kosten, keine Investition. Wir richten jeden Inhalt direkt auf Conversions aus\u00a0\u2014 von der Konzeption bis zum laufenden Paid-Funnel.'
    },
    {
      num: '02',
      problem: 'Jedes Video ist ein Einzelprojekt\u00a0\u2014 kein System, das sich aufbaut.',
      solution: 'Ein echtes Growth-System bedeutet: Jedes Video lernt vom letzten. Wir iterieren kontinuierlich auf Basis echter Performance-Daten, nicht nach Bauchgef\u00fchl.'
    },
    {
      num: '03',
      problem: 'Du hast intern kein Team, das Video und Performance gleichzeitig denkt.',
      solution: 'Genau das ist unser Job. Wir denken Strategie, Produktion und Distribution als Einheit\u00a0\u2014 und liefern so, als w\u00e4ren wir dein internes Team.'
    }
  ];

  return (
    <section id="problems">
      <div className="wrap">
        <p className="eyebrow reveal">Die Situation</p>
        <h2 className="h2 reveal">Kommt dir das bekannt vor?</h2>
        <ul className="getlist prob__list">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={i}
                className={'prob__item' + (isOpen ? ' prob__item--open' : '')}
                onClick={() => setOpen(isOpen ? null : i)}
                role="button"
                aria-expanded={isOpen}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(isOpen ? null : i); } }}
              >
                <span className="prob__chevron" aria-hidden="true">{isOpen ? '\u2212' : '+'}</span>
                <div className="prob__body">
                  <span className="prob__q">{item.problem}</span>
                  <div className="prob__ans">
                    <p className="prob__ans-text">{item.solution}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
window.ProblemStatements = ProblemStatements;
