import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { SingleValue } from 'react-select'
import { useSocialMediaStore } from '../../../store/SocialMediaStore'
import { Client } from '../../../types/Client.type'
import { Page } from '../../../types/Page.type'
import { SelectOption } from '../../../types/SelectOption.type'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { UserIcon } from '../../icons/UserIcon'
import { CreateSocialMediaModal } from '../../modals/CreateSocialMediaModal'
import { DeleteSocialMediaModal } from '../../modals/DeleteSocialMediaModal'
import { EditSocialMediaModal } from '../../modals/EditSocialMediaModal'
import { SelectNoFormik } from '../../SelectNoFormik'
import { SocialMediaTable } from '../../SocialMediaTable'

export const StaffSocialMediaList = () => {
  const {
    activeSocialMedia,
    isCreateSocialMediaModalVisible,
    isEditSocialMediaModalVisible,
    isDeleteSocialMediaModalVisible,
    toggleCreateSocialMediaModal,
    toggleEditSocialMediaModal,
    toggleDeleteSocialMediaModal,
  } = useSocialMediaStore()

  const [selectedClientId, setClientId] = useState(-1)
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
    }>('/v1/clients')

    return data
  })

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
          options={
            clients
              ? clients.map(({ name, id }) => ({
                  label: name,
                  value: id,
                }))
              : []
          }
        />
      </div>
      {selectedClientId !== -1 && (
        <>
          <div className="mx-auto w-full max-w-8xl space-y-6">
            <div className="flex flex-col gap-6 transition-all">
              <div className="flex-1">
                <Button
                  onClick={toggleCreateSocialMediaModal}
                  ariaLabel="Add Social Media"
                  className="mb-2 w-35"
                  type="button"
                >
                  <div>Add Social Media</div>
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
          <EditSocialMediaModal
            isVisible={isEditSocialMediaModalVisible}
            onClose={toggleEditSocialMediaModal}
            socialMedia={activeSocialMedia}
          />
          <DeleteSocialMediaModal
            isVisible={isDeleteSocialMediaModalVisible}
            onClose={toggleDeleteSocialMediaModal}
            socialMedia={activeSocialMedia}
          />
        </>
      )}
    </>
  )
}
