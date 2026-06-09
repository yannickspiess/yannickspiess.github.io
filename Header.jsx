// Header — minimal. Orients, doesn't navigate (the page is one scroll).
// Wordmark left, single CTA text link right. Hairline appears on scroll.
// homeHref / ctaHref / ctaLabel are optional — defaults preserve main-page behaviour.
function Header({ wordmark, homeHref = '#top', ctaHref = '#lets-talk', ctaLabel = 'Audit starten' }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={'hdr' + (scrolled ? ' hdr--scrolled' : '')}>
      <div className="hdr__bar">
        <a className="hdr__mark" href={homeHref}>{wordmark}</a>
        <a className="hdr__link" href={ctaHref}>{ctaLabel}</a>
      </div>
    </header>
  );
}
window.Header = Header;
