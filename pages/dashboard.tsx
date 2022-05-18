import { useSession } from 'next-auth/react'
import { ReactElement } from 'react'
import ClientDashboard from '../components/pages/client/ClientDashboard'
import ManagerDashboard from '../components/pages/manager/ManagerDashboard'
import PanelLayout from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const Dashboard: NextPageWithLayout = () => {
  const { data: session } = useSession()

  if (session?.isClient) {
    return <ClientDashboard />
  } else if (session?.isManager) {
    return <ManagerDashboard />
  }

  return null
}

Dashboard.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default Dashboard
