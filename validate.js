export const TIME_SLOTS = [
  '12:30 PM', '1:30 PM', '2:30 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM',
];

export function validateReservation(body = {}) {
  const errors = {};
  const clean = {
    name: String(body.name ?? '').trim(),
    phone: String(body.phone ?? '').trim(),
    email: String(body.email ?? '').trim(),
    date: String(body.date ?? '').trim(),
    time: String(body.time ?? '').trim(),
    guests: Number(body.guests),
    branch: String(body.branch ?? 'Main Branch').trim(),
    specialRequests: String(body.specialRequests ?? '').trim().slice(0, 500),
  };

  if (clean.name.length < 2 || clean.name.length > 80) errors.name = 'Enter your name (2–80 characters).';
  if (!/^\+?[0-9 \-]{8,15}$/.test(clean.phone)) errors.phone = 'Enter a valid phone number.';
  if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) errors.email = 'Enter a valid email.';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(clean.date) || Number.isNaN(Date.parse(clean.date))) {
    errors.date = 'Choose a valid date.';
  } else {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (new Date(clean.date + 'T00:00:00') < today) errors.date = 'Date cannot be in the past.';
  }

  if (!TIME_SLOTS.includes(clean.time)) errors.time = 'Choose an available time slot.';
  if (!Number.isInteger(clean.guests) || clean.guests < 1 || clean.guests > 50) {
    errors.guests = 'Guests must be between 1 and 50.';
  }

  return { errors, clean, valid: Object.keys(errors).length === 0 };
}
