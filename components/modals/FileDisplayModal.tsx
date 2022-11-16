import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { FileDisplay } from '../FileDisplay'
import { PrintIcon } from '../icons/PrintIcon'
import { Modal } from '../Modal'
import { CreatePrinterJobModal, useCreatePrinterJobModalStore } from './CreatePrinterJobModal'

export const useFileDisplayModalStore = createStore(
  combine(
    {
      signedUrl: '',
      fileType: '',
      name: '',
      fileId: -1,
      clientId: -1,
    },
    (set) => ({
      toggleShowPhotoVideoFileModal: (
        signedUrl?: string,
        fileType?: string,
        name?: string,
        fileId?: number,
        clientId?: number
      ) =>
        set(() => ({
          signedUrl: signedUrl ?? '',
          fileType: fileType ?? '',
          name: name ?? '',
          fileId: fileId ?? -1,
          clientId: clientId ?? -1,
        })),
    })
  )
)

export const FileDisplayModal = () => {
  const { signedUrl, fileType, name, fileId, clientId, toggleShowPhotoVideoFileModal } =
    useFileDisplayModalStore()

  const { toggleModal: toggleCreatePrinterJobModal } = useCreatePrinterJobModalStore()

  return (
    <>
      {fileType && name && (
        <Modal title={name} onClose={toggleShowPhotoVideoFileModal}>
          {fileType === 'application/pdf' ? (
            <iframe src={signedUrl} className="h-163 w-280"></iframe>
          ) : (
            <>
              <FileDisplay
                src={signedUrl}
                type={fileType}
                imageHeight={560}
                imageWidth={560}
                imageAlt={name}
                className="rounded-xl"
                videoClassName="w-140 rounded-xl"
              />
              {fileType !== 'video/mp4' && (
                <button
                  type="button"
                  className="mb-5 flex h-12.5 w-full items-center justify-center space-x-2 rounded-xl border-1.5 border-solid border-bright-gray bg-halloween-orange text-base font-semibold text-white "
                  aria-label="Print"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleCreatePrinterJobModal(clientId, fileId)
                  }}
                >
                  <PrintIcon className="stroke-white" />
                  <div className="text-white">Print</div>
                </button>
              )}
            </>
          )}
        </Modal>
      )}
      <CreatePrinterJobModal />
    </>
  )
}
