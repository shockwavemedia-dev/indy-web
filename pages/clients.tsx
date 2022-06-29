import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { UserIcon } from '../components/icons/UserIcon'
import { NewClientModal } from '../components/modals/NewClientModal'
import { ClientTableColumns } from '../constants/tables/ClientTableColumns'
import PanelLayout from '../layouts/PanelLayout'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const ClientPage: NextPageWithLayout = () => {
  const [isNewClientModalVisible, setNewClientModalVisible] = useState(false)

  const toggleNewClientModal = () => setNewClientModalVisible(!isNewClientModalVisible)

  return (
    <>
      <NewClientModal isVisible={isNewClientModalVisible} onClose={toggleNewClientModal} />
      <Head>
        <title>Indy - Clients</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <FancyButton
          Icon={<UserIcon className="stroke-halloween-orange" />}
          title="Create Client"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewClientModal}
          className="w-fit"
        />
        <hr className="mb-6 border-t-bright-gray" />
        <Card title="Clients">
          <DataTable
            dataEndpoint="/v1/clients"
            columns={ClientTableColumns}
            tableQueryKey={['clients']}
            ofString="Clients"
          />
        </Card>
      </div>
    </>
  )
}

ClientPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientPage
