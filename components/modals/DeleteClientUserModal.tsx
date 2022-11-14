import axios from 'axios'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { ClientUser } from '../../types/ClientUser.type'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const useDeleteClientUserModal = createStore(
  combine(
    {
      clientUser: undefined as ClientUser | undefined,
    },
    (set) => ({
      toggleDeleteClientUserModal: (clientUser?: ClientUser) => set(() => ({ clientUser })),
    })
  )
)

export const DeleteClientUserModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const clientUser = useDeleteClientUserModal((state) => state.clientUser)
  const toggleDeleteClientUserModal = useDeleteClientUserModal(
    (state) => state.toggleDeleteClientUserModal
  )

  if (!clientUser) return null

  return (
    <Modal
      title={`Delete ${clientUser.firstName} ${clientUser.lastName}?`}
      onClose={toggleDeleteClientUserModal}
      className="w-140"
    >
      <div className="flex w-full space-x-5">
        <Button
          ariaLabel="Cancel"
          onClick={() => toggleDeleteClientUserModal()}
          type="button"
          light
        >
          Cancel
        </Button>
        <Button
          ariaLabel="Submit"
          type="button"
          onClick={async () => {
            try {
              const { status } = await axios.delete(`/v1/users/${clientUser.id}`)

              if (status === 200) {
                queryClient.invalidateQueries(['client-users', clientUser.userType.client.id])
                toggleDeleteClientUserModal()
                showToast({
                  type: 'success',
                  message: `${clientUser.fullName} deleted!`,
                })
              }
            } catch (e) {
              showToast({
                type: 'error',
                message: 'Something went wrong! 😵',
              })
            }
          }}
        >
          Delete
        </Button>
      </div>
    </Modal>
  )
}
