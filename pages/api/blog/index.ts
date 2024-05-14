import { writeFile, unlinkSync } from 'fs'
import { stringify } from 'gray-matter'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { getRandomImage } from '../../../utils'
import { NextApiRequest, NextApiResponse } from 'next'

interface BlogMetadata {
  date: string
  title: string
  tagline: string
  preview: string
  image: string
}

export function handler(req: NextApiRequest, res: NextApiResponse) {
  const postsFolder = join(process.cwd(), `/_posts/${uuidv4()}.md`)

  if (process.env.NODE_ENV === 'development') {
    if (req.method === 'POST') {
      const metadata: BlogMetadata = {
        date: new Date().toISOString(),
        title: 'New Blog',
        tagline: 'Amazing New Blog',
        preview:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: getRandomImage(),
      }

      const data = stringify('# New Blog', metadata)
      writeFile(postsFolder, data, 'utf8', (err) => {
        if (err) {
          console.error(err)
          res.status(500).json({
            status: 'ERROR',
            message: err.message,
          })
          return
        }
        res.status(200).json({ status: 'CREATED' })
      })
    } else if (req.method === 'DELETE') {
      const deleteFile = join(process.cwd(), `/_posts/${req.body.slug}.md`)
      try {
        unlinkSync(deleteFile)
        res.status(200).json({ status: 'DONE' })
      } catch (err) {
        console.error(err)
        res.status(500).json({ status: 'ERROR', message: err.message })
      }
    } else {
      res.status(405).json({ name: 'Method Not Allowed' })
    }
  } else {
    res.status(403).json({ name: 'Forbidden', message: 'Access denied' })
  }
}
