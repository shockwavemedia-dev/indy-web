import axios from 'axios'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { EditIcon } from '../../../components/icons/EditIcon'
import { TrashIcon } from '../../../components/icons/TrashIcon'
import {
  DeleteClientModal,
  useDeleteClientModal,
} from '../../../components/modals/DeleteClientModal'
import { DeleteTicketModal } from '../../../components/modals/DeleteTicketModal'
import { EditClientModal, useEditClientModal } from '../../../components/modals/EditClientModal'
import { EditTicketModal } from '../../../components/modals/EditTicketModal'
import { TitleValue } from '../../../components/TitleValue'
import { AdminTicketsTableColumns } from '../../../constants/tables/AdminTicketsTableColumns'
import ClientLayout from '../../../layouts/ClientLayout'
import PanelLayout from '../../../layouts/PanelLayout'
import { Client } from '../../../types/Client.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'

const ClientDetails: NextPageWithLayout = () => {
  const {
    replace,
    query: { id },
  } = useRouter()
  const toggleEditClientModal = useEditClientModal((state) => state.toggleEditClientModal)
  const toggleDeleteClientModal = useDeleteClientModal((state) => state.toggleDeleteClientModal)

  const { data } = useQuery(['clients', Number(id)], async () => {
    const { data } = await axios.get<Client>(`/v1/clients/${id}`)

    return data
  })

  if (!data) return null

  return (
    <div>
      <div className="mb-6 flex gap-6">
        <Card title="Company Details" className="min-w-[21.5rem]">
          <div className="absolute top-6 right-6 space-x-2">
            <button className="group" onClick={() => toggleEditClientModal(data)}>
              <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
            </button>
            <button className="group" onClick={() => toggleDeleteClientModal(data)}>
              <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
            </button>
          </div>
          <div className="space-y-5">
            <TitleValue title="Name">{data.name}</TitleValue>
            <TitleValue title="Address">{data.address}</TitleValue>
            <TitleValue title="Phone">{data.phone}</TitleValue>
            <TitleValue title="Timezone">{data.timezone}</TitleValue>
          </div>
        </Card>
        <Card title="Graph" className="flex-1"></Card>
      </div>
      <Card title="Tickets" className="flex max-h-155 flex-1 flex-col">
        <DataTable
          columns={AdminTicketsTableColumns}
          dataEndpoint={`/v1/clients/${data.id}/tickets`}
          tableQueryKey={['tickets', data.id]}
          ofString="Tickets"
          rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
        />
      </Card>
      <EditTicketModal />
      <DeleteTicketModal />
      <EditClientModal />
      <DeleteClientModal />
    </div>
  )
}

ClientDetails.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientDetails
