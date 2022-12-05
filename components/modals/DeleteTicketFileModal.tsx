import axios from 'axios'
import { useQueryClient } from 'react-query'
import create from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'

export const useDeleteTicketFileModal = create(
  combine(
    {
      ticketFileId: undefined as number | undefined,
    },
    (set) => ({
      toggleDeleteTicketFileModal: (ticketFileId?: number) => set({ ticketFileId }),
    })
  )
)

export const DeleteTicketFileModal = () => {
  const queryClient = useQueryClient()
  const ticketFileId = useDeleteTicketFileModal((state) => state.ticketFileId)
  const toggleDeleteTicketFileModal = useDeleteTicketFileModal(
    (state) => state.toggleDeleteTicketFileModal
  )
  const { showToast } = useToastStore()

  return (
    <>
      {ticketFileId && (
        <Modal
          title={`Are you sure you want to delete this file?`}
          onClose={toggleDeleteTicketFileModal}
        >
          <div className="flex w-175 flex-col">
            <div className="flex space-x-5">
              <Button
                ariaLabel="Cancel"
                onClick={() => toggleDeleteTicketFileModal()}
                type="button"
                light
              >
                Cancel
              </Button>
              <Button
                ariaLabel="Submit"
                onClick={async () => {
                  try {
                    const { status } = await axios.delete(`/v1/ticket-files/${ticketFileId}`)

                    if (status === 200) {
                      showToast({
                        type: 'success',
                        message: `Ticket File successfully deleted!`,
                      })

                      toggleDeleteTicketFileModal()
                      queryClient.invalidateQueries('ticketFiles')
                    }
                  } catch (e) {
                    queryClient.invalidateQueries('ticketFiles')
                    showToast({
                      type: 'error',
                      message: 'Something went wrong! 😵',
                    })
                  }
                }}
                type="submit"
              >
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
