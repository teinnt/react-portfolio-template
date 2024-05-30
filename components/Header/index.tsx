import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { Popover } from '@headlessui/react'
import Button from '../Button'
import data from '../../data/portfolio.json'
import { useTheme } from 'next-themes'

interface HeaderProps {
  handleAboutScroll?: () => void
  handleContactScroll?: () => void
  isBlog: boolean
}

const Header: FC<HeaderProps> = ({
  handleAboutScroll,
  handleContactScroll,
  isBlog,
}) => {
  const router = useRouter()
  const [languague, setLanguague] = useState<'VN' | 'EN'>('EN')
  const { name } = data
  const { theme } = useTheme()

  return (
    <>
      <Popover className="block tablet:hidden">
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
                <Button
                  type="primary"
                  onClick={() => setLanguague(languague === 'VN' ? 'EN' : 'VN')}
                >
                  {languague}
                </Button>
                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${!open ? 'menu.svg' : 'cancel.svg'}`}
                    alt="Menu Button"
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 bg-slate-800 shadow-md rounded-md`}
            >
              {!isBlog ? (
                <div className="grid grid-cols-1">
                  <div style={{ marginInline: '0.2rem' }}>
                    <Popover>
                      <Popover.Button
                        className={`text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg transition-all duration-300 ease-out first:ml-0 hover:scale-105 active:scale-100 link ${
                          data.showCursor ? 'cursor-none' : ''
                        } ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
                        style={{ width: '100%' }}
                      >
                        Product
                      </Popover.Button>

                      <Popover.Panel className="absolute z-10">
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                          }}
                        >
                          <a href="/product/one">Product One</a>
                          <a href="/product/two">Product Two</a>
                        </div>
                      </Popover.Panel>
                    </Popover>
                  </div>

                  <Button type={'primary'} onClick={() => router.push('/blog')}>
                    Blog
                  </Button>

                  <Button type={'primary'} onClick={handleAboutScroll}>
                    About
                  </Button>
                  <Button type={'primary'} onClick={handleContactScroll}>
                    Contact
                  </Button>
                  <Button
                    onClick={() =>
                      setLanguague(languague === 'VN' ? 'EN' : 'VN')
                    }
                  >
                    <div className="h-6">{languague}</div>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  <div style={{ marginInline: '0.5em' }}>
                    <Popover>
                      <Popover.Button
                        className={`text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg transition-all duration-300 ease-out first:ml-0 hover:scale-105 active:scale-100 link ${
                          data.showCursor ? 'cursor-none' : ''
                        } ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
                        style={{ width: '100%' }}
                      >
                        Product
                      </Popover.Button>

                      <Popover.Panel className="absolute z-10">
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            padding: '10px',
                          }}
                        >
                          <a href="/product/one">Product One</a>
                          <a href="/product/two">Product Two</a>
                        </div>
                      </Popover.Panel>
                    </Popover>
                  </div>

                  <Button type={'primary'} onClick={() => router.push('/blog')}>
                    Blog
                  </Button>

                  <Button type={'primary'} onClick={handleAboutScroll}>
                    About
                  </Button>
                  <Button type={'primary'} onClick={handleContactScroll}>
                    Contact
                  </Button>
                  <Button
                    onClick={() =>
                      setLanguague(languague === 'VN' ? 'EN' : 'VN')
                    }
                  >
                    <div className="h-6">{languague}</div>
                  </Button>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`hidden flex-row items-center justify-between sticky dark:text-white top-0 z-10 tablet:flex`}
        style={{ width: '100vw', paddingInline: '5%' }}
      >
        <h1
          onClick={() => router.push('/')}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}.
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ marginInline: '0.5em' }}>
            <Popover>
              <Popover.Button
                className={`text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg transition-all duration-300 ease-out first:ml-0 hover:scale-105 active:scale-100 link ${
                  data.showCursor ? 'cursor-none' : ''
                } ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
                style={{ width: '100%' }}
              >
                Product
              </Popover.Button>

              <Popover.Panel className="absolute z-10">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '10px',
                  }}
                >
                  <a href="/product/one">Product One</a>
                  <a href="/product/two">Product Two</a>
                </div>
              </Popover.Panel>
            </Popover>
          </div>

          <Button type={'primary'} onClick={() => router.push('/blog')}>
            Blog
          </Button>

          <Button type={'primary'} onClick={handleAboutScroll}>
            About
          </Button>
          <Button type={'primary'} onClick={handleContactScroll}>
            Contact
          </Button>
          <Button
            type="primary"
            onClick={() => setLanguague(languague === 'VN' ? 'EN' : 'VN')}
          >
            <div className="h-6">{languague}</div>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Header
