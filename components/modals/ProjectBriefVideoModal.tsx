import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { Modal } from '../Modal'

export const useProjectBriefVideoModalStore = createStore(
  combine(
    {
      isModalVisible: false,
    },
    (set, get) => ({
      toggleProjectBriefVideoModal: () => set(() => ({ isModalVisible: !get().isModalVisible })),
    })
  )
)

export const ProjectBriefVideoModal = () => {
  const { isModalVisible, toggleProjectBriefVideoModal } = useProjectBriefVideoModalStore()

  return (
    <>
      {isModalVisible && (
        <Modal
          title="How to Submit a Project Landscape"
          className="w-8/12"
          onClose={toggleProjectBriefVideoModal}
        >
          <video className="w-full rounded-xl" controls autoPlay>
            <source src="/videos/indy_how_to_submit_a_project_landscape.mp4" />
          </video>
        </Modal>
      )}
    </>
  )
}
