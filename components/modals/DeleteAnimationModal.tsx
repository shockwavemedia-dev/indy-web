import axios from 'axios'
import { useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { Animation } from '../../types/Animation.type'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'
import { TitleValue } from '../TitleValue'

export const DeleteAnimationModal = ({
  isVisible,
  onClose,
  animation,
}: {
  isVisible: boolean
  onClose: () => void
  animation: Animation
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const deleteAnimation = async () => {
    try {
      const { status } = await axios.delete(`/v1/libraries/${animation.id}`)

      if (status === 200) {
        queryClient.invalidateQueries('animations')
        onClose()
        showToast({
          type: 'success',
          message: 'Animation successfully deleted!',
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
      {isVisible && (
        <Modal title="Are you sure you want to delete Animation?" onClose={onClose}>
          <div className="w-140">
            <div className="mb-5 flex space-x-25">
              <TitleValue title="Title">{animation.title}</TitleValue>
              <TitleValue title="Library Category Name" className="capitalize">
                {animation.libraryCategoryName}
              </TitleValue>
            </div>
            <div className="mb-5 flex">
              <TitleValue title="Description" className="capitalize">
                {animation.description}
              </TitleValue>
            </div>
            <div className="mb-5 flex">
              <div className="font-urbanist text-xs font-medium text-metallic-silver">Video</div>
            </div>
            <div className="mb-5 flex w-140">
              <video muted autoPlay loop>
                <source src={animation.videoLink} />
              </video>
            </div>
            <div className="flex space-x-5">
              <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit" onClick={deleteAnimation} type="submit">
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
