import { writeFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { NextApiRequest, NextApiResponse } from 'next'

interface PostVariables {
  date: string
  title: string
  tagline: string
  preview: string
  image: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const postsFolder = join(process.cwd(), `/_posts/`)

  if (process.env.NODE_ENV === 'development') {
    if (req.method === 'POST') {
      const { date, title, tagline, preview, image } = req.body.variables as PostVariables
      const filePath = join(postsFolder, `${req.body.slug}.md`)

      writeFileSync(filePath, matter.stringify(req.body.content, { date, title, tagline, preview, image }), 'utf-8')
    } else {
      res.status(405).json({ name: 'Method Not Allowed', message: 'This route works in development mode only' })
    }
  } else {
    res.status(403).json({ name: 'Forbidden', message: 'Access denied' })
  }
}
