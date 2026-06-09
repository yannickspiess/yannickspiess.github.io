// ContactForm — qualifying contact form for kontakt.html.
// Submits to Formspree. WhatsApp alt link. Placeholders gated at submission time.
const FORMSPREE_ENDPOINT = 'TODO_REPLACE_WITH_FORMSPREE_ENDPOINT';
const WHATSAPP_NUMBER = 'TODO_WHATSAPP';

function ContactForm() {
  const [status, setStatus] = React.useState('idle'); // idle | sending | success | error | misconfigured

  function handleSubmit(e) {
    e.preventDefault();

    if (FORMSPREE_ENDPOINT.startsWith('TODO') || WHATSAPP_NUMBER.startsWith('TODO')) {
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
          Damit wir gut vorbereitet sind: Ein paar Fragen vor unserem Gespräch.
        </p>

        <form className="contact-form__form" onSubmit={handleSubmit} noValidate>
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
              <span className="contact-form__label">Telefon</span>
              <input className="contact-form__input" type="tel" name="telefon" autoComplete="tel" />
            </label>
          </div>

          <div className="contact-form__row contact-form__row--2col">
            <label className="contact-form__field">
              <span className="contact-form__label">Brand / Unternehmen</span>
              <input className="contact-form__input" type="text" name="brand" required />
            </label>
            <label className="contact-form__field">
              <span className="contact-form__label">Deine Rolle</span>
              <input className="contact-form__input" type="text" name="rolle" required />
            </label>
          </div>

          <label className="contact-form__field contact-form__row">
            <span className="contact-form__label">Monatliches Adspend (Meta / TikTok)</span>
            <select className="contact-form__input contact-form__select" name="adspend" required>
              <option value="">Bitte wählen</option>
              <option value="kein-adspend">Noch kein aktiver Adspend</option>
              <option value="unter-1k">Unter 1.000 €/Monat</option>
              <option value="1k-5k">1.000 – 5.000 €/Monat</option>
              <option value="5k-15k">5.000 – 15.000 €/Monat</option>
              <option value="15k-50k">15.000 – 50.000 €/Monat</option>
              <option value="ueber-50k">Über 50.000 €/Monat</option>
            </select>
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
              Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt.
            </p>
          )}
          {status === 'misconfigured' && (
            <p className="contact-form__error">
              Das Formular ist noch nicht fertig eingerichtet. Bitte meld dich direkt per E-Mail.
            </p>
          )}

          <div className="contact-form__actions">
            <button className="btn btn--primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Wird gesendet…' : 'Anfrage senden'}
            </button>
          </div>
        </form>

        <div className="contact-form__whatsapp">
          <p className="contact-form__whatsapp-label">Du erreichst uns auch direkt per WhatsApp:</p>
          <a
            className="contact-form__whatsapp-link"
            href={WHATSAPP_NUMBER.startsWith('TODO') ? '#' : 'https://wa.me/' + WHATSAPP_NUMBER}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp öffnen
          </a>
        </div>
      </div>
    </section>
  );
}
window.ContactForm = ContactForm;
