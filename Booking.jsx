import { useState } from 'react';
import { createReservation } from '../api.js';
import { SITE, TIME_SLOTS, BRANCHES } from '../data.js';

const empty = { name: '', phone: '', email: '', date: '', time: '', guests: 2, branch: BRANCHES[0], specialRequests: '' };

export default function Booking() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const today = new Date().toISOString().slice(0, 10);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setErrors({});
    setStatus({ type: 'loading', message: '' });
    try {
      const res = await createReservation({ ...form, guests: Number(form.guests) });
      setStatus({ type: 'success', message: res.message });
      setForm(empty);
    } catch (err) {
      setErrors(err.fieldErrors || {});
      setStatus({ type: 'error', message: err.message });
    }
  }

  const Field = ({ label, k, children }) => (
    <label className="field">
      <span>{label}</span>
      {children}
      {errors[k] && <em className="err">{errors[k]}</em>}
    </label>
  );

  return (
    <section id="contact" className="section alt">
      <div className="container booking">
        <div>
          <p className="eyebrow">Reservations</p>
          <h2>Reserve your table</h2>
          <p>Pick a date and time, tell us how many are coming — we'll take care of the rest.</p>
          <ul className="info">
            <li>{SITE.address}</li>
            <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li>{SITE.hours.map((h) => <div key={h}>{h}</div>)}</li>
          </ul>
        </div>

        <form className="card form" onSubmit={submit} noValidate>
          <Field label="Name" k="name"><input value={form.name} onChange={set('name')} required /></Field>
          <Field label="Phone / WhatsApp" k="phone"><input type="tel" value={form.phone} onChange={set('phone')} required /></Field>
          <Field label="Email (optional)" k="email"><input type="email" value={form.email} onChange={set('email')} /></Field>
          <div className="two">
            <Field label="Date" k="date"><input type="date" min={today} value={form.date} onChange={set('date')} required /></Field>
            <Field label="Time *" k="time">
              <select value={form.time} onChange={set('time')} required>
                <option value="">Choose a time</option>
                {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
          </div>
          <div className="two">
            <Field label="Guests" k="guests"><input type="number" min="1" max="50" value={form.guests} onChange={set('guests')} /></Field>
            <Field label="Branch *" k="branch">
              <select value={form.branch} onChange={set('branch')}>{BRANCHES.map((b) => <option key={b}>{b}</option>)}</select>
            </Field>
          </div>
          <Field label="Special requests" k="specialRequests"><textarea rows="3" value={form.specialRequests} onChange={set('specialRequests')} /></Field>

          <button className="btn btn-gold" disabled={status.type === 'loading'}>
            {status.type === 'loading' ? 'Sending…' : 'Book a table now'}
          </button>
          {status.type === 'success' && <p className="ok">{status.message}</p>}
          {status.type === 'error' && <p className="err">{status.message}</p>}
          <small>We'll only use your details to confirm your request.</small>
        </form>
      </div>
    </section>
  );
}
