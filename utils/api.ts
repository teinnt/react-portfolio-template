import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { BlogPost } from '../components/BlogEditor'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  var post: BlogPost = {
    date: data['date'],
    slug: realSlug,
    content: content,
    title: data['title'],
    tagline: data['tagline'],
    preview: data['preview'],
    image: data['image'],
  }

  return post
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post != undefined)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

  return posts
}
