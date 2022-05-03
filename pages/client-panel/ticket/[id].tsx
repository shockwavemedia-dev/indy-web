import axios from 'axios'
import { format } from 'date-fns'
import {
  CompositeDecorator,
  convertFromRaw,
  DraftDecoratorComponentProps,
  Editor,
  EditorState,
} from 'draft-js'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import DataTable from '../../../components/common/DataTable'
import CalendarIcon from '../../../components/common/icons/CalendarIcon'
import ColorsIcon from '../../../components/common/icons/ColorsIcon'
import EditIcon from '../../../components/common/icons/EditIcon'
import EmailIcon from '../../../components/common/icons/EmailIcon'
import NoteIcon from '../../../components/common/icons/NoteIcon'
import PlusIcon from '../../../components/common/icons/PlusIcon'
import TrashIcon from '../../../components/common/icons/TrashIcon'
import Card from '../../../components/panel/Card'
import AddTicketAssigneeModal from '../../../components/panel/modals/AddTicketAssigneeModal'
import CreateLinkModal from '../../../components/panel/modals/CreateLinkModal'
import DeleteTicketAssigneeModal from '../../../components/panel/modals/DeleteTicketAssigneeModal'
import DeleteTicketModal from '../../../components/panel/modals/DeleteTicketModal'
import EditTicketAssigneeModal from '../../../components/panel/modals/EditTicketAssigneeModal'
import EditTicketModal from '../../../components/panel/modals/EditTicketModal'
import TitleValue from '../../../components/panel/TitleValue'
import { ClientRoutes } from '../../../constants/routes/ClientRoutes'
import { TicketAssigneeTableColumns } from '../../../constants/tables/TicketAssigneeTableColumns'
import PanelLayout from '../../../layouts/PanelLayout'
import DummyCompany from '../../../public/images/dummy-company.png'
import { useTicketAssigneeStore } from '../../../store/TicketAssigneeStore'
import { Icon } from '../../../types/Icon.type'
import { NextPageWithLayout } from '../../../types/pages/NextPageWithLayout.type'
import { Ticket } from '../../../types/Ticket.type'
import { TicketPageTabs } from '../../../types/TicketPageTabs.type'

const Ticket: NextPageWithLayout = () => {
  const {
    query: { id },
  } = useRouter()
  const { data: ticket, isSuccess } = useQuery(['ticket', Number(id)], async () => {
    const { data } = await axios.get<Ticket>(`/v1/tickets/${id}`)

    return data
  })

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

  const toggleEditTicketModal = () => setEditTicketModalVisible(!isEditTicketModalVisible)
  const toggleDeleteTicketModal = () => setDeleteTicketModalVisible(!isDeleteTicketModalVisible)
  const toggleAddTicketAssigneeModal = () =>
    setAddTicketAssigneeModalVisible(!isAddTicketAssigneeModalVisible)

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
        <div className="flex w-full max-w-86 flex-col space-y-6">
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
              <div className="min-w-25">
                <Image src={DummyCompany} height={100} width={100} alt={ticket!.clientName} />
              </div>
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
              <TitleValue title="Due Created" className="flex items-center justify-between">
                {format(ticket!.duedate, "yy MMM''dd")}
              </TitleValue>
              <TitleValue title="Date Created" className="flex items-center justify-between">
                {format(ticket!.createdAt, "yy MMM''dd")}
              </TitleValue>
              <TitleValue title="Services">
                <div className="flex flex-wrap gap-1">
                  {ticket!.services?.map(({ serviceName, extras }, i) => (
                    <Fragment key={`service-${i}`}>
                      <div className="rounded-lg border border-bright-gray px-2.5">
                        {serviceName}
                      </div>
                      {extras.map((extra) => (
                        <div
                          key={`extra-${i}`}
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
                <Editor
                  onChange={() => {}}
                  editorState={EditorState.createWithContent(
                    convertFromRaw(JSON.parse(ticket!.description)),
                    new CompositeDecorator([
                      {
                        strategy: (contentBlock, callback, contentState) => {
                          contentBlock.findEntityRanges((character) => {
                            const entityKey = character.getEntity()
                            return (
                              entityKey !== null &&
                              contentState.getEntity(entityKey).getType() === 'LINK'
                            )
                          }, callback)
                        },
                        component: (props: DraftDecoratorComponentProps) => (
                          <Link href={props.contentState.getEntity(props.entityKey).getData().link}>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-bleu-de-france underline"
                            >
                              {props.children}
                            </a>
                          </Link>
                        ),
                      },
                    ])
                  )}
                  readOnly
                />
              </TitleValue>
            </div>
          </Card>
          <Card title="Assignees">
            <DataTable
              columns={TicketAssigneeTableColumns}
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
        <div className="h-fit w-full">
          <div className="flex justify-between">
            <Tab title="Notes" Icon={NoteIcon} tabName="notes" />
            <Tab title="Email" Icon={EmailIcon} tabName="email" />
            <Tab title="Activities" Icon={CalendarIcon} tabName="activities" />
            <Tab title="Style Guide" Icon={ColorsIcon} tabName="style_guide" disabled />
          </div>
          <div className="h-0.25 bg-bright-gray" />
          <div
            className={`-mt-0.5 h-0.75 w-1/4 rounded bg-jungle-green fill-jungle-green ${
              activeTab === 'email'
                ? 'ml-1/4'
                : activeTab === 'activities'
                ? 'ml-1/2'
                : activeTab === 'style_guide'
                ? 'ml-3/4'
                : 'ml-0'
            }`}
          />
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

Ticket.getLayout = (page: ReactElement) => <PanelLayout routes={ClientRoutes}>{page}</PanelLayout>

export default Ticket
