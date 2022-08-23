import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { MonitorIcon } from '../components/icons/MonitorIcon'
import { CreatePrinterModal } from '../components/modals/CreatePrinterModal'
import { DeletePrinterModal } from '../components/modals/DeletePrinterModal'
import { EditPrinterModal } from '../components/modals/EditPrinterModal'
import { AdminPrintersTableColumns } from '../constants/tables/AdminPrintersTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useAdminPrinterStore } from '../store/AdminPrinterStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const PrintersPage: NextPageWithLayout = () => {
  const { setHeader, setButtons } = usePanelLayoutStore()

  const {
    activeAdminPrinter,
    isCreateAdminPrinterModalVisible,
    isEditAdminPrinterModalVisible,
    isDeleteAdminPrinterModalVisible,
    toggleCreateAdminPrinterModal,
    toggleEditAdminPrinterModal,
    toggleDeleteAdminPrinterModal,
  } = useAdminPrinterStore()

  useEffect(() => {
    setHeader('Printers')

    setButtons(
      <FancyButton
        Icon={<MonitorIcon className="stroke-halloween-orange" />}
        title="Create Printer"
        subtitle="Laborerivit rem cones mil"
        onClick={toggleCreateAdminPrinterModal}
        className="w-fit"
      />
    )
  }, [])
  return (
    <>
      <Head>
        <title>Indy - Printers</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <Card title="Printers List" className="flex max-h-155 flex-col">
          <DataTable
            dataEndpoint="/v1/printers"
            columns={AdminPrintersTableColumns}
            tableQueryKey={['printers']}
            ofString="Printers"
          />
        </Card>
      </div>
      <CreatePrinterModal
        isVisible={isCreateAdminPrinterModalVisible}
        onClose={toggleCreateAdminPrinterModal}
      />
      <EditPrinterModal
        isVisible={isEditAdminPrinterModalVisible}
        onClose={toggleEditAdminPrinterModal}
        printer={activeAdminPrinter}
      />
      <DeletePrinterModal
        isVisible={isDeleteAdminPrinterModalVisible}
        onClose={toggleDeleteAdminPrinterModal}
        printer={activeAdminPrinter}
      />
    </>
  )
}

PrintersPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default PrintersPage
