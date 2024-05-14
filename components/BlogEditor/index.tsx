import React, { useState } from 'react'
import Button from '../Button'
import DatePicker from 'react-datepicker'
import TextareaAutosize from 'react-textarea-autosize'
import { useTheme } from 'next-themes'

import 'react-datepicker/dist/react-datepicker.css'

export interface BlogPost {
  slug: string
  content: string
  date: string
  title: string
  tagline: string
  preview: string
  image: string
}

interface BlogEditorProps {
  post: BlogPost
  close: () => void
  refresh: () => void
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, close, refresh }) => {
  const { theme } = useTheme()
  const [currentTabs, setCurrentTabs] = useState<string>('BLOGDETAILS')
  const [blogContent, setBlogContent] = useState<string>(post.content)
  const [blogVariables, setBlogVariables] = useState<BlogPost>({
    date: post.date,
    title: post.title,
    tagline: post.tagline,
    preview: post.preview,
    image: post.image,
    content: post.content,
    slug: post.slug,
  })

  const savePost = async () => {
    if (process.env.NODE_ENV === 'development') {
      await fetch('/api/blog/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: post.slug,
          content: blogContent,
          variables: blogVariables,
        }),
      }).then((response) => {
        if (response.status === 200) {
          close()
          refresh()
        }
      })
    } else {
      alert('This feature only works in development mode.')
    }
  }

  return (
    <div
      className={`fixed z-10 w-screen h-screen overflow-auto top-0 flex flex-col items-center ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="container my-20">
        <div className="mt-10">
          <div className="z-10 sticky top-12">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl">{blogVariables.title}</h1>
              <div className="flex items-center">
                <Button onClick={savePost} type="primary">
                  Save
                </Button>
                <Button onClick={close}>Close</Button>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => setCurrentTabs('BLOGDETAILS')}
                type={currentTabs === 'BLOGDETAILS' ? 'primary' : undefined}
              >
                Blog Details
              </Button>
              <Button
                onClick={() => setCurrentTabs('CONTENT')}
                type={currentTabs === 'CONTENT' ? 'primary' : undefined}
              >
                Content
              </Button>
            </div>
          </div>
        </div>
        {currentTabs === 'BLOGDETAILS' && (
          <div className="mt-10">
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Date</label>
              <DatePicker
                selected={new Date(blogVariables.date ?? '')}
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                onChange={(date) =>
                  setBlogVariables({
                    ...blogVariables,
                    date: date?.toISOString() || '',
                  })
                }
              />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Title</label>
              <input
                value={blogVariables.title}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    title: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Tagline</label>
              <input
                value={blogVariables.tagline}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    tagline: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Preview (SEO)</label>
              <TextareaAutosize
                value={blogVariables.preview}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    preview: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
              />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Image</label>
              <input
                value={blogVariables.image}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    image: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              />
            </div>
          </div>
        )}

        {currentTabs === 'CONTENT' && (
          <div className="mt-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Content</label>
              <TextareaAutosize
                className="w-full h-auto mt-5 p-4 border hover:border-blue-400 rounded-xl shadow-xl"
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogEditor
