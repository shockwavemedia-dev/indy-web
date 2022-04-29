import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { CreateLinkForm } from '../types/forms/CreateLinkForm.type'

export const useCreateLinkModalStore = createStore(
  combine(
    {
      linkText: '',
      isModalVisible: false,
      createLink: (_values: CreateLinkForm) => {},
    },
    (set, get) => ({
      setLinkText: (linkText: string) => set(() => ({ linkText })),
      toggleModal: () => set(() => ({ isModalVisible: !get().isModalVisible })),
      setCreateLink: (createLink: (values: CreateLinkForm) => void) => set(() => ({ createLink })),
    })
  )
)
