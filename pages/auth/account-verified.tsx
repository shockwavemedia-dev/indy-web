import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const AccountVerified: NextPageWithLayout = () => {
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
        <title>Daily Press - Verification</title>
      </Head>

      <Link href="/auth/login">
        <a className="font-urbanist text-sm font-semibold text-jungle-green underline-offset-1 hover:underline">
          Proceed to login page.
        </a>
      </Link>
    </>
  )
}

AccountVerified.getLayout = (page: ReactElement) => (
  <AuthLayout title="Verified!" subtitle="You have successfully verified your account.">
    {page}
  </AuthLayout>
)

export default AccountVerified
