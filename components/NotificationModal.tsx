import create from 'zustand'
import { combine } from 'zustand/middleware'
import { CloseModalIcon } from './icons/CloseModalIcon'
import { Notifications } from './Notifications'

export const useNotificationModalStore = create(
  combine(
    {
      visible: false,
    },
    (set) => ({
      toggleModal: (visible?: boolean) => set(() => ({ visible })),
    })
  )
)

export const NotificationModal = () => {
  const { visible, toggleModal } = useNotificationModalStore()

  return (
    <>
      {visible && (
        <div className="flex items-center rounded-xl bg-white px-6 py-4 shadow">
          <button
            onClick={() => toggleModal()}
            className="fixed top-0 left-0 z-40 h-full w-full cursor-default bg-onyx bg-opacity-20"
          />
          <div
            className={`absolute top-15 -right-35 z-50 flex -translate-x-1/2 flex-col items-center rounded-xl bg-white p-5`}
          >
            <button className="absolute top-2 right-3" onClick={() => toggleModal()}>
              <CloseModalIcon width="15" height="15" className="stroke-lavender-gray" />
            </button>
            <Notifications className="w-86 lg:w-1/2" />
          </div>
        </div>
      )}
    </>
  )
}
