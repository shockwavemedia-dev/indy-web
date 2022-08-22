import axios from 'axios'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { Client } from '../../types/Client.type'
import { Button } from '../Button'
import { Modal } from '../Modal'

export const useDeleteClientModal = createStore(
  combine(
    {
      client: undefined as Client | undefined,
    },
    (set) => ({
      toggleDeleteClientModal: (client?: Client) => set(() => ({ client })),
    })
  )
)

export const DeleteClientModal = () => {
  const { replace } = useRouter()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const client = useDeleteClientModal((state) => state.client)
  const toggleDeleteClientModal = useDeleteClientModal((state) => state.toggleDeleteClientModal)

  if (!client) return null

  return (
    <Modal title={`Delete ${client.name}?`} onClose={toggleDeleteClientModal} className="w-140">
      <div className="flex w-full space-x-5">
        <Button ariaLabel="Cancel" onClick={toggleDeleteClientModal} type="button" light>
          Cancel
        </Button>
        <Button
          ariaLabel="Submit"
          type="button"
          onClick={async () => {
            try {
              const { status } = await axios.delete(`/v1/clients/${client.id}`)

              if (status === 200) {
                queryClient.invalidateQueries('clients')
                toggleDeleteClientModal()
                showToast({
                  type: 'success',
                  message: `${client.name} deleted!`,
                })
                replace('/clients')
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
