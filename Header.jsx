// Header — minimal. Wordmark left, single CTA text link right. Hairline appears on scroll.
// The CTA defaults to the contact page so "Erstgespräch anfragen" does the same thing everywhere
// it appears (hero, header, soft close) — identical label, identical destination.
function Header({ wordmark, homeHref = '#top', ctaHref = '/kontakt.html', ctaLabel = 'Erstgespräch anfragen' }) {
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
