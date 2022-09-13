import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { EditSocialMediaForm } from '../../types/forms/EditSocialMediaForm.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { Modal } from '../Modal'

export const useUploadSocialMediaFileModalStore = createStore(
  combine(
    {
      socialMedia: undefined as SocialMedia | undefined,
    },
    (set) => ({
      toggleUploadSocialMediaFileModal: (socialMedia?: SocialMedia) => set(() => ({ socialMedia })),
    })
  )
)

export const UploadSocialMediaFileModal = () => {
  const { socialMedia, toggleUploadSocialMediaFileModal } = useUploadSocialMediaFileModalStore()
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()

  const submitFile = async (values: EditSocialMediaForm) => {
    try {
      const { status } = await axios.post(
        `/v1/social-media/${socialMedia?.id}`,
        objectWithFileToFormData(values)
      )

      if (status === 200) {
        queryClient.invalidateQueries(['socialMedia'])
        queryClient.invalidateQueries(['socialMedias'])
        toggleUploadSocialMediaFileModal()
        showToast({
          type: 'success',
          message: `Attachment successfully uploaded!
          `,
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {socialMedia && (
        <Modal title="Upload Social Media Attachment" onClose={toggleUploadSocialMediaFileModal}>
          <Formik
            initialValues={{
              post: socialMedia.post,
              attachments: socialMedia?.attachments,
              copy: socialMedia?.copy,
              status: socialMedia.status,
              channels: socialMedia?.channels,
              notes: socialMedia?.notes,
              postDate: socialMedia?.postDate && new Date(socialMedia?.postDate),
              postTime: socialMedia?.postDate && new Date(socialMedia?.postDate),
              _method: 'PUT',
            }}
            onSubmit={submitFile}
          >
            {({ isSubmitting }) => (
              <Form className="w-130 space-y-8">
                <div className="space-y-5">
                  <FileDropZone
                    name="attachments"
                    maxSize={250}
                    mimeType="image/gif"
                    accept={['.gif', '.Graphics', '.mp4', '.png', '.jpeg', '.jpg']}
                    multiple
                  />
                </div>
                <div className="flex space-x-5">
                  <Button
                    ariaLabel="Cancel"
                    onClick={toggleUploadSocialMediaFileModal}
                    type="button"
                    light
                  >
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}
