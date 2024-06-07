import React from 'react'
import Image from 'next/image'

// Local Data
import data from '../data/portfolio.json'
import Cursor from '../components/Cursor'
import { useRouter } from 'next/router'
import { buttonBaseClassName } from '../components/Button'

const Welcome: React.FC = () => {
  const router = useRouter()

  return (
    <div
      className={`${data.showCursor && 'cursor-none'}`}
      style={{
        backgroundImage: `url("/images/bg.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      {data.showCursor && <Cursor />}
      <div
        style={{
          backgroundImage: `url("/images/landing-page-content.svg")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          height: '100vh',
          padding: 20,
        }}
      >
        <button
          className={buttonBaseClassName}
          onClick={() => router.push('/home')}
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={120}
            height={120}
            quality={100}
          />
        </button>
      </div>
    </div>
  )
}

export default Welcome
