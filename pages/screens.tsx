import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { CreateScreenModal } from '../components/modals/CreateScreenModal'
import { DeleteScreenModal } from '../components/modals/DeleteScreenModal'
import { EditScreenModal } from '../components/modals/EditScreenModal'
import { AdminScreensTableColumns } from '../constants/tables/AdminScreensTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useAdminScreenStore } from '../store/AdminScreenStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ScreensPage: NextPageWithLayout = () => {
  const { setHeader, setButtons } = usePanelLayoutStore()

  const {
    activeAdminScreen,
    isCreateAdminScreenModalVisible,
    isEditAdminScreenModalVisible,
    isDeleteAdminScreenModalVisible,
    toggleCreateAdminScreenModal,
    toggleEditAdminScreenModal,
    toggleDeleteAdminScreenModal,
  } = useAdminScreenStore()

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
          <DataTable
            dataEndpoint="/v1/screens"
            columns={AdminScreensTableColumns}
            tableQueryKey={['screens']}
            ofString="Screens"
          />
        </Card>
      </div>
      <CreateScreenModal
        isVisible={isCreateAdminScreenModalVisible}
        onClose={toggleCreateAdminScreenModal}
      />
      <EditScreenModal
        isVisible={isEditAdminScreenModalVisible}
        onClose={toggleEditAdminScreenModal}
        screen={activeAdminScreen}
      />
      <DeleteScreenModal
        isVisible={isDeleteAdminScreenModalVisible}
        onClose={toggleDeleteAdminScreenModal}
        screen={activeAdminScreen}
      />
    </>
  )
}

ScreensPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ScreensPage
