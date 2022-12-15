import axios from 'axios'
import { format } from 'date-fns'
import Image from 'next/image'
import { SetStateAction, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useToastStore } from '../../store/ToastStore'
import { Page } from '../../types/Page.type'
import { TicketChat } from '../../types/TicketChat.type'
import { User } from '../../types/User.type'
import { Button } from '../Button'
import CommentParagraph from '../CommentParagraph'
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon'
import { TicketChatInput } from '../TicketChatInput'

export const TicketChatCard = ({
  chats,
  ticketId,
}: {
  chats?: Array<TicketChat> | null
  ticketId: number
}) => {
  const [taggedUsers, setTaggedUsers] = useState({})
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const { data: users } = useQuery(
    'departments',
    async () => {
      const {
        data: { data },
      } = await axios.get<{
        data: Array<User>
        page: Page
      }>(`/v1/users`)

      return data
    },
    {
      enabled: !!ticketId && ticketId !== -1,
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

  const submitMessage = async () => {
    if (!ticketId) {
      return
    }

    const { status } = await axios.post(`/v1/tickets/${ticketId}/chats`, {
      message: comment,
      usersTagged: taggedUsers,
    })

    if (status === 200) {
      queryClient.invalidateQueries(['chats', ticketId])
      setComment('')
      showToast({
        type: 'success',
        message: `Comment successfully added!`,
      })
    }
  }

  return (
    <>
      {chats && chats.length > 0 && (
        <div className="h-86 overflow-auto">
          {chats?.map((chat) => (
            <div
              className="relative mb-3 space-y-3 rounded-sm bg-white px-6 py-5 shadow"
              key={`chat-${chat.id}`}
            >
              <div className="flex items-center rounded-sm bg-white shadow">
                {chat.profileUrl && (
                  <Image
                    src={chat.profileUrl}
                    alt="Dummy"
                    height={32}
                    width={32}
                    className="rounded-full"
                  />
                )}
                <div className="ml-3 text-xs font-semibold text-onyx">{chat.createdBy}</div>
                <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
              </div>
              <CommentParagraph comment={chat.message}></CommentParagraph>
              <div className="text-xs font-medium text-lavender-gray">
                {format(chat.createdAt, 'dd/MM/yyyy h:mmaaa')}
              </div>
            </div>
          ))}
        </div>
      )}

      <TicketChatInput
        className=""
        value={comment}
        data={userOptions}
        onChange={(event: { target: { value: SetStateAction<string> } }) => {
          setComment(event.target.value)
          commentTagedUsers(event)
        }}
        placeholder="Enter message, use the @ symbol to tag other users."
      />
      <Button
        className="align-right right-4 w-36"
        ariaLabel="Submit Comment"
        type="button"
        onClick={submitMessage}
      >
        <PaperPlaneIcon className="stroke-white" />
        <div>Send</div>
      </Button>
    </>
  )
}
