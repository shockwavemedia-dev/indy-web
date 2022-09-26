import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useSocialMediaStore } from '../../../store/SocialMediaStore'
import { Button } from '../../Button'
import { Card } from '../../Card'
import { CreateSocialMediaModal } from '../../modals/CreateSocialMediaModal'
import { EditSocialMediaModal } from '../../modals/EditSocialMediaModal'
import { SocialMediaTable } from '../../SocialMediaTable'

export const ClientSocialMediaList = ({ clientId }: { clientId: number }) => {
  const { data: session } = useSession()
  const {
    activeSocialMedia,
    isCreateSocialMediaModalVisible,
    isEditSocialMediaModalVisible,
    toggleCreateSocialMediaModal,
    toggleEditSocialMediaModal,
  } = useSocialMediaStore()

  return (
    <>
      <Head>
        <title>Indy - Social Media</title>
      </Head>
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
    </>
  )
}
