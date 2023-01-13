import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Card } from '../components/Card'
import { DataTable } from '../components/DataTable'
import { PlusIcon } from '../components/icons/PlusIcon'
import { UserIcon } from '../components/icons/UserIcon'
import { DeleteClientUserModal } from '../components/modals/DeleteClientUserModal'
import { EditClientUserModal } from '../components/modals/EditClientUserModal'
import { NewClientUserModal, useNewClientUserModal } from '../components/modals/NewClientUserModal'
import { ClientUsersTableColumns } from '../constants/tables/ClientUsersTableColumns'
import PanelLayout, { usePanelLayoutStore } from '../layouts/PanelLayout'
import { Client } from '../types/Client.type'
import { Icon } from '../types/Icon.type'
import { NextPageWithLayout } from '../types/pages/NextPageWithLayout.type'
import { SettingsPageTabs } from '../types/SettingsPageTabs.type'

const SettingsPage: NextPageWithLayout = () => {
  const { setHeader, setCrumbsNavigation } = usePanelLayoutStore()
  const [activeTab, setActiveTab] = useState<SettingsPageTabs>('users')
  useEffect(() => {
    setHeader('Settings')
    setCrumbsNavigation([])
  }, [])
  const { data: session } = useSession()
  const toggleNewClientUserModal = useNewClientUserModal((state) => state.toggleNewClientUserModal)

  const { data } = useQuery(['clients', Number(session?.user.userType.client.id)], async () => {
    const { data } = await axios.get<Client>(`/v1/clients/${session?.user.userType.client.id}`)

    return data
  })

  const Tab = ({
    title,
    Icon,
    tabName,
    disabled = false,
  }: {
    title: string
    Icon: Icon
    tabName: SettingsPageTabs
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
        <title>Indy - Settings</title>
      </Head>
      <div className="mx-auto flex w-full space-x-6">
        <div className="w-full min-w-0">
          <div className="flex justify-between">
            <Tab title="Manage Users" Icon={UserIcon} tabName="users" />
          </div>
          <div className="h-px bg-bright-gray" />
          <div
            className={`w-1/1 -mt-0.5 mb-4 h-0.75 rounded bg-halloween-orange fill-halloween-orange transition-all ${
              activeTab === 'users'
                ? 'ml-0'
                : activeTab === 'notes'
                ? 'ml-1/4'
                : activeTab === 'activities'
                ? 'ml-1/2'
                : 'ml-auto'
            }`}
          />
          {activeTab === 'users' && (
            <div>
              <div className="flex h-fit flex-wrap gap-5">
                <Card title="Users" className="mb-6 flex max-h-155 flex-1 flex-col">
                  <DataTable
                    columns={ClientUsersTableColumns}
                    dataEndpoint={`/v1/clients/${data?.id}/users`}
                    tableQueryKey={['client-users', data?.id ?? 0]}
                    ofString="Users"
                    tableActions={
                      <button
                        className="flex space-x-2"
                        onClick={() => toggleNewClientUserModal(data)}
                      >
                        <PlusIcon className="stroke-halloween-orange" />
                        <div className=" text-sm font-semibold text-halloween-orange">Add User</div>
                      </button>
                    }
                    initialState={{
                      sortBy: [
                        {
                          id: 'owner',
                        },
                      ],
                    }}
                  />
                </Card>
              </div>
            </div>
          )}
        </div>
        <NewClientUserModal />
        <EditClientUserModal />
        <DeleteClientUserModal />
      </div>
    </>
  )
}

SettingsPage.getLayout = (page: ReactElement) => <PanelLayout>{page}</PanelLayout>

export default SettingsPage
