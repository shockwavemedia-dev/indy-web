import { Form, Formik } from 'formik'
import { MouseEventHandler } from 'react'
import { SupportRequestForm } from '../../interfaces/SupportRequestForm.interface'
import Button from '../Common/Button.component'
import EditIcon from '../Common/Icons/Edit.icon'
import Select from '../Common/Select.component'
import TextAreaInput from '../Common/TextAreaInput.component'
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
            {({ setFieldValue, isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <Select
                  name="department"
                  Icon={EditIcon}
                  placeholder="Select department"
                  options={[]}
                  setFieldValue={setFieldValue}
                  className="mb-5"
                />
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter Message"
                  name="message"
                  className="mb-8"
                />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" light onClick={onClose}>
                    Cancel
                  </Button>
                  <Button ariaLabel="Submit" type="submit" disabled={isSubmitting}>
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

export default SupportRequestModal
