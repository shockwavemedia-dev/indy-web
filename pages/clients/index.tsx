import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { DataTable } from '../../components/DataTable'
import { FancyButton } from '../../components/FancyButton'
import { UserIcon } from '../../components/icons/UserIcon'
import { NewClientModal } from '../../components/modals/NewClientModal'
import { ClientTableColumns } from '../../constants/tables/ClientTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../../layouts/PanelLayout'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const ClientPage: NextPageWithLayout = () => {
  const [isNewClientModalVisible, setNewClientModalVisible] = useState(false)
  const { setHeader, setButtons } = usePanelLayoutStore()

  const toggleNewClientModal = () => setNewClientModalVisible(!isNewClientModalVisible)

  useEffect(() => {
    setHeader('Clients')

    setButtons(
      <FancyButton
        Icon={<UserIcon className="stroke-halloween-orange" />}
        title="Create Client"
        subtitle="Laborerivit rem cones mil"
        onClick={toggleNewClientModal}
        className="w-fit"
      />
    )
  }, [])

  return (
    <>
      <NewClientModal isVisible={isNewClientModalVisible} onClose={toggleNewClientModal} />
      <Head>
        <title>Indy - Clients</title>
      </Head>
      <div className="mx-auto w-full max-w-8xl space-y-6">
        <Card title="Clients" className="max-h-155">
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
