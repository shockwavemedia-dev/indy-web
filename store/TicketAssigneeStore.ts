import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { TicketAssignee } from '../types/TicketAssignee.type'

export const useTicketAssigneeStore = createStore(
  combine(
    {
      activeTicketAssignee: <TicketAssignee>{},
      isEditTicketAssigneeModalVisible: false,
      isDeleteTicketAssigneeModalVisible: false,
      isViewTicketAssigneeModalVisible: false,
    },
    (set, get) => ({
      setActiveTicketAssignee: (ticketAssignee: TicketAssignee) =>
        set(() => ({ activeTicketAssignee: ticketAssignee })),
      toggleEditTicketAssigneeModal: () =>
        set(() => ({ isEditTicketAssigneeModalVisible: !get().isEditTicketAssigneeModalVisible })),
      toggleDeleteTicketAssigneeModal: () =>
        set(() => ({
          isDeleteTicketAssigneeModalVisible: !get().isDeleteTicketAssigneeModalVisible,
        })),
      toggleViewTicketAssigneeModal: () =>
        set(() => ({ isViewTicketAssigneeModalVisible: !get().isViewTicketAssigneeModalVisible })),
    })
  )
)
