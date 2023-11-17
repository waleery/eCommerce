import Head from 'next/head'
import React from 'react'
import { Footer, Navbar } from '.'

const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Waleery store</title>
      </Head>
      <header>
        <Navbar />
        <main className='main-container'>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </header>
    </div>
  )
}

export default Layout