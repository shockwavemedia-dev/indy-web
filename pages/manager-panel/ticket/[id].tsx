import axios from 'axios'
import { format } from 'date-fns'
import { Form, Formik, FormikState } from 'formik'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, ReactElement, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import DataTable from '../../../components/DataTable'
import CalendarIcon from '../../../components/icons/CalendarIcon'
import ColorsIcon from '../../../components/icons/ColorsIcon'
import EditIcon from '../../../components/icons/EditIcon'
import EmailIcon from '../../../components/icons/EmailIcon'
import NoteIcon from '../../../components/icons/NoteIcon'
import PaperClipIcon from '../../../components/icons/PaperClipIcon'
import PaperPlaneIcon from '../../../components/icons/PaperPlaneIcon'
import PlusIcon from '../../../components/icons/PlusIcon'
import TrashIcon from '../../../components/icons/TrashIcon'
import AddTicketAssigneeModal from '../../../components/modals/AddTicketAssigneeModal'
import CreateLinkModal from '../../../components/modals/CreateLinkModal'
import DeleteTicketAssigneeModal from '../../../components/modals/DeleteTicketAssigneeModal'
import DeleteTicketModal from '../../../components/modals/DeleteTicketModal'
import EditTicketAssigneeModal from '../../../components/modals/EditTicketAssigneeModal'
import EditTicketModal from '../../../components/modals/EditTicketModal'
import RichTextDisplay from '../../../components/RichTextDisplay'
import RichTextInput from '../../../components/RichTextInput'
import TextInput from '../../../components/TextInput'
import ActivityCard from '../../../components/TicketActivityCard'
import EmailCard from '../../../components/TicketEmailCard'
import NoteCard from '../../../components/TicketNoteCard'
import TitleValue from '../../../components/TitleValue'
import { ManagerRoutes } from '../../../constants/routes/ManagerRoutes'
import { ManagerTicketAssigneeTableColumns } from '../../../constants/tables/ManagerTicketAssigneeTableColumns'
import PanelLayout from '../../../layouts/PanelLayout'
import DummyCompany from '../../../public/images/dummy-company.png'
import { CreateEmailFormSchema } from '../../../schemas/CreateEmailFormSchema'
import { CreateNoteFormSchema } from '../../../schemas/CreateNoteFormSchema'
import { useTicketAssigneeStore } from '../../../store/TicketAssigneeStore'
import { CreateEmailForm } from '../../../types/forms/CreateEmailForm.type'
import { CreateNoteForm } from '../../../types/forms/CreateNoteForm.type'
import { Icon } from '../../../types/Icon.type'
import { Page } from '../../../types/Page.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { Ticket } from '../../../types/Ticket.type'
import { TicketActivity } from '../../../types/TicketActivity.type'
import { TicketEmail } from '../../../types/TicketEmail.type'
import { TicketNote } from '../../../types/TicketNote.type'
import { TicketPageTabs } from '../../../types/TicketPageTabs.type'

const Ticket: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    query: { id },
  } = useRouter()
  const { data: ticket, isSuccess } = useQuery(['ticket', Number(id)], async () => {
    const { data } = await axios.get<Ticket>(`/v1/tickets/${id}`)

    return data
  })
  const queryClient = useQueryClient()
  const {
    activeTicketAssignee,
    isEditTicketAssigneeModalVisible,
    isDeleteTicketAssigneeModalVisible,
    toggleEditTicketAssigneeModal,
    toggleDeleteTicketAssigneeModal,
  } = useTicketAssigneeStore()

  const [activeTab, setActiveTab] = useState<TicketPageTabs>('notes')
  const [isEditTicketModalVisible, setEditTicketModalVisible] = useState(false)
  const [isDeleteTicketModalVisible, setDeleteTicketModalVisible] = useState(false)
  const [isAddTicketAssigneeModalVisible, setAddTicketAssigneeModalVisible] = useState(false)

  const { data: notes } = useQuery(
    ['notes', Number(id)],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketNote>
        page: Page
      }>(`/v1/tickets/${id}/notes`)

      return data
    },
    {
      enabled: activeTab === 'notes',
    }
  )

  const { data: emails } = useQuery(
    ['emails', Number(id)],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketEmail>
        page: Page
      }>(`/v1/tickets/${id}/emails`)

      return data
    },
    {
      enabled: activeTab === 'email',
    }
  )

  const { data: activities } = useQuery(
    ['activities', Number(id)],
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<TicketActivity>
        page: Page
      }>(`/v1/tickets/${id}/activities`)

      return data
    },
    {
      enabled: activeTab === 'activities',
    }
  )

  const toggleEditTicketModal = () => setEditTicketModalVisible(!isEditTicketModalVisible)
  const toggleDeleteTicketModal = () => setDeleteTicketModalVisible(!isDeleteTicketModalVisible)
  const toggleAddTicketAssigneeModal = () =>
    setAddTicketAssigneeModalVisible(!isAddTicketAssigneeModalVisible)
  const submitEmailForm = async (
    values: CreateEmailForm,
    { resetForm }: { resetForm: (nextState?: Partial<FormikState<CreateEmailForm>>) => void }
  ) => {
    const { status } = await axios.post(`/v1/tickets/${id}/emails`, values)

    if (status === 200) {
      queryClient.invalidateQueries(['emails', Number(id)])
      resetForm()
    }
  }
  const submitNoteForm = async (
    values: CreateNoteForm,
    {
      resetForm,
    }: {
      resetForm: () => void
    }
  ) => {
    const { status } = await axios.post(`/v1/tickets/${id}/notes`, values)
    if (status === 200) {
      queryClient.invalidateQueries(['notes', Number(id)])
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
                ? 'stroke-jungle-green'
                : 'stroke-lavender-gray group-hover:stroke-jungle-green group-disabled:stroke-lavender-gray'
            }`}
          />
          <div
            className={`font-urbanist text-base ${
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

  if (!isSuccess) {
    // todo create loading skeleton
    return null
  }

  return (
    <>
      <Head>
        <title>Daily Press - Ticket {ticket!.ticketCode}</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">
        Ticket {ticket!.ticketCode}
      </div>
      <div className="mx-auto flex w-full max-w-7xl space-x-6">
        <div className="w-86 flex-none space-y-6">
          <Card title="Details">
            <div className="absolute top-6 right-6 space-x-4">
              <button className="group" onClick={toggleEditTicketModal}>
                <EditIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
              </button>
              <button className="group" onClick={toggleDeleteTicketModal}>
                <TrashIcon className="stroke-waterloo group-hover:stroke-jungle-green" />
              </button>
            </div>
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
              <TitleValue title="Services">
                <div className="flex flex-wrap gap-1">
                  {ticket!.services?.map(({ serviceName, extras, serviceId }, i) => (
                    <Fragment key={`${serviceName}-${i}`}>
                      <div className="rounded-lg border border-bright-gray px-2.5">
                        {serviceId}
                        {serviceName}
                      </div>
                      {extras.map((extra) => (
                        <div
                          key={`${serviceName}-${extra}`}
                          className="rounded-lg border border-bright-gray px-2.5"
                        >
                          {extra}
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </TitleValue>
              <TitleValue title="Description">
                <RichTextDisplay value={ticket!.description} />
              </TitleValue>
            </div>
          </Card>
          <Card title="Assignees">
            <DataTable
              columns={ManagerTicketAssigneeTableColumns}
              dataEndpoint={`/v1/tickets/${id}/assignees`}
              tableQueryKey={['assignees', Number(id)]}
              ofString="Assignee"
              tableActions={
                <button className="flex space-x-2" onClick={toggleAddTicketAssigneeModal}>
                  <PlusIcon className="stroke-jungle-green" />
                  <div className="font-urbanist text-sm font-semibold text-jungle-green">
                    Add Assignee
                  </div>
                </button>
              }
            />
          </Card>
        </div>
        <div className="w-full min-w-0">
          <div className="flex justify-between">
            <Tab title="Notes" Icon={NoteIcon} tabName="notes" />
            <Tab title="Email" Icon={EmailIcon} tabName="email" />
            <Tab title="Activities" Icon={CalendarIcon} tabName="activities" />
            <Tab title="Style Guide" Icon={ColorsIcon} tabName="style_guide" disabled />
          </div>
          <div className="h-px bg-bright-gray" />
          <div
            className={`-mt-0.5 mb-4 h-0.75 w-1/4 rounded bg-jungle-green fill-jungle-green ${
              activeTab === 'email'
                ? 'ml-1/4'
                : activeTab === 'activities'
                ? 'ml-1/2'
                : activeTab === 'style_guide'
                ? 'ml-3/4'
                : 'ml-0'
            }`}
          />
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
                      placeholder="Enter notes"
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
                  <NoteCard
                    key={`note-${id}`}
                    note={note}
                    createdBy={createdBy}
                    createdAt={createdAt}
                  />
                ))}
              </div>
            </>
          )}
          {activeTab === 'email' && (
            <>
              <Formik
                validationSchema={CreateEmailFormSchema}
                initialValues={{ cc: session?.user.email ?? '', title: '', message: '' }}
                onSubmit={submitEmailForm}
              >
                {({ isSubmitting }) => (
                  <Form className="mb-5 space-y-5">
                    <TextInput type="text" Icon={EditIcon} name="title" placeholder="Input title" />
                    <RichTextInput
                      Icon={EditIcon}
                      placeholder="Enter message"
                      name="message"
                      className="mb-5"
                      inputActions={
                        <div className="absolute right-6 bottom-6 z-10 flex items-center space-x-6">
                          <input type="file" name="attachment" id="email-attachment" hidden />
                          <label htmlFor="email-attachment" className="cursor-pointer">
                            <PaperClipIcon className="stroke-waterloo" />
                          </label>
                          <Button
                            ariaLabel="Submit Email"
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
                {emails?.map(({ id, title, message, createdAt }) => (
                  <EmailCard
                    key={`email-${id}`}
                    title={title}
                    message={message}
                    createdAt={createdAt}
                  />
                ))}
              </div>
            </>
          )}
          {activeTab === 'activities' && (
            <div className="space-y-5">
              {activities?.map(({ id, activity, createdAt }) => (
                <ActivityCard key={`activity-${id}`} activity={activity} createdAt={createdAt} />
              ))}
            </div>
          )}
        </div>
      </div>
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={ticket!}
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={ticket!}
        minimal
      />
      <AddTicketAssigneeModal
        isVisible={isAddTicketAssigneeModalVisible}
        onClose={toggleAddTicketAssigneeModal}
        ticketId={ticket!.id}
      />
      <EditTicketAssigneeModal
        isVisible={isEditTicketAssigneeModalVisible}
        onClose={toggleEditTicketAssigneeModal}
        ticketAssignee={activeTicketAssignee}
      />
      <DeleteTicketAssigneeModal
        isVisible={isDeleteTicketAssigneeModalVisible}
        onClose={toggleDeleteTicketAssigneeModal}
        ticketAssignee={activeTicketAssignee}
      />
      <CreateLinkModal />
    </>
  )
}

Ticket.getLayout = (page: ReactElement) => <PanelLayout routes={ManagerRoutes}>{page}</PanelLayout>

export default Ticket
