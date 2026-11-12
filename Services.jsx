import { SERVICES } from '../data.js';

export default function Services() {
  return (
    <section id="services" className="section alt">
      <div className="container">
        <p className="eyebrow">What we do</p>
        <h2>More than a meal</h2>
        <div className="grid3">
          {SERVICES.map(([t, d]) => (
            <article className="card" key={t}><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </div>
    </section>
  );
}
