import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import Link from '../../components/Common/Link.component'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const AccountVerified: NextPageWithLayout = () => {
  const router = useRouter()

  const {
    query: { email, token },
    isReady,
  } = useRouter()

  useEffect(() => {
    if (isReady === true) {
      ;(async () => {
        await axios.get(`/v1/verify-email`, {
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
      <Link href="/auth/login" className="text-sm font-semibold text-jungle-green">
        Proceed to login page.
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
