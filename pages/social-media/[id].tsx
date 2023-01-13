import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useMemo } from 'react'
import { ClientSocialMediaList } from '../../components/pages/client/ClientSocialMediaList'
import { ManagerSocialMediaList } from '../../components/pages/manager/ManagerSocialMediaList'
import { StaffSocialMediaList } from '../../components/pages/staff/StaffSocialMediaList'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const SocialMediaPage: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Social Media')
    setCrumbsNavigation([])
  }, [])

  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isClient) {
        return (
          <ClientSocialMediaList
            clientId={session!.user.userType.client.id}
            socialMediaId={Number(id)}
          />
        )
      } else if (session.isManager) {
        if (
          session?.user.userType.department &&
          session?.user.userType.department.name === 'Social Media'
        ) {
          return <ManagerSocialMediaList />
        }
      } else if (session.isStaff) {
        if (
          session?.user.userType.department &&
          session?.user.userType.department.name === 'Social Media'
        ) {
          return <StaffSocialMediaList />
        }
      }
    }

    return null
  }, [!!session])

  return page
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
