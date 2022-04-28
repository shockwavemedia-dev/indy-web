import { Form, Formik } from 'formik'
import createStore from 'zustand'
import { combine } from 'zustand/middleware'
import { CreateLinkFormSchema } from '../../../schemas/CreateLinkFormSchema'
import { CreateLinkForm } from '../../../types/forms/CreateLinkForm.type'
import Button from '../../common/Button'
import EditIcon from '../../common/icons/EditIcon'
import TextInput from '../../common/TextInput'
import Modal from '../Modal'

const CreateLinkModal = () => {
  const { isModalVisible, toggleModal, createLink, linkText } = useCreateLinkModalStore()

  const submitForm = async (values: CreateLinkForm) => {
    createLink(values)
    toggleModal()
  }

  return (
    <>
      {isModalVisible && (
        <Modal title="Create Link" onClose={toggleModal} className="z-20">
          <Formik
            validationSchema={CreateLinkFormSchema}
            initialValues={{
              text: linkText,
              link: '',
            }}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-96 flex-col">
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Text"
                  name="text"
                  className="mb-5"
                />
                <TextInput
                  type="url"
                  Icon={EditIcon}
                  placeholder="Enter Link"
                  name="link"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={toggleModal} type="button" light>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" disabled={isSubmitting} type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}

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

export default CreateLinkModal
