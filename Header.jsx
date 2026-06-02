// Header — minimal. Orients, doesn't navigate (the page is one scroll).
// Wordmark left, single "Let's talk" text link right. Hairline appears on scroll.
function Header({ wordmark }) {
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
        <a className="hdr__mark" href="#top">{wordmark}</a>
        <a className="hdr__link" href="#lets-talk">Audit starten</a>
      </div>
    </header>
  );
}
window.Header = Header;
