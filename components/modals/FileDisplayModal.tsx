import { useSession } from 'next-auth/react'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { Button } from '../Button'
import { FileDisplay } from '../FileDisplay'
import { DownloadIcon } from '../icons/DownloadIcon'
import { PrintIcon } from '../icons/PrintIcon'
import { TrashIcon } from '../icons/TrashIcon'
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

  const { data: session } = useSession()

  const { toggleModal: toggleCreatePrinterJobModal } = useCreatePrinterJobModalStore()

  const downloadFile = () => {
    window.open(signedUrl, '_blank')
  }

  const deleteFile = (fileId: number) => {
    console.log(fileId)
    toggleShowPhotoVideoFileModal()
  }

  return (
    <>
      {fileType && name && (
        <Modal title={name} onClose={toggleShowPhotoVideoFileModal}>
          {fileType === 'application/pdf' ? (
            <iframe src={signedUrl} className="h-103 w-228"></iframe>
          ) : (
            <>
              <FileDisplay
                src={signedUrl}
                type={fileType}
                imageHeight={560}
                imageWidth={560}
                imageAlt={name}
                className="rounded-xl"
                videoClassName="rounded-xl w-228"
              />
              {fileType !== 'video/mp4' && session?.isClient && (
                <div className="mt-6 flex w-70">
                  <Button
                    ariaLabel="Print"
                    className="mr-2 w-72 bg-halloween-orange text-white"
                    type="button"
                    onClick={() => {
                      toggleCreatePrinterJobModal(clientId, fileId)
                    }}
                  >
                    <PrintIcon className="stroke-white" />
                    <div>Print</div>
                  </Button>

                  <Button
                    ariaLabel="Download"
                    className="w-82 mr-2 bg-bleu-de-france text-white"
                    type="button"
                    onClick={downloadFile}
                    light
                  >
                    <DownloadIcon className="stroke-white" />
                    <div>Download</div>
                  </Button>
                  <Button
                    ariaLabel="Delete"
                    className="w-72 bg-red-crimson text-white"
                    type="button"
                    onClick={() => {
                      deleteFile(fileId)
                    }}
                  >
                    <TrashIcon className="stroke-white" />
                    <div>Delete</div>
                  </Button>
                </div>
              )}
            </>
          )}
        </Modal>
      )}
      <CreatePrinterJobModal />
    </>
  )
}
