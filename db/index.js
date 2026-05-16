const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'db/skillbridge.db');

let dbPromise;

async function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });
      
      // Auto-migrate on start
      await db.run("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'").catch(() => {});
      await db.run("ALTER TABLE users ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP").catch(() => {});
      await db.run("ALTER TABLE services ADD COLUMN status TEXT DEFAULT 'pending'").catch(() => {});
      
      return db;
    })();
  }
  return dbPromise;
}

module.exports = getDb;
