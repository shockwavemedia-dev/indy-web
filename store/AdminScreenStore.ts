import createStore from 'zustand'
import { combine } from 'zustand/middleware'

export const useAdminScreenStore = createStore(
  combine(
    {
      activeAdminScreen: <Screen>{},
      isCreateAdminScreenModalVisible: false,
      isEditAdminScreenModalVisible: false,
      isDeleteAdminScreenModalVisible: false,
    },
    (set, get) => ({
      setActiveAdminScreen: (adminScreen: Screen) =>
        set(() => ({ activeAdminScreen: adminScreen })),
      toggleCreateAdminScreenModal: () =>
        set(() => ({ isCreateAdminScreenModalVisible: !get().isCreateAdminScreenModalVisible })),
      toggleEditAdminScreenModal: () =>
        set(() => ({ isEditAdminScreenModalVisible: !get().isEditAdminScreenModalVisible })),
      toggleDeleteAdminScreenModal: () =>
        set(() => ({
          isDeleteAdminScreenModalVisible: !get().isDeleteAdminScreenModalVisible,
        })),
    })
  )
)
