// Platform logo strip — compact supporting element, sits directly below the hero.
// Five platform icons, greyscale, single row, centred. No alt background.
function PlatformStrip() {
  return (
    <div className="plat" id="platforms">
      <div className="wrap wrap--wide">
        <div className="pstrip reveal">

          {/* Instagram */}
          <div className="pstrip__logo" title="Instagram">
            <img src="instagram.png" alt="Instagram" style={{width:'40px',height:'40px',objectFit:'contain'}} />
          </div>

          {/* Facebook */}
          <div className="pstrip__logo" title="Facebook">
            <img src="facebook.png" alt="Facebook" style={{width:'40px',height:'40px',objectFit:'contain'}} />
          </div>

          {/* TikTok */}
          <div className="pstrip__logo" title="TikTok">
            <img src="tiktok.png" alt="TikTok" style={{width:'40px',height:'40px',objectFit:'contain'}} />
          </div>

          {/* YouTube */}
          <div className="pstrip__logo" title="YouTube">
            <img src="youtube.png" alt="YouTube" style={{width:'40px',height:'40px',objectFit:'contain'}} />
          </div>

        </div>
      </div>
    </div>
  );
}
window.PlatformStrip = PlatformStrip;
