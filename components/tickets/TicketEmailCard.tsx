import { format } from 'date-fns'
import { useState } from 'react'
import { RichTextDisplay } from '../RichTextDisplay'

export const TicketEmailCard = ({
  title,
  message,
  createdAt,
}: {
  title: string
  message: string
  createdAt: Date
}) => {
  const [isMessageVisible, setMessageVisible] = useState(false)

  const toggleEmailCard = () => setMessageVisible(!isMessageVisible)

  return (
    <button
      type="button"
      onClick={toggleEmailCard}
      className="w-full space-y-3 rounded-xl bg-white px-6 py-5 shadow"
    >
      <div className="flex items-center space-x-2">
        <div className="font-urbanist text-sm font-semibold text-onyx">{title}</div>
        <div className="h-1 w-1 rounded bg-bright-gray" />
        <div className="font-urbanist text-xs font-medium text-lavender-gray">
          {format(createdAt, "yy MMM''dd")}
        </div>
      </div>
      {isMessageVisible && (
        <RichTextDisplay value={message} className="font-urbanist text-sm font-medium text-onyx" />
      )}
    </button>
  )
}
