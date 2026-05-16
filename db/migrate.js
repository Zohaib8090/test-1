const getDb = require('./index');

async function migrate() {
  try {
    const db = await getDb();
    
    console.log('Starting database migration...');

    // Add role to users if it doesn't exist
    try {
      await db.run("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'");
      console.log('Added role column to users table.');
    } catch (e) {
      if (e.message.includes('duplicate column name')) {
        console.log('Role column already exists.');
      } else {
        console.warn('Warning adding role column:', e.message);
      }
    }

    // Add created_at to users if it doesn't exist
    try {
      await db.run("ALTER TABLE users ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP");
      console.log('Added created_at column to users table.');
    } catch (e) {
      if (e.message.includes('duplicate column name')) {
        console.log('created_at column already exists.');
      } else {
        console.warn('Warning adding created_at column:', e.message);
      }
    }

    // Add status to services if it doesn't exist
    try {
      await db.run("ALTER TABLE services ADD COLUMN status TEXT DEFAULT 'pending'");
      console.log('Added status column to services table.');
    } catch (e) {
      if (e.message.includes('duplicate column name')) {
        console.log('Status column already exists.');
      } else {
        console.warn('Warning adding status column:', e.message);
      }
    }

    console.log('Migration completed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

migrate();
