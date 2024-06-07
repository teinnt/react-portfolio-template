import React, { useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { buttonBaseClassName } from '../components/Button'
import Image from 'next/image'
import Carousel from '../components/Carousel/Carousel'

type Option = {
  src: string
  alt: 'none' | 'ready-to-ship' | 'material' | 'order' | 'gift'
}

const options: Option[] = [
  {
    src: '/images/homeOptions/ready-to-ship.svg',
    alt: 'ready-to-ship',
  },
  {
    src: '/images/homeOptions/material.svg',
    alt: 'material',
  },
  {
    src: '/images/homeOptions/order.svg',
    alt: 'order',
  },
  {
    src: '/images/homeOptions/gift.svg',
    alt: 'gift',
  },
]

const readyToShipSrcs = [
  '/images/homeOptions/readyToShip/animal-1.svg',
  '/images/homeOptions/readyToShip/animal-2.svg',
  '/images/homeOptions/readyToShip/decoration.svg',
  '/images/homeOptions/readyToShip/flower-1.svg',
  '/images/homeOptions/readyToShip/flower-2.svg',
  '/images/homeOptions/readyToShip/flower-3.svg',
  '/images/homeOptions/readyToShip/princess.svg',
]
const embleOption: EmblaOptionsType = { loop: true }

const Home: React.FC = () => {
  const [option, setOption] = useState<
    'none' | 'ready-to-ship' | 'material' | 'order' | 'gift'
  >('none')

  return (
    <div>
      {option === 'none' && (
        <div
          style={{
            flexGrow: 1,
            backgroundImage: `url("/images/home-content.svg")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 'fit-content',
            }}
          >
            {options.map((nav) => (
              <button
                className={buttonBaseClassName}
                onClick={() => setOption(nav.alt)}
              >
                <Image
                  src={nav.src}
                  alt={nav.alt}
                  key={nav.alt}
                  width={420}
                  height={150}
                  quality={100}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {option === 'ready-to-ship' && (
        <Carousel
          slides={readyToShipSrcs.map((src) => (
            <Image
              src={src}
              alt={src}
              key={src}
              width={1000}
              height={1000}
              quality={100}
            />
          ))}
          options={embleOption}
        />
      )}
    </div>
  )
}

export default Home
