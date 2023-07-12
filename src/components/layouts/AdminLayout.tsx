import Head from 'next/head'
import { FC } from 'react'

import { AdminNavbar } from '../admin'
import { Footer, Sidebar } from '../ui'

interface Props {
  children: React.ReactNode
  title: string
}

export const AdminLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="og:title" content={title} />
      </Head>
      <AdminNavbar />
      <Sidebar />
      <main style={{ margin: '64px auto 0 auto', maxWidth: '1440px', padding: '40px' }}>{children}</main>
      <Footer />
    </>
  )
}
