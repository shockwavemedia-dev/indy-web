import { useSession } from 'next-auth/react'
import { ReactElement, useMemo } from 'react'
import { ClientMyFiles } from '../components/pages/client/ClientMyFiles'
import { MyFiles } from '../components/pages/MyFiles'
import PanelLayout from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const MyFilesPage: NextPageWithLayout = () => {
  const { data: session } = useSession()

  const page = useMemo(() => {
    if (!!session) {
      if (session.isClient) {
        return <ClientMyFiles />
      }

      return <MyFiles />
    }

    return null
  }, [!!session])

  return page
}

MyFilesPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default MyFilesPage
