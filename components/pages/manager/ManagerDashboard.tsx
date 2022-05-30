import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { ClientTicketsTableColumns } from '../../../constants/tables/ClientTicketsTableColumns'
import { useTicketStore } from '../../../store/TicketStore'
import { Card } from '../../Card'
import { DataTable } from '../../DataTable'
import { FancyButton } from '../../FancyButton'
import { LifeBuoyIcon } from '../../icons/LifeBuoyIcon'
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
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <FancyButton
          Icon={<LifeBuoyIcon className="fill-white" />}
          title="Support Request"
          subtitle="Laborerivit rem cones mil"
          onClick={toggleCreateSupportRequestModal}
          twBackgroundColor="bg-vivid-red-tangelo"
          twIconBackgroundColor="bg-dark-pastel-red"
          className="w-fit"
        />
        <hr className="border-t-bright-gray" />
        <Card title="Project Status Table">
          {!!session && session.user.userType.departments.length > 0 ? (
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/departments/${session?.user.userType.departments[0].id}/tickets`}
              tableQueryKey={['tickets']}
              ofString="Projects"
              settings
            />
          ) : (
            <div className="m-auto w-fit font-urbanist text-base text-metallic-silver">
              No projects to display. 😶
            </div>
          )}
        </Card>
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
