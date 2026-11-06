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

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        citizen_id VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

      -- Ensure demo citizen exists for seamless sandbox & guest sessions
      INSERT INTO users (id, full_name, phone, email, password_hash, citizen_id)
      VALUES (1, 'আহমেদ জামিল', '+8801712345678', 'jamil.citizen@dishari.bd', 'demo1234', 'BD-USER-782')
      ON CONFLICT (id) DO NOTHING;

      SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE(MAX(id), 1)) FROM users;

      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        doc_type VARCHAR(60) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_size INT NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_data TEXT NOT NULL,
        verified BOOLEAN DEFAULT TRUE,
        extracted_meta JSONB DEFAULT '{}'::jsonb,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
      CREATE INDEX IF NOT EXISTS idx_documents_doc_type ON documents(doc_type);

      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        docket_id VARCHAR(50) UNIQUE NOT NULL,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        service_slug VARCHAR(100) NOT NULL,
        service_name_bn VARCHAR(255) NOT NULL,
        service_name_en VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'ready',
        applicant_data JSONB NOT NULL DEFAULT '{}'::jsonb,
        documents_attached JSONB NOT NULL DEFAULT '[]'::jsonb,
        fee_status VARCHAR(50) DEFAULT 'unpaid',
        official_portal_url TEXT,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
      CREATE INDEX IF NOT EXISTS idx_applications_docket_id ON applications(docket_id);
    `)
    console.log('✅ PostgreSQL schema verified: demo citizen, services, users, documents & applications ready.')
  } finally {
    client.release()
  }
}
