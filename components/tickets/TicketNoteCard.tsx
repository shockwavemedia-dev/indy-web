import { format } from 'date-fns'
import Image from 'next/image'
import DummyAvatar from '../../public/images/dummy-avatar.png'
import { File } from '../../types/File.type'
import { FileDisplay } from '../FileDisplay'
import { RichTextDisplay } from '../RichTextDisplay'

export const TicketNoteCard = ({
  note,
  file,
  createdBy,
  createdAt,
}: {
  note: string
  file?: File | null
  createdBy: string
  createdAt: Date
}) => (
  <div className="space-y-3 rounded-xl bg-white px-6 py-5 shadow">
    <div className="flex items-center">
      <Image src={DummyAvatar} alt="Dummy" height={32} width={32} className="rounded-full" />
      <div className="ml-3 text-sm font-semibold text-onyx">{createdBy}</div>
      <div className="mx-2 h-1 w-1 rounded bg-bright-gray" />
      <div className=" text-xs font-medium text-lavender-gray">
        {format(createdAt, 'dd/MM/yyyy')}
      </div>
    </div>
    <RichTextDisplay value={note} className=" text-sm font-medium text-onyx" />
    {file && (
      <FileDisplay
        src={file?.url}
        type={file?.fileType ?? ''}
        imageHeight={130}
        imageWidth={130}
        imageAlt={file?.fileName}
        className="rounded-xl"
        videoClassName="w-140 rounded-xl"
      />
    )}
  </div>
)
