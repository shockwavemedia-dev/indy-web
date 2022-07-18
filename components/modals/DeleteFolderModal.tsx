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
      isModalVisible: false,
    },
    (set, get) => ({
      toggleModal: () => set(() => ({ isModalVisible: !get().isModalVisible })),
    })
  )
)

export const DeleteFolderModal = ({
  folderId,
  folderName,
}: {
  folderId: number
  folderName: string
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { isModalVisible, toggleModal } = useDeleteFolderModalStore()

  const deleteFolder = async () => {
    try {
      const { status } = await axios.delete(`/v1/folders/${folderId}`)

      if (status === 200) {
        queryClient.invalidateQueries('files')
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
      {isModalVisible && (
        <Modal title="Are you sure you want to delete this folder?" onClose={toggleModal}>
          <div className="w-full">
            <div className="mb-8 flex flex-col items-center justify-center space-y-1">
              <FolderIcon className="h-8 w-8 stroke-halloween-orange" />
              <div className="font-urbanist text-lg font-medium text-metallic-silver">
                {folderName}
              </div>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteFolder} type="submit">
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
