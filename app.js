import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import reservations from './routes/reservations.js';
import offers from './routes/offers.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()),
}));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/reservations', reservations);
app.use('/api/offers', offers);

app.use((_req, res) => res.status(404).json({ error: 'Not found.' }));
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong.' });
});

export default app;
