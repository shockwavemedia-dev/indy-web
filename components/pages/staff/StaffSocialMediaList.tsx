import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useSocialMediaStore } from '../../../store/SocialMediaStore'
import { Client } from '../../../types/Client.type'
import { Icon } from '../../../types/Icon.type'
import { Page } from '../../../types/Page.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { SocialMediaPageTabs } from '../../../types/SocialMediaPageTabs.type'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { CalendarAddIcon } from '../../icons/CalendarAddIcon'
import { NoteIcon } from '../../icons/NoteIcon'
import { UserIcon } from '../../icons/UserIcon'
import { CreateSocialMediaModal } from '../../modals/CreateSocialMediaModal'
import { EditSocialMediaModal } from '../../modals/EditSocialMediaModal'
import { SelectNoFormik } from '../../SelectNoFormik'
import { SocialMediaCalendarList } from '../../SocialMediaCalendarList'
import { SocialMediaTable } from '../../SocialMediaTable'

export const StaffSocialMediaList = () => {
  const { data: session } = useSession()
  const { setHeader, setSubHeader, setCrumbsNavigation } = usePanelLayoutStore()
  const [activeTab, setActiveTab] = useState<SocialMediaPageTabs>('list')

  const { isCreateSocialMediaModalVisible, toggleCreateSocialMediaModal, setPostDate } =
    useSocialMediaStore()

  const queryClient = useQueryClient()

  const selectClient = (newValue: SingleValue<SelectOption<number>>) => {
    setClientId(newValue?.value || -1)
    queryClient.invalidateQueries(['socialMedias'])
  }

  const { data: clients } = useQuery('clients', async () => {
    const {
      data: { data },
    } = await axios.get<{
      data: Array<Client>
      page: Page
    }>('/v1/clients/social-media')

    return data
  })

  const defaultValue = clients && clients.length > 0 ? clients[0].id : -1

  const [selectedClientId, setClientId] = useState(defaultValue ? Number(defaultValue) : -1)

  const clientOptions = clients
    ? clients.map(({ name, id }) => ({
        label: name,
        value: id,
      }))
    : []

  useEffect(() => {
    setClientId(defaultValue ? Number(defaultValue) : -1)
    setHeader('Social Media Dashboard')
    setSubHeader(`Welcome back, ${session?.user.firstName}`)
    setCrumbsNavigation([])
  }, [clients])

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
      <div className="mb-8 flex-1 space-y-6">
        <SelectNoFormik
          Icon={UserIcon}
          onChange={selectClient}
          className="max-w-xs"
          placeholder="Select Client"
          options={clientOptions}
          value={clientOptions.find(({ value }) => value === selectedClientId)}
        />
      </div>
      {selectedClientId !== -1 ? (
        <>
          <div className="mx-auto w-full space-y-6">
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
                  <Tab title="Calendar" Icon={CalendarAddIcon} tabName="calendar" />
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
                      <SocialMediaTable clientId={selectedClientId} />
                    </Card>
                  </div>
                )}
                {activeTab === 'calendar' && (
                  <div>
                    <SocialMediaCalendarList clientId={selectedClientId} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <CreateSocialMediaModal
            isVisible={isCreateSocialMediaModalVisible}
            onClose={toggleCreateSocialMediaModal}
            clientId={selectedClientId}
          />
          <EditSocialMediaModal />
        </>
      ) : (
        <Card>
          <div className="flex-1 text-center text-xs text-metallic-silver">Select a Client</div>
        </Card>
      )}
    </>
  )
}
