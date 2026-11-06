import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './db.js'
import { initDatabase } from './schema.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ extended: true, limit: '25mb' }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Dishari Backend API', timestamp: new Date().toISOString() })
})

// Authentication: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body
    if (!fullName || !phone || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const citizenId = 'BD-USER-' + Math.floor(100 + Math.random() * 900)
    const existing = await pool.query('SELECT * FROM users WHERE phone = $1', [phone.trim()])
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'User with this phone number already exists' })
    }

    const result = await pool.query(
      `INSERT INTO users (full_name, phone, email, password_hash, citizen_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, full_name, phone, email, citizen_id, created_at`,
      [fullName.trim(), phone.trim(), email ? email.trim() : null, password, citizenId]
    )

    res.status(201).json({
      success: true,
      user: result.rows[0],
    })
  } catch (error) {
    console.error('Error in registration:', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// Authentication: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password } = req.body
    if (!identifier) {
      return res.status(400).json({ error: 'Identifier is required' })
    }

    const trimmed = identifier.trim()
    const result = await pool.query(
      'SELECT * FROM users WHERE phone = $1 OR email = $1',
      [trimmed]
    )

    if (result.rows.length === 0) {
      // Mock login for seamless demo if user not in DB
      return res.json({
        success: true,
        user: {
          id: 999,
          full_name: 'নাগরিক',
          phone: trimmed,
          email: trimmed.includes('@') ? trimmed : null,
          citizen_id: 'BD-USER-782',
        },
      })
    }

    const user = result.rows[0]
    if (password && user.password_hash !== password) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        full_name: user.full_name,
        phone: user.phone,
        email: user.email,
        citizen_id: user.citizen_id,
      },
    })
  } catch (error) {
    console.error('Error in login:', error)
    res.status(500).json({ error: 'Login failed' })
  }
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

// ─── DOCUMENT LOCKER ENDPOINTS ─────────────────────────────────────────────

// Get all documents for a citizen
app.get('/api/documents', async (req, res) => {
  try {
    const { userId } = req.query
    let query = `
      SELECT id, user_id, doc_type, file_name, file_size, mime_type, verified, extracted_meta, uploaded_at
      FROM documents
    `
    const params: any[] = []

    if (userId) {
      params.push(Number(userId))
      query += ` WHERE user_id = $1`
    }

    query += ` ORDER BY uploaded_at DESC`
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching documents:', error)
    res.status(500).json({ error: 'Failed to fetch documents' })
  }
})

// Upload a document into Document Locker
app.post('/api/documents/upload', async (req, res) => {
  try {
    const { userId, docType, fileName, fileSize, mimeType, fileData, extractedMeta } = req.body

    if (!docType || !fileName || !fileData) {
      return res.status(400).json({ error: 'Missing required document fields' })
    }

    // Default to user ID 1 or demo user if not passed
    const uid = userId ? Number(userId) : 1

    const result = await pool.query(
      `INSERT INTO documents (user_id, doc_type, file_name, file_size, mime_type, file_data, verified, extracted_meta)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, user_id, doc_type, file_name, file_size, mime_type, verified, extracted_meta, uploaded_at`,
      [
        uid,
        docType,
        fileName,
        fileSize || 0,
        mimeType || 'application/octet-stream',
        fileData,
        true,
        extractedMeta ? JSON.stringify(extractedMeta) : '{}',
      ]
    )

    res.status(201).json({
      success: true,
      document: result.rows[0],
    })
  } catch (error) {
    console.error('Error uploading document:', error)
    res.status(500).json({ error: 'Document upload failed' })
  }
})

// Delete a document
app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM documents WHERE id = $1', [Number(id)])
    res.json({ success: true, message: 'Document deleted successfully' })
  } catch (error) {
    console.error('Error deleting document:', error)
    res.status(500).json({ error: 'Failed to delete document' })
  }
})

// ─── CITIZEN APPLICATION DOCKET ENDPOINTS ──────────────────────────────────

// Get applications for a citizen
app.get('/api/applications', async (req, res) => {
  try {
    const { userId } = req.query
    let query = 'SELECT * FROM applications'
    const params: any[] = []

    if (userId) {
      params.push(Number(userId))
      query += ' WHERE user_id = $1'
    }

    query += ' ORDER BY submitted_at DESC'
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching applications:', error)
    res.status(500).json({ error: 'Failed to fetch applications' })
  }
})

// Create / prepare an application docket
app.post('/api/applications', async (req, res) => {
  try {
    const { userId, serviceSlug, serviceNameBn, serviceNameEn, applicantData, documentsAttached, officialPortalUrl } = req.body

    const docketId = 'BD-APP-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000)
    const uid = userId ? Number(userId) : 1

    const result = await pool.query(
      `INSERT INTO applications (docket_id, user_id, service_slug, service_name_bn, service_name_en, status, applicant_data, documents_attached, official_portal_url)
       VALUES ($1, $2, $3, $4, $5, 'ready', $6, $7, $8)
       RETURNING *`,
      [
        docketId,
        uid,
        serviceSlug,
        serviceNameBn,
        serviceNameEn,
        applicantData ? JSON.stringify(applicantData) : '{}',
        documentsAttached ? JSON.stringify(documentsAttached) : '[]',
        officialPortalUrl || null,
      ]
    )

    res.status(201).json({
      success: true,
      application: result.rows[0],
    })
  } catch (error) {
    console.error('Error creating application docket:', error)
    res.status(500).json({ error: 'Failed to create application docket' })
  }
})

// ─── CITIZEN DEADLINES & WELFARE RADAR ──────────────────────────────────────

app.get('/api/deadlines', (req, res) => {
  res.json([
    {
      id: 'tax-return-2026',
      title_bn: 'আয়কর রিটার্ন দাখিল সময়সীমা',
      title_en: 'Income Tax Return Filing Deadline',
      deadline: '2026-11-30',
      category: 'tax',
      urgency: 'high',
      description_bn: 'ব্যক্তিশ্রেণীর সকল করদাতাদের জন্য আয়কর রিটার্ন জমা দেওয়ার জাতীয় শেষ সময়।',
      description_en: 'National deadline for individual taxpayers to file annual tax returns.',
      required_docs: ['TIN Certificate', 'Salary Certificate / Bank Statement'],
      official_link: 'https://etaxnbr.gov.bd'
    },
    {
      id: 'pmet-scholarship-2026',
      title_bn: 'প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট উপবৃত্তি',
      title_en: 'PM Education Assistance Trust Scholarship',
      deadline: '2026-12-15',
      category: 'education',
      urgency: 'medium',
      description_bn: 'মাধ্যমিক ও উচ্চ মাধ্যমিক পর্যায়ের অসচ্ছল মেধাবী শিক্ষার্থীদের আর্থিক সহায়তা প্রদান আবেদন।',
      description_en: 'Scholarship application for underprivileged students in secondary and higher secondary levels.',
      required_docs: ['Birth Certificate', 'Previous Academic Transcript', 'Headmaster Recommendation'],
      official_link: 'http://pmedu.gov.bd'
    },
    {
      id: 'widow-allowance-q4',
      title_bn: 'সমাজসেবা অধিদপ্তর বিধবা ও স্বামী নিগৃহীতা ভাতা তালিকা হালনাগাদ',
      title_en: 'Widow Allowance Beneficiary List Renewal',
      deadline: '2026-12-31',
      category: 'welfare',
      urgency: 'normal',
      description_bn: 'স্থানীয় ইউনিয়ন পরিষদের মাধ্যমে নতুন সুবিধাবোধীদের আবেদন যাচাই-বাছাই।',
      description_en: 'Union council verification for eligible social welfare allowance recipients.',
      required_docs: ['NID Copy', 'Husband Death Certificate', 'Nagorik Shonod'],
      official_link: 'https://dss.gov.bd'
    },
    {
      id: 'trade-license-renewal-2026',
      title_bn: 'পৌরসভা ও ইউনিয়ন ই-ট্রেড লাইসেন্স বার্ষিক নবায়ন',
      title_en: 'Annual Trade License Renewal',
      deadline: '2026-12-31',
      category: 'business',
      urgency: 'normal',
      description_bn: 'ব্যবসা প্রতিষ্ঠানের বার্ষিক ট্রেড লাইসেন্স নবায়নে অতিরিক্ত সারচার্জ এড়ানোর শেষ সুযোগ।',
      description_en: 'Renew business trade licenses to avoid late fee surcharges.',
      required_docs: ['Previous Year Trade License', 'Holding Tax Receipt', 'TIN Certificate'],
      official_link: 'https://etradelicense.gov.bd'
    }
  ])
})

async function startServer() {
  await initDatabase()
  app.listen(PORT, () => {
    console.log(`🚀 Dishari Backend running on http://localhost:${PORT}`)
  })
}

startServer()
