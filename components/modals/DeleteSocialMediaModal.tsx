import axios from 'axios'
import { format } from 'date-fns'
import { useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { SocialMedia } from '../../types/SocialMedia.type'
import { Button } from '../Button'
import { Card } from '../Card'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { PhotographyVideographyFileButton } from '../PhotographyVideographyFileButton'
import { Pill } from '../Pill'
import { TitleValue } from '../TitleValue'

export const DeleteSocialMediaModal = ({
  isVisible,
  onClose,
  socialMedia,
}: {
  isVisible: boolean
  onClose: () => void
  socialMedia: SocialMedia
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const deleteSocialMedia = async () => {
    try {
      const { status } = await axios.delete(`/v1/social-media/${socialMedia.id}`)

      if (status === 200) {
        queryClient.invalidateQueries('socialMedia')
        onClose()
        showToast({
          type: 'success',
          message: 'Social Media successfully deleted!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal title="Are you sure you want to delete this Social Media?" onClose={onClose}>
          <div className="mb-8 flex w-140 flex-col">
            <div className="mb-8 grid w-full grid-cols-2 grid-rows-2 gap-y-5">
              <TitleValue title="Post Title" className="capitalize">
                {socialMedia.post}
              </TitleValue>
              <TitleValue title="Post Date" className="capitalize">
                {socialMedia?.postDate && format(socialMedia?.postDate, "yy MMM''dd")}
              </TitleValue>
              <TitleValue title="Status" className="capitalize">
                {socialMedia.status}
              </TitleValue>
              <TitleValue title="Channels" className="capitalize">
                <div className="flex flex-wrap gap-1">
                  {socialMedia.channels &&
                    socialMedia.channels.map((channel) => (
                      <div key={`${channel}-channel`} className="flex flex-wrap gap-1">
                        <Pill
                          twBackgroundColor="bg-honeydew"
                          twTextColor="text-jungle-green"
                          value={channel}
                        />
                      </div>
                    ))}
                </div>
              </TitleValue>
              <TitleValue title="Copy" className="capitalize">
                {socialMedia?.copy}
              </TitleValue>
              <TitleValue title="Notes" className="capitalize">
                {socialMedia?.notes}
              </TitleValue>
            </div>
            <Card title="Attachment" className="mt-5">
              <div className="flex flex-wrap gap-4">
                {!!socialMedia.attachments ? (
                  socialMedia.attachments.map(({ socialMediaAttachmentId, url, thumbnailUrl }) => {
                    return (
                      <>
                        <PhotographyVideographyFileButton
                          key={`socialMediaFile-${socialMediaAttachmentId}`}
                          className="h-35 w-35"
                          url={url}
                          fileType="image/jpeg"
                          name={`socialMediaFile-${socialMediaAttachmentId}`}
                          thumbnailUrl={thumbnailUrl}
                        />
                      </>
                    )
                  })
                ) : (
                  <div className="m-auto text-base text-metallic-silver">No files found.</div>
                )}
              </div>
            </Card>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteSocialMedia} type="submit">
                <TrashIcon className="stroke-white" />
                <div>Delete</div>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
