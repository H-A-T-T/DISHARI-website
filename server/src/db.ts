import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const isProduction = process.env.NODE_ENV === 'production' || (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost'))

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://dishari_user:dishari_password_secure_2026@localhost:5432/dishari_db',
  ssl: isProduction ? { rejectUnauthorized: false } : undefined,
})
