import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { FancyButton } from '../components/FancyButton'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { CreateScreenModal } from '../components/modals/CreateScreenModal'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useAdminScreenStore } from '../store/AdminScreenStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ScreensPage: NextPageWithLayout = () => {
  const { setHeader, setButtons } = usePanelLayoutStore()

  const { isCreateAdminScreenModalVisible, toggleCreateAdminScreenModal } = useAdminScreenStore()

  useEffect(() => {
    setHeader('Screens')
    setButtons(
      <FancyButton
        Icon={<MonitorIcon className="stroke-halloween-orange" />}
        title="Add Screen"
        onClick={toggleCreateAdminScreenModal}
        className="w-fit"
      />
    )
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Screens</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <Card title="Screens List" className="flex max-h-155 flex-col">
          <div className="">Nothing to see here. 🦗</div>
        </Card>
      </div>
      <CreateScreenModal
        isVisible={isCreateAdminScreenModalVisible}
        onClose={toggleCreateAdminScreenModal}
      />
    </>
  )
}

ScreensPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ScreensPage
