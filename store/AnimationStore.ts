import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { Animation } from '../types/Animation.type'

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
