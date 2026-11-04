import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://dishari_user:dishari_password_secure_2026@localhost:5432/dishari_db',
})
