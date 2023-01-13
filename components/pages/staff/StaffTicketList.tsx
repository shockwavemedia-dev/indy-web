import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { StaffTicketsTableColumns } from '../../../constants/tables/StaffTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Client } from '../../../types/Client.type'
import { Page } from '../../../types/Page.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { Card } from '../../Card'
import { CheckboxNoFormik } from '../../CheckboxNoFormik'
import { DataTable } from '../../DataTable'
import { TicketPriorityFilter, useTicketPriorityFilter } from '../../filters/TicketPriorityFilter'
import { TicketStatusFilter, useTicketStatusFilter } from '../../filters/TicketStatusFilter'
import { TicketTypeFilter, useTicketTypeFilter } from '../../filters/TicketTypeFilter'
import { Notifications } from '../../Notifications'
import { SelectNoFormik } from '../../SelectNoFormik'
import { TextInputNoFormik } from '../../TextInputNoFormik'

export const StaffTicketList = ({
  isPendingJobs = false,
  isNewJobs = false,
}: {
  isPendingJobs: boolean
  isNewJobs: boolean
}) => {
  const { replace } = useRouter()
  const { data: session } = useSession()
  const { setHeader, setSubHeader, setCrumbsNavigation } = usePanelLayoutStore()
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
    setHeader('Ticket')
    setSubHeader(`Welcome back, ${session?.user.firstName}`)
    setCrumbsNavigation([])
    return () => {
      setSubHeader('')
    }
  }, [isPendingJobs, isNewJobs])

  return (
    <>
      <Head>
        <title>Indy - Tickets</title>
      </Head>
      <div className="mx-auto flex w-full gap-6 lg:flex-col">
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
            {!isPendingJobs && !isNewJobs && (
              <div className="!mt-4">
                <TicketStatusFilter />
              </div>
            )}
            <div className="!mt-4">
              <TicketPriorityFilter />
            </div>
            {!isPendingJobs && !isNewJobs && (
              <div className="!mt-4">
                <CheckboxNoFormik
                  label="Hide Closed Ticket"
                  onChange={toggleHideClosedTicket}
                  checked={hideClosed}
                />
              </div>
            )}
          </div>
          <DataTable
            columns={StaffTicketsTableColumns}
            dataEndpoint={
              isPendingJobs
                ? `/v1/my-tickets?statuses[0]=pending`
                : isNewJobs
                ? `/v1/my-tickets?statuses[0]=new`
                : `/v1/my-tickets`
            }
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
              { showOverdue: statuses.some((s) => s === 'show_overdue') },
              ...priorities,
              clientId,
              hideClosed,
            ]}
            ofString="Projects"
            rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
          />
        </Card>
        <Notifications className="w-86 lg:w-1/2" />
      </div>
    </>
  )
}
