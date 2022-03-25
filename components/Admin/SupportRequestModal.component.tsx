import { Form, Formik } from 'formik'
import { MouseEventHandler } from 'react'
import { SupportRequestForm } from '../../interfaces/SupportRequestForm.interface'
import Button from '../Common/Button.component'
import EditIcon from '../Common/Icons/Edit.icon'
import PencilIcon from '../Common/Icons/Pencil.icon'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'

const SupportRequestModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  const formInitialValues: SupportRequestForm = {
    department: '',
    message: '',
  }

  return (
    <>
      {isVisible && (
        <Modal title="Support Request" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={() => {}}>
            {({ isSubmitting }) => (
              <Form>
                <div className="flex w-140 flex-col">
                  <div className="mb-6">
                    <TextInput
                      Icon={EditIcon}
                      placeholder="Select Department"
                      name="department"
                      disableAutoComplete
                    />
                  </div>
                  <div className="mb-6">
                    <TextAreaInput Icon={PencilIcon} placeholder="Enter Message" name="message" />
                  </div>
                  <div className="flex space-x-3">
                    <Button ariaLabel="Cancel" light onClick={onClose}>
                      Cancel
                    </Button>
                    <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </>
  )
}

export default SupportRequestModal
