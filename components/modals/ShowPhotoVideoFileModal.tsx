import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { FileDisplay } from '../FileDisplay'
import { Modal } from '../Modal'

export const useShowPhotoVideoFileModalStore = createStore(
  combine(
    {
      signedUrl: '',
      fileType: '',
      name: '',
    },
    (set) => ({
      toggleShowPhotoVideoFileModal: (signedUrl?: string, fileType?: string, name?: string) =>
        set(() => ({ signedUrl: signedUrl ?? '', fileType: fileType ?? '', name: name ?? '' })),
    })
  )
)

export const ShowPhotoVideoFileModal = () => {
  const { signedUrl, fileType, name, toggleShowPhotoVideoFileModal } =
    useShowPhotoVideoFileModalStore()

  return (
    <>
      {signedUrl && fileType && name && (
        <Modal title={name} onClose={toggleShowPhotoVideoFileModal}>
          <div className="space-y-5">
            <FileDisplay
              src={signedUrl}
              type={fileType}
              imageHeight={560}
              imageWidth={560}
              imageAlt={name}
              className="rounded-xl"
              videoClassName="w-140 rounded-xl"
            />
          </div>
        </Modal>
      )}
    </>
  )
}
