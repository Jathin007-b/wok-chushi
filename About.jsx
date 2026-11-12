import { STATS } from '../data.js';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <div>
          <span className="seal">厨</span>
          <p className="eyebrow">Our story</p>
          <h2>Born in the heat of the wok</h2>
          <p>At Wok Chushi, every plate starts over a roaring flame. Our chefs bring the bold, smoky "wok hei" of Chinese street kitchens to a warm, modern dining room — generous portions, fresh ingredients, and flavours that keep you coming back.</p>
          <div className="stats">
            {STATS.map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}
          </div>
        </div>
        <img src="/images/gallery-interior.jpg" alt="Inside Wok Chushi — lanterns, lacquer tables and warm light" loading="lazy" />
      </div>
    </section>
  );
}
