export function WorldMap() {
  return (
    <div className="map-wrap">
      <svg id="worldMap" viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg">
        <g fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5">
          <path d="M 60 60 L 80 50 L 130 48 L 155 65 L 160 90 L 145 110 L 130 130 L 100 145 L 85 130 L 70 115 L 55 95 Z" />
          <path d="M 115 155 L 135 150 L 150 165 L 155 195 L 145 225 L 130 245 L 110 240 L 100 215 L 105 185 Z" />
          <path d="M 218 55 L 245 50 L 265 55 L 270 72 L 255 80 L 240 78 L 220 72 Z" />
          <path d="M 225 95 L 255 88 L 275 100 L 278 140 L 265 175 L 245 195 L 225 185 L 215 155 L 218 120 Z" />
          <path d="M 270 45 L 370 40 L 400 60 L 405 90 L 385 110 L 345 115 L 310 105 L 280 90 L 268 70 Z" />
          <path d="M 360 170 L 400 162 L 420 175 L 418 205 L 395 215 L 368 210 L 355 192 Z" />
        </g>
        <circle className="map-dot" cx="228" cy="65" r="5" style={{ animationDelay: '0.3s' }} />
        <circle className="map-dot-ring" cx="228" cy="65" r="5" style={{ animationDelay: '0.3s' }} />
        <circle className="map-dot" cx="238" cy="68" r="4" style={{ animationDelay: '0.6s' }} />
        <circle className="map-dot" cx="244" cy="58" r="4" style={{ animationDelay: '0.9s' }} />
        <circle className="map-dot" cx="90" cy="62" r="4" style={{ animationDelay: '1.1s' }} />
        <circle className="map-dot" cx="128" cy="138" r="4" style={{ animationDelay: '1.3s' }} />
        <circle className="map-dot" cx="132" cy="155" r="4" style={{ animationDelay: '1.5s' }} />
        <circle className="map-dot" cx="418" cy="215" r="4" style={{ animationDelay: '1.7s' }} />
        <circle className="map-dot" cx="222" cy="44" r="4" style={{ animationDelay: '1.9s' }} />
        <circle className="map-dot" cx="355" cy="112" r="4" style={{ animationDelay: '2.1s' }} />
        <circle className="map-dot" cx="136" cy="215" r="4" style={{ animationDelay: '2.3s' }} />
      </svg>
    </div>
  );
}
