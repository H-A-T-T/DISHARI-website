import { pool } from './db.js'

export async function initDatabase() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        name_bn VARCHAR(255) NOT NULL,
        name_en VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        department_bn VARCHAR(255) NOT NULL,
        department_en VARCHAR(255) NOT NULL,
        submission_type VARCHAR(50) NOT NULL,
        fee VARCHAR(100) NOT NULL,
        fee_note_bn TEXT,
        processing_time_bn VARCHAR(100) NOT NULL,
        official_url TEXT,
        apply_location_bn TEXT NOT NULL,
        required_docs JSONB NOT NULL DEFAULT '[]'::jsonb,
        steps JSONB NOT NULL DEFAULT '[]'::jsonb,
        important_notes_bn JSONB DEFAULT '[]'::jsonb,
        common_mistakes_bn JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
      CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
    `)
    console.log('✅ PostgreSQL services schema verified and ready.')
  } finally {
    client.release()
  }
}
