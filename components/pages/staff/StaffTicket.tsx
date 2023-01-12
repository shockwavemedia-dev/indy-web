import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'
import axios from 'axios'
import { format } from 'date-fns'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { DataTable } from '../../../components/DataTable'
import { CalendarIcon } from '../../../components/icons/CalendarIcon'
import { EditIcon } from '../../../components/icons/EditIcon'
import { NoteIcon } from '../../../components/icons/NoteIcon'
import { PaperPlaneIcon } from '../../../components/icons/PaperPlaneIcon'
import { CreateLinkModal } from '../../../components/modals/CreateLinkModal'
import { ViewTicketAssigneeModal } from '../../../components/modals/ViewTicketAssigneeModal'
import { RichTextDisplay } from '../../../components/RichTextDisplay'
import { RichTextInput } from '../../../components/RichTextInput'
import { TitleValue } from '../../../components/TitleValue'
import { StaffTicketAssigneeTableColumns } from '../../../constants/tables/StaffTicketAssigneeTableColumns'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { CreateNoteFormSchema } from '../../../schemas/CreateNoteFormSchema'
import { useTicketAssigneeStore } from '../../../store/TicketAssigneeStore'
import { useToastStore } from '../../../store/ToastStore'
import { CreateNoteForm } from '../../../types/forms/CreateNoteForm.type'
import { Icon } from '../../../types/Icon.type'
import { Page } from '../../../types/Page.type'
import { Ticket } from '../../../types/Ticket.type'
import { TicketActivity } from '../../../types/TicketActivity.type'
import { TicketChat } from '../../../types/TicketChat.type'
import { TicketFileVersion } from '../../../types/TicketFileVersion.type'
import { TicketNote } from '../../../types/TicketNote.type'
import { TicketPageTabs } from '../../../types/TicketPageTabs.type'
import { TicketStyleGuideComment } from '../../../types/TicketStyleGuideComment.type'
import { objectWithFileToFormData } from '../../../utils/FormHelpers'
import { FileBrowser } from '../../FileBrowser'
import { FileDisplay } from '../../FileDisplay'
import { FileDropZone } from '../../FileDropZone'
import { ColorsIcon } from '../../icons/ColorsIcon'
import { DollarIcon } from '../../icons/DollarIcon'
import { FolderIcon } from '../../icons/FolderIcon'
import { InfoIcon } from '../../icons/InfoIcon'
import { NotepadIcon } from '../../icons/NotepadIcon'
import { PlusIcon } from '../../icons/PlusIcon'
import { AddTicketAssigneeModal } from '../../modals/AddTicketAssigneeModal'
import { DeleteTicketAssigneeModal } from '../../modals/DeleteTicketAssigneeModal'
import { EditTicketAssigneeModal } from '../../modals/EditTicketAssigneeModal'
import { ReAssignTicketAssigneeModal } from '../../modals/ReAssignTicketAssigneeModal'
import { TicketFileButton } from '../../modals/TicketFileButton'
import {
  UploadTicketFileModal,
  useUploadTicketFileModalStore,
} from '../../modals/UploadTicketFileModal'
import { Pill } from '../../Pill'
import { TicketActivityCard } from '../../tickets/TicketActivityCard'
import { TicketChatCard } from '../../tickets/TicketChatCard'
import { TicketNoteCard } from '../../tickets/TicketNoteCard'
import { TicketStyleGuideCommentCard } from '../../tickets/TicketStyleGuideCommentCard'
export const StaffTicket = ({ ticketId }: { ticketId: number }) => {
  const [isAddTicketAssigneeModalVisible, setAddTicketAssigneeModalVisible] = useState(false)
  const {
    activeTicketAssignee,
    isViewTicketAssigneeModalVisible,
    toggleViewTicketAssigneeModal,
    isEditTicketAssigneeModalVisible,
    toggleEditTicketAssigneeModal,
    isDeleteTicketAssigneeModalVisible,
    toggleDeleteTicketAssigneeModal,
    isReAssignTicketAssigneeModalVisible,
    toggleReAssignTicketAssigneeModal,
  } = useTicketAssigneeStore()

  const { setHeader } = usePanelLayoutStore()

  const { showToast } = useToastStore()

  const [activeTab, setActiveTab] = useState<TicketPageTabs>('description')

  const { toggleUploadTicketFileModal } = useUploadTicketFileModalStore()

  const queryClient = useQueryClient()

  const { data: ticket, isSuccess } = useQuery(['ticket', ticketId], async () => {
    const { data } = await axios.get<Ticket>(`/v1/tickets/${ticketId}`)

    return data
  })

  const { data: chats } = useQuery(
    ['chats', ticketId],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketChat>
        page: Page
      }>(`/v1/tickets/${ticketId}/chats`)

      return data
    },
    {
      enabled: activeTab === 'chats',
    }
  )

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="top-end" className="ml-auto" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 260,
      fontSize: theme.typography.pxToRem(11),
    },
  }))

  const { data: session } = useSession()
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

  const { data: styleGuideComments } = useQuery(
    ['styleGuideComments', ticketId],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketStyleGuideComment>
        page: Page
      }>(`/v1/tickets/${ticketId}/style-guide-comments`)

      return data
    },
    {
      enabled: activeTab === 'style_guide',
    }
  )

  let unreadNotes = 0

  if (ticket?.userNotes) {
    unreadNotes = JSON.parse(ticket?.userNotes)[session?.user.id ?? 0]
  }

  const { data: ticketFiles } = useQuery(['ticketFiles'], async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<TicketFileVersion>
      page: Page
    }>(`/v1/tickets/${ticketId}/file-versions`)

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

  const submitNoteForm = async (
    values: CreateNoteForm,
    {
      resetForm,
    }: {
      resetForm: () => void
    }
  ) => {
    const { status } = await axios.post(
      `/v1/tickets/${ticketId}/notes`,
      objectWithFileToFormData(values)
    )
    if (status === 200) {
      queryClient.invalidateQueries(['notes', ticketId])
      showToast({
        type: 'success',
        message: `Message sent successfully!`,
      })

      resetForm()
    }
  }

  const Tab = ({
    title,
    Icon,
    tabName,
    disabled = false,
    showCount = false,
  }: {
    title: string
    Icon: Icon
    tabName: TicketPageTabs
    disabled?: boolean
    showCount?: boolean
  }) => {
    const clickTab = () => {
      setActiveTab(tabName)

      if (tabName === 'notes' && unreadNotes > 0) {
        axios.post(`/v1/tickets/${ticketId}/read-ticket-notes`)
        queryClient.invalidateQueries(['ticket', ticketId])
      }
    }

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
          {unreadNotes > 0 && showCount && (
            <div className="ml-2 min-w-[1.25rem] rounded-full bg-red-crimson p-2 text-center text-xxs font-semibold text-white">
              {unreadNotes}
            </div>
          )}
        </button>
      </div>
    )
  }

  const toggleAddTicketAssigneeModal = () =>
    setAddTicketAssigneeModalVisible(!isAddTicketAssigneeModalVisible)

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
            <div className="overflow-elipsis mb-6 mr-4 flex space-x-5">
              {ticket.clientLogo?.url && (
                <Image
                  src={ticket.clientLogo.url}
                  height={150}
                  width={150}
                  alt={ticket!.clientName}
                />
              )}
            </div>
            <div className="mb-6 flex space-x-5">
              <div className="overflow-clip">
                <TitleValue title="Company" className="mb-3">
                  {ticket!.clientName}
                </TitleValue>
                <TitleValue title="Subject" className="mb-3">
                  {ticket!.subject}
                </TitleValue>
                <TitleValue title="Submitted By:">{ticket!.createdBy}</TitleValue>
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
                <Pill
                  twBackgroundColor={(() => {
                    switch (ticket!.type) {
                      case 'email':
                        return 'bg-light-red-crimson'
                      case 'library':
                        return 'bg-light-golden-rod'
                      case 'event':
                        return 'bg-light-navy'
                      case 'project':
                        return 'bg-light-navy'
                      case 'graphic':
                        return 'bg-light-forest-green'
                      case 'print':
                        return 'bg-light-orange'
                      case 'task':
                        return 'bg-light-orchid'
                    }
                  })()}
                  twTextColor={(() => {
                    switch (ticket!.type) {
                      case 'email':
                        return 'text-red-crimson'
                      case 'library':
                        return 'text-golden-rod'
                      case 'event':
                        return 'text-navy'
                      case 'project':
                        return 'text-navy'
                      case 'graphic':
                        return 'text-forest-green'
                      case 'print':
                        return 'text-orange'
                      case 'task':
                        return 'text-orchid'
                    }
                  })()}
                  value={ticket!.type}
                />
              </TitleValue>
              <TitleValue title="Status" className="flex items-center justify-between capitalize">
                <Pill
                  twBackgroundColor={(() => {
                    switch (ticket!.status) {
                      case 'closed':
                        return 'bg-honeydew'
                      case 'open':
                        return 'bg-light-golden-rod'
                      case 'new':
                        return 'bg-alice-blue'
                      case 'pending':
                        return 'bg-light-tart-orange'
                      case 'in_progress':
                        return 'bg-light-blue'
                    }
                  })()}
                  twTextColor={(() => {
                    switch (ticket!.status) {
                      case 'closed':
                        return 'text-jungle-green'
                      case 'open':
                        return 'text-golden-rod'
                      case 'new':
                        return 'text-bleu-de-france'
                      case 'pending':
                        return 'text-tart-orange'
                      case 'in_progress':
                        return 'text-dark-blue'
                    }
                  })()}
                  value={ticket!.status}
                />
              </TitleValue>
              <TitleValue title="Priority" className="flex justify-between text-right">
                <div className="flex space-x-2">
                  <Pill
                    twBackgroundColor={(() => {
                      switch (ticket!.priority) {
                        case 'Urgent':
                          return 'bg-light-red-crimson'
                        case 'Standard':
                          return 'bg-light-golden-rod'
                        case 'Relaxed':
                          return 'bg-light-forest-green'
                      }
                    })()}
                    twTextColor={(() => {
                      switch (ticket!.priority) {
                        case 'Urgent':
                          return 'text-red-crimson'
                        case 'Standard':
                          return 'text-golden-rod'
                        case 'Relaxed':
                          return 'text-forest-green'
                      }
                    })()}
                    value={ticket!.priority}
                  />
                  <div className="text-sm font-medium text-metallic-silver">
                    {ticket!.priority === 'Relaxed'
                      ? '7 days'
                      : ticket!.priority === 'Standard'
                      ? '48 hours'
                      : '24 hours'}
                  </div>
                </div>
              </TitleValue>
              <TitleValue title="Department" className="flex items-center justify-between">
                {ticket!.departmentName}
              </TitleValue>
              <TitleValue title="Date Created" className="flex items-center justify-between">
                {format(ticket!.createdAt, 'dd/MM/yyyy')}
              </TitleValue>
              {!!ticket!.services && ticket!.services?.length > 0 && (
                <TitleValue title="Services" className="mb-5">
                  {ticket!.services?.map(
                    ({ serviceName, extras, customFields, updatedExtras }, i) => (
                      <div key={`${serviceName}-${i}`}>
                        {serviceName === 'Print' || serviceName === 'Social Media' ? (
                          <div className="mb-2 text-sm font-medium text-halloween-orange">
                            {serviceName}
                            {updatedExtras.map(({ name, quantity }) => (
                              <div
                                className="mb-2 text-sm font-medium text-onyx"
                                key={`${serviceName}-${name}`}
                              >
                                <div className="grid grid-cols-2 gap-2">
                                  <div>{name}</div>
                                  <div className="mt-2 flex space-x-5">
                                    {serviceName === 'Social Media' && quantity !== '0' && (
                                      <DollarIcon className="pointer-events-none mr-2 stroke-lavender-gray" />
                                    )}
                                    {quantity !== '0' ? quantity : ''}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mb-2 text-sm font-medium text-halloween-orange">
                            {serviceName}
                            {extras.map((extra) => (
                              <div
                                className="mb-2 text-sm font-medium text-onyx"
                                key={`${serviceName}-${extra}`}
                              >
                                <div className="grid grid-cols-2 gap-2">
                                  <div>{extra}</div>
                                  {extra === 'Custom' && <div>{customFields}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </TitleValue>
              )}
            </div>
          </Card>
          <Card title="Assignees">
            <DataTable
              columns={StaffTicketAssigneeTableColumns}
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
            <button
              className="absolute top-6 right-6 flex space-x-2"
              type="button"
              onClick={toggleUploadTicketFileModal}
            >
              <PlusIcon className="stroke-halloween-orange" />
              <div className=" text-sm font-semibold text-halloween-orange">Upload File</div>
              <div className="flex">
                <HtmlTooltip
                  title={
                    <React.Fragment>
                      <div>If you upload here, the file will be</div>
                      <div className="mb-3">sent to the client with an approval request.</div>
                      <div>If you do not want to submit an approval request to the client,</div>
                      <div>please upload directly to the clients MyFiles folder and not here.</div>
                      <div className="mt-3">Only latest file version can be deleted.</div>
                    </React.Fragment>
                  }
                >
                  <div>
                    <InfoIcon className="h-4 stroke-bleu-de-france transition-colors hover:stroke-halloween-orange" />
                  </div>
                </HtmlTooltip>
              </div>
            </button>
            <div className="flex flex-wrap gap-4">
              {!!ticketFiles ? (
                ticketFiles.map(
                  ({ id, name, thumbnailUrl, status, ticketFileId, fileVersion, isLatest }) => {
                    return (
                      <TicketFileButton
                        ticketFileId={ticketFileId}
                        key={`ticketFile-${id}`}
                        className="h-35 w-35"
                        href={`/ticket/file/${ticketFileId}`}
                        name={name}
                        thumbnailUrl={thumbnailUrl}
                        isLatest={isLatest}
                        version={fileVersion}
                        fileStatus={status}
                        isClient={false}
                      />
                    )
                  }
                )
              ) : (
                <div className="m-auto text-base text-metallic-silver">No files found.</div>
              )}
            </div>
          </Card>
        </div>
        <div className="w-full min-w-0">
          <div className="flex justify-between">
            <Tab title="Description" Icon={NotepadIcon} tabName="description" />
            <Tab title="Messaging" Icon={NoteIcon} tabName="notes" showCount={true} />
            <Tab title="My Files" Icon={FolderIcon} tabName="my_files" />
            <Tab title="Chats" Icon={FolderIcon} tabName="chats" />
            <Tab title="Activities" Icon={CalendarIcon} tabName="activities" />
            <Tab title="Style Guide" Icon={ColorsIcon} tabName="style_guide" />
          </div>
          <div className="h-px bg-bright-gray" />
          <div
            className={`-mt-0.5 mb-4 h-0.75 w-1/6 rounded bg-halloween-orange fill-halloween-orange transition-all ${
              activeTab === 'description'
                ? 'ml-0'
                : activeTab === 'notes'
                ? 'ml-1/6'
                : activeTab === 'my_files'
                ? 'ml-2/6'
                : activeTab === 'chats'
                ? 'ml-3/6'
                : activeTab === 'activities'
                ? 'ml-4/6'
                : 'ml-auto'
            }`}
          />

          {activeTab === 'description' && (
            <div>
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
              <Card title="Attachment" className="mt-5">
                <div className="flex h-fit w-257.5 flex-wrap gap-5">
                  {!!ticket!.attachments && ticket!.attachments?.length > 0 ? (
                    ticket!.attachments?.map((attachment) => (
                      <FileDisplay
                        key={`attachment-${attachment.id}`}
                        src={attachment.url}
                        type={attachment.fileType}
                        imageSize="h-44 w-44"
                        imageAlt={attachment.url}
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
          {activeTab === 'style_guide' && (
            <div>
              <Card className="mb-14">
                {ticket.styleGuide && <RichTextDisplay value={ticket!.styleGuide} />}
              </Card>
              <div className="mb-6 text-xl font-semibold text-onyx">Comments</div>

              <TicketStyleGuideCommentCard
                styleGuideComments={styleGuideComments}
                ticketId={ticket.id}
              />
            </div>
          )}
          {activeTab === 'notes' && (
            <>
              <Formik
                validationSchema={CreateNoteFormSchema}
                initialValues={{ note: '', attachments: [] }}
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
                    <FileDropZone
                      label="Upload Attachments"
                      name="attachments"
                      className="mb-8 mt-5"
                      maxSize={250}
                      mimeType="image/gif"
                      accept={['.gif', '.jpeg', '.mp4', '.png', '.jpg', '.pdf', '.doc', '.docx']}
                      multiple
                    />
                  </Form>
                )}
              </Formik>
              <div className="space-y-5">
                {notes?.map(({ id, note, file, createdBy, attachments, createdAt }) => (
                  <TicketNoteCard
                    key={`note-${id}`}
                    attachments={attachments}
                    note={note}
                    file={file}
                    createdBy={createdBy}
                    createdAt={createdAt}
                  />
                ))}
              </div>
            </>
          )}
          {activeTab === 'my_files' && (
            <Card>
              <div className="mx-auto w-full">
                <div className="flex gap-6 transition-all lg:flex-col">
                  <FileBrowser clientId={ticket.clientId} />
                </div>
              </div>{' '}
            </Card>
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
          {activeTab === 'chats' && (
            <div className="space-y-5">
              <TicketChatCard chats={chats} ticketId={ticket.id} />
            </div>
          )}
        </div>
      </div>
      <ViewTicketAssigneeModal
        isVisible={isViewTicketAssigneeModalVisible}
        onClose={toggleViewTicketAssigneeModal}
        ticketAssignee={activeTicketAssignee}
      />
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
      <ReAssignTicketAssigneeModal
        isVisible={isReAssignTicketAssigneeModalVisible}
        onClose={toggleReAssignTicketAssigneeModal}
        ticketId={ticket!.id}
      />
      <DeleteTicketAssigneeModal
        isVisible={isDeleteTicketAssigneeModalVisible}
        onClose={toggleDeleteTicketAssigneeModal}
        ticketId={ticket!.id}
      />
      <CreateLinkModal />
      <UploadTicketFileModal ticketId={ticketId} clientId={ticket.clientId} />
    </>
  )
}
