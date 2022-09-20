import { Tooltip } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import DummyAvatar from '../public/images/dummy-avatar.png'
import { EditIcon } from './icons/EditIcon'
import { TrashIcon } from './icons/TrashIcon'
import { useDeleteSocialMediaCommentModalStore } from './modals/DeleteSocialMediaCommentModal'
import { useSocialMediaCommentModalStore } from './modals/EditSocialMediaCommentModal'
import CommentParagraph from './CommentParagraph'


export const SocialMediaCommentCard = ({
  socialMediaId,
  id,
  comment,
  createdBy,
  createdAt,
  isEditDelete = false,
}: {
  socialMediaId: number
  id: number
  comment: string
  createdBy: string
  createdAt: Date
  isEditDelete: boolean
}) => {
  const { toggleModal: toggleEditCommentModal } = useSocialMediaCommentModalStore()
  const { toggleModal: toggleDeleteCommentModal } = useDeleteSocialMediaCommentModalStore()

  return (
    <>
      <div className="relative mb-2 space-y-3 rounded-xl bg-white px-6 py-5 shadow">
        {isEditDelete && (
          <div className="absolute top-5 right-5 flex space-x-2">
            <Tooltip title="Edit" placement="top">
              <button
                className="group"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleEditCommentModal(socialMediaId, id, comment)
                }}
              >
                <EditIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
              </button>
            </Tooltip>
            <Tooltip title="Delete" placement="top">
              <button
                className="group"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleDeleteCommentModal(socialMediaId, id, comment)
                }}
              >
                <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
              </button>
            </Tooltip>
          </div>
        )}
        <div className="flex items-center">
          <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
          <div className="ml-3 text-xs font-semibold text-onyx">{createdBy}</div>
          <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
          <div className="text-xs font-medium text-lavender-gray">
            {format(createdAt, 'yy MMMM dd h:mmaaa')}
          </div>
        </div>
        <CommentParagraph comment={comment} />
      </div>
    </>
  )
}
