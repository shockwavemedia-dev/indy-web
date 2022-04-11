import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import Link from '../../components/Common/Link.component'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Verification: NextPageWithLayout = () => {
  const router = useRouter()
  const { token, email } = router.query

  useEffect(() => {
    if (router.isReady === true) {
      // declare the async data fetching function
      const fetchData = async () => {
        const { data } = await axios.get(`v1/verify-email?email=${email} & token=${token} `)

        return data
      }

      fetchData()
    }
  }, [router.isReady])

  return (
    <>
      <Head>
        <title>Daily Press - Verification</title>
      </Head>
    </>
  )
}

Verification.getLayout = (page: ReactElement) => (
  <AuthLayout
    title="Verified!"
    subtitle={
      <>
        You have successfully verified your account.
        <br />
        <br />
        <div className="font-urbanist text-sm font-medium text-metallic-silver">
          Proceed to login page <br />
          <Link href="/auth/login" className="text-sm font-semibold text-jungle-green">
            Login
          </Link>
        </div>
      </>
    }
  >
    {page}
  </AuthLayout>
)

export default Verification
