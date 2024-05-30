import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'
import { Popover } from '@headlessui/react'
import Button from '../Button'
import data from '../../data/portfolio.json'

const productPopups = [
  {
    name: '1',
    url: '/product/1',
  },
  {
    name: '2',
    url: '/product/2',
  },
]

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
  const { name, showBlog, showResume } = data

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
                      setLanguague(languague === 'VN' ? 'EN' : 'VN')
                    }
                  >
                    {languague}
                  </Button>
                )}
                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${!open ? 'cancel.svg' : 'cancel-white.svg'}`}
                    alt="Menu Button"
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${'bg-white'} shadow-md rounded-md`}
            ></Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className={`mt-10 hidden flex-row items-center justify-between sticky dark:text-white top-0 z-10 tablet:flex`}
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
          <div style={{ marginInline: '1em' }}>
            <Popover>
              <Popover.Button>Product</Popover.Button>

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

          <Button onClick={() => router.push('/blog')}>Blog</Button>

          <Button onClick={handleAboutScroll}>About</Button>
          <Button onClick={handleContactScroll}>Contact</Button>
          <Button
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
