import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || path.join(__dirname, 'wokchushi.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

// ---- Seed data (only when tables are empty) ----
if (db.prepare('SELECT COUNT(*) AS c FROM branches').get().c === 0) {
  db.prepare('INSERT INTO branches (name, address, phone) VALUES (?, ?, ?)')
    .run('Main Branch', 'Wok Chushi, Main Road, Your City', '+91 98765 43210');
}

if (db.prepare('SELECT COUNT(*) AS c FROM offers').get().c === 0) {
  const ins = db.prepare('INSERT INTO offers (tag, title, description) VALUES (?, ?, ?)');
  ins.run('Lunch', 'Weekday Lunch Combo', 'Soup, main and drink at a set price, Mon–Fri till 4 PM.');
  ins.run('Groups', 'Family Feast', 'A sharing platter for four with starters, mains and dessert.');
  ins.run('Happy hour', 'Dim Sum Hour', 'Selected dim sum baskets at special prices, 5–7 PM daily.');
}

export default db;
