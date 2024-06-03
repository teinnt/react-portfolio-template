import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Button from '../Button'
import data from '../../data/portfolio.json'

interface HeaderProps {
  handleWorkScroll?: () => void
  handleAboutScroll?: () => void
  isBlog: boolean
}

const Header: FC<HeaderProps> = ({
  handleWorkScroll,
  handleAboutScroll,
  isBlog,
}) => {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const { name, showBlog } = data

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div
        className={`hidden flex-row items-center justify-between sticky dark:text-white top-0 z-10 tablet:flex`}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1
            onClick={() => router.push('/')}
            className="p-2 laptop:p-0 link"
            style={{
              fontSize: '2rem',
              fontWeight: 'bolder',
              marginTop: '1.5rem',
            }}
          >
            Kim My Hung
          </h1>
          <h2
            onClick={() => router.push('/')}
            className="p-2 laptop:p-0 link"
            style={{ fontSize: '1.5rem', fontWeight: 'bolder' }}
          >
            Seafood
          </h2>
        </div>

        <div className="flex">
          {!isBlog ? (
            <Button classes="font-extrabold" onClick={handleWorkScroll}>
              About
            </Button>
          ) : (
            <Button classes="font-extrabold" onClick={() => router.push('/')}>
              Home
            </Button>
          )}
          {showBlog && (
            <Button
              classes="font-extrabold"
              onClick={() => router.push('/blog')}
            >
              Blog
            </Button>
          )}
          <Button
            classes="font-extrabold"
            onClick={() => window.open('mailto:YOUR_EMAIL')}
          >
            Contact
          </Button>
          {mounted && theme && data.darkMode && (
            <Button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <img
                className="h-6"
                src={`/images/${theme === 'dark' ? 'moon.svg' : 'sun.svg'}`}
                alt="Theme Icon"
              />
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
