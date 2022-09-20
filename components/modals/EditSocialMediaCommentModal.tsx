import axios from 'axios'
import { useEffect, useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { Button } from '../Button'
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon'
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

  const defaultStyle = {
    control: {
      color: '#32343D',
      font: '500 0.875rem/1.25rem Urbanist',
      margin: 0,
      padding: 0,
      minHeight: '3.125rem',
      boxShadow: '0 0 0 1px #E8E8EF',
      border: 'none',
      borderRadius: '.75rem',
      backgroundColor: '#ffffff',
      transition: 'none',
    },

    '&multiLine': {
      control: {
        font: '500 0.875rem/1.25rem Urbanist',
        minHeight: 63,
      },
      highlighter: {
        padding: 9,
        border: 'none',
        borderRadius: '.75rem',
        '&focused': {
          backgroundColor: '0 0 0 2px #F25D23',
        },
      },
      input: {
        padding: 9,
        border: 'none',
        borderRadius: '.75rem',
      },
    },

    '&singleLine': {
      display: 'inline-block',
      width: 180,

      highlighter: {
        padding: 1,
        border: '2px inset transparent',
      },
      input: {
        padding: 1,
        border: '2px inset',
      },
    },

    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.15)',
        font: '500 0.875rem/1.25rem Urbanist',
      },
      item: {
        padding: '5px 15px',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        '&focused': {
          backgroundColor: '#F25D2333',
        },
      },
    },
  }

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
            <MentionsInput
              className="mt-5"
              value={newComment}
              defaultValue={comment}
              onChange={(event) => setComment(event.target.value)}
              style={defaultStyle}
              placeholder="Enter Comment, use the @ symbol to tag other users."
              allowSuggestionsAboveCursor={true}
            >
              <Mention
                trigger="@"
                data={users}
                style={{
                  backgroundColor: '#ccccff',
                }}
              />
            </MentionsInput>
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
