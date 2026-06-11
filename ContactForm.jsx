// ContactForm — qualifying contact form for kontakt.html.
// Submits to Formspree. Direct channels (phone/WhatsApp + email) sit above the form
// so the visitor can pick: form, call, or mail (Schema-M-style contact row).
// Validation is the browser's native required/email handling (localized, zero JS).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojznyvg';
const WHATSAPP_NUMBER = '491713120124';
const PHONE_DISPLAY = '+49 171 3120124';

function ContactForm({ contact }) {
  const [status, setStatus] = React.useState('idle'); // idle | sending | success | error | misconfigured

  function handleSubmit(e) {
    e.preventDefault();

    if (FORMSPREE_ENDPOINT.startsWith('TODO')) {
      setStatus('misconfigured');
      return;
    }

    setStatus('sending');
    const data = new FormData(e.target);

    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then((r) => {
        if (r.ok) { setStatus('success'); } else { setStatus('error'); }
      })
      .catch(() => setStatus('error'));
  }

  if (status === 'success') {
    return (
      <section className="contact-form">
        <div className="wrap wrap--narrow">
          <p className="contact-form__success">
            Danke für deine Anfrage — wir melden uns in der Regel innerhalb von 24 Stunden.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="contact-form">
      <div className="wrap wrap--narrow">
        <h1 className="h2 contact-form__heading">Lass uns sprechen.</h1>
        <p className="contact-form__intro">
          Füll das Formular aus — oder melde dich direkt per Telefon, WhatsApp oder E-Mail.
        </p>

        <div className="contact-form__channels">
          <a className="contact-form__channel" href={'tel:+' + WHATSAPP_NUMBER}>
            <span className="contact-form__channel-label">Telefon / WhatsApp</span>
            {PHONE_DISPLAY}
          </a>
          <a className="contact-form__channel" href={`mailto:${contact}`}>
            <span className="contact-form__channel-label">E-Mail</span>
            {contact}
          </a>
        </div>

        <p className="contact-form__prep">
          Damit wir gut vorbereitet sind: ein paar Fragen vor unserem Gespräch.
        </p>

        <form className="contact-form__form" onSubmit={handleSubmit}>
          <div className="contact-form__row contact-form__row--2col">
            <label className="contact-form__field">
              <span className="contact-form__label">Vorname</span>
              <input className="contact-form__input" type="text" name="vorname" required autoComplete="given-name" />
            </label>
            <label className="contact-form__field">
              <span className="contact-form__label">Nachname</span>
              <input className="contact-form__input" type="text" name="nachname" required autoComplete="family-name" />
            </label>
          </div>

          <div className="contact-form__row contact-form__row--2col">
            <label className="contact-form__field">
              <span className="contact-form__label">E-Mail</span>
              <input className="contact-form__input" type="email" name="email" required autoComplete="email" />
            </label>
            <label className="contact-form__field">
              <span className="contact-form__label">Telefon (optional)</span>
              <input className="contact-form__input" type="tel" name="telefon" autoComplete="tel" />
            </label>
          </div>

          <div className="contact-form__row contact-form__row--2col">
            <label className="contact-form__field">
              <span className="contact-form__label">Brand / Unternehmen</span>
              <input className="contact-form__input" type="text" name="brand" required />
            </label>
            <label className="contact-form__field">
              <span className="contact-form__label">Deine Rolle (optional)</span>
              <input className="contact-form__input" type="text" name="rolle" />
            </label>
          </div>

          <label className="contact-form__field contact-form__row">
            <span className="contact-form__label">Monatliches Adspend (Meta / Google / TikTok)</span>
            <input className="contact-form__input" type="text" name="adspend" required />
          </label>

          <label className="contact-form__field contact-form__row">
            <span className="contact-form__label">Projektbeschreibung</span>
            <textarea className="contact-form__input contact-form__textarea" name="projektbeschreibung" rows="5" required />
          </label>

          <label className="contact-form__field contact-form__row">
            <span className="contact-form__label">Weitere Ansprechpartner (optional)</span>
            <input className="contact-form__input" type="text" name="weitere_ansprechpartner" />
          </label>

          {status === 'error' && (
            <p className="contact-form__error">
              Etwas ist schiefgelaufen. Bitte versuche es erneut — oder schreib uns direkt
              an <a className="ilink" href={`mailto:${contact}`}>{contact}</a>.
            </p>
          )}
          {status === 'misconfigured' && (
            <p className="contact-form__error">
              Das Formular ist noch nicht fertig eingerichtet. Schreib uns direkt
              an <a className="ilink" href={`mailto:${contact}`}>{contact}</a> — wir melden uns.
            </p>
          )}

          <div className="contact-form__actions">
            <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Wird gesendet…' : 'Anfrage senden'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
window.ContactForm = ContactForm;
