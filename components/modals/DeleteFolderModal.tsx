import axios, { AxiosError } from 'axios'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { Button } from '../Button'
import { FolderIcon } from '../icons/FolderIcon'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'

export const useDeleteFolderModalStore = createStore(
  combine(
    {
      folderId: -1,
      folderName: '',
    },
    (set) => ({
      toggleModal: (folderId?: number, folderName?: string) =>
        set(() => ({ folderId: folderId ?? -1, folderName: folderName ?? '' })),
    })
  )
)

export const DeleteFolderModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { folderId, folderName, toggleModal } = useDeleteFolderModalStore()

  const deleteFolder = async () => {
    try {
      const { status } = await axios.delete(`/v1/folders/${folderId}`)

      if (status === 200) {
        queryClient.invalidateQueries('clientFiles')
        toggleModal()
        showToast({
          type: 'success',
          message: 'Folder successfully deleted!',
        })
      }
    } catch (error) {
      if (((x): x is AxiosError<{ message: string }> => axios.isAxiosError(x))(error)) {
        if (error.response?.data.message) {
          showToast({
            type: 'error',
            message: error.response?.data.message,
          })
        }
      }
    }
  }

  return (
    <>
      {folderId !== -1 && folderName && (
        <Modal
          title="Are you sure you want to delete this folder?"
          className="w-130"
          onClose={toggleModal}
        >
          <FolderIcon className="h-8 w-8 stroke-halloween-orange" />
          <div className="mb-8 text-sm font-semibold text-halloween-orange">{folderName}</div>
          <div className="flex w-full space-x-5">
            <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
              Cancel
            </Button>
            <Button ariaLabel="Submit" onClick={deleteFolder} type="submit">
              <TrashIcon className="stroke-white" />
              <div>Delete</div>
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
