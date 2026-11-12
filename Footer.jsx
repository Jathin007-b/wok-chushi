import { Brand } from './Navbar.jsx';
import { SITE } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container row between">
        <Brand />
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
