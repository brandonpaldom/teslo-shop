import Head from 'next/head'
import { FC } from 'react'

import { AuthNavbar, Footer } from '../ui'

interface Props {
  children: React.ReactNode
  title: string
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthNavbar />
      <main style={{ margin: '64px auto 0 auto', maxWidth: '1440px', padding: '40px' }}>{children}</main>
      <Footer />
    </>
  )
}
