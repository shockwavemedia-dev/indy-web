import axios from 'axios'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { UploadProfileFormSchema } from '../../schemas/UploadProfileFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { User } from '../../types/User.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { Card } from '../Card'
import { FileDropZone } from '../FileDropZone'
import { Modal } from '../Modal'

export const useUploadProfileModal = createStore(
  combine(
    {
      user: undefined as User | undefined,
    },
    (set) => ({
      toggleUploadProfileModal: (user?: User) => set(() => ({ user })),
    })
  )
)

export const UploadProfileModal = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const user = useUploadProfileModal((state) => state.user)
  const toggleUploadProfileModal = useUploadProfileModal((state) => state.toggleUploadProfileModal)

  if (!user) return null

  return (
    <Modal title="Upload Profile Photo" onClose={toggleUploadProfileModal}>
      <Formik
        validationSchema={UploadProfileFormSchema}
        initialValues={{
          profile_photo: null,
          _method: 'PUT',
        }}
        onSubmit={async (values) => {
          try {
            const { status } = await axios.post(
              `/v1/users/${user.id}`,
              objectWithFileToFormData({
                ...values,
                _method: 'PUT',
              })
            )

            if (status === 200) {
              setTimeout(() => {
                queryClient.invalidateQueries('users')
              }, 3500)
              toggleUploadProfileModal()
              showToast({
                type: 'success',
                message: 'Uploaded Profile Photo Success!',
              })
            }
          } catch (e) {
            showToast({
              type: 'error',
              message: get422And400ResponseError(e),
            })
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex max-h-130 w-175 flex-col space-y-5 overflow-y-auto">
            <Card className="h-fit w-full">
              <div className="mb-8">
                <FileDropZone
                  label=""
                  name="profile_photo"
                  accept={['.jpeg', '.png', '.jpg']}
                  maxSize={5}
                  mimeType="image/png"
                  className="mb-8"
                />
              </div>
              <div className="flex space-x-5">
                <Button
                  ariaLabel="Cancel"
                  onClick={() => toggleUploadProfileModal()}
                  type="button"
                  light
                >
                  Cancel
                </Button>
                <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
