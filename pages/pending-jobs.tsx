import { useSession } from 'next-auth/react'
import { ReactElement, useEffect, useMemo } from 'react'
import { ClientDashboard } from '../components/pages/client/ClientDashboard'
import { ManagerDashboard } from '../components/pages/manager/ManagerDashboard'
import { ManagerTicketList } from '../components/pages/manager/ManagerTicketList'
import { StaffDashboard } from '../components/pages/staff/StaffDashboard'
import { StaffTicketList } from '../components/pages/staff/StaffTicketList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PendingJobsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Pending Jobs')
  }, [])

  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isManager) {
        return <ManagerDashboard isPendingJobs={true} isNewJobs={false} />
      } else if (session.isStaff) {
        return <StaffDashboard isPendingJobs={true} isNewJobs={false} />
      } else if (session.isSocialMediaManager) {
        return <ManagerTicketList isPendingJobs={true} isNewJobs={false} />
      } else if (session.isSocialMediaStaff) {
        return <StaffTicketList isPendingJobs={true} isNewJobs={false} />
      } else if (session.isClient) {
        return <ClientDashboard isPendingJobs={true} isNewJobs={false} />
      }
    }

    return null
  }, [!!session])

  return page
}

PendingJobsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PendingJobsPage
