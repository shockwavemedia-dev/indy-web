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

export const usePrinterJobFileModalStore = createStore(
  combine(
    {
      signedUrl: '',
      fileType: '',
      name: '',
      fileId: -1,
      printerId: -1,
    },
    (set) => ({
      toggleShowPrinterJobFileModal: (
        signedUrl?: string,
        fileType?: string,
        name?: string,
        fileId?: number,
        printerId?: number
      ) =>
        set(() => ({
          signedUrl: signedUrl ?? '',
          fileType: fileType ?? '',
          name: name ?? '',
          fileId: fileId ?? -1,
          printerId: printerId ?? -1,
        })),
    })
  )
)

export const PrinterJobFileModal = () => {
  const { signedUrl, fileType, name, fileId, printerId, toggleShowPrinterJobFileModal } =
    usePrinterJobFileModalStore()

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

  const deletePrinterJobFile = async () => {
    const values = { attachment_ids: [fileId] }
    try {
      const { status } = await axios.put(`/v1/printer-jobs/${printerId}/attachments`, values)

      if (status === 200) {
        queryClient.invalidateQueries(['printer', printerId])
        queryClient.invalidateQueries(['printerJobs'])
        toggleShowPrinterJobFileModal()
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
      {fileType && name && (
        <Modal title={name} onClose={toggleShowPrinterJobFileModal}>
          {fileType === 'application/pdf' ? (
            <iframe src={signedUrl} className="h-163 w-280"></iframe>
          ) : (
            <div className="max-h-130 overflow-hidden overflow-y-auto rounded-xl">
              <FileDisplay
                src={signedUrl}
                type={fileType}
                imageHeight={560}
                imageWidth={560}
                imageAlt={name}
                className="rounded-xl"
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
                <Button onClick={deletePrinterJobFile} ariaLabel="Submit" type="submit">
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
