import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { buttonBaseClassName } from '../Button'

type Navigation = {
  src: string
  chosenSrc: string
  alt: string
  goto: string
}

const navigations: Navigation[] = [
  {
    src: '/images/navbar/home.svg',
    chosenSrc: '/images/navbar/home-black.svg',
    alt: 'home',
    goto: '/home',
  },
  {
    src: '/images/navbar/info.svg',
    chosenSrc: '/images/navbar/info-black.svg',
    alt: 'info',
    goto: '/info',
  },
  {
    src: '/images/navbar/chat.svg',
    chosenSrc: '/images/navbar/chat-black.svg',
    alt: 'chat',
    goto: '/chat',
  },
  {
    src: '/images/navbar/order.svg',
    chosenSrc: '/images/navbar/order-black.svg',
    alt: 'order',
    goto: '/order',
  },
  {
    src: '/images/navbar/cart.svg',
    chosenSrc: '/images/navbar/cart-black.svg',
    alt: 'cart',
    goto: '/cart',
  },
  {
    src: '/images/navbar/on-sell.svg',
    chosenSrc: '/images/navbar/on-sell-black.svg',
    alt: 'on-sell',
    goto: '/on-sell',
  },
]

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const router = useRouter()

  return (
    <div className="top-0 z-10" style={{ paddingLeft: '2rem' }}>
      {navigations.map((nav) => (
        <button
          className={buttonBaseClassName}
          onClick={() =>
            router.pathname.includes(nav.goto)
              ? router.reload()
              : router.push(nav.goto)
          }
        >
          <Image
            src={router.pathname.includes(nav.goto) ? nav.chosenSrc : nav.src}
            alt={nav.alt}
            width={120}
            height={120}
            quality={100}
          />
        </button>
      ))}
    </div>
  )
}

export default Header
