import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { usePanelLayoutStore } from '../../../layouts/PanelLayout'
import { useSocialMediaStore } from '../../../store/SocialMediaStore'
import { Client } from '../../../types/Client.type'
import { Page } from '../../../types/Page.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { UserIcon } from '../../icons/UserIcon'
import { CreateSocialMediaModal } from '../../modals/CreateSocialMediaModal'
import { EditSocialMediaModal } from '../../modals/EditSocialMediaModal'
import { SelectNoFormik } from '../../SelectNoFormik'
import { SocialMediaTable } from '../../SocialMediaTable'

export const ManagerSocialMediaList = ({ clientId = -1 }: { clientId?: number | null }) => {
  const { data: session } = useSession()
  const { setHeader, setSubHeader, setCrumbsNavigation } = usePanelLayoutStore()

  const { isCreateSocialMediaModalVisible, toggleCreateSocialMediaModal } = useSocialMediaStore()

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

  if (clientId && clientOptions) {
    let client = clientOptions?.find((value) => value.value === clientId)

    if (client) {
      selectClient(client)
    }
  }

  useEffect(() => {
    setClientId(defaultValue ? Number(defaultValue) : -1)
    setHeader('Social Media Dashboard')
    setSubHeader(`Welcome back, ${session?.user.firstName}`)
    setCrumbsNavigation([])
  }, [clients])

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
                  onClick={toggleCreateSocialMediaModal}
                  ariaLabel="Add Social Media"
                  className="mb-2 w-35"
                  type="button"
                >
                  <div>Add Post</div>
                </Button>
              </div>
              <Card className="flex max-h-155 flex-1 flex-col">
                <SocialMediaTable clientId={selectedClientId} />
              </Card>
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
