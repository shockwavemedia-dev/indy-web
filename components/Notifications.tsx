import { Tooltip } from '@mui/material'
import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { useToastStore } from '../store/ToastStore'
import { Notification } from '../types/Notification.type'
import { Card } from './Card'
import { CloseModalIcon } from './icons/CloseModalIcon'
import { EyeIcon } from './icons/EyeIcon'
import { TrashIcon } from './icons/TrashIcon'
export const Notifications = ({ className = '' }: { className?: string }) => {
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()

  const { data: notifications } = useQuery('notifications', async () => {
    const {
      data: { data },
    } = await axios.get<{ data: Array<Notification> }>('/v1/notifications')

    return data
  })

  const deleteAll = async () => {
    try {
      const { status } = await axios.delete('/v1/notifications')

      if (status === 200) {
        queryClient.invalidateQueries('notifications')
        showToast({
          type: 'success',
          message: 'All notifications successfully deleted!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  const markAllAsRead = async () => {
    try {
      const { status } = await axios.post('/v1/notifications/mark-as-read')

      if (status === 200) {
        queryClient.invalidateQueries('notifications')
        showToast({
          type: 'success',
          message: 'All notifications successfully marked as read!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  return (
    <Card title="Notifications" className={`h-fit ${className}`}>
      {notifications && notifications.length > 0 && (
        <div className="absolute top-6 right-6 space-x-2">
          <Tooltip title="Mark all as read" placement="top">
            <button className="group" onClick={markAllAsRead}>
              <EyeIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
          <Tooltip title="Clear all" placement="top">
            <button className="group" onClick={deleteAll}>
              <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
            </button>
          </Tooltip>
        </div>
      )}
      <div className="relative">
        {notifications && notifications.length > 0 && (
          <div className="absolute left-1 top-1.5 h-[calc(100%_-_.75rem)] w-px bg-bright-gray" />
        )}
        <div className="-ml-1 max-h-102 space-y-6 overflow-y-auto pl-1 pr-5 pt-1">
          {notifications && notifications.length > 0 ? (
            notifications.map(({ id, title, url, status }, i) => {
              const readNotification = async () => axios.post(`v1/notifications/${id}/mark-as-read`)
              const deleteById = async () => {
                try {
                  const { status } = await axios.delete(`/v1/notifications/${id}`)
                  if (status === 200) {
                    queryClient.invalidateQueries('notifications')
                    showToast({
                      type: 'success',
                      message: 'notification successfully deleted!',
                    })
                  }
                } catch (e) {
                  showToast({
                    type: 'error',
                    message: 'Something went wrong',
                  })
                }
              }

              return (
                <div key={`notification-${id}`} className="relative flex">
                  <div className="absolute top-1 h-2.25 w-2.25 rounded-lg bg-halloween-orange ring-4 ring-halloween-orange ring-opacity-20" />
                  <a
                    className={`pl-8 pr-2  text-sm font-medium underline-offset-1 hover:text-halloween-orange hover:underline ${
                      i === notifications.length - 1 ? 'bg-white' : ''
                    } ${status === 'read' ? 'text-lavender-gray' : 'text-onyx'}`}
                    href={url}
                    onClick={readNotification}
                  >
                    {title}
                  </a>
                  <Tooltip title="Delete" placement="top">
                    <button className="group mr-2" onClick={deleteById}>
                      <CloseModalIcon
                        width="12"
                        height="12"
                        className="stroke-waterloo group-hover:stroke-halloween-orange"
                      />
                    </button>
                  </Tooltip>
                </div>
              )
            })
          ) : (
            <div className="text-center text-xs text-metallic-silver">
              No notifications to display.
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
