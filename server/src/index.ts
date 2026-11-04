import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './db.js'
import { initDatabase } from './schema.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Dishari Backend API', timestamp: new Date().toISOString() })
})

// Get all services or filter by category/query
app.get('/api/services', async (req, res) => {
  try {
    const { category, q } = req.query
    let query = 'SELECT * FROM services WHERE 1=1'
    const params: any[] = []

    if (category && typeof category === 'string' && category !== 'all') {
      params.push(category)
      query += ` AND category = $${params.length}`
    }

    if (q && typeof q === 'string' && q.trim()) {
      params.push(`%${q.trim().toLowerCase()}%`)
      query += ` AND (LOWER(name_bn) LIKE $${params.length} OR LOWER(name_en) LIKE $${params.length})`
    }

    query += ' ORDER BY id ASC'

    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching services:', error)
    res.status(500).json({ error: 'Failed to fetch services from database' })
  }
})

// Get single service by slug
app.get('/api/services/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const result = await pool.query('SELECT * FROM services WHERE slug = $1', [slug])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error(`Error fetching service ${req.params.slug}:`, error)
    res.status(500).json({ error: 'Failed to fetch service detail' })
  }
})

async function startServer() {
  await initDatabase()
  app.listen(PORT, () => {
    console.log(`🚀 Dishari Backend running on http://localhost:${PORT}`)
  })
}

startServer()
