import { ReactElement } from 'react'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { AdminClientScreensTableColumns } from '../../../constants/tables/AdminClientScreensTableColumns'
import ClientLayout from '../../../layouts/ClientLayout'
import PanelLayout from '../../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const ClientScreen: NextPageWithLayout = () => {
  return (
    <>
      <div className="w-full">
        <Card title="Screens List" className="flex max-h-155 flex-col">
          <DataTable
            dataEndpoint="/v1/screens"
            columns={AdminClientScreensTableColumns}
            tableQueryKey={['screens']}
            ofString="Screens"
          />
        </Card>
      </div>
    </>
  )
}

ClientScreen.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientScreen
