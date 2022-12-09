import axios from 'axios'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { Button } from '../Button'
import { FileDisplay } from '../FileDisplay'
import { DownloadIcon } from '../icons/DownloadIcon'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'

export const useSocialMediaFileModalStore = createStore(
  combine(
    {
      signedUrl: '',
      fileType: '',
      name: '',
      fileId: -1,
      socialMediaId: -1,
    },
    (set) => ({
      toggleShowSocialMediaFileModal: (
        signedUrl?: string,
        fileType?: string,
        name?: string,
        fileId?: number,
        socialMediaId?: number
      ) =>
        set(() => ({
          signedUrl: signedUrl ?? '',
          fileType: fileType ?? '',
          name: name ?? '',
          fileId: fileId ?? -1,
          socialMediaId: socialMediaId ?? -1,
        })),
    })
  )
)

export const SocialMediaFileModal = () => {
  const { signedUrl, fileType, name, fileId, socialMediaId, toggleShowSocialMediaFileModal } =
    useSocialMediaFileModalStore()

  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const downloadFile = () => {
    if (signedUrl) {
      window.open(signedUrl, '_blank')
      // fetch(signedUrl)
      //   .then((res) => res.blob())
      //   .then((blob) => {
      //     const url = window.URL.createObjectURL(blob)
      //     const link = document.createElement('a')
      //     link.href = url
      //     link.setAttribute('download', name)
      //     document.body.appendChild(link)
      //     link.click()
      //   })
    }
  }

  const deleteSocialMediaFile = async () => {
    const values = { attachment_ids: [fileId] }
    try {
      const { status } = await axios.put(`/v1/social-media/${socialMediaId}/attachments`, values)

      if (status === 200) {
        queryClient.invalidateQueries(['socialMedia', socialMediaId])
        queryClient.invalidateQueries(['socialMedias'])
        toggleShowSocialMediaFileModal()
        showToast({
          type: 'success',
          message: 'Attachment successfully deleted!',
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
      {signedUrl && fileType && name && (
        <Modal title={name} onClose={toggleShowSocialMediaFileModal}>
          {fileType === 'application/pdf' ? (
            <iframe src={signedUrl} className="h-163 w-280"></iframe>
          ) : (
            <div className="max-h-130 overflow-hidden overflow-y-auto rounded-xl">
              <FileDisplay
                src={signedUrl}
                type={fileType}
                imageSize="h-175"
                imageAlt={name}
                videoClassName="w-140 rounded-xl"
              />
              <div className="mt-5 flex space-x-5">
                <Button
                  ariaLabel="Download"
                  onClick={downloadFile}
                  className="text-bleu-de-france"
                  type="button"
                  light
                >
                  <DownloadIcon className="stroke-bleu-de-france" />
                  <div>Download</div>
                </Button>
                <Button onClick={deleteSocialMediaFile} ariaLabel="Submit" type="submit">
                  <TrashIcon className="stroke-white" />
                  <div>Delete</div>
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  )
}
