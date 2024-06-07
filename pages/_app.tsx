import React from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Cursor from '../components/Cursor'
import { useRouter } from 'next/router'
import Header from '../components/Header'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  return (
    <ThemeProvider>
      <Head>
        <title>pug</title>
      </Head>
      <Cursor />

      {router.pathname != '/' ? (
        <div
          className={'cursor-none'}
          style={{
            backgroundImage: `url("/images/pages-bg.jpg")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <Header />
          <Component {...pageProps} />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  )
}

export default App
