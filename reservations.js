import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import db from '../db.js';
import adminAuth from '../middleware/adminAuth.js';
import { validateReservation, TIME_SLOTS } from '../middleware/validate.js';

const router = Router();

const createLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many booking attempts. Please try again later.' },
});

// Public: available time slots
router.get('/slots', (_req, res) => res.json({ slots: TIME_SLOTS }));

// Public: create a reservation
router.post('/', createLimiter, (req, res) => {
  const { errors, clean, valid } = validateReservation(req.body);
  if (!valid) return res.status(400).json({ error: 'Validation failed.', errors });

  const branch = db.prepare('SELECT id FROM branches WHERE name = ?').get(clean.branch);
  if (!branch) return res.status(400).json({ error: 'Validation failed.', errors: { branch: 'Unknown branch.' } });

  const info = db.prepare(`
    INSERT INTO reservations
      (name, phone, email, reservation_date, reservation_time, guests, branch_id, special_requests)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(clean.name, clean.phone, clean.email || null, clean.date, clean.time,
         clean.guests, branch.id, clean.specialRequests || null);

  res.status(201).json({
    id: info.lastInsertRowid,
    status: 'pending',
    message: "Request received! We'll confirm your table shortly.",
  });
});

// Admin: list reservations (?status=pending&date=2026-11-20)
router.get('/', adminAuth, (req, res) => {
  const where = [];
  const params = [];
  if (req.query.status) { where.push('r.status = ?'); params.push(req.query.status); }
  if (req.query.date) { where.push('r.reservation_date = ?'); params.push(req.query.date); }

  const rows = db.prepare(`
    SELECT r.*, b.name AS branch
    FROM reservations r JOIN branches b ON b.id = r.branch_id
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY r.reservation_date, r.reservation_time
  `).all(...params);
  res.json(rows);
});

// Admin: update status
router.patch('/:id/status', adminAuth, (req, res) => {
  const { status } = req.body || {};
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }
  const info = db.prepare('UPDATE reservations SET status = ? WHERE id = ?').run(status, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Reservation not found.' });
  res.json({ id: Number(req.params.id), status });
});

// Admin: delete
router.delete('/:id', adminAuth, (req, res) => {
  const info = db.prepare('DELETE FROM reservations WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Reservation not found.' });
  res.status(204).end();
});

export default router;
