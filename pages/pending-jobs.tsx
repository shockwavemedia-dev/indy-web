import { useSession } from 'next-auth/react'
import { ReactElement, useEffect, useMemo } from 'react'
import { ManagerTicketList } from '../components/pages/manager/ManagerTicketList'
import { StaffDashboard } from '../components/pages/staff/StaffDashboard'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PendingJobsPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Ticket')
  }, [])

  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isManager) {
        return <ManagerTicketList />
      } else if (session.isStaff) {
        return <StaffDashboard isPendingJobs={true} isNewJobs={false} />
      }
    }

    return null
  }, [!!session])

  return page
}

PendingJobsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PendingJobsPage
