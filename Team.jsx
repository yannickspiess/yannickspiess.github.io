// Team — who's behind the work. Added in V2 per Jacob feedback (3 people for now).
// A member with `photo` renders the image; otherwise initials avatar. "#" linkedin = hidden link.
// Still placeholder: Tommaso + Britney photos and LinkedIn URLs.
// Person-as-identity lives here as texture: system-first, Yannick visible but not the headline.
const TEAM = [
  {
    initials: 'YS',
    name: 'Yannick Spiess',
    role: 'Creative Director & Strategie',
    bio: 'Strategische Führung, Konzept und Creative Direction.',
    linkedin: 'https://www.linkedin.com/in/yannick-spiess-15605a312/',
    photo: 'assets/team-yannick.jpg',
  },
  {
    initials: 'TM',
    name: 'Tommaso Marinaro',
    role: 'Kamera & Videografie',
    bio: 'Produktion auf hohem handwerklichen Niveau, von der Kamera bis zum Schnitt.',
    linkedin: '#',
  },
  {
    initials: 'BT',
    name: 'Britney Tan',
    role: 'Social Media',
    bio: 'Distribution und Präsenz über Meta, TikTok und YouTube — bezahlt und organisch.',
    linkedin: '#',
  },
];

function Team() {
  return (
    <section id="team">
      <div className="wrap wrap--wide">
        <h2 className="h2 reveal">Wer das umsetzt.</h2>
        <p className="lead reveal">
          Yannick leitet Strategie und Creative Direction. Für jedes Projekt kommen die richtigen Spezialisten dazu — je nachdem, was das Projekt braucht.
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
      </div>
    </section>
  );
}
window.Team = Team;
