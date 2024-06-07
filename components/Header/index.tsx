import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { Popover } from '@headlessui/react'
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

  const { name, showBlog, showResume } = data

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky ${
          theme === 'light' ? 'bg-white' : ''
        } dark:text-white top-0 z-10 tablet:flex`}
      >
        <h1
          onClick={() => router.push('/')}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}.
        </h1>

        <div className="flex">
          {isBlog ? (
            <Button onClick={() => router.push('/')}>Home</Button>
          ) : (
            <Button onClick={handleWorkScroll}>Projects</Button>
          )}
          {!isBlog && <Button onClick={handleAboutScroll}>About</Button>}
          {showResume && (
            <Button onClick={() => router.push('/resume')}>Resume</Button>
          )}
          <Button
            onClick={() => window.open('mailto:nguyendinhkhai04@gmail.com')}
          >
            Email Me
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
