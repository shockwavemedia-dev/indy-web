import Image, { StaticImageData } from 'next/image'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import DummyFile from '../../public/images/dummy-file.png'
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

  return (
    <>
      {signedUrl && name && (
        <Modal title={name} onClose={toggleShowImageFileModal}>
          <div className="max-h-155 w-fit overflow-hidden rounded-xl">
            <Image src={signedUrl} alt={name} className="h-full w-full" />
          </div>
        </Modal>
      )}
    </>
  )
}
