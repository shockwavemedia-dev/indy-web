import axios from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { DateInputNoFormik } from '../../../components/DateInputNoFormik'
import {
  TicketStatusFilter,
  useTicketStatusFilter,
} from '../../../components/filters/TicketStatusFilter'
import { TicketTypeFilter, useTicketTypeFilter } from '../../../components/filters/TicketTypeFilter'
import { EditIcon } from '../../../components/icons/EditIcon'
import { PlusIcon } from '../../../components/icons/PlusIcon'
import { TrashIcon } from '../../../components/icons/TrashIcon'
import {
  DeleteClientModal,
  useDeleteClientModal,
} from '../../../components/modals/DeleteClientModal'
import { DeleteClientUserModal } from '../../../components/modals/DeleteClientUserModal'
import { DeleteTicketModal } from '../../../components/modals/DeleteTicketModal'
import { EditClientModal, useEditClientModal } from '../../../components/modals/EditClientModal'
import { EditClientUserModal } from '../../../components/modals/EditClientUserModal'
import { EditTicketModal } from '../../../components/modals/EditTicketModal'
import {
  NewClientUserModal,
  useNewClientUserModal,
} from '../../../components/modals/NewClientUserModal'
import { TextInputNoFormik } from '../../../components/TextInputNoFormik'
import { TitleValue } from '../../../components/TitleValue'
import { AdminClientUsersTableColumns } from '../../../constants/tables/AdminClientUsersTableColumns'
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
  const toggleNewClientUserModal = useNewClientUserModal((state) => state.toggleNewClientUserModal)
  const [subject, setSubject] = useState('')
  const [subjectPayload, setSubjectPayload] = useState('')
  const [code, setCode] = useState('')
  const [codePayload, setCodePayload] = useState('')
  const [duedate, setDuedate] = useState<Date>()
  const statuses = useTicketStatusFilter((state) => state.statuses)
  const types = useTicketTypeFilter((state) => state.types)
  const getStatusesAsPayload = useTicketStatusFilter((state) => state.getAsPayload)
  const getTypesAsPayload = useTicketTypeFilter((state) => state.getAsPayload)

  const { data } = useQuery(['clients', Number(id)], async () => {
    const { data } = await axios.get<Client>(`/v1/clients/${id}`)

    return data
  })

  if (!data) return null

  return (
    <div className="w-full">
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
          <div className="space-y-4">
            {data.logoUrl && (
              <Image
                src={data.logoUrl}
                height={100}
                width={100}
                alt="company logo"
                className="rounded-lg"
              />
            )}
            <TitleValue title="Name">{data.name}</TitleValue>
            <TitleValue title="Address">{data.address}</TitleValue>
            <TitleValue title="Phone">{data.phone}</TitleValue>
            <TitleValue title="Timezone">{data.timezone}</TitleValue>
            <TitleValue title="Designated Designer">{data.designatedDesigner}</TitleValue>
          </div>
        </Card>
        <Card title="Graph" className="flex-1"></Card>
      </div>
      <Card title="Users" className="mb-6 flex max-h-155 flex-1 flex-col">
        <DataTable
          columns={AdminClientUsersTableColumns}
          dataEndpoint={`/v1/clients/${data.id}/users`}
          tableQueryKey={['client-users', data.id]}
          ofString="Users"
          tableActions={
            <button className="flex space-x-2" onClick={() => toggleNewClientUserModal(data)}>
              <PlusIcon className="stroke-halloween-orange" />
              <div className=" text-sm font-semibold text-halloween-orange">Add User</div>
            </button>
          }
          initialState={{
            sortBy: [
              {
                id: 'owner',
              },
            ],
          }}
        />
      </Card>
      <Card title="Tickets" className="flex max-h-155 flex-1 flex-col">
        <div className="ml-auto mb-5 flex flex-wrap gap-3">
          <DateInputNoFormik
            value={duedate}
            onChange={setDuedate}
            placeholder="Search by Due Date"
            className="w-[9.75rem]"
            noIcon
            slim
          />
          <TextInputNoFormik
            name="code"
            placeholder="Search by Code"
            type="text"
            className="w-[8.25rem]"
            onChange={setCode}
            onEnter={() => setCodePayload(code)}
            onBlur={() => setCodePayload(code)}
            slim
          />
          <TextInputNoFormik
            name="subject"
            placeholder="Search by Subject"
            type="text"
            className="w-[9rem]"
            onChange={setSubject}
            onEnter={() => setSubjectPayload(subject)}
            onBlur={() => setSubjectPayload(subject)}
            slim
          />
          <TicketTypeFilter />
          <TicketStatusFilter />
        </div>
        <DataTable
          columns={AdminTicketsTableColumns}
          dataEndpoint={`/v1/clients/${data.id}/tickets`}
          tableQueryKey={[
            'tickets',
            data.id,
            ...statuses,
            ...types,
            subjectPayload,
            codePayload,
            duedate ? format(duedate, 'yyyy-MM-dd') : '',
            { showOverdue: statuses.some((s) => s === 'show_overdue') },
          ]}
          ofString="Tickets"
          dataParams={{
            ...getTypesAsPayload(),
            ...getStatusesAsPayload(),
            subject: subjectPayload,
            code: codePayload,
            duedate: duedate ? format(duedate, 'yyyy-MM-dd') : '',
            show_overdue: statuses.some((s) => s === 'show_overdue'),
          }}
          rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
        />
      </Card>
      <EditTicketModal />
      <DeleteTicketModal />
      <EditClientModal />
      <DeleteClientModal />
      <NewClientUserModal />
      <EditClientUserModal />
      <DeleteClientUserModal />
    </div>
  )
}

ClientDetails.getLayout = (page: ReactElement) => (
  <PanelLayout>
    <ClientLayout>{page}</ClientLayout>
  </PanelLayout>
)

export default ClientDetails
