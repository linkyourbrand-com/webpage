import { Pool } from 'pg';
import crypto from 'crypto';

const pgUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/linkyourbrand';
const pool = new Pool({ connectionString: pgUrl });

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Use a sample Cognito ID for organizer (no local users table)
    const sampleCognitoId = 'cognito|sample-organizer-1';
    const e = await client.query(
      `INSERT INTO events (title, description, organizer_cognito_id, location_type, address, start_time, end_time, tags) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
      [
        'Sample Event',
        'Seeded event for testing',
        sampleCognitoId,
        'in_person',
        '123 Main St',
        new Date().toISOString(),
        new Date(Date.now() + 3600 * 1000).toISOString(),
        JSON.stringify(['community', 'free']),
      ]
    );
    const eventId = e.rows[0].id;

    const email = 'guest@example.com';
    const hash = crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex');

    await client.query(
      'INSERT INTO registrations (event_id, attendee_email_hash, status) VALUES ($1,$2,$3)',
      [eventId, hash, 'confirmed']
    );

    await client.query('COMMIT');
    console.log('Postgres seeded');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seeding failed', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
    process.exit();
  }
}

seed();
