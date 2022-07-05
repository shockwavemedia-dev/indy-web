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
import { FancyLink } from '../../FancyLink'
import { CalendarAddIcon } from '../../icons/CalendarAddIcon'
import { CaretIcon } from '../../icons/CaretIcon'
import { ClipboardIcon } from '../../icons/ClipboardIcon'
import {
  CreateAnimationRequestModal,
  useCreateAnimationRequestModal,
} from '../../modals/CreateAnimationRequestModal'
import { DeleteTicketModal } from '../../modals/DeleteTicketModal'
import { EditTicketModal } from '../../modals/EditTicketModal'
import { Notifications } from '../../Notifications'
import { SelectNoFormik } from '../../SelectNoFormik'
import { StatusCountCard } from '../../StatusCountCard'

export const ClientAnimations = () => {
  const [page, setPage] = useState(1)

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

  const {
    data: animationPagination,
    isLoading: animationsLoading,
    isFetching: animationsFetching,
  } = useQuery(['animations', category?.value, page], async () => {
    const { data } = await axios.get<{
      data: Array<Animation>
      page: Page
    }>('/v1/libraries', {
      params: {
        library_category_id: category?.value === -1 ? '' : category?.value,
        size: 15,
        page_number: page,
      },
    })

    return data
  })

  const { data: categories } = useQuery(['animation-categories'], async () => {
    const { data } = await axios.get<{ data: Array<AnimationCategory>; page: Page }>(
      '/v1/library-categories'
    )

    return data
  })

  useEffect(() => {
    setHeader('Animation Library')
  }, [])

  useEffect(() => {
    setPage(1)
  }, [category])

  const goToFirstPage = () => setPage(1)
  const goToPreviousPage = () => setPage(page - 1)
  const goToNextPage = () => setPage(page + 1)

  return (
    <>
      <Head>
        <title>Indy - Animation Library</title>
      </Head>
      <div className="mx-auto h-full w-full max-w-8xl space-y-6">
        <div className="mb-6 flex space-x-6">
          <FancyLink
            href="/project-brief"
            Icon={<CalendarAddIcon className="stroke-halloween-orange" />}
            title="New Project Brief"
            subtitle="Laborerivit rem cones mil"
            className="w-fit"
          />
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
                  ...(categories?.data?.map(({ id, name }) => ({
                    label: name,
                    value: id,
                  })) || []),
                ]}
                value={category}
                onChange={setCategory}
              />
            </div>
            <div className="mb-5 flex flex-wrap gap-5">
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
              ) : animationsLoading ? (
                [...Array(5)].map((_, i) => (
                  <div
                    key={`animation-loading-skeleton-${i}`}
                    className="h-44 w-78.5 animate-pulse cursor-pointer rounded-xl bg-bright-gray"
                  />
                ))
              ) : (
                <div className="m-auto w-fit font-urbanist text-base text-metallic-silver">
                  No animations to display. 😶
                </div>
              )}
            </div>
            {animationPagination && (
              <div className="relative flex items-center justify-center">
                <div className="absolute left-0 font-urbanist text-sm font-medium text-metallic-silver">
                  {animationPagination.page.from} - {animationPagination.page.to} of{' '}
                  {animationPagination.page.total} Animations
                </div>
                <button
                  onClick={goToPreviousPage}
                  type="button"
                  disabled={animationPagination.page.currentPage === 1 || animationsFetching}
                  className="group"
                >
                  <CaretIcon
                    className="-rotate-90 stroke-halloween-orange group-disabled:stroke-bright-gray"
                    small
                  />
                </button>
                <div className="mx-5 flex space-x-4 font-urbanist text-sm font-medium">
                  {animationPagination.page.currentPage > 2 && (
                    <>
                      <button
                        onClick={goToFirstPage}
                        className={`text-metallic-silver ${
                          animationsFetching
                            ? 'disabled:text-bright-gray'
                            : 'disabled:font-bold disabled:text-halloween-orange'
                        }`}
                        disabled={animationsFetching}
                      >
                        1
                      </button>
                      <div
                        className={animationsFetching ? 'text-bright-gray' : 'text-metallic-silver'}
                      >
                        ...
                      </div>
                    </>
                  )}
                  {[...Array.from({ length: animationPagination.page.lastPage }, (_, i) => i + 1)]
                    .slice(
                      animationPagination.page.currentPage > 1
                        ? animationPagination.page.currentPage - 2
                        : animationPagination.page.currentPage - 1,
                      animationPagination.page.currentPage + 4
                    )
                    .map((pageNumber) => {
                      const gotoThisPage = () => setPage(pageNumber)

                      return (
                        <button
                          onClick={gotoThisPage}
                          key={`goto-page-${pageNumber}`}
                          disabled={
                            pageNumber === animationPagination.page.currentPage ||
                            animationsFetching
                          }
                          className={`text-metallic-silver ${
                            animationsFetching
                              ? 'disabled:text-bright-gray'
                              : 'disabled:font-bold disabled:text-halloween-orange'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}
                  {/* todo add conditional last page button here */}
                </div>
                <button
                  onClick={goToNextPage}
                  type="button"
                  disabled={
                    animationPagination.page.currentPage === animationPagination.page.lastPage ||
                    animationsFetching
                  }
                  className="group"
                >
                  <CaretIcon
                    className="rotate-90 stroke-halloween-orange group-disabled:stroke-bright-gray"
                    small
                  />
                </button>
              </div>
            )}
          </Card>
          <div className="flex flex-1 flex-col">
            <div className="mb-2 flex space-x-1">
              <StatusCountCard
                value={8}
                className="bg-deep-space-sparkle"
                description="Graphics Design"
              />
              <StatusCountCard value={5} className="bg-charleston-green" description="Animations" />
              <StatusCountCard
                value={5}
                className="bg-halloween-orange"
                description="Web Updates"
              />
            </div>
            <div className="mb-2 flex space-x-1">
              <StatusCountCard
                value={8}
                className="bg-maximum-yellow-red"
                description="Photo Shoots"
              />
              <StatusCountCard value={3} className="bg-navy" description="Video Shoots" />
              <StatusCountCard value={11} className="bg-red-crimson" description="Social Posts" />
            </div>
            <div className="mb-2 flex space-x-1">
              <StatusCountCard value={9} className="bg-orchid" description="Marketing" />
              <StatusCountCard value={7} className="bg-forest-green" description="Health Check" />
              <StatusCountCard
                value={15}
                className="bg-bright-navy-blue"
                description="App Updates"
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
