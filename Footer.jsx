// Footer — minimal. Wordmark, location, contact, year + one quiet line.
function Footer({ wordmark, contact }) {
  return (
    <footer className="ftr">
      <div className="ftr__row">
        <span className="mark">{wordmark}</span>
        <span className="dot">&middot;</span>
        <span>Berlin</span>
        <span className="dot">&middot;</span>
        <a href={`mailto:${contact}`}>{contact}</a>
        <span className="dot">&middot;</span>
        <span>&copy; 2026</span>
      </div>
    </footer>
  );
}
window.Footer = Footer;
