import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { SocialMedia } from '../types/SocialMedia.type'

export const useSocialMediaStore = createStore(
  combine(
    {
      activeSocialMedia: <SocialMedia>{},
      isCreateSocialMediaModalVisible: false,
      isEditSocialMediaModalVisible: true,
      isDeleteSocialMediaModalVisible: false,
      postDate: null as unknown as Date | null,
    },
    (set, get) => ({
      setActiveSocialMedia: (socialMedia: SocialMedia) =>
        set(() => ({ activeSocialMedia: socialMedia })),
      toggleCreateSocialMediaModal: () =>
        set(() => ({ isCreateSocialMediaModalVisible: !get().isCreateSocialMediaModalVisible })),
      setPostDate: (postDate: Date | null) => set(() => ({ postDate })),
      toggleEditSocialMediaModal: () =>
        set(() => ({ isEditSocialMediaModalVisible: !get().isEditSocialMediaModalVisible })),
      toggleDeleteSocialMediaModal: () =>
        set(() => ({
          isDeleteSocialMediaModalVisible: !get().isDeleteSocialMediaModalVisible,
        })),
    })
  )
)
