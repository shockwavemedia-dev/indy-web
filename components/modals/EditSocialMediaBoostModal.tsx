import axios from 'axios'
import { FieldArray, Form, Formik } from 'formik'
import { ChangeEvent } from 'react'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { EditSocialMediaBoostFormScheme } from '../../schemas/EditSocialMediaBoostFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { EditSocialMediaBoostForm } from '../../types/forms/EditSocialMediaBoostForm.type'
import { SocialMedia } from '../../types/SocialMedia.type'
import { Button } from '../Button'
import { DollarIcon } from '../icons/DollarIcon'
import { FloppyDiskIcon } from '../icons/FloppyDiskIcon'
import { Modal } from '../Modal'

export const useEditSocialMediaBoostModal = createStore(
  combine(
    {
      socialMedia: undefined as SocialMedia | undefined,
    },
    (set) => ({
      toggleEditSocialMediaBoostModal: (socialMedia?: SocialMedia) => set(() => ({ socialMedia })),
    })
  )
)

export const EditSocialMediaBoostModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const socialMedia = useEditSocialMediaBoostModal((state) => state.socialMedia)

  const toggleEditSocialMediaBoostModal = useEditSocialMediaBoostModal(
    (state) => state.toggleEditSocialMediaBoostModal
  )

  const submitForm = async (values: EditSocialMediaBoostForm) => {
    try {
      const { status } = await axios.put(
        `/v1/social-media/${values.socialMediaId}/boost-update`,
        values
      )

      if (status === 200) {
        queryClient.invalidateQueries('socialMedias')
        toggleEditSocialMediaBoostModal()
        showToast({
          type: 'success',
          message: 'Social Media Boost Updated',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
    }
  }

  if (!socialMedia) return null

  return (
    <Modal
      title={!socialMedia.boostedChannels ? 'Boost Social Media' : 'Update Social Media Boost'}
      onClose={toggleEditSocialMediaBoostModal}
    >
      <Formik
        validationSchema={EditSocialMediaBoostFormScheme}
        initialValues={{
          socialMediaId: socialMedia.id,
          extras: [{ name: '', quantity: 0 }],
        }}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-140 flex-col">
            <div className="mb-8 flex w-140 flex-col">
              <FieldArray
                name="extras"
                render={(arrayHelpers) => (
                  <div className="mb-6 grid grid-cols-2 content-start gap-6">
                    {socialMedia.boostedChannels &&
                      socialMedia.boostedChannels.map((channel, index) => (
                        <>
                          <div>{channel.name}</div>
                          <div>
                            <DollarIcon className="left-84 pointer-events-none absolute -mt-1 h-8 w-8 stroke-jungle-green" />
                            <input
                              type="text"
                              className="-mt-3 h-12.5 w-full rounded-xl px-8 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
                              placeholder="Enter Amount"
                              defaultValue={
                                channel.quantity !== undefined && channel.quantity !== null
                                  ? Number(channel.quantity).toLocaleString('en')
                                  : 0
                              }
                              onChange={({
                                currentTarget: { value },
                              }: ChangeEvent<HTMLInputElement>) =>
                                arrayHelpers.replace(index, {
                                  name: channel.name,
                                  quantity: value,
                                })
                              }
                            />
                          </div>
                        </>
                      ))}
                    {!socialMedia.boostedChannels &&
                      socialMedia.channels.map((channel, index) => (
                        <>
                          <div>{channel}</div>
                          <div>
                            <DollarIcon className="left-84 pointer-events-none absolute -mt-1 h-8 w-8 stroke-jungle-green" />
                            <input
                              type="text"
                              className="-mt-3 h-12.5 w-full rounded-xl px-8 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
                              placeholder="Enter Amount"
                              defaultValue={0}
                              onChange={({
                                currentTarget: { value },
                              }: ChangeEvent<HTMLInputElement>) =>
                                arrayHelpers.replace(index, {
                                  name: channel,
                                  quantity: value,
                                })
                              }
                            />
                          </div>
                        </>
                      ))}
                  </div>
                )}
              ></FieldArray>
              <div className="flex space-x-5">
                <Button
                  ariaLabel="Cancel"
                  onClick={() => toggleEditSocialMediaBoostModal()}
                  type="button"
                  light
                >
                  Cancel
                </Button>
                <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                  <FloppyDiskIcon className="stroke-white" />
                  <div>Save</div>
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
