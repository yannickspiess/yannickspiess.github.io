// Zusammenarbeit — who does the work. Added in V2 per Jacob feedback (3 people for now).
// Reframed 2026-08-01 from "Team" to project-based collaboration: Tommaso and Britney are
// self-employed contractors engaged per project, never employees. This section is read as
// evidence in two applications (Gründungszuschuss, KSK) whose text says "Solo-Betrieb ohne
// Angestellte" — so nothing here may suggest a standing team or an employment relationship.
// Must stay consistent with Businessplan §2.3 ("freie Kamera- und Tonleute") and KSK Ziffer 6.
// Internal class names stay `team__*` — they are styling hooks, not a claim about the setup.
// A member with `photo` renders the image; otherwise initials avatar. "#" linkedin = hidden link.
// Still placeholder: Tommaso + Britney photos and LinkedIn URLs.
const TEAM = [
  {
    initials: 'YS',
    name: 'Yannick Spiess',
    role: 'Creative Direction & Strategie',
    bio: 'Strategische Führung, Konzept und Creative Direction — verantwortet jedes Projekt von Anfang bis Ende.',
    linkedin: 'https://www.linkedin.com/in/yannick-spiess-15605a312/',
    photo: 'assets/team-yannick.jpg',
  },
  {
    initials: 'TM',
    name: 'Tommaso Marinaro',
    role: 'Kamera & Schnitt · projektbezogen',
    bio: 'Kommt für Drehs dazu, die mehr als eine Person brauchen — Kamera und Schnitt auf hohem handwerklichen Niveau.',
    linkedin: '#',
  },
  {
    initials: 'BT',
    name: 'Britney Tan',
    role: 'Social Media · projektbezogen',
    bio: 'Kommt dazu, wenn ein Projekt laufende Ausspielung braucht — Meta, TikTok und YouTube, bezahlt und organisch.',
    linkedin: '#',
  },
];

function Team() {
  return (
    <section id="zusammenarbeit">
      <div className="wrap wrap--wide">
        <h2 className="h2 reveal">Für jedes Projekt die richtige Besetzung.</h2>
        <p className="lead reveal">
          Yannick Spiess führt Strategie und Creative Direction und verantwortet jedes Projekt. Für Dreh und Distribution kommen erfahrene Freiberufler:innen dazu — projektbezogen beauftragt, je nachdem, was die Produktion braucht.
        </p>
        <div className="team__grid">
          {TEAM.map((m, i) => (
            <div key={i} className="team__card reveal">
              {m.photo ? (
                <div className="team__photo team__photo--img">
                  <img src={m.photo} alt={m.name} loading="lazy" />
                </div>
              ) : (
                <div className="team__photo" aria-hidden="true">{m.initials}</div>
              )}
              <h3 className="team__name">{m.name}</h3>
              <p className="team__role">{m.role}</p>
              <p className="team__bio">{m.bio}</p>
              {/* A dead '#' link reads as "placeholder shipped live" — render only with a real URL. */}
              {m.linkedin && m.linkedin !== '#' && (
                <a className="team__link" href={m.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              )}
            </div>
          ))}
        </div>
        {/* The one line that resolves the Website ↔ Businessplan ↔ KSK contradiction. Keep it. */}
        <p className="team__note reveal">
          Yannick Spiess arbeitet freiberuflich. Tommaso und Britney sind selbstständig und werden pro Projekt beauftragt.
        </p>
      </div>
    </section>
  );
}
window.Team = Team;
