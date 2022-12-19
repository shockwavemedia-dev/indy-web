import { format } from 'date-fns'
import Image from 'next/image'
import DummyAvatar from '../../public/images/dummy-avatar.png'
import { File } from '../../types/File.type'
import { FileDisplay } from '../FileDisplay'
import { RichTextDisplay } from '../RichTextDisplay'

export const TicketNoteCard = ({
  attachments,
  note,
  file,
  createdBy,
  createdAt,
}: {
  attachments: Array<File> | []
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
    <RichTextDisplay value={note} className="text-sm font-medium text-onyx" />
    {file && (
      <FileDisplay
        src={file?.url}
        type={file?.fileType ?? ''}
        imageSize="h-32 w-32"
        imageAlt={file?.fileName}
        videoClassName="w-140 rounded-xl"
      />
    )}
    {attachments.length > 0 && (
      <div className="flex h-fit w-257.5 flex-wrap gap-5">
        {attachments && attachments?.length > 0 ? (
          attachments?.map((attachment) => (
            <FileDisplay
              key={`attachment-${attachment.id}`}
              src={attachment.url}
              type={attachment.fileType}
              imageSize="h-44 w-44"
              imageAlt={attachment.url}
              href={attachment.url}
              videoClassName="h-44 w-78.5 cursor-pointer rounded-xl"
              failedToLoadClassName="h-44 w-78.5"
            />
          ))
        ) : (
          <div className=" text-xs text-metallic-silver">No attachment to display.</div>
        )}
      </div>
    )}
  </div>
)
