import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { SingleValue } from 'react-select'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useTicketStore } from '../../../store/TicketStore'
import { Animation } from '../../../types/Animation.type'
import { AnimationCategory } from '../../../types/AnimationCategory.type'
import { Page } from '../../../types/Page.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { Card } from '../../Card'
import { CountCard } from '../../CountCard'
import { FancyButton } from '../../FancyButton'
import { CalendarAddIcon } from '../../icons/CalendarAddIcon'
import { ClipboardIcon } from '../../icons/ClipboardIcon'
import { GalleryIcon } from '../../icons/GalleryIcon'
import { MenuBoardIcon } from '../../icons/MenuBoardIcon'
import { VideoIcon } from '../../icons/VideoIcon'
import {
  CreateAnimationRequestModal,
  useCreateAnimationRequestModal,
} from '../../modals/CreateAnimationRequestModal'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'
import { SelectNoFormik } from '../../SelectNoFormik'

export const ClientAnimations = () => {
  const {
    activeTicket,
    isEditTicketModalVisible,
    isDeleteTicketModalVisible,
    toggleEditTicketModal,
    toggleDeleteTicketModal,
  } = useTicketStore()
  const { setHeader } = usePanelLayoutStore()
  const [category, setCategory] = useState<SingleValue<SelectOption<number>>>({
    label: 'All Categories',
    value: -1,
  })

  const { data: animationPagination } = useQuery('animations', async () => {
    const { data } = await axios.get<{
      data: Array<Animation>
      page: Page
    }>('/v1/libraries')

    return data
  })

  useEffect(() => {
    setHeader('Animation Library')
  }, [])

  const { data: categories } = useQuery('animation-categories', async () => {
    const {
      data: { data },
    } = await axios.get<{ data: Array<AnimationCategory>; page: Page }>('/v1/library-categories')

    return data
  })

  return (
    <>
      <Head>
        <title>Indy - Animation Library</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <div className="mb-6 flex space-x-6">
          <Link href="/project-brief">
            <FancyButton
              Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
              title="New Project Brief"
              subtitle="Laborerivit rem cones mil"
              className="w-fit"
            />
          </Link>
        </div>
        <hr className="border-t-bright-gray" />
        <div className="flex space-x-6">
          <Card className="h-fit w-257.5">
            <div className="mb-6 w-64">
              <SelectNoFormik
                Icon={ClipboardIcon}
                label="Filter by Category"
                options={[
                  {
                    label: 'All Categories',
                    value: -1,
                  },
                  ...(categories?.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  })) || []),
                ]}
                value={category}
                onChange={setCategory}
              />
            </div>
            <div className="flex flex-wrap gap-5">
              {animationPagination &&
              animationPagination.data &&
              animationPagination.data.length > 0 ? (
                animationPagination.data
                  .filter(
                    ({ libraryCategoryId }) =>
                      category?.value === -1 || libraryCategoryId === category?.value
                  )
                  .map((animation) => (
                    <AnimationButton key={`animation-${animation.id}`} animation={animation} />
                  ))
              ) : (
                <div>No animation libraries to display.</div>
              )}
            </div>
          </Card>
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
      <CreateAnimationRequestModal />
      <EditTicketModal
        isVisible={isEditTicketModalVisible}
        onClose={toggleEditTicketModal}
        ticket={activeTicket}
        animation
      />
      <DeleteTicketModal
        isVisible={isDeleteTicketModalVisible}
        onClose={toggleDeleteTicketModal}
        ticket={activeTicket}
        animation
      />
    </>
  )
}

const AnimationButton = ({ animation }: { animation: Animation }) => {
  const [failedToLoad, setFailedToLoad] = useState(false)
  const { toggleCreateAnimationRequestModal } = useCreateAnimationRequestModal()

  const failed = () => setFailedToLoad(true)
  const toggleAnimation = () => toggleCreateAnimationRequestModal(animation.id)

  return failedToLoad ? (
    <div className="grid h-44 w-78.5 place-content-center rounded-xl border border-halloween-orange font-urbanist text-sm font-medium text-onyx">
      <div>
        Failed to load{' '}
        <Link href={animation.videoLink}>
          <a
            target="_blank"
            className="font-urbanist text-sm font-semibold text-halloween-orange underline-offset-1 hover:underline"
          >
            {animation.title}
          </a>
        </Link>{' '}
        😵
      </div>
    </div>
  ) : (
    <video
      key={`animation-${animation.id}`}
      className="h-44 w-78.5 cursor-pointer rounded-xl"
      onMouseOver={(event) => event.currentTarget.play()}
      onMouseOut={(event) => {
        event.currentTarget.currentTime = 0
        event.currentTarget.pause()
      }}
      onClick={toggleAnimation}
      onError={failed}
      loop
      muted
    >
      <source src={animation.videoLink} />
    </video>
  )
}
