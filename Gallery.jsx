import { GALLERY } from '../data.js';

export default function Gallery() {
  return (
    <section id="gallery" className="section alt">
      <div className="container">
        <p className="eyebrow">Gallery</p>
        <h2>From our kitchen</h2>
        <div className="grid3 gallery">
          {GALLERY.map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" />)}
        </div>
      </div>
    </section>
  );
}
