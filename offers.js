import { Router } from 'express';
import db from '../db.js';
import adminAuth from '../middleware/adminAuth.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(db.prepare('SELECT id, tag, title, description FROM offers WHERE active = 1 ORDER BY id').all());
});

router.post('/', adminAuth, (req, res) => {
  const { tag, title, description } = req.body || {};
  if (!tag || !title || !description) return res.status(400).json({ error: 'tag, title and description are required.' });
  const info = db.prepare('INSERT INTO offers (tag, title, description) VALUES (?, ?, ?)').run(tag, title, description);
  res.status(201).json({ id: info.lastInsertRowid });
});

router.delete('/:id', adminAuth, (req, res) => {
  db.prepare('UPDATE offers SET active = 0 WHERE id = ?').run(req.params.id);
  res.status(204).end();
});

export default router;
