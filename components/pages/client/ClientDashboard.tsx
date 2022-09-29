import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { DateInputNoFormik } from '../../DateInputNoFormik'
import { TicketStatusFilter, useTicketStatusFilter } from '../../filters/TicketStatusFilter'
import { TicketTypeFilter, useTicketTypeFilter } from '../../filters/TicketTypeFilter'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'
import { RetainerInclusions } from '../../RetainerInclusions'
import { TextInputNoFormik } from '../../TextInputNoFormik'

export const ClientDashboard = () => {
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

  useEffect(() => {
    setHeader('Dashboard')
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
            <div className="absolute top-6 right-6 flex space-x-3">
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
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.client.id}/tickets`}
              tableQueryKey={[
                'tickets',
                ...statuses,
                ...types,
                subjectPayload,
                codePayload,
                duedate ? format(duedate, 'yyyy-MM-dd') : '',
              ]}
              ofString="Projects"
              dataParams={{
                ...getTypesAsPayload(),
                ...getStatusesAsPayload(),
                subject: subjectPayload,
                code: codePayload,
                duedate: duedate ? format(duedate, 'yyyy-MM-dd') : '',
              }}
              rowOnClick={({ original: { id } }) => replace(`/ticket/${id}`)}
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
