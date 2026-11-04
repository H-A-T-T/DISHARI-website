import type { Service, ServiceCategory } from '@/types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function fetchAllServices(category?: string, query?: string): Promise<Service[]> {
  try {
    const params = new URLSearchParams()
    if (category && category !== 'all') params.append('category', category)
    if (query && query.trim()) params.append('q', query.trim())

    const url = `${API_BASE}/services${params.toString() ? `?${params.toString()}` : ''}`
    const res = await fetch(url, { cache: 'no-store' })

    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('Error fetching services from DB API:', err)
    return []
  }
}

export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(`${API_BASE}/services/${slug}`, { cache: 'no-store' })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error(`HTTP error ${res.status}`)
    }
    return await res.json()
  } catch (err) {
    console.error(`Error fetching service ${slug} from DB API:`, err)
    return null
  }
}
