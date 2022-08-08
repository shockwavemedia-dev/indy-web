import axios from 'axios'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'

export const DeleteMarketingPlannerModal = ({
  isVisible,
  onClose,
  id,
  eventName,
}: {
  isVisible: boolean
  onClose: () => void
  id: number
  eventName: string
}) => {
  const { replace } = useRouter()
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const deleteMarketingPlanner = async () => {
    try {
      const { status } = await axios.delete(`/v1/marketing-planners/${id}`)

      if (status === 200) {
        queryClient.invalidateQueries('marketingPlanner')
        replace('/marketing-planner')
        onClose()
        showToast({
          type: 'success',
          message: `Marketing Planner successfully deleted!`,
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
        <Modal title={`Are you sure you want to delete ${eventName}?`} onClose={onClose}>
          <div className="mt-8 flex w-140 flex-col">
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteMarketingPlanner} type="submit">
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
