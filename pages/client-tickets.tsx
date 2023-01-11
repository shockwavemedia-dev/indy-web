import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { Card } from '../components/Card'
import { CheckboxNoFormik } from '../components/CheckboxNoFormik'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import {
  TicketPriorityFilter,
  useTicketPriorityFilter,
} from '../components/filters/TicketPriorityFilter'
import { TicketStatusFilter, useTicketStatusFilter } from '../components/filters/TicketStatusFilter'
import { TicketTypeFilter, useTicketTypeFilter } from '../components/filters/TicketTypeFilter'
import { LifeBuoyIcon } from '../components/icons/LifeBuoyIcon'
import {
  CreateSupportTicketModal,
  useCreateSupportTicketModalStore,
} from '../components/modals/CreateSupportTicketModal'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { SelectNoFormik } from '../components/SelectNoFormik'
import { TextInputNoFormik } from '../components/TextInputNoFormik'
import { AdminTicketsTableColumns } from '../constants/tables/AdminTicketsTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { Client } from '../types/Client.type'
import { Page } from '../types/Page.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { SelectOption } from '../types/SelectOption.type'

const ClientTicketsPage: NextPageWithLayout = () => {
  const { setHeader, setButtons } = usePanelLayoutStore()
  const { replace } = useRouter()
  const { data: session } = useSession()
  const { toggleModal: toggleSupportTicketModal } = useCreateSupportTicketModalStore()
  const statuses = useTicketStatusFilter((state) => state.statuses)
  const priorities = useTicketPriorityFilter((state) => state.priorities)
  const [clientId, setClientId] = useState(-1)
  const [hideClosed, setHideClosed] = useState(false)
  const [subject, setSubject] = useState('')
  const [subjectPayload, setSubjectPayload] = useState('')
  const [code, setCode] = useState('')
  const [codePayload, setCodePayload] = useState('')
  const types = useTicketTypeFilter((state) => state.types)
  const getTypesAsPayload = useTicketTypeFilter((state) => state.getAsPayload)
  const getStatusesAsPayload = useTicketStatusFilter((state) => state.getAsPayload)
  const getPrioritiesAsPayload = useTicketPriorityFilter((state) => state.getAsPayload)
  const toggleHideClosedTicket = () => setHideClosed(!hideClosed)

  const { data: clients } = useQuery('clients', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Client>
      page: Page
    }>('/v1/clients?size=500')

    return data
  })

  const clientOptions = clients
    ? clients.map(({ name, id }) => ({
        label: name,
        value: id,
      }))
    : []

  const allClient = {
    label: 'All Client',
    value: -1,
  }

  const selectClient = (newValue: SingleValue<SelectOption<number>>) => {
    setClientId(newValue?.value || -1)
  }

  useEffect(() => {
    setHeader('Client Tickets')
    if (session?.user.userType.role === 'admin') {
      setButtons(
        <>
          <FancyButton
            Icon={<LifeBuoyIcon className="fill-halloween-orange" />}
            title="New Ticket"
            subtitle=""
            onClick={(e) => {
              e.stopPropagation()
              toggleSupportTicketModal(-1)
            }}
            className="w-fit"
          />
        </>
      )
    }
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Visual Displays</title>
      </Head>
      <div className="mx-auto w-full space-y-6">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card title="Tickets" className="flex max-h-155 flex-1 flex-col">
            <div className=" mb-5 flex flex-wrap gap-3">
              <SelectNoFormik
                className="!w-[15rem] rounded-md px-2"
                onChange={selectClient}
                placeholder="Select Client"
                options={[allClient, ...clientOptions]}
                value={clientOptions.find(({ value }) => value === clientId)}
              />
              <div className="!mt-3">
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
              </div>
              <div className="!mt-3">
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
              </div>
              <div className="!mt-4">
                <TicketTypeFilter />
              </div>
              <div className="!mt-4">
                <TicketStatusFilter />
              </div>
              <div className="!mt-4">
                <TicketPriorityFilter />
              </div>
              <div className="!mt-4">
                <CheckboxNoFormik
                  label="Hide Closed Ticket"
                  onChange={toggleHideClosedTicket}
                  checked={hideClosed}
                />
              </div>
            </div>
            <DataTable
              columns={AdminTicketsTableColumns}
              dataEndpoint={`/v1/tickets`}
              dataParams={{
                ...getTypesAsPayload(),
                ...getStatusesAsPayload(),
                subject: subjectPayload,
                code: codePayload,
                ...getPrioritiesAsPayload(),
                client_id: clientId !== -1 ? clientId : '',
                hide_closed: hideClosed,
              }}
              tableQueryKey={[
                'tickets',
                ...statuses,
                ...types,
                subjectPayload,
                codePayload,
                ...priorities,
                clientId,
                hideClosed,
              ]}
              ofString="Projects"
              rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
            />
          </Card>
        </div>
      </div>
      <EditTicketModal />
      <DeleteTicketModal clientsTickets />
      <CreateSupportTicketModal />
    </>
  )
}

ClientTicketsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default ClientTicketsPage
