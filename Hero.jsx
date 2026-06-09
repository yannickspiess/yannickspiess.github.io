// Hero — two-column layout: iPhone mockup left, headline + CTA right.
// "Video" highlighted in vermilion accent. Stacks vertically on mobile (text first).
// The screen video autoplays only when the visitor allows motion, and always offers a
// quiet pause toggle (WCAG 2.2.2 — looping motion must be stoppable).
function Hero() {
  const reduce = React.useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [playing, setPlaying] = React.useState(!reduce);
  const videoRef = React.useRef(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <section className="hero" id="top">
      <div className="wrap wrap--wide hero__wrap">
        <div className="hero__phone reveal">
          <div className="hero__phone-screen">
            <video
              ref={videoRef}
              className="hero__screen-video"
              autoPlay={!reduce}
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src="assets/hero-screen.mp4" type="video/mp4" />
            </video>
            <img
              src="iphone.png"
              alt="iPhone Mockup — Paid Social Ads"
              className="hero__iphone"
            />
            <button
              type="button"
              className="hero__video-toggle"
              onClick={togglePlay}
              aria-label={playing ? 'Video pausieren' : 'Video abspielen'}
            >
              {playing ? '❚❚' : '▶'}
            </button>
          </div>
        </div>
        <div className="hero__text">
          <h1 className="hero__title reveal">
            Mach <span className="hero__hl">Video</span> zu deinem verlässlichen Kanal für neue Kunden.
          </h1>
          <p className="hero__sub reveal">
            Wie dein internes Video-Team: Strategie, Produktion und Distribution aus einer Hand.
          </p>
          <div className="hero__cta reveal">
            <a className="btn btn--primary" href="/kontakt.html">Audit starten</a>
            <a className="hero__seclink" href="#how">So funktioniert es</a>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
