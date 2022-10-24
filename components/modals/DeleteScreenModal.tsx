import axios from 'axios'
import Image from 'next/image'
import { useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { Screen } from '../../types/Screen.type'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { TitleValue } from '../TitleValue'

export const DeleteScreenModal = ({
  isVisible,
  onClose,
  screen,
}: {
  isVisible: boolean
  onClose: () => void
  screen: Screen
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const deleteScreen = async () => {
    try {
      const { status } = await axios.delete(`/v1/screens/${screen.id}`)

      if (status === 200) {
        queryClient.invalidateQueries('screens')
        onClose()
        showToast({
          type: 'success',
          message: 'Screen successfully deleted!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      {isVisible && (
        <Modal
          title={`Are you sure you want to delete this Screen ${screen.name}?`}
          onClose={onClose}
        >
          <div className="flex w-140 flex-col">
            <div className="mb-8 flex space-x-8">
              {screen.logo && (
                <div className="rounded-md">
                  <Image
                    src={screen.logo.url}
                    alt={screen.logo.fileName}
                    height={150}
                    width={150}
                  />
                </div>
              )}
              <div className="grid w-full grid-cols-2 grid-rows-2 gap-y-5">
                <TitleValue title="Name">{screen.name}</TitleValue>
              </div>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteScreen} type="submit">
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
