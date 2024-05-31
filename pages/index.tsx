import React, { useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../utils'
import { stagger } from '../animations'
import Header, { coursesSections } from '../components/Header'
import ServiceCard from '../components/ServiceCard'
import WorkCard from '../components/WorkCard'
import Footer from '../components/Footer'
import Head from 'next/head'
import Button from '../components/Button'
import Link from 'next/link'
import Cursor from '../components/Cursor'
import { useRouter } from 'next/router'

// Local Data
import data from '../data/portfolio.json'

const Home: React.FC = () => {
  // Using correct typings for useRef when referencing DOM elements
  const workRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const textOne = useRef<HTMLHeadingElement>(null)
  const textTwo = useRef<HTMLHeadingElement>(null)
  const textThree = useRef<HTMLHeadingElement>(null)
  const textFour = useRef<HTMLHeadingElement>(null)

  const router = useRouter()

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: 'scale(0.95) skew(10deg)' },
      { y: 0, x: 0, transform: 'scale(1)' }
    )
  }, [])

  const handleWorkScroll = () => {
    if (workRef.current) {
      window.scrollTo({
        top: workRef.current.offsetTop,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  const handleAboutScroll = () => {
    if (aboutRef.current) {
      window.scrollTo({
        top: aboutRef.current.offsetTop,
        left: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={`relative ${data.showCursor && 'cursor-none'}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
          isBlog={false}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <div
            className={`mt-2 laptop:mt-5 flex flex-wrap mob:flex-nowrap link`}
          >
            {coursesSections.map((social, index) => (
              <Button key={index} onClick={() => router.push(social.link)}>
                {social.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
                imageUrl={service.imageUrl}
              />
            ))}
          </div>
        </div>
        {/* This button should not go into production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>

          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            <li>Tình yêu</li>
            <li>Tiền bạc</li>
            <li>Sức khỏe tinh thần</li>
            <li>Sức khỏe thể chất</li>
          </p>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
