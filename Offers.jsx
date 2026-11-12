import { useEffect, useState } from 'react';
import { getOffers } from '../api.js';
import { FALLBACK_OFFERS } from '../data.js';

export default function Offers() {
  const [offers, setOffers] = useState(FALLBACK_OFFERS);

  useEffect(() => {
    getOffers().then((o) => o.length && setOffers(o)).catch(() => {});
  }, []);

  return (
    <section id="offers" className="section">
      <div className="container">
        <p className="eyebrow">Limited time</p>
        <h2>Today's offers</h2>
        <div className="grid3">
          {offers.map((o) => (
            <article className="card offer" key={o.id}>
              <span className="tag">{o.tag}</span>
              <h3>{o.title}</h3>
              <p>{o.description}</p>
              <a href="#contact">Reserve &amp; claim →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
