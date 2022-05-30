import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
import { useTicketStore } from '../../../store/TicketStore'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { FancyButton } from '../../FancyButton'
import { ClipboardCloseIcon } from '../../icons/ClipboardCloseIcon'
import { LifeBuoyIcon } from '../../icons/LifeBuoyIcon'
import { PresentationChartIcon } from '../../icons/PresentationChartIcon'
import { CreateSupportRequestModal } from '../../modals/CreateSupportRequestModal'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'

export const ManagerDashboard = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()

  const [isCreateSupportRequestModalVisible, setCreateSupportRequestModalVisible] = useState(false)

  const toggleCreateSupportRequestModal = () =>
    setCreateSupportRequestModalVisible(!isCreateSupportRequestModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Dashboard</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Dashboard</div>
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col">
        <div className="mb-6 flex space-x-6">
          <FancyButton
            Icon={
              <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-alice-blue">
                <ClipboardCloseIcon className="stroke-bleu-de-france" />
              </div>
            }
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            onClick={() => {}}
            className="pointer-events-none w-full cursor-default opacity-50"
          />
          <FancyButton
            Icon={
              <div className="bas grid h-11 w-11 flex-none place-items-center rounded-lg bg-cosmic-latte">
                <PresentationChartIcon className="stroke-deep-saffron" />
              </div>
            }
            title="Analytics"
            subtitle="Laborerivit rem cones mil"
            onClick={() => {}}
            className="pointer-events-none w-full cursor-default opacity-50"
          />
          <FancyButton
            Icon={
              <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-linen">
                <LifeBuoyIcon className="fill-vivid-red-tangelo" />
              </div>
            }
            title="Support Request"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateSupportRequestModal}
            className="w-full"
          />
        </div>
        <hr className="mb-6 border-t-bright-gray" />
        <div className="mb-6 flex h-155 space-x-6">
          <Card title="Project Status Table" className="flex w-full flex-col">
            {!!session && session.user.userType.departments.length > 0 ? (
              <DataTable
                columns={ClientTicketsTableColumns}
                dataEndpoint={`/v1/departments/${session?.user.userType.departments[0].id}/tickets`}
                tableQueryKey={['tickets']}
                ofString="Projects"
                settings
                periodicFilter
              />
            ) : (
              <div className="m-auto w-fit font-urbanist text-base text-metallic-silver">
                No projects to display. 😶
              </div>
            )}
          </Card>
        </div>
      </div>
      <CreateSupportRequestModal
        isVisible={isCreateSupportRequestModalVisible}
        onClose={toggleCreateSupportRequestModal}
      />
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
      />
    </>
  )
}
