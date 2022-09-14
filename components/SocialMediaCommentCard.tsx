import { format } from 'date-fns'
import Image from 'next/image'
import DummyAvatar from '../public/images/dummy-avatar.png'

export const SocialMediaCommentCard = ({
  id,
  comment,
  createdBy,
  createdAt,
  createdById,
}: {
  id: number
  comment: string
  createdBy: string
  createdAt: Date
  createdById: number
}) => (
  <div className="mb-2 space-y-3 rounded-xl bg-white px-6 py-5 shadow">
    <div className="flex items-center">
      <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
      <div className="ml-3 text-sm font-semibold text-onyx">{createdBy}</div>
      <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
      <div className=" text-xs font-medium text-lavender-gray">
        {format(createdAt, 'yy MMMM dd h:mmaaa')}
      </div>
    </div>
    <div className=" text-sm font-medium text-onyx">{comment}</div>
  </div>
)
