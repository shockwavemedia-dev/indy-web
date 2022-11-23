import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { useQuery } from 'react-query'
import { ClientSocialMediaList } from '../components/pages/client/ClientSocialMediaList'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { Page } from '../types/Page.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { Service } from '../types/Service.type'

const SocialMediaPage: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Social Media')
  }, [])

  const { data: session, status } = useSession()

  const { data: fetchedServices } = useQuery(
    'services',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<Service>
        page: Page
      }>(`/v1/clients/${session!.user.userType.client.id}/services`)

      return data
    },
    {
      enabled: !!session,
    }
  )

  if (status === 'loading' || !session) {
    return null
  }

  if (
    fetchedServices &&
    fetchedServices.some(({ serviceId, isEnabled }) => serviceId === 4 && !isEnabled)
  ) {
    replace('/dashboard')
    return null
  }

  return <ClientSocialMediaList clientId={session.user.userType.client.id} />
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
