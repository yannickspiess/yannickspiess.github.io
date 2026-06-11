// Datenschutzerklärung — standard GDPR privacy policy (Art. 13 DSGVO).
// Covers exactly what the site actually does: GitHub Pages hosting, Formspree form,
// direct contact channels. Fonts + JS are self-hosted (2026-06-11) — keep it that way,
// or this page becomes inaccurate. Formal Sie-form on purpose (legal boilerplate register).
function Datenschutz() {
  return (
    <section className="legal">
      <div className="wrap wrap--narrow">
        <h1 className="h2 legal__heading">Datenschutzerklärung</h1>

        <h2 className="legal__subheading">1. Verantwortlicher</h2>
        <p className="legal__block">
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:<br /><br />
          Yannick Spiess<br />
          Friedenstrasse 33<br />
          10249 Berlin, Deutschland<br />
          Telefon: <a className="ilink" href="tel:+491713120124">+49 171 3120124</a><br />
          E-Mail: <a className="ilink" href="mailto:yannick.spiess@icloud.com">yannick.spiess@icloud.com</a>
        </p>

        <h2 className="legal__subheading">2. Allgemeine Hinweise</h2>
        <p className="legal__block">
          Diese Website verwendet keine Cookies, keine Analyse- oder Tracking-Dienste und
          bindet keine Inhalte von Drittanbieter-Servern ein. Schriftarten und Skripte werden
          lokal von dieser Website ausgeliefert; beim Aufruf der Seiten werden keine Daten an
          Google oder andere CDN-Anbieter übertragen. Personenbezogene Daten werden nur
          verarbeitet, soweit dies technisch erforderlich ist (Hosting) oder Sie sie uns aktiv
          mitteilen (Kontaktformular, E-Mail, Telefon, WhatsApp).
        </p>

        <h2 className="legal__subheading">3. Hosting (GitHub Pages)</h2>
        <p className="legal__block">
          Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub, Inc.,
          88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim Aufruf der Website
          verarbeitet GitHub technisch notwendige Daten, insbesondere die IP-Adresse des
          aufrufenden Geräts, in Server-Logs. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an der sicheren und effizienten Bereitstellung der Website).
          GitHub ist unter dem EU-U.S. Data Privacy Framework zertifiziert; eine Übermittlung
          in die USA erfolgt auf dieser Grundlage. Weitere Informationen finden Sie in der{' '}
          <a className="ilink" href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von GitHub
          </a>.
        </p>

        <h2 className="legal__subheading">4. Kontaktformular (Formspree)</h2>
        <p className="legal__block">
          Für das Kontaktformular nutzen wir den Dienst Formspree der Formspree, Inc., USA.
          Wenn Sie das Formular absenden, werden die von Ihnen eingegebenen Daten (Name,
          E-Mail-Adresse, optional Telefonnummer und Rolle, Unternehmen, Angaben zum Projekt)
          an Formspree übertragen und von dort per E-Mail an uns weitergeleitet.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher
          Maßnahmen auf Ihre Anfrage) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
          an der Bearbeitung von Anfragen). Die Übermittlung in die USA erfolgt auf Grundlage
          der EU-Standardvertragsklauseln. Wir speichern Ihre Anfrage, bis die Bearbeitung
          abgeschlossen ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
          Weitere Informationen finden Sie in der{' '}
          <a className="ilink" href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Datenschutzerklärung von Formspree
          </a>.
        </p>

        <h2 className="legal__subheading">5. Kontakt per E-Mail, Telefon und WhatsApp</h2>
        <p className="legal__block">
          Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, verarbeiten wir Ihre
          Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b und f DSGVO). Bei der
          Kommunikation über WhatsApp gelten ergänzend die Datenschutzbestimmungen der
          WhatsApp Ireland Limited; dabei können Daten auf Server von Meta in Drittländer
          übertragen werden. Die Nutzung von WhatsApp ist freiwillig — Sie können uns
          jederzeit stattdessen per E-Mail oder Telefon erreichen.
        </p>

        <h2 className="legal__subheading">6. SSL/TLS-Verschlüsselung</h2>
        <p className="legal__block">
          Diese Website nutzt eine SSL/TLS-Verschlüsselung. Daten, die Sie über diese Website
          übermitteln, können nicht von Dritten mitgelesen werden.
        </p>

        <h2 className="legal__subheading">7. Ihre Rechte</h2>
        <p className="legal__block">
          Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden
          personenbezogenen Daten: Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
          (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung
          (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die
          Verarbeitung (Art. 21 DSGVO). Erteilte Einwilligungen können Sie jederzeit mit
          Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Sie haben zudem das Recht,
          sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO);
          zuständig ist die Berliner Beauftragte für Datenschutz und Informationsfreiheit,
          Alt-Moabit 59–61, 10555 Berlin.
        </p>

        <h2 className="legal__subheading">8. Stand</h2>
        <p className="legal__block">
          Juni 2026. Wir passen diese Datenschutzerklärung an, wenn sich die Website oder die
          Rechtslage ändert.
        </p>
      </div>
    </section>
  );
}
window.Datenschutz = Datenschutz;
