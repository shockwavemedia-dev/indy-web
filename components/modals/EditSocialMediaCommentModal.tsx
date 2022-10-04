import axios from 'axios'
import { SetStateAction, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { useToastStore } from '../../store/ToastStore'
import { Page } from '../../types/Page.type'
import { User } from '../../types/User.type'
import { Button } from '../Button'
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon'
import { MentionInput } from '../MentionInput'
import { Modal } from '../Modal'

export const useSocialMediaCommentModalStore = createStore(
  combine(
    {
      clientId: -1,
      socialMediaId: -1,
      commentId: -1,
      comment: '',
    },
    (set) => ({
      toggleModal: (
        clientId?: number,
        socialMediaId?: number,
        commentId?: number,
        comment?: string
      ) =>
        set(() => ({
          clientId: clientId ?? -1,
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
  const { clientId, socialMediaId, commentId, comment, toggleModal } =
    useSocialMediaCommentModalStore()

  const [newComment, setComment] = useState(comment)
  const [taggedUsers, setTaggedUsers] = useState({})

  const { data: users } = useQuery(
    'departments',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<User>
        page: Page
      }>(`/v1/clients/${clientId}/social-media-users`)

      return data
    },
    {
      enabled: !!clientId && clientId !== -1,
    }
  )

  const userOptions =
    (users &&
      users?.map((user) => ({
        id: user.id.toString(),
        display: user.firstName,
      }))) ??
    []

  const commentTagedUsers = (event: { target: { value: SetStateAction<string> } }) => {
    const comment = event.target.value
    const regex = /@\[.+?\]\(.+?\)/gm
    const idRegex = /\(.+?\)/g
    const matches = comment.toString().match(regex)
    const mentionUsers: {}[] = []
    matches &&
      matches.forEach((m) => {
        // @ts-ignore: Object is possibly 'null'.
        const id = m.match(idRegex)[0].replace('(', '').replace(')', '')
        mentionUsers.push(id)
      })
    const mentionUsersInt = mentionUsers.map((id) => {
      return Number(id)
    })
    setTaggedUsers(mentionUsersInt)
  }

  const submitCommentForm = async () => {
    const { status } = await axios.put(`/v1/social-media-comments/${commentId}`, {
      comment: newComment,
      usersTagged: taggedUsers,
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
  }, [comment, clientId])

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
              data={userOptions}
              onChange={(event: { target: { value: SetStateAction<string> } }) => {
                setComment(event.target.value)
                commentTagedUsers(event)
              }}
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
