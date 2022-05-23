import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { User } from '../types/User.type'

export const useAdminUserStore = createStore(
  combine(
    {
      activeAdminUser: <User>{},
      isEditAdminUserModalVisible: false,
      isDeleteAdminUserModalVisible: false,
    },
    (set, get) => ({
      setActiveAdminUser: (adminUser: User) => set(() => ({ activeAdminUser: adminUser })),
      toggleEditAdminUserModal: () =>
        set(() => ({ isEditAdminUserModalVisible: !get().isEditAdminUserModalVisible })),
      toggleDeleteAdminUserModal: () =>
        set(() => ({
          isDeleteAdminUserModalVisible: !get().isDeleteAdminUserModalVisible,
        })),
    })
  )
)
