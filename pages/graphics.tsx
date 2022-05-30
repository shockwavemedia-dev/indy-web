import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useState } from 'react'
import { Card } from '../components/Card'
import { CountCard } from '../components/CountCard'
import { DataTable } from '../components/DataTable'
import { FancyButton } from '../components/FancyButton'
import { GalleryIcon } from '../components/icons/GalleryIcon'
import { MenuBoardIcon } from '../components/icons/MenuBoardIcon'
import { VideoIcon } from '../components/icons/VideoIcon'
import { CreateGraphicRequestModal } from '../components/modals/CreateGraphicRequestModal'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { ClientTicketsTableColumns } from '../constants/tables/ClientTicketsTableColumns'
import PanelLayout from '../layouts/PanelLayout'
import { useTicketStore } from '../store/TicketStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const GraphicPage: NextPageWithLayout = () => {
  const { data: session } = useSession()
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()

  const [isCreateGraphicModalVisible, setCreateeGraphicModalVisible] = useState(false)

  const toggleCreateGraphicModal = () => setCreateeGraphicModalVisible(!isCreateGraphicModalVisible)

  return (
    <>
      <Head>
        <title>Daily Press - Graphics Design</title>
      </Head>
      <div className="mb-5 font-urbanist text-xxl font-semibold text-onyx">Graphics Design</div>
      <div className="mx-auto h-full w-full max-w-8xl">
        <div className="mb-6 flex space-x-6">
          <FancyButton
            Icon={
              <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-honeydew">
                <GalleryIcon className="stroke-jungle-green" />
              </div>
            }
            title="Requet Graphics"
            subtitle="Laborerivit rem cones mil"
            onClick={toggleCreateGraphicModal}
            className="w-fit"
          />
        </div>
        <hr className="mb-6 border-t-bright-gray" />
        <div className="mb-6 flex h-155 space-x-6">
          <Card title="Project Status Table" className="flex w-260 flex-col">
            <DataTable
              columns={ClientTicketsTableColumns}
              dataEndpoint={`/v1/clients/${session?.user.userType.clientId}/graphics`}
              tableQueryKey={['graphics']}
              ofString="Projects"
              settings
            />
          </Card>
          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex space-x-3">
              <CountCard
                Icon={
                  <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-cosmic-latte">
                    <VideoIcon className="stroke-deep-saffron" />
                  </div>
                }
                value={5}
                description="Animations Remaining"
                className="w-36"
              />
              <CountCard
                Icon={
                  <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-honeydew">
                    <GalleryIcon className="stroke-jungle-green" />
                  </div>
                }
                value={2}
                description="Photoshoots Remaining"
              />
            </div>
            <div className="mb-6 flex space-x-3">
              <CountCard
                Icon={
                  <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-alice-blue">
                    <MenuBoardIcon className="stroke-bleu-de-france" />
                  </div>
                }
                value={3}
                description="Marketing Strategy Remaining"
              />
              <CountCard
                Icon={
                  <div className="grid h-11.5 w-11.5 flex-none place-items-center rounded-lg bg-magnolia">
                    <VideoIcon className="stroke-purple-x11" />
                  </div>
                }
                value={1}
                description="Videoshoots Remaining"
                className="w-36"
              />
            </div>
          </div>
        </div>
      </div>
      <CreateGraphicRequestModal
        isVisible={isCreateGraphicModalVisible}
        onClose={toggleCreateGraphicModal}
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

GraphicPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default GraphicPage
