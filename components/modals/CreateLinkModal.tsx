import { Form, Formik } from 'formik'
import { CreateLinkFormSchema } from '../../schemas/CreateLinkFormSchema'
import { useCreateLinkModalStore } from '../../store/CreateLinkModalStore'
import { CreateLinkForm } from '../../types/forms/CreateLinkForm.type'
import { Button } from '../Button'
import { EditIcon } from '../icons/EditIcon'
import { Modal } from '../Modal'
import { TextInput } from '../TextInput'

export const CreateLinkModal = () => {
  const { isModalVisible, toggleModal, createLink, linkText } = useCreateLinkModalStore()

  const submitForm = (values: CreateLinkForm) => {
    createLink(values)
    toggleModal()
  }

  return (
    <>
      {isModalVisible && (
        <Modal title="Create Link" onClose={toggleModal}>
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
