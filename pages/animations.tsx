import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { AdminAnimations } from '../components/pages/admin/AdminAnimations'
import { ClientAnimations } from '../components/pages/client/ClientAnimations'
import PanelLayout from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const AnimationsPage: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { status, data: session } = useSession()

  if (status === 'unauthenticated') {
    replace('/auth/login')
  } else if (status === 'authenticated') {
    const { isAdmin, isClient } = session

    if (isAdmin) {
      return <AdminAnimations />
    } else if (isClient) {
      return <ClientAnimations />
    }
  }

  return null
}

AnimationsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default AnimationsPage
