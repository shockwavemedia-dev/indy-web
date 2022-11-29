import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { Modal } from '../Modal'

export const useDashboadVideoModalStore = createStore(
  combine(
    {
      isModalVisible: false,
    },
    (set, get) => ({
      toggleDashboadVideoModal: () => set(() => ({ isModalVisible: !get().isModalVisible })),
    })
  )
)

export const DashboadVideoModal = () => {
  const { isModalVisible, toggleDashboadVideoModal } = useDashboadVideoModalStore()

  return (
    <>
      {isModalVisible && (
        <Modal title="Dashboard Overview" className="w-8/12" onClose={toggleDashboadVideoModal}>
          <video className="w-full rounded-xl" loop autoPlay>
            <source src="/videos/indy_dashboard_overview.mp4" />
          </video>
        </Modal>
      )}
    </>
  )
}
