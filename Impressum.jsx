// Impressum — legally required provider identification (§ 5 DDG, § 18 Abs. 2 MStV).
// Keep factual and current; no marketing copy here. USt-IdNr. must be added once issued.
function Impressum() {
  return (
    <section className="legal">
      <div className="wrap wrap--narrow">
        <h1 className="h2 legal__heading">Impressum</h1>

        <h2 className="legal__subheading">Angaben gemäß § 5 DDG</h2>
        <p className="legal__block">
          Yannick Spiess<br />
          Friedenstrasse 33<br />
          10249 Berlin<br />
          Deutschland
        </p>

        <h2 className="legal__subheading">Kontakt</h2>
        <p className="legal__block">
          Telefon: <a className="ilink" href="tel:+491713120124">+49 171 3120124</a><br />
          E-Mail: <a className="ilink" href="mailto:yannick.spiess@icloud.com">yannick.spiess@icloud.com</a>
        </p>

        <h2 className="legal__subheading">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p className="legal__block">
          Yannick Spiess<br />
          Friedenstrasse 33<br />
          10249 Berlin
        </p>

        <h2 className="legal__subheading">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p className="legal__block">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
    </section>
  );
}
window.Impressum = Impressum;
