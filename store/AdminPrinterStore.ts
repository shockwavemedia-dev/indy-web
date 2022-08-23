import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { Printer } from '../types/Printer.type'

export const useAdminPrinterStore = createStore(
  combine(
    {
      activeAdminPrinter: <Printer>{},
      isCreateAdminPrinterModalVisible: false,
      isEditAdminPrinterModalVisible: false,
      isDeleteAdminPrinterModalVisible: false,
    },
    (set, get) => ({
      setActiveAdminPrinter: (adminPrinter: Printer) =>
        set(() => ({ activeAdminPrinter: adminPrinter })),
      toggleCreateAdminPrinterModal: () =>
        set(() => ({ isCreateAdminPrinterModalVisible: !get().isCreateAdminPrinterModalVisible })),
      toggleEditAdminPrinterModal: () =>
        set(() => ({ isEditAdminPrinterModalVisible: !get().isEditAdminPrinterModalVisible })),
      toggleDeleteAdminPrinterModal: () =>
        set(() => ({
          isDeleteAdminPrinterModalVisible: !get().isDeleteAdminPrinterModalVisible,
        })),
    })
  )
)
