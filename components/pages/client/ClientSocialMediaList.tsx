import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useState } from 'react'
import { useSocialMediaStore } from '../../../store/SocialMediaStore'
import { Icon } from '../../../types/Icon.type'
import { SocialMediaPageTabs } from '../../../types/SocialMediaPageTabs.type'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { CalendarIcon } from '../../icons/CalendarIcon'
import { NoteIcon } from '../../icons/NoteIcon'
import { CreateSocialMediaModal } from '../../modals/CreateSocialMediaModal'
import { EditSocialMediaModal } from '../../modals/EditSocialMediaModal'
import { SocialMediaCalendarList } from '../../SocialMediaCalendarList'
import { SocialMediaTable } from '../../SocialMediaTable'

export const ClientSocialMediaList = ({
  clientId,
}: {
  clientId: number
  socialMediaId?: number
}) => {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<SocialMediaPageTabs>('list')

  const { isCreateSocialMediaModalVisible, toggleCreateSocialMediaModal, setPostDate } =
    useSocialMediaStore()

  const Tab = ({
    title,
    Icon,
    tabName,
    disabled = false,
  }: {
    title: string
    Icon: Icon
    tabName: SocialMediaPageTabs
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
                ? 'stroke-halloween-orange'
                : 'stroke-lavender-gray transition-all group-hover:stroke-halloween-orange group-disabled:stroke-lavender-gray'
            }`}
          />
          <div
            className={` text-base ${
              isActiveTab
                ? 'font-semibold text-onyx'
                : 'font-medium text-metallic-silver transition-all group-hover:font-semibold group-hover:text-onyx group-disabled:font-medium group-disabled:text-metallic-silver'
            }`}
          >
            {title}
          </div>
        </button>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Indy - Social Media</title>
      </Head>
      <div className="mx-auto max-w-full space-y-6">
        <div className="flex flex-col gap-6 transition-all">
          <div className="flex-1">
            <Button
              onClick={() => {
                setPostDate(null)
                toggleCreateSocialMediaModal()
              }}
              ariaLabel="Add Social Media"
              className="mb-2 w-35"
              type="button"
            >
              Add Post
            </Button>
          </div>
          <div className="w-full min-w-0">
            <div className="flex justify-between">
              <Tab title="List" Icon={NoteIcon} tabName="list" />
              <Tab title="Calendar" Icon={CalendarIcon} tabName="calendar" />
            </div>
            <div className="h-px bg-bright-gray" />
            <div
              className={`-mt-0.5 mb-4 h-0.75 w-2/4 rounded bg-halloween-orange fill-halloween-orange transition-all ${
                activeTab === 'list' ? 'ml-0' : activeTab === 'calendar' ? '!ml-1/2' : 'ml-auto'
              }`}
            />
            {activeTab === 'list' && (
              <div>
                <Card className="flex max-h-155 flex-1 flex-col">
                  <SocialMediaTable clientId={clientId} />
                </Card>
              </div>
            )}
            {activeTab === 'calendar' && (
              <div>
                <SocialMediaCalendarList />
              </div>
            )}
          </div>
        </div>
      </div>
      <CreateSocialMediaModal
        isVisible={isCreateSocialMediaModalVisible}
        onClose={toggleCreateSocialMediaModal}
        clientId={session!.user.userType.client.id}
      />
      <EditSocialMediaModal />
    </>
  )
}
