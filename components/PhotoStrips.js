export const travelPhotos = [
  { src: '/travelPhotos/381e714ee60f8c08d1a5b41d3a0b776f.jpg', label: 'Kedarkantha' },
  { src: '/travelPhotos/15db363c3fb05bd75d7a3da746271a4e.jpg', label: 'Spiti' },
  { src: '/travelPhotos/67cbd397ed299778146468a19ffb771b.jpg', label: 'Hampta' },
  { src: '/travelPhotos/4ed13a77068aaf8bea9511eb642b9763.jpg', label: 'Auli' },
  { src: '/travelPhotos/560f80cffacca7cf48f4899ef5d2f4c5.jpg', label: 'Ladakh' },
  { src: '/travelPhotos/669e67d00e189fc5cd5ece845fb2f417.jpg', label: 'Valley' },
  { src: '/travelPhotos/45e246b6c2b74ed1c2f0e77b4fb52e06.jpg', label: 'Coorg' },
  { src: '/travelPhotos/77b421686d6088e6527cf57d68c69e96.jpg', label: 'Meghalaya' }
];

export default function PhotoStrips({ photos = travelPhotos.slice(0, 4), labels = true, className = '', overlay = true }) {
  return (
    <div className={className} style={{position: 'absolute', inset: 0, display: 'flex', gap: '3px', overflow: 'hidden'}}>
      {photos.map((photo, index) => (
        <div
          key={`${photo.src}-${index}`}
          style={{
            flex: 1,
            backgroundImage: `url(${photo.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            minWidth: 0
          }}
        >
          {overlay && <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.45),transparent 60%)'}}></div>}
          {labels && (
            <div style={{position: 'absolute', left: 0, right: 0, bottom: '10px', textAlign: 'center', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'var(--DS)', zIndex: 1}}>
              {photo.label}
            </div>
          )}
        </div>
      ))}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(14,12,8,1) 0%,transparent 28%)'}}></div>
    </div>
  );
}
