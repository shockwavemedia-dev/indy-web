import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const AccountVerifiedPage: NextPageWithLayout = () => {
  const {
    query: { email, token },
    isReady,
  } = useRouter()

  useEffect(() => {
    if (isReady) {
      ;(async () => {
        await axios.get('/v1/verify-email', {
          params: {
            email,
            token,
          },
        })
      })()
    }
  }, [isReady])

  return (
    <>
      <Head>
        <title>Indy - Verification</title>
      </Head>

      <Link href="/auth/login">
        <a className=" text-sm font-semibold text-halloween-orange underline-offset-1 hover:underline">
          Proceed to login page.
        </a>
      </Link>
    </>
  )
}

AccountVerifiedPage.getLayout = (page: ReactElement) => (
  <AuthLayout title="Verified!" subtitle="You have successfully verified your account.">
    {page}
  </AuthLayout>
)

export default AccountVerifiedPage
