import React, { useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../utils'
import { stagger } from '../animations'
import Header from '../components/Header'
import ServiceCard from '../components/ServiceCard'
import Socials from '../components/Socials'
import WorkCard from '../components/WorkCard'
import Footer from '../components/Footer'
import Head from 'next/head'
import Button from '../components/Button'
import Link from 'next/link'
import Cursor from '../components/Cursor'

// Local Data
import data from '../data/portfolio.json'
import Image from 'next/image'

const Home: React.FC = () => {
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
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
          <div className="laptop:mt-20 mt-10">
            <div className="mt-5">
              <div
                ref={textOne}
                className="text-xl tablet:text-3xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
              >
                {data.headerTaglineOne}
              </div>
              <div
                ref={textTwo}
                className="text-xl tablet:text-3xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              >
                {data.headerTaglineTwo}
              </div>
              <div
                ref={textThree}
                className="text-xl tablet:text-3xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              >
                {data.headerTaglineThree}
              </div>
              <div
                ref={textFour}
                className="text-xl tablet:text-3xl laptop:text-5xl laptopl:text-6xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
              >
                {data.headerTaglineFour}
              </div>
            </div>
          </div>

          <div
            style={{
              marginLeft: '20%',
              marginTop: '2rem',
            }}
          >
            <Image src="/images/avatar.png" width={400} height={400} />
          </div>
        </div>

        <Socials className="mt-2 laptop:mt-5" />
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1
            className="text-3xl text-bold"
            style={{ marginBottom: '2em', fontWeight: 'bold' }}
          >
            Projects
          </h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1
            className="text-3xl text-bold"
            style={{ marginBottom: '2em', fontWeight: 'bold' }}
          >
            About
          </h1>
          <p className="mt-2 text-xl laptop:text-xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>

          <div className="mt-16" style={{ display: 'flex' }}>
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
                imageSrc={service.srcImage}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
