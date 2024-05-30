import React, { useRef } from 'react'
import { useIsomorphicLayoutEffect } from '../utils'
import { stagger } from '../animations'
import Header from '../components/Header'
import ServiceCard from '../components/ServiceCard'
import Socials from '../components/Socials'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import Head from 'next/head'
import Button from '../components/Button'
import Cursor from '../components/Cursor'

// Local Data
import data from '../data/portfolio.json'
import Image from 'next/image'

const Home: React.FC = () => {
  // Using correct typings for useRef when referencing DOM elements
  const ContactRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const textOne = useRef<HTMLHeadingElement>(null)
  const textTwo = useRef<HTMLHeadingElement>(null)
  const textThree = useRef<HTMLHeadingElement>(null)
  const textFour = useRef<HTMLHeadingElement>(null)

  const [showModal, setShowModal] = React.useState(false)

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: 'scale(0.95) skew(10deg)' },
      { y: 0, x: 0, transform: 'scale(1)' }
    )
  }, [])

  const handleContactScroll = () => {
    if (ContactRef.current) {
      window.scrollTo({
        top: ContactRef.current.offsetTop,
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

      <div style={{ width: '100vw', padding: '5rem' }}>
        <Header
          handleContactScroll={handleContactScroll}
          handleAboutScroll={handleAboutScroll}
          isBlog={false}
        />
        <div className="laptop:mt-20 mt-10" style={{ marginTop: '100vh' }}>
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
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="text-2xl text-bold">Product.</h1>

          <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
            {data.projects.map((project) => (
              <ProductCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {!showModal && (
          <div
            className="fixed bottom-5 right-5"
            style={{ backgroundColor: 'transparent' }}
          >
            <Button onClick={() => setShowModal(true)}>
              <Image src="/images/zalo.png" width="50" height="50" />
            </Button>
          </div>
        )}
        {showModal && (
          <div
            className="fixed bottom-5 right-5"
            style={{ backgroundColor: 'transparent' }}
          >
            <Button
              classes="bg-gray-100/60"
              onClick={() => setShowModal(false)}
            >
              <Image src="/images/zalo-qr.png" width="500" height="500" />
            </Button>
          </div>
        )}

        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <div style={{ paddingLeft: '5%' }}>
            <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
              {data.aboutpara}
            </p>

            <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
              Company Overview
            </p>

            <p className="tablet:m-10 mt-2 text-xl laptop:text-2xl w-full laptop:w-3/5">
              GOAL
            </p>

            <li className="tablet:m-10 mt-2 text-xl laptop:text-xl w-full laptop:w-3/5">
              Châu Dương Manufacturing Trading Import Export Company Limited was
              established in 2020, with the primary objective and criterion of
              creating a high-class service style that meets the increasing
              needs of customers, with increasingly shorter time and higher
              efficiency. PRINTING BOXES AND JEWELRY BOXES.
            </li>

            <li className="tablet:m-10 mt-2 text-xl laptop:text-xl w-full laptop:w-3/5">
              Châu Dương Manufacturing Trading Import Export Company Limited
              aims to comprehensively deploy jewelry box production in Vietnam
              in general and in the Ho Chi Minh City area as well as neighboring
              provinces in particular.
            </li>

            <p className="tablet:m-10 mt-2 text-xl laptop:text-2xl w-full laptop:w-3/5">
              PHILOSOPHY
            </p>

            <li className="tablet:m-10 mt-2 text-xl laptop:text-xl w-full laptop:w-3/5">
              The operating philosophy of Châu Dương Company: "CUSTOMER
              SATISFACTION IS THE MOST IMPORTANT THING". Currently, customer
              satisfaction is reflected in every production stage. Enthusiastic
              and meticulous with a quick and courteous attitude, ensuring to
              provide products with reasonable prices and high competitiveness.
              Always care about customer opinions, accept challenges and
              difficult requirements to continuously improve the products.
            </li>

            <li className="tablet:m-10 mt-2 text-xl laptop:text-xl w-full laptop:w-3/5">
              "CUSTOMER BENEFITS ARE THE LIFEBLOOD OF CHAU DUONG COMPANY!"
            </li>

            <p
              className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5"
              style={{
                color: '#4d52e3',
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}
            >
              CHAU DUONG - A BELIEF - A MILLION ASPIRATIONS!
            </p>
          </div>
        </div>

        <div ref={ContactRef} />
        <Footer />
      </div>
    </div>
  )
}

export default Home
