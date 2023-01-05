import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Card } from '../../Card'
import { CheckboxNoFormik } from '../../CheckboxNoFormik'
import { DataTable } from '../../DataTable'
import { DateInputNoFormik } from '../../DateInputNoFormik'
import { TicketPriorityFilter, useTicketPriorityFilter } from '../../filters/TicketPriorityFilter'
import { TicketStatusFilter, useTicketStatusFilter } from '../../filters/TicketStatusFilter'
import { TicketTypeFilter, useTicketTypeFilter } from '../../filters/TicketTypeFilter'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'
import { RetainerInclusions } from '../../RetainerInclusions'
import { TextInputNoFormik } from '../../TextInputNoFormik'

export const ClientDashboard = ({
  isPendingJobs = false,
  isNewJobs = false,
}: {
  isPendingJobs: boolean
  isNewJobs: boolean
}) => {
  const { replace } = useRouter()
  const { data: session } = useSession()
  const { setHeader, setSubHeader } = usePanelLayoutStore()
  const [subject, setSubject] = useState('')
  const [subjectPayload, setSubjectPayload] = useState('')
  const [code, setCode] = useState('')
  const [codePayload, setCodePayload] = useState('')
  const [duedate, setDuedate] = useState<Date>()
  const statuses = useTicketStatusFilter((state) => state.statuses)
  const types = useTicketTypeFilter((state) => state.types)
  const getStatusesAsPayload = useTicketStatusFilter((state) => state.getAsPayload)
  const getTypesAsPayload = useTicketTypeFilter((state) => state.getAsPayload)
  const priorities = useTicketPriorityFilter((state) => state.priorities)
  const getPrioritiesAsPayload = useTicketPriorityFilter((state) => state.getAsPayload)
  const [hideClosed, setHideClosed] = useState(false)
  const toggleHideClosedTicket = () => setHideClosed(!hideClosed)

  useEffect(() => {
    setHeader(`${session?.user.userType.client.name} Dashboard`)
    setSubHeader(`Welcome back, ${session?.user.firstName}`)

    return () => {
      setSubHeader('')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Dashboard</title>
      </Head>
      <div className="mx-auto w-full">
        <div className="flex gap-6 transition-all lg:flex-col">
          <Card title="Project Status Table" className="flex max-h-155 flex-1 flex-col space-y-8">
            <div className="absolute top-6 right-6 flex space-x-3"></div>
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={
                isPendingJobs
                  ? `/v1/clients/${session?.user.userType.client.id}/tickets?statuses[0]=pending`
                  : isNewJobs
                  ? `/v1/clients/${session?.user.userType.client.id}/tickets?statuses[0]=new`
                  : `/v1/clients/${session?.user.userType.client.id}/tickets`
              }
              tableQueryKey={[
                'tickets',
                ...statuses.filter((s) => s !== 'show_overdue'),
                ...types,
                subjectPayload,
                codePayload,
                duedate ? format(duedate, 'dd/MM/yyyy') : '',
                { showOverdue: statuses.some((s) => s === 'show_overdue') },
                ...priorities,
                hideClosed,
              ]}
              ofString="Projects"
              dataParams={{
                ...getTypesAsPayload(),
                ...getStatusesAsPayload(),
                subject: subjectPayload,
                code: codePayload,
                duedate: duedate ? format(duedate, 'dd/MM/yyyy') : '',
                show_overdue: statuses.some((s) => s === 'show_overdue'),
                ...getPrioritiesAsPayload(),
                hide_closed: hideClosed,
              }}
              rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
              tableActions={
                <>
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
                  {!isPendingJobs && !isNewJobs && <TicketStatusFilter />}
                  <TicketPriorityFilter />
                  <CheckboxNoFormik
                    label="Hide Closed Ticket"
                    onChange={toggleHideClosedTicket}
                    checked={hideClosed}
                  />
                </>
              }
            />
          </Card>
          <div className="flex w-86 flex-col gap-6 transition-all lg:w-full lg:flex-row">
            <RetainerInclusions />
            <Notifications className="flex-1" />
          </div>
        </div>
      </div>
      <EditTicketModal />
      <DeleteTicketModal />
    </>
  )
}
