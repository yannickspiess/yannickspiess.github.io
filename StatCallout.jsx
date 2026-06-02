// StatCallout — editorial trust block. Two research-backed stats with count-up animation.
// Sits between PlatformStrip and ProblemStatements.

function useCountUp(target, duration, triggered) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!triggered) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setValue(target); return; }
    const startTime = performance.now();
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target, duration]);
  return value;
}

function StatItem({ num, desc, source }) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const count = useCountUp(num, 1800, visible);

  return (
    <div className={'stat-item' + (visible ? ' stat-item--visible' : '')} ref={ref}>
      <p className="stat-item__num">
        {count}<span className="stat-item__pct">%</span>
      </p>
      <p className="stat-item__desc">{desc}</p>
      <p className="stat-item__source">{source}</p>
    </div>
  );
}

function StatCallout() {
  return (
    <section className="stat-callout" aria-label="Forschungsdaten">
      <div className="wrap wrap--wide">
        <p className="eyebrow stat-callout__eyebrow">Aus der Forschung</p>
        <div className="stat-callout__grid">
          <StatItem
            num={44}
            desc="mehr Kaufabsicht nach nur 3 Sekunden Video-Werbung."
            source="Nielsen BrandEffect-Studie · 173 Kampagnen · Meta"
          />
          <div className="stat-callout__rule" aria-hidden="true" />
          <StatItem
            num={612}
            desc="mehr Engagement als Bild-Anzeigen auf Meta."
            source="Confect.io · 12,7 Mrd. Impressionen · 2023"
          />
        </div>
      </div>
    </section>
  );
}
window.StatCallout = StatCallout;
