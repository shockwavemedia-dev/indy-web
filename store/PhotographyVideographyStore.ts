import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { PhotographyVideography } from '../types/PhotographyVideography.type'

export const usePhotographyVideographyStore = createStore(
  combine(
    {
      activePhotographyVideography: <PhotographyVideography>{},
      isDeletePhotographyVideographyModalVisible: false,
    },
    (set, get) => ({
      setActivePhotographyVideography: (photographyVideography: PhotographyVideography) =>
        set(() => ({ activePhotographyVideography: photographyVideography })),
      toggleDeletePhotographyVideographyModal: () =>
        set(() => ({
          isDeletePhotographyVideographyModalVisible:
            !get().isDeletePhotographyVideographyModalVisible,
        })),
    })
  )
)
