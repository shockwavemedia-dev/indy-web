import axios from 'axios'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { Button } from '../Button'
import { TrashIcon } from '../icons/TrashIcon'
import { Modal } from '../Modal'

export const useDeleteSocialMediaCommentModalStore = createStore(
  combine(
    {
      commentId: -1,
      comment: '',
    },
    (set) => ({
      toggleModal: (commentId?: number, comment?: string) =>
        set(() => ({ commentId: commentId ?? -1, comment: comment ?? '' })),
    })
  )
)

export const DeleteSocialMediaCommentModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { commentId, comment, toggleModal } = useDeleteSocialMediaCommentModalStore()

  const deleteComment = async () => {
    try {
      const { status } = await axios.delete(`/v1/social-media-comments/${commentId}`)

      if (status === 200) {
        queryClient.invalidateQueries('socialMedia')
        queryClient.invalidateQueries(['socialMedias'])
        toggleModal()
        showToast({
          type: 'success',
          message: 'Comment successfully deleted!',
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
      {commentId !== -1 && comment && (
        <Modal
          title="Are you sure you want to delete this comment?"
          className="w-130 border-2 border-solid border-bright-gray"
          onClose={toggleModal}
        >
          <div className="mb-8 text-sm font-semibold text-halloween-orange">{comment}</div>
          <div className="flex w-full space-x-5">
            <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
              Cancel
            </Button>
            <Button ariaLabel="Submit" onClick={deleteComment} type="submit">
              <TrashIcon className="stroke-white" />
              <div>Delete</div>
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
