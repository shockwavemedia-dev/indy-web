import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { Ticket } from '../types/Ticket.type'

export const useTicketStore = createStore(
  combine(
    {
      activeTicket: <Ticket>{},
      isEditTicketModalVisible: false,
      isDeleteTicketModalVisible: false,
    },
    (set, get) => ({
      setActiveTicket: (ticket: Ticket) => set(() => ({ activeTicket: ticket })),
      toggleEditTicketModal: () =>
        set(() => ({ isEditTicketModalVisible: !get().isEditTicketModalVisible })),
      toggleDeleteTicketModal: () =>
        set(() => ({ isDeleteTicketModalVisible: !get().isDeleteTicketModalVisible })),
    })
  )
)
