import axios from 'axios'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useQuery } from 'react-query'
import { useSocialMediaStore } from '../../../store/SocialMediaStore'
import { SocialMedia } from '../../../types/SocialMedia.type'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { CreateSocialMediaModal } from '../../modals/CreateSocialMediaModal'
import { EditSocialMediaModal } from '../../modals/EditSocialMediaModal'
import { SocialMediaTable } from '../../SocialMediaTable'

export const ClientSocialMediaList = ({
  clientId,
  socialMediaId = -1,
}: {
  clientId: number
  socialMediaId?: number
}) => {
  const { data: session } = useSession()
  const {
    activeSocialMedia,
    isCreateSocialMediaModalVisible,
    isEditSocialMediaModalVisible,
    toggleCreateSocialMediaModal,
    toggleEditSocialMediaModal,
  } = useSocialMediaStore()

  const { data: socialMediaDetails } = useQuery(
    ['socialMedia', socialMediaId],
    async () => {
      const { data } = await axios.get<SocialMedia>(`/v1/social-media/${socialMediaId}`)

      return data
    },
    {
      enabled: !!socialMediaId && socialMediaId !== -1,
    }
  )

  console.log(socialMediaDetails)

  return (
    <>
      <Head>
        <title>Indy - Social Media</title>
      </Head>
      <div className="mx-auto max-w-full space-y-6">
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
            <SocialMediaTable clientId={clientId} />
          </Card>
        </div>
      </div>
      <CreateSocialMediaModal
        isVisible={isCreateSocialMediaModalVisible}
        onClose={toggleCreateSocialMediaModal}
        clientId={session!.user.userType.client.id}
      />
      <EditSocialMediaModal
        isVisible={isEditSocialMediaModalVisible}
        onClose={toggleEditSocialMediaModal}
        socialMedia={activeSocialMedia}
      />
      {socialMediaDetails && (
        <EditSocialMediaModal
          isVisible={isEditSocialMediaModalVisible}
          onClose={toggleEditSocialMediaModal}
          socialMedia={socialMediaDetails}
        />
      )}
    </>
  )
}
