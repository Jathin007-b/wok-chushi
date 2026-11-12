import { useState } from 'react';
import { NAV, SITE } from '../data.js';

export function Brand() {
  return (
    <a href="#top" className="brand">
      <span className="brand-mark">厨</span>
      <span><strong>{SITE.name}</strong><small>{SITE.tagline}</small></span>
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Brand />
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        <nav className={open ? 'links open' : 'links'} onClick={() => setOpen(false)}>
          {NAV.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a href="#contact" className="btn btn-gold">Book a table</a>
        </nav>
      </div>
    </header>
  );
}
