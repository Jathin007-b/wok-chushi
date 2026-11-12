const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = res.status === 204 ? null : await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || 'Request failed');
    err.fieldErrors = data?.errors || {};
    throw err;
  }
  return data;
}

export const getOffers = () => request('/api/offers');
export const createReservation = (payload) =>
  request('/api/reservations', { method: 'POST', body: JSON.stringify(payload) });
