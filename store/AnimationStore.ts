import createStore from 'zustand'
import { combine } from 'zustand/middleware'

export const useAnimationStore = createStore(
  combine(
    {
      activeAnimation: <Animation>{},
      isEditAnimationModalVisible: false,
      isDeleteAnimationModalVisible: false,
    },
    (set, get) => ({
      setActiveAnimation: (animation: Animation) => set(() => ({ activeAnimation: animation })),
      toggleEditAnimationModal: () =>
        set(() => ({ isEditAnimationModalVisible: !get().isEditAnimationModalVisible })),
      toggleDeleteAnimationModal: () =>
        set(() => ({
          isDeleteAnimationModalVisible: !get().isDeleteAnimationModalVisible,
        })),
    })
  )
)
