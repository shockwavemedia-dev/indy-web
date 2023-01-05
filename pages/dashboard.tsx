import { useSession } from 'next-auth/react'
import { ReactElement, useMemo } from 'react'
import { ClientDashboard } from '../components/pages/client/ClientDashboard'
import { ManagerDashboard } from '../components/pages/manager/ManagerDashboard'
import { ManagerSocialMediaList } from '../components/pages/manager/ManagerSocialMediaList'
import PrinterManagerPrinterJobsPage from '../components/pages/printerManager/PrinterManagerPrinterJobs'
import { StaffDashboard } from '../components/pages/staff/StaffDashboard'
import { StaffSocialMediaList } from '../components/pages/staff/StaffSocialMediaList'
import PanelLayout from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const DashboardPage: NextPageWithLayout = () => {
  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isClient) {
        return <ClientDashboard isPendingJobs={false} isNewJobs={false} />
      } else if (session.isManager) {
        return <ManagerDashboard isPendingJobs={false} isNewJobs={false} />
      } else if (session.isStaff) {
        return <StaffDashboard isPendingJobs={false} isNewJobs={false} />
      } else if (session.isPrinterManager) {
        return <PrinterManagerPrinterJobsPage />
      } else if (session.isSocialMediaManager) {
        return <ManagerSocialMediaList />
      } else if (session.isSocialMediaStaff) {
        return <StaffSocialMediaList />
      }
    }

    return null
  }, [!!session])

  return page
}

DashboardPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default DashboardPage
