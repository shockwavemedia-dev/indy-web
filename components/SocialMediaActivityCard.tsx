import Image from 'next/image'
import DummyAvatar from '../public/images/dummy-avatar.png'
import { SocialMediaActivityFields } from '../types/SocialMediaActivityFields.type'

export const SocialMediaActivityCard = ({
  action,
  createdBy,
}: {
  action: string
  createdBy: string
  fields?: Array<SocialMediaActivityFields>
}) => {
  return (
    <div className="space-y-3 rounded-xl bg-white px-6 py-5 shadow">
      <div className="flex items-center">
        <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
        <div className="ml-3 text-sm font-semibold text-onyx">{createdBy}</div>
        <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
        <div className=" text-xs font-medium text-lavender-gray">{'22 Sep13'}</div>
      </div>
      {action !== 'Modified' ? (
        <div className=" text-sm font-medium text-onyx">{action}</div>
      ) : (
        <div className=" text-sm font-medium text-onyx">{action}</div>
      )}
    </div>
  )
}
