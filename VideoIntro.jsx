// VideoIntro — podcast/interview video placeholder. Builds trust by showing Yannick in conversation.
// Placed after StatCallout, before ProblemStatements.
// YouTube embed: placeholder until a dedicated episode is produced.
function VideoIntro() {
  return (
    <section className="video-intro">
      <div className="wrap wrap--wide">
        <p className="eyebrow reveal">Im Gespräch</p>
        <h2 className="h2 reveal">Yannick über den Ansatz.</h2>
        <div className="video-intro__embed reveal">
          <iframe
            className="video-intro__frame"
            src="https://www.youtube.com/embed/gSNFJbgoaHI"
            title="Yannick Spiess im Interview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
window.VideoIntro = VideoIntro;
