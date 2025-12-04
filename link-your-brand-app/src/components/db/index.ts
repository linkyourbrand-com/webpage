import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const pgUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/linkyourbrand';
export const pgPool = new Pool({ connectionString: pgUrl });
export const db = drizzle(pgPool);

export default { pgPool, db };
