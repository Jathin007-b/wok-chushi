-- Wok Chushi database schema (SQLite; portable to MySQL/PostgreSQL with minor type changes)

CREATE TABLE IF NOT EXISTS branches (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  name      TEXT NOT NULL UNIQUE,
  address   TEXT,
  phone     TEXT
);

CREATE TABLE IF NOT EXISTS reservations (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  phone          TEXT NOT NULL,
  email          TEXT,
  reservation_date TEXT NOT NULL,              -- YYYY-MM-DD
  reservation_time TEXT NOT NULL,              -- e.g. '7:00 PM'
  guests         INTEGER NOT NULL CHECK (guests BETWEEN 1 AND 50),
  branch_id      INTEGER NOT NULL,
  special_requests TEXT,
  status         TEXT NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending','confirmed','cancelled')),
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE INDEX IF NOT EXISTS idx_res_date ON reservations(reservation_date, reservation_time);
CREATE INDEX IF NOT EXISTS idx_res_status ON reservations(status);

CREATE TABLE IF NOT EXISTS offers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  tag         TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  active      INTEGER NOT NULL DEFAULT 1
);
