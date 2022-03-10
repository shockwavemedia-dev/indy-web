import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import AdminLayout from '../../../layouts/Admin.layout'
import { NextPageWithLayout } from '../../_app'

const Dashboard: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      replace('/auth/login')
    },
  })

  if (status === 'loading') {
    return null
  }

  return (
    <>
      <Head>
        <title>Daily Press - Analytics</title>
      </Head>
    </>
  )
}

Dashboard.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Dashboard
