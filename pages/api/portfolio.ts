import { writeFileSync } from 'fs'
import { join } from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

export function handler(req: NextApiRequest, res: NextApiResponse) {
  const portfolioData = join(process.cwd(), '/data/portfolio.json')

  if (process.env.NODE_ENV === 'development') {
    if (req.method === 'POST') {
      try {
        writeFileSync(portfolioData, JSON.stringify(req.body), 'utf-8')
        res.status(200).json({ status: 'CREATED' })
      } catch (err) {
        console.error(err)
        res.status(500).json({ status: 'ERROR', message: err.message })
      }
    } else {
      res.status(405).json({
        name: 'Method Not Allowed',
        message: 'This route works in development mode only',
      })
    }
  } else {
    res.status(403).json({ name: 'Forbidden', message: 'Access denied' })
  }
}
