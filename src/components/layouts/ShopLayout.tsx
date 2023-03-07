import { FC } from 'react'
import Head from 'next/head'
import { Navbar, Sidebar, Footer } from '../ui'

interface Props {
  children: React.ReactNode
  title: string
  description: string
  ogImage?: string
}

export const ShopLayout: FC<Props> = ({ children, title, description, ogImage }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={ogImage} />
      </Head>
      <Navbar />
      <Sidebar />
      <main style={{ margin: '64px auto 0 auto', maxWidth: '1440px', padding: '40px' }}>{children}</main>
      <Footer />
    </>
  )
}
