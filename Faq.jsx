import { FAQS } from '../data.js';

export default function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container narrow">
        <p className="eyebrow">FAQ</p>
        <h2>Good to know</h2>
        {FAQS.map(([q, a]) => (
          <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}
