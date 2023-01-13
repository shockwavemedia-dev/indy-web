import { useSession } from 'next-auth/react'
import { ReactElement, useEffect, useMemo } from 'react'
import { ClientDashboard } from '../components/pages/client/ClientDashboard'
import { ManagerDashboard } from '../components/pages/manager/ManagerDashboard'
import { ManagerTicketList } from '../components/pages/manager/ManagerTicketList'
import { StaffDashboard } from '../components/pages/staff/StaffDashboard'
import { StaffTicketList } from '../components/pages/staff/StaffTicketList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const NewJobsPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('New Jobs')
    setCrumbsNavigation([])
  }, [])

  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isManager) {
        return <ManagerDashboard isPendingJobs={false} isNewJobs={true} />
      } else if (session.isStaff) {
        return <StaffDashboard isPendingJobs={false} isNewJobs={true} />
      } else if (session.isSocialMediaManager) {
        return <ManagerTicketList isPendingJobs={false} isNewJobs={true} />
      } else if (session.isSocialMediaStaff) {
        return <StaffTicketList isPendingJobs={false} isNewJobs={true} />
      } else if (session.isClient) {
        return <ClientDashboard isPendingJobs={false} isNewJobs={true} />
      }
    }

    return null
  }, [!!session])

  return page
}

NewJobsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default NewJobsPage
