import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { CountCard } from '../components/CountCard'
import { FancyLink } from '../components/FancyLink'
import { CalendarAddIcon } from '../components/icons/CalendarAddIcon'
import { GalleryIcon } from '../components/icons/GalleryIcon'
import { MenuBoardIcon } from '../components/icons/MenuBoardIcon'
import { VideoIcon } from '../components/icons/VideoIcon'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { Notifications } from '../components/Notifications'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useTicketStore } from '../store/TicketStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
const SocialMediaPage: NextPageWithLayout = () => {
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Social Media')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Social Media</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <FancyLink
          href="/project-brief"
          Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
          title="New Project Brief"
          subtitle="Laborerivit rem cones mil"
          className="w-fit"
        />
        <div className="flex h-155 space-x-6">
          <Card className="flex w-260 flex-col opacity-50"></Card>
          <div className="flex flex-1 flex-col">
            <div className="mb-3 flex space-x-3">
              <CountCard
                className="bg-deep-space-sparkle"
                Icon={<VideoIcon className="stroke-white" />}
                value={5}
                description="Animations Remaining"
              />
              <CountCard
                className="bg-charleston-green"
                Icon={<GalleryIcon className="stroke-white" />}
                value={2}
                description="Photoshoots Remaining"
              />
            </div>
            <div className="mb-6 flex space-x-3">
              <CountCard
                className="bg-halloween-orange"
                Icon={<MenuBoardIcon className="stroke-white" />}
                value={3}
                description="Graphics Remaining"
              />
              <CountCard
                className="bg-maximum-yellow-red"
                Icon={<VideoIcon className="stroke-white" />}
                value={1}
                description="Videoshoots Remaining"
              />
            </div>
            <Notifications />
          </div>
        </div>
      </div>
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
        website
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
        website
      />
    </>
  )
}

SocialMediaPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SocialMediaPage
