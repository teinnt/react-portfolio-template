import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { Popover } from '@headlessui/react'
import Button from '../Button'
import data from '../../data/portfolio.json'

type CourseSection = {
  title: string
  link: string
}

export const coursesSections: CourseSection[] = [
  {
    title: 'Love',
    link: '/blog/love',
  },
  {
    title: 'Money',
    link: '/blog/money',
  },
  {
    title: 'Mental Healh',
    link: '/blog/mental-health',
  },
  {
    title: 'Physical Health',
    link: '/blog/physical-health',
  },
]

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

  const renderPopup = (title: string, sections: CourseSection[]) => {
    return (
      <Popover style={{ display: 'flex', alignItems: 'center' }}>
        <Popover.Button className={`text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg transition-all duration-300 ease-out first:ml-0 hover:scale-105 active:scale-100 link ${
          data.showCursor ? 'cursor-none' : ''} flex items-center ${theme === 'dark' ? 'hover:bg-slate-600 text-white' : 'hover:bg-slate-100'}`}>
          {title}
        </Popover.Button>

        <Popover.Panel className="absolute z-10">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '16em',
            }}
          >
            {sections.map((a) => (
              <a href={a.link}>
                <Button>{a.title}</Button>
              </a>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    )
  }

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push('/')}
                className="font-medium p-2 laptop:p-0 link"
              >
                {name}.
              </h1>
              <div className="flex items-center">
                {data.darkMode && (
                  <Button
                    onClick={() =>
                      setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                  >
                    <img
                      className="h-6"
                      src={`/images/${theme === 'dark' ? 'moon.svg' : 'sun.svg'}`}
                      alt="Toggle Theme"
                    />
                  </Button>
                )}
                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === 'dark'
                          ? 'menu-white.svg'
                          : 'menu.svg'
                        : theme === 'light'
                          ? 'cancel.svg'
                          : 'cancel-white.svg'
                    }`}
                    alt="Menu Button"
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              } shadow-md rounded-md`}
            >
              {!isBlog ? (
                <div className="grid grid-cols-1">
                  <Button onClick={handleAboutScroll}>About</Button>

                  {renderPopup('Courses', coursesSections)}

                  {showBlog && (
                    <Button onClick={() => router.push('/blog')}>Blog</Button>
                  )}
                  {showResume && (
                    <Button onClick={() => window.open('mailto:YOUR_EMAIL')}>
                      Resume
                    </Button>
                  )}
                  <Button onClick={() => router.push('auth')}>Login</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  <Button onClick={() => router.push('/')}>Home</Button>

                  {renderPopup('Courses', coursesSections)}

                  {showBlog && (
                    <Button onClick={() => router.push('/blog')}>Blog</Button>
                  )}
                  {showResume && (
                    <Button onClick={() => router.push('/resume')}>
                      Resume
                    </Button>
                  )}
                  <Button onClick={() => router.push('auth')}>Login</Button>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
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
        {!isBlog ? (
          <div className="flex">
            <Button onClick={handleAboutScroll}>About</Button>

            {renderPopup('Courses', coursesSections)}

            {showBlog && (
              <Button onClick={() => router.push('/blog')}>Blog</Button>
            )}
            {showResume && (
              <Button onClick={() => router.push('/resume')}>Resume</Button>
            )}
            <Button onClick={() => router.push('auth')}>Login</Button>
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
        ) : (
          <div className="flex">
            <Button onClick={() => router.push('/')}>Home</Button>

            {renderPopup('Courses', coursesSections)}

            {showBlog && (
              <Button onClick={() => router.push('/blog')}>Blog</Button>
            )}
            {showResume && (
              <Button onClick={() => router.push('/resume')}>Resume</Button>
            )}
            <Button onClick={() => router.push('auth')}>Login</Button>
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
        )}
      </div>
    </>
  )
}

export default Header
