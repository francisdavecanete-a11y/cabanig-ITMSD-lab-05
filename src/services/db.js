import * as SQLite from 'expo-sqlite';

let db = null;

export function getDb() {
  if (!db) {
    db = SQLite.openDatabaseSync('pos_inventory.db');
  }
  return db;
}

const SEED_PRODUCTS = [
  ['Jasmine Rice 1sack', 'Rice & Grains', 1300, 56],
  ['Cooking Oil 1L', 'Cooking Essentials', 82, 58],
  ['Brown Sugar 1kg', 'Baking & Sweeteners', 68, 100],
  ['Coffee 3-in-1', 'Beverages', 50, 200],
  ['Noodles 60g 5x', 'Instant Food', 43, 99],
];

let initialized = false;

export function initDatabase() {
  if (initialized) {
    return getDb();
  }

  try {
    const database = getDb();
    database.execSync('PRAGMA journal_mode = WAL;');
    database.execSync(
      'CREATE TABLE IF NOT EXISTS products (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'name TEXT NOT NULL, ' +
        'category TEXT NOT NULL, ' +
        'price REAL NOT NULL, ' +
        'stock INTEGER NOT NULL' +
        ');'
    );

    const count = database.getFirstSync('SELECT COUNT(*) AS total FROM products');
    if (!count || count.total === 0) {
      SEED_PRODUCTS.forEach(([name, category, price, stock]) => {
        database.runSync(
          'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
          [name, category, price, stock]
        );
      });
    }
    initialized = true;
    return database;
  } catch (error) {
    console.error('initDatabase error:', error);
    throw error;
  }
}
