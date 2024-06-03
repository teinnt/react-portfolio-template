import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../utils'
import { stagger } from '../animations'
import Header from '../components/Header'
import WorkCard from '../components/WorkCard'
import Footer from '../components/Footer'
import Head from 'next/head'
import Cursor from '../components/Cursor'

// Local Data
import data from '../data/portfolio.json'

const Home: React.FC = () => {
  const router = useRouter()

  // Using correct typings for useRef when referencing DOM elements
  const workRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const textOne = useRef<HTMLHeadingElement>(null)
  const textTwo = useRef<HTMLHeadingElement>(null)
  const textThree = useRef<HTMLHeadingElement>(null)
  const textFour = useRef<HTMLHeadingElement>(null)

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
      <video
        autoPlay
        muted
        loop
        style={{ position: 'absolute', width: '100vw' }}
      >
        <source src="/videos/background.mov" type="video/mp4" />
      </video>

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
        <div style={{ marginTop: '110vh' }}>
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
        </div>
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'center',
                alignContent: 'center',
                paddingBottom: '20%',
              }}
            >
              <h1 className="text-2xl text-bold">About</h1>
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
                vero, suscipit tenetur facere praesentium commodi aspernatur
                natus dolores voluptatibus molestias sapiente assumenda eum
                explicabo hic! Cumque consectetur deserunt illum amet!
              </div>
            </div>
            <div
              className="mt-5"
              style={{
                flex: '1',
                display: 'flex',
                width: '100%',
              }}
            >
              <Carousel
                autoPlay
                animationHandler="fade"
                swipeable
                autoFocus
                centerMode
                showArrows
                transitionTime={1}
              >
                {data.projects.map((project) => (
                  <WorkCard
                    key={project.id}
                    img={project.imageSrc}
                    name={project.title}
                    description={project.description}
                    onClick={() => router.push(project.url)}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
