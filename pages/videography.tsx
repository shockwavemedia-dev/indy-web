import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { Card } from '../components/Card'
import { FancyLink } from '../components/FancyLink'
import { CalendarAddIcon } from '../components/icons/CalendarAddIcon'
import { DeleteTicketModal } from '../components/modals/DeleteTicketModal'
import { EditTicketModal } from '../components/modals/EditTicketModal'
import { Notifications } from '../components/Notifications'
import { RetainerInclusions } from '../components/RetainerInclusions'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { useTicketStore } from '../store/TicketStore'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'

const VideographyPage: NextPageWithLayout = () => {
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()
  const { setHeader } = usePanelLayoutStore()

  useEffect(() => {
    setHeader('Videography')
  }, [])

  return (
    <>
      <Head>
        <title>Indy - Videography</title>
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
          <div className="flex flex-1 flex-col space-y-6">
            <RetainerInclusions />
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

VideographyPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default VideographyPage
