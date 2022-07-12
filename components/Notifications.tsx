import { Tooltip } from '@mui/material'
import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { useToastStore } from '../store/ToastStore'
import { Notification } from '../types/Notification.type'
import { Card } from './Card'
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
          message: 'All notification successfully deleted!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  const markAsReadAll = async () => {
    try {
      const { status } = await axios.post('/v1/notifications/mark-as-read')
      if (status === 200) {
        queryClient.invalidateQueries('notifications')
        showToast({
          type: 'success',
          message: 'All notification successfully mark as read!',
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
      <div className="absolute top-6 right-6 space-x-2">
        <Tooltip title="Clear All" placement="top">
          <button className="group" onClick={markAsReadAll}>
            <EyeIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
        </Tooltip>
        <Tooltip title="Delete All" placement="top">
          <button className="group" onClick={deleteAll}>
            <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
          </button>
        </Tooltip>
      </div>
      <div className="relative">
        <div className="absolute left-1 top-1.5 h-[calc(100%_-_.75rem)] w-px bg-bright-gray" />
        <div className="-ml-1 max-h-102 space-y-6 overflow-y-scroll pl-1 pr-5 pt-1">
          {!!notifications && notifications?.length > 0 ? (
            notifications?.map(({ id, title, url, status }, i) => {
              const readNotification = async () => axios.post(`v1/notifications/${id}/mark-as-read`)
              const isRead = status === 'read'
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
                    className={`pl-8 font-urbanist text-sm font-medium underline-offset-1 hover:text-halloween-orange hover:underline ${
                      i === notifications.length - 1 ? 'bg-white' : ''
                    } ${isRead ? 'text-lavender-gray' : 'text-onyx'}`}
                    href={url}
                    onClick={readNotification}
                  >
                    {title}
                  </a>
                  <button className="group mr-2" onClick={deleteById}>
                    <TrashIcon className="stroke-waterloo group-hover:stroke-halloween-orange" />
                  </button>
                </div>
              )
            })
          ) : (
            <div className="font-urbanist text-xs text-metallic-silver">
              No notifications to display.
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
