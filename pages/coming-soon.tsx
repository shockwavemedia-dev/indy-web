import Head from 'next/head'
import { ReactElement } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ComingSoonPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Indy - Coming Soon</title>
      </Head>
      {/* <Link href="/auth/login">
        <a className=" text-sm font-semibold text-halloween-orange underline-offset-1 hover:underline">
          Login
        </a>
      </Link> */}
    </>
  )
}

ComingSoonPage.getLayout = (page: ReactElement) => (
  <AuthLayout title="Coming Soon" subtitle="">
    {page}
  </AuthLayout>
)

export default ComingSoonPage
