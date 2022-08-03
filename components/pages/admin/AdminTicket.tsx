import axios from 'axios'
import { format } from 'date-fns'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { CalendarIcon } from '../../../components/icons/CalendarIcon'
import { ColorsIcon } from '../../../components/icons/ColorsIcon'
import { NoteIcon } from '../../../components/icons/NoteIcon'
import { ViewTicketAssigneeModal } from '../../../components/modals/ViewTicketAssigneeModal'
import { RichTextDisplay } from '../../../components/RichTextDisplay'
import { TitleValue } from '../../../components/TitleValue'
import { ClientTicketAssigneeTableColumns } from '../../../constants/tables/ClientTicketAssigneeTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import DummyCompany from '../../../public/images/dummy-company.png'
import { useTicketAssigneeStore } from '../../../store/TicketAssigneeStore'
import { Icon } from '../../../types/Icon.type'
import { Page } from '../../../types/Page.type'
import { Ticket } from '../../../types/Ticket.type'
import { TicketActivity } from '../../../types/TicketActivity.type'
import { TicketFile } from '../../../types/TicketFile.type'
import { TicketNote } from '../../../types/TicketNote.type'
import { TicketPageTabs } from '../../../types/TicketPageTabs.type'
import { FileButton } from '../../FileButton'
import { FileDisplay } from '../../FileDisplay'
import { NotepadIcon } from '../../icons/NotepadIcon'
import { useFileModalStore } from '../../modals/FileModal'
import { Pill } from '../../Pill'
import { TicketActivityCard } from '../../tickets/TicketActivityCard'
import { TicketNoteCard } from '../../tickets/TicketNoteCard'

export const AdminTicket = ({ ticketId }: { ticketId: number }) => {
  const { setHeader } = usePanelLayoutStore()

  const [activeTab, setActiveTab] = useState<TicketPageTabs>('description')

  const { toggleFileModal } = useFileModalStore()
  const { activeTicketAssignee, isViewTicketAssigneeModalVisible, toggleViewTicketAssigneeModal } =
    useTicketAssigneeStore()

  const { data: ticket, isSuccess: ticketSuccess } = useQuery(['ticket', ticketId], async () => {
    const { data } = await axios.get<Ticket>(`/v1/tickets/${ticketId}`)

    return data
  })

  const { data: notes } = useQuery(
    ['notes', ticketId],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketNote>
        page: Page
      }>(`/v1/tickets/${ticketId}/notes`)

      return data
    },
    {
      enabled: activeTab === 'notes',
    }
  )

  const { data: ticketFiles } = useQuery(['ticketFiles', ticketId], async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<TicketFile>
      page: Page
    }>(`/v1/tickets/${ticketId}/files`)

    return data
  })

  const { data: activities } = useQuery(
    ['activities', ticketId],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketActivity>
        page: Page
      }>(`/v1/tickets/${ticketId}/activities`)

      return data
    },
    {
      enabled: activeTab === 'activities',
    }
  )

  const Tab = ({
    title,
    Icon,
    tabName,
    disabled = false,
  }: {
    title: string
    Icon: Icon
    tabName: TicketPageTabs
    disabled?: boolean
  }) => {
    const clickTab = () => setActiveTab(tabName)
    const isActiveTab = activeTab === tabName

    return (
      <div className="w-full">
        <button
          onClick={clickTab}
          className={`group mx-auto mb-3 flex items-center whitespace-nowrap ${
            isActiveTab ? 'pointer-events-none cursor-default select-none' : ''
          }`}
          disabled={disabled}
        >
          <Icon
            className={`mr-2.5 ${
              isActiveTab
                ? 'stroke-halloween-orange'
                : 'stroke-lavender-gray transition-all group-hover:stroke-halloween-orange group-disabled:stroke-lavender-gray'
            }`}
          />
          <div
            className={` text-base ${
              isActiveTab
                ? 'font-semibold text-onyx'
                : 'font-medium text-metallic-silver transition-all group-hover:font-semibold group-hover:text-onyx group-disabled:font-medium group-disabled:text-metallic-silver'
            }`}
          >
            {title}
          </div>
        </button>
      </div>
    )
  }

  useEffect(() => {
    toggleFileModal()
  }, [])

  useEffect(() => {
    if (ticket) {
      setHeader(`Ticket ${ticket.ticketCode}`)
    }
  }, [ticket])

  if (!ticketSuccess) {
    // todo create loading skeleton
    return null
  }

  return (
    <>
      <Head>
        <title>Indy - Ticket {ticket!.ticketCode}</title>
      </Head>
      <div className="mx-auto flex w-full max-w-8xl space-x-6">
        <div className="w-86 flex-none space-y-6">
          <Card title="Details">
            <div className="mb-6 flex space-x-5">
              <Image src={DummyCompany} height={100} width={100} alt={ticket!.clientName} />
              <div>
                <TitleValue title="Company" className="mb-3">
                  {ticket!.clientName}
                </TitleValue>
                <TitleValue title="Subject">{ticket!.subject}</TitleValue>
              </div>
            </div>
            <hr className="mb-6 border-t-bright-gray" />
            <div className="space-y-2">
              <TitleValue title="ID" className="flex items-center justify-between">
                {ticket!.id}
              </TitleValue>
              <TitleValue title="Code" className="flex items-center justify-between">
                {ticket!.ticketCode}
              </TitleValue>
              <TitleValue title="Type" className="flex items-center justify-between capitalize">
                {ticket!.type}
              </TitleValue>
              <TitleValue title="Status" className="flex items-center justify-between capitalize">
                {ticket!.status}
              </TitleValue>
              <TitleValue title="Department" className="flex items-center justify-between">
                {ticket!.departmentName}
              </TitleValue>
              <TitleValue title="Due Date" className="flex items-center justify-between">
                {format(ticket!.duedate, "yy MMM''dd")}
              </TitleValue>
              <TitleValue title="Date Created" className="flex items-center justify-between">
                {format(ticket!.createdAt, "yy MMM''dd")}
              </TitleValue>
              {!!ticket!.services && ticket!.services?.length > 0 && (
                <TitleValue title="Services">
                  <div className="flex flex-wrap gap-1">
                    {ticket!.services?.map(({ serviceName, extras, customFields }, i) => (
                      <Fragment key={`${serviceName}-${i}`}>
                        <div className="flex flex-wrap gap-1">
                          <Pill value={serviceName} />
                          {extras.map((extra) => (
                            <Pill key={`${serviceName}-${extra}`} value={extra} />
                          ))}
                        </div>
                        {customFields?.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            <TitleValue title="Custom">
                              {customFields.map((custom) => (
                                <Pill key={`${custom}`} value={custom} />
                              ))}
                            </TitleValue>
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </TitleValue>
              )}
            </div>
          </Card>
          <Card title="Assignees">
            <DataTable
              columns={ClientTicketAssigneeTableColumns}
              dataEndpoint={`/v1/tickets/${ticketId}/assignees`}
              tableQueryKey={['assignees', ticketId]}
              ofString="Assignee"
            />
          </Card>
          <Card title="Files">
            <div className="flex flex-wrap gap-4">
              {!!ticketFiles ? (
                ticketFiles.map(({ id, name, thumbnailUrl, status }) => {
                  return (
                    <FileButton
                      key={`ticketFile-${id}`}
                      className="h-35 w-35"
                      href={`/ticket/file/${id}`}
                      name={name}
                      thumbnailUrl={thumbnailUrl}
                      fileStatus={status}
                    />
                  )
                })
              ) : (
                <div className="m-auto text-base text-metallic-silver">No files found.</div>
              )}
            </div>
          </Card>
        </div>
        <div className="w-full min-w-0">
          <div className="flex justify-between">
            <Tab title="Description" Icon={NotepadIcon} tabName="description" />
            <Tab title="Notes" Icon={NoteIcon} tabName="notes" />
            <Tab title="Activities" Icon={CalendarIcon} tabName="activities" />
            <Tab title="Style Guide" Icon={ColorsIcon} tabName="style_guide" disabled />
          </div>
          <div className="h-px bg-bright-gray" />
          <div
            className={`-mt-0.5 mb-4 h-0.75 w-1/4 rounded bg-halloween-orange fill-halloween-orange transition-all ${
              activeTab === 'description'
                ? 'ml-0'
                : activeTab === 'notes'
                ? 'ml-1/4'
                : activeTab === 'activities'
                ? 'ml-1/2'
                : 'ml-auto'
            }`}
          />
          {activeTab === 'description' && (
            <div>
              <Card>
                <RichTextDisplay value={ticket!.description} />
              </Card>

              <Card title="Attachment" className="mt-5">
                <div className="flex h-fit w-257.5 flex-wrap gap-5">
                  {!!ticket!.attachments && ticket!.attachments?.length > 0 ? (
                    ticket!.attachments?.map((attachment) => (
                      <FileDisplay
                        key={`attachment-${attachment.id}`}
                        src={attachment.url}
                        type={attachment.fileType}
                        imageHeight={176}
                        imageWidth={314}
                        imageAlt={attachment.url}
                        className="rounded-xl"
                        href={attachment.url}
                        videoClassName="h-44 w-78.5 cursor-pointer rounded-xl"
                        failedToLoadClassName="h-44 w-78.5"
                      />
                    ))
                  ) : (
                    <div className=" text-xs text-metallic-silver">No attachment to display.</div>
                  )}
                </div>
              </Card>
            </div>
          )}
          {activeTab === 'notes' && (
            <>
              <div className="space-y-5">
                {notes?.map(({ id, note, createdBy, createdAt }) => (
                  <TicketNoteCard
                    key={`note-${id}`}
                    note={note}
                    createdBy={createdBy}
                    createdAt={createdAt}
                  />
                ))}
              </div>
            </>
          )}
          {activeTab === 'activities' && (
            <div className="space-y-5">
              {activities?.map(({ id, activity, createdAt }) => (
                <TicketActivityCard
                  key={`activity-${id}`}
                  activity={activity}
                  createdAt={createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ViewTicketAssigneeModal
        isVisible={isViewTicketAssigneeModalVisible}
        onClose={toggleViewTicketAssigneeModal}
        ticketAssignee={activeTicketAssignee}
      />
    </>
  )
}
