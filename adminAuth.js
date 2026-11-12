import crypto from 'node:crypto';

export default function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_KEY;
  const provided = req.header('x-admin-key') || '';
  if (!expected) return res.status(503).json({ error: 'Admin access is not configured.' });

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}
