import Image, { StaticImageData } from 'next/image'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import DummyFile from '../../public/images/dummy-file.png'
import { Button } from '../Button'
import { DownloadIcon } from '../icons/DownloadIcon'
import { PrintIcon } from '../icons/PrintIcon'
import { Modal } from '../Modal'

export const useImageFileDisplayModalStore = createStore(
  combine(
    {
      signedUrl: DummyFile,
      name: '',
    },
    (set) => ({
      toggleShowImageFileModal: (signedUrl?: StaticImageData, name?: string) =>
        set(() => ({ signedUrl: signedUrl, name: name ?? '' })),
    })
  )
)

export const ImageFileDisplayModal = () => {
  const { signedUrl, name, toggleShowImageFileModal } = useImageFileDisplayModalStore()

  const downloadFile = () => {
    const link = document.createElement('a')
    link.href = '/images/visual-display/' + name
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      {signedUrl && name && (
        <Modal title={name} onClose={toggleShowImageFileModal}>
          <div className="max-h-155 w-fit overflow-hidden rounded-xl">
            <Image src={signedUrl} alt={name} className="h-full w-full" />
            <div className="mt-5 flex space-x-5">
              <Button
                ariaLabel="Download"
                className="text-bleu-de-france"
                type="button"
                light
                onClick={downloadFile}
              >
                <DownloadIcon className="stroke-bleu-de-france" />
                <div>Download</div>
              </Button>
              <Button ariaLabel="Print" className="text-orchid" type="button" light>
                <PrintIcon className="stroke-orchid" />
                <div>Print</div>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
