import { useSession } from 'next-auth/react'
import { ReactElement, useEffect, useMemo } from 'react'
import { ManagerTicketList } from '../components/pages/manager/ManagerTicketList'
import { StaffTicketList } from '../components/pages/staff/StaffTicketList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const MyTicketPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Ticket')
    setCrumbsNavigation([])
  }, [])

  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isManager || session.isSocialMediaManager) {
        return <ManagerTicketList isPendingJobs={false} isNewJobs={false} />
      } else if (session.isStaff || session.isSocialMediaStaff) {
        return <StaffTicketList isPendingJobs={false} isNewJobs={false} />
      }
    }

    return null
  }, [!!session])

  return page
}

MyTicketPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default MyTicketPage
