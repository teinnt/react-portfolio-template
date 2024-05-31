import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { stagger } from '../../animations'
import Button from '../../components/Button'
import Cursor from '../../components/Cursor'
import Header from '../../components/Header'
import { ISOToDate, useIsomorphicLayoutEffect } from '../../utils'
import { getAllPosts } from '../../utils/api'
import { BlogPost } from '../../components/BlogEditor'
import data from '../../data/portfolio.json'

interface LoveProps {
  posts: BlogPost[]
  isShowLove: boolean
  isShowCursor: boolean
}

const Love: React.FC<LoveProps> = ({ posts }) => {
  const showLove = useRef<boolean>(data.showBlog)
  const text = useRef<HTMLHeadingElement>(null)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: 'scale(0.95) skew(10deg)' },
      { y: 0, x: 0, transform: 'scale(1)' }
    )
    if (showLove.current) {
      stagger([text.current], { y: 30 }, { y: 0 })
    } else {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const createLove = () => {
    if (process.env.NODE_ENV === 'development') {
      fetch('/api/Love', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        router.reload()
      })
    } else {
      alert('This feature only works in development mode.')
    }
  }

  const deleteLove = (slug: string) => {
    if (process.env.NODE_ENV === 'development') {
      fetch('/api/Love', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      }).then(() => {
        router.reload()
      })
    } else {
      alert('This feature only works in development mode.')
    }
  }

  return (
    showLove.current && (
      <>
        {data.showCursor && <Cursor />}
        <Head>
          <title>Physical Health</title>
        </Head>
        <div
          className={`container mx-auto mb-10 ${data.showCursor && 'cursor-none'}`}
        >
          <Header isBlog={true} />
          <div className="mt-10">
            <h1
              ref={text}
              className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
            >
              Physical Health
            </h1>
            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
              {posts.map((post) => (
                <div
                  className="cursor-pointer relative"
                  key={post.slug}
                  onClick={() => Router.push(`/Love/${post.slug}`)}
                >
                  <img
                    className="w-full h-60 rounded-lg shadow-lg object-cover"
                    src={post.image}
                    alt={post.title}
                  />
                  <h2 className="mt-5 text-4xl">{post.title}</h2>
                  <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                  <span className="text-sm mt-5 opacity-25">
                    {ISOToDate(post.date)}
                  </span>
                  {process.env.NODE_ENV === 'development' && mounted && (
                    <div className="absolute top-0 right-0">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteLove(post.slug)
                        }}
                        type="primary"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {process.env.NODE_ENV === 'development' && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={createLove} type="primary">
              Add New Post +
            </Button>
          </div>
        )}
      </>
    )
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts: [...posts],
    },
  }
}

export default Love
