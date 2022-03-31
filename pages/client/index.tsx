import Head from 'next/head'
import { ReactElement, useState } from 'react'
import Card from '../../components/Admin/Card.component'
import FancyButton from '../../components/Admin/FancyButton.component'
import NewClientModal from '../../components/Admin/NewClientModal.component'
import UserIcon from '../../components/Common/Icons/User.icon'
import Table from '../../components/Common/Table'
import { ClientTableColumns } from '../../constants/ClientTableColumns'
import PanelLayout from '../../layouts/Panel.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Client: NextPageWithLayout = () => {
  const [isNewClientModalVisible, setNewClientModalVisible] = useState(false)

  const toggleNewClientModal = () => setNewClientModalVisible(!isNewClientModalVisible)

  return (
    <>
      <NewClientModal isVisible={isNewClientModalVisible} onClose={toggleNewClientModal} />
      <Head>
        <title>Daily Press - Client</title>
      </Head>
      <div className="mx-auto grid h-262.5 w-270 grid-rows-10 gap-6">
        <FancyButton
          Icon={
            <div className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-honeydew">
              <UserIcon className="stroke-jungle-green" />
            </div>
          }
          title="Create Client"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleNewClientModal}
          className="row-span-1 w-fit"
        />
        <Card title="Clients" className="row-span-11">
          <Table
            dataEndpoint="/v1/clients"
            columns={ClientTableColumns}
            startingPageSize={20}
            tableKey="clients"
          />
        </Card>
      </div>
    </>
  )
}

Client.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default Client
