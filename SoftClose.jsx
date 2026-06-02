// Soft close — low-friction invitation. Du-Form throughout.
// One clear, easy next step. Opens mail client on submit.
function SoftClose({ contact }) {
  const [email, setEmail] = React.useState('');
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Audit starten');
    const body = encodeURIComponent(
      email ? `Hallo Yannick,\n\n(Von ${email})\n\n` : 'Hallo Yannick,\n\n');
    window.location.href = `mailto:${contact}?subject=${subject}&body=${body}`;
  };
  return (
    <section id="lets-talk" className="close">
      <div className="wrap">
        <h2 className="h2 reveal">Dein nächster Schritt: ein 60-minütiger Audit.</h2>
        <p className="close__sub reveal">
          Hinterlass deine E-Mail — wir melden uns, um einen Termin zu vereinbaren.
        </p>
        <form className="close__form reveal" onSubmit={submit}>
          <input
            className="close__input"
            type="email"
            placeholder="du@firma.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Deine E-Mail"
          />
          <button className="btn btn--primary" type="submit">Audit starten</button>
        </form>
      </div>
    </section>
  );
}
window.SoftClose = SoftClose;
