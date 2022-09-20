import axios from 'axios'
import { SetStateAction, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { Button } from '../Button'
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon'
import { MentionInput } from '../MentionInput'
import { Modal } from '../Modal'

export const useSocialMediaCommentModalStore = createStore(
  combine(
    {
      socialMediaId: -1,
      commentId: -1,
      comment: '',
    },
    (set) => ({
      toggleModal: (socialMediaId?: number, commentId?: number, comment?: string) =>
        set(() => ({
          socialMediaId: socialMediaId ?? -1,
          commentId: commentId ?? -1,
          comment: comment ?? '',
        })),
    })
  )
)

export const EditSocialMediaCommentModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { socialMediaId, commentId, comment, toggleModal } = useSocialMediaCommentModalStore()

  const [newComment, setComment] = useState(comment)

  const users = [
    { id: '1', display: 'Daniel' },
    { id: '3', display: 'Ross' },
    { id: '2', display: 'Mark' },
    { id: '3', display: 'Kyle' },
    { id: '3', display: 'Arjean' },
  ]

  const submitCommentForm = async () => {
    const { status } = await axios.put(`/v1/social-media-comments/${commentId}`, {
      comment: newComment,
    })
    if (status === 200) {
      queryClient.invalidateQueries(['socialMedia', socialMediaId])
      queryClient.invalidateQueries(['socialMedias'])
      toggleModal()
      showToast({
        type: 'success',
        message: `All changes was successfully saved!`,
      })
    }
  }

  useEffect(() => {
    setComment(comment)
  }, [comment])

  return (
    <>
      {commentId !== -1 && comment && (
        <Modal
          title="Edit Comment"
          className="border-2 border-solid border-bright-gray"
          onClose={toggleModal}
        >
          <div className="flex w-140 flex-col">
            <MentionInput
              className="mt-5"
              value={newComment}
              defaultValue={comment}
              data={users}
              onChange={(event: { target: { value: SetStateAction<string> } }) =>
                setComment(event.target.value)
              }
              placeholder="Enter Comment, use the @ symbol to tag other users."
            />
            <div className="mt-5 flex space-x-5">
              <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
                Cancel
              </Button>
              <Button ariaLabel="Submit Comment" type="button" onClick={submitCommentForm}>
                <PaperPlaneIcon className="stroke-white" />
                <div>Send</div>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
