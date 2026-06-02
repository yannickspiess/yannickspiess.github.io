// Hero — two-column layout: iPhone mockup left, headline + CTA right.
// "Video" highlighted in vermilion accent. Stacks vertically on mobile (text first).
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap wrap--wide hero__wrap">
        <div className="hero__phone reveal">
          <div className="hero__phone-screen">
            <video
              className="hero__screen-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="assets/hero-screen.mp4" type="video/mp4" />
            </video>
            <img
              src="iphone.png"
              alt="iPhone Mockup — Paid Social Ads"
              className="hero__iphone"
            />
          </div>
        </div>
        <div className="hero__text">
          <h1 className="hero__title reveal">
            Mach <span className="hero__hl">Video</span> zu deinem verlässlichen Kanal für neue Kunden.
          </h1>
          <p className="hero__sub reveal">
            Dein Paid Social Growth Partner für Meta, YouTube und TikTok.
          </p>
          <div className="hero__cta reveal">
            <a className="btn btn--primary" href="#lets-talk">Audit starten</a>
            <a className="hero__seclink" href="#how">So funktioniert es</a>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
