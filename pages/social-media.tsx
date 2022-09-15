import { useSession } from 'next-auth/react'
import { ReactElement, useEffect, useMemo } from 'react'
import { ClientSocialMediaList } from '../components/pages/client/ClientSocialMediaList'
import { ManagerSocialMediaList } from '../components/pages/manager/ManagerSocialMediaList'
import { StaffSocialMediaList } from '../components/pages/staff/StaffSocialMediaList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const SocialMediaPage: NextPageWithLayout = () => {
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Social Media')
  }, [])

  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isClient) {
        return <ClientSocialMediaList clientId={session!.user.userType.client.id} />
      } else if (session.isManager) {
        return <ManagerSocialMediaList />
      } else if (session.isStaff) {
        return <StaffSocialMediaList />
      }
    }

    return null
  }, [!!session])

  return page
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
