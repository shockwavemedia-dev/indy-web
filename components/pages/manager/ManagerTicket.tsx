import axios from 'axios'
import { format } from 'date-fns'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { CalendarIcon } from '../../../components/icons/CalendarIcon'
import { ColorsIcon } from '../../../components/icons/ColorsIcon'
import { EditIcon } from '../../../components/icons/EditIcon'
import { NoteIcon } from '../../../components/icons/NoteIcon'
import { PaperClipIcon } from '../../../components/icons/PaperClipIcon'
import { PaperPlaneIcon } from '../../../components/icons/PaperPlaneIcon'
import { PlusIcon } from '../../../components/icons/PlusIcon'
import { TrashIcon } from '../../../components/icons/TrashIcon'
import { AddTicketAssigneeModal } from '../../../components/modals/AddTicketAssigneeModal'
import { CreateLinkModal } from '../../../components/modals/CreateLinkModal'
import { DeleteTicketAssigneeModal } from '../../../components/modals/DeleteTicketAssigneeModal'
import {
  DeleteTicketModal,
  useDeleteTicketModal,
} from '../../../components/modals/DeleteTicketModal'
import { EditTicketModal, useEditTicketModal } from '../../../components/modals/EditTicketModal'
import { RichTextDisplay } from '../../../components/RichTextDisplay'
import { RichTextInput } from '../../../components/RichTextInput'
import { TitleValue } from '../../../components/TitleValue'
import { ManagerTicketAssigneeTableColumns } from '../../../constants/tables/ManagerTicketAssigneeTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { CreateNoteFormSchema } from '../../../schemas/CreateNoteFormSchema'
import { useTicketAssigneeStore } from '../../../store/TicketAssigneeStore'
import { CreateNoteForm } from '../../../types/forms/CreateNoteForm.type'
import { Icon } from '../../../types/Icon.type'
import { Page } from '../../../types/Page.type'
import { Ticket } from '../../../types/Ticket.type'
import { TicketActivity } from '../../../types/TicketActivity.type'
import { TicketFile } from '../../../types/TicketFile.type'
import { TicketNote } from '../../../types/TicketNote.type'
import { TicketPageTabs } from '../../../types/TicketPageTabs.type'
import { FileButton } from '../../FileButton'
import { NotepadIcon } from '../../icons/NotepadIcon'
import { EditTicketAssigneeModal } from '../../modals/EditTicketAssigneeModal'
import { TicketActivityCard } from '../../tickets/TicketActivityCard'
import { TicketNoteCard } from '../../tickets/TicketNoteCard'

export const ManagerTicket = ({ ticketId }: { ticketId: number }) => {
  const [activeTab, setActiveTab] = useState<TicketPageTabs>('description')
  const [isAddTicketAssigneeModalVisible, setAddTicketAssigneeModalVisible] = useState(false)

  const queryClient = useQueryClient()
  const {
    isEditTicketAssigneeModalVisible,
    isDeleteTicketAssigneeModalVisible,
    toggleEditTicketAssigneeModal,
    toggleDeleteTicketAssigneeModal,
  } = useTicketAssigneeStore()
  const toggleEditTicketModal = useEditTicketModal((state) => state.toggleEditTicketModal)
  const toggleDeleteTicketModal = useDeleteTicketModal((state) => state.toggleDeleteTicketModal)
  const { setHeader } = usePanelLayoutStore()

  const { data: ticket, isSuccess } = useQuery(['ticket', ticketId], async () => {
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

  const toggleAddTicketAssigneeModal = () =>
    setAddTicketAssigneeModalVisible(!isAddTicketAssigneeModalVisible)

  const submitNoteForm = async (
    values: CreateNoteForm,
    {
      resetForm,
    }: {
      resetForm: () => void
    }
  ) => {
    const { status } = await axios.post(`/v1/tickets/${ticketId}/notes`, values)
    if (status === 200) {
      queryClient.invalidateQueries(['notes', ticketId])
      resetForm()
    }
  }

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
                : 'stroke-lavender-gray group-hover:stroke-halloween-orange group-disabled:stroke-lavender-gray'
            }`}
          />
          <div
            className={` text-base ${
              isActiveTab
                ? 'font-semibold text-onyx'
                : 'font-medium text-metallic-silver group-hover:font-semibold group-hover:text-onyx group-disabled:font-medium group-disabled:text-metallic-silver'
            }`}
          >
            {title}
          </div>
        </button>
      </div>
    )
  }

  useEffect(() => {
    if (ticket) {
      setHeader(`Ticket ${ticket.ticketCode}`)
    }
  }, [ticket])

  if (!isSuccess) {
    // todo create loading skeleton
    return null
  }

  return (
    <>
      <Head>
        <title>Indy - Ticket {ticket!.ticketCode}</title>
      </Head>
      <div className="mx-auto flex w-full space-x-6">
        <div className="w-86 flex-none space-y-6">
          <Card title="Details">
            <div className="absolute top-6 right-6 space-x-4">
              <button className="group" onClick={() => toggleEditTicketModal(ticket)}>
                <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
              </button>
              <button className="group" onClick={() => toggleDeleteTicketModal(ticket)}>
                <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
              </button>
            </div>
            <div className="mb-6 flex space-x-5">
              {ticket.clientLogo?.url && (
                <Image
                  src={ticket.clientLogo.url}
                  height={100}
                  width={100}
                  alt={ticket!.clientName}
                />
              )}
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
              <TitleValue title="Priority" className="flex items-center justify-between">
                {ticket!.priority}
              </TitleValue>
              <TitleValue title="Date Created" className="flex items-center justify-between">
                {format(ticket!.createdAt, 'dd/MM/yyyy')}
              </TitleValue>
              {!!ticket!.services && ticket!.services?.length > 0 && (
                <TitleValue title="Services" className="mb-5">
                  {ticket!.services?.map(({ serviceName, extras, customFields }, i) => (
                    <div key={`${serviceName}-${i}`}>
                      <div className="mb-2 text-sm font-medium text-halloween-orange">
                        {serviceName}
                        {extras.map((extra) => (
                          <div
                            className="mb-2 text-sm font-medium text-onyx"
                            key={`${serviceName}-${extra}`}
                          >
                            {extra}
                            {customFields}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </TitleValue>
              )}
            </div>
          </Card>
          <Card title="Assignees">
            <DataTable
              columns={ManagerTicketAssigneeTableColumns}
              dataEndpoint={`/v1/tickets/${ticketId}/assignees`}
              tableQueryKey={['assignees', ticketId]}
              ofString="Assignee"
              tableActions={
                <button className="flex space-x-2" onClick={toggleAddTicketAssigneeModal}>
                  <PlusIcon className="stroke-halloween-orange" />
                  <div className=" text-sm font-semibold text-halloween-orange">Add Assignee</div>
                </button>
              }
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
                      file
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
            <Tab title="Messaging" Icon={NoteIcon} tabName="notes" />
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
            <Card>
              {!ticket.emailHtml && <RichTextDisplay value={ticket!.description} />}
              {ticket.emailHtml && (
                <p
                  className="d-inline comment-paragraph-text"
                  dangerouslySetInnerHTML={{
                    __html: ticket.emailHtml,
                  }}
                />
              )}
            </Card>
          )}
          {activeTab === 'notes' && (
            <>
              <Formik
                validationSchema={CreateNoteFormSchema}
                initialValues={{ note: '' }}
                onSubmit={submitNoteForm}
              >
                {({ isSubmitting }) => (
                  <Form className="mb-5">
                    <RichTextInput
                      Icon={EditIcon}
                      placeholder="Enter message"
                      name="note"
                      inputActions={
                        <div className="absolute right-6 bottom-6 z-10 flex items-center space-x-6">
                          <input type="file" name="attachment" id="note-attachment" hidden />
                          <label htmlFor="note-attachment" className="cursor-pointer">
                            <PaperClipIcon className="stroke-waterloo" />
                          </label>
                          <Button
                            ariaLabel="Submit Notes"
                            type="submit"
                            className="!w-fit px-10"
                            disabled={isSubmitting}
                          >
                            <PaperPlaneIcon className="stroke-white" />
                            <div>Send</div>
                          </Button>
                        </div>
                      }
                    />
                  </Form>
                )}
              </Formik>
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
      <EditTicketModal />
      <DeleteTicketModal minimal />
      <AddTicketAssigneeModal
        isVisible={isAddTicketAssigneeModalVisible}
        onClose={toggleAddTicketAssigneeModal}
        ticketId={ticket!.id}
      />
      <EditTicketAssigneeModal
        isVisible={isEditTicketAssigneeModalVisible}
        onClose={toggleEditTicketAssigneeModal}
        ticketId={ticket!.id}
      />
      <DeleteTicketAssigneeModal
        isVisible={isDeleteTicketAssigneeModalVisible}
        onClose={toggleDeleteTicketAssigneeModal}
        ticketId={ticket!.id}
      />
      <CreateLinkModal />
    </>
  )
}
