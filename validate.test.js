import test from 'node:test';
import assert from 'node:assert/strict';
import { validateReservation } from './middleware/validate.js';

const future = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
const good = { name: 'Asha', phone: '+91 98765 43210', date: future, time: '7:00 PM', guests: 4 };

test('accepts a valid reservation', () => {
  assert.equal(validateReservation(good).valid, true);
});

test('rejects past dates', () => {
  assert.ok(validateReservation({ ...good, date: '2020-01-01' }).errors.date);
});

test('rejects unknown time slot and bad guest count', () => {
  const r = validateReservation({ ...good, time: '3:00 AM', guests: 0 });
  assert.ok(r.errors.time && r.errors.guests);
});
