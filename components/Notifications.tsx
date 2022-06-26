import axios from 'axios'
import { useQuery } from 'react-query'
import { Notification } from '../types/Notification.type'
import { Card } from './Card'

export const Notifications = () => {
  const { data: notifications } = useQuery('notifications', async () => {
    const {
      data: { data },
    } = await axios.get<{ data: Array<Notification> }>('/v1/notifications')

    return data
  })

  return (
    <Card title="Notifications">
      <div className="relative">
        <div className="absolute left-1 top-1.5 h-[calc(100%_-_.75rem)] w-px bg-bright-gray" />
        <div className="-ml-1 max-h-102 space-y-6 overflow-y-scroll pl-1 pr-5 pt-1">
          {notifications?.map(({ id, title, url }, i) =>
            i === 0 ? (
              <div key={`notification-${id}`} className="relative flex">
                <div className="absolute h-2.25 w-2.25 rounded-lg bg-halloween-orange" />
                <div className="absolute h-2.25 w-2.25 animate-ping rounded-lg bg-halloween-orange" />
                <a
                  className="ml-8 font-urbanist text-sm font-medium text-onyx underline-offset-1 hover:text-halloween-orange hover:underline"
                  href={url}
                >
                  {title}
                </a>
              </div>
            ) : (
              <div key={`notification-${id}`} className="relative flex">
                <div className="absolute top-1 h-2.25 w-2.25 rounded-lg bg-halloween-orange ring-4 ring-halloween-orange ring-opacity-20" />
                <a
                  className={`pl-8 font-urbanist text-sm font-medium text-onyx underline-offset-1 hover:text-halloween-orange hover:underline ${
                    i === notifications.length - 1 ? 'bg-white' : ''
                  }`}
                  href={url}
                >
                  {title}
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </Card>
  )
}
