import { Pool } from 'pg';

const pgUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/linkyourbrand';
const pool = new Pool({ connectionString: pgUrl });

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
      CREATE TYPE IF NOT EXISTS location_type AS ENUM ('in_person','remote','hybrid');
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        organizer_cognito_id TEXT,
        rsvp_count INTEGER DEFAULT 0,
        location_type location_type,
        address TEXT,
        start_time TIMESTAMP WITH TIME ZONE,
        end_time TIMESTAMP WITH TIME ZONE,
        organizer_contact TEXT,
        tags JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
        event_id INTEGER REFERENCES events(id) NOT NULL,
        attendee_cognito_id TEXT,
        attendee_email_hash TEXT,
        status TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        UNIQUE (event_id, attendee_email_hash)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS event_tags (
        event_id INTEGER REFERENCES events(id) NOT NULL,
        tag_id INTEGER REFERENCES tags(id) NOT NULL,
        PRIMARY KEY (event_id, tag_id)
      );
    `);

    await client.query('COMMIT');
    console.log('Migrations applied successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
    process.exit();
  }
}

migrate();
