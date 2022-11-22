import Head from 'next/head'
import { useRouter } from 'next/router'
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
  const { replace } = useRouter()
  const [isNewClientModalVisible, setNewClientModalVisible] = useState(false)
  const { setHeader, setButtons } = usePanelLayoutStore()

  const toggleNewClientModal = () => setNewClientModalVisible(!isNewClientModalVisible)

  useEffect(() => {
    setHeader('Clients')

    setButtons(
      <FancyButton
        Icon={<UserIcon className="stroke-halloween-orange" />}
        title="Create Client"
        subtitle=""
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
      <div className="mx-auto w-full">
        <Card title="Clients">
          <DataTable
            dataEndpoint="/v1/clients"
            columns={ClientTableColumns}
            tableQueryKey={['clients']}
            ofString="Clients"
            rowOnClick={({ original: { id } }) => replace(`/clients/${id}/details`)}
          />
        </Card>
      </div>
    </>
  )
}

ClientPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientPage
