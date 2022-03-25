import { Form, Formik } from 'formik'
import { MouseEventHandler } from 'react'
import { NewProjectBriefForm } from '../../interfaces/NewProjectBriefForm.interface'
import Button from '../Common/Button.component'
import FileInput from '../Common/FileInput.component'
import CalendarIcon from '../Common/Icons/Calendar.icon'
import EditIcon from '../Common/Icons/Edit.icon'
import TextAreaInput from '../Common/TextAreaInput.component'
import TextInput from '../Common/TextInput.component'
import Modal from './Modal.component'
import SelectService from './SelectService.component'

const NewProjectBriefModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
}) => {
  const formInitialValues: NewProjectBriefForm = {
    services: [],
    date: '',
    briefName: '',
    content: '',
    assets: undefined,
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Project Brief" onClose={onClose}>
          <Formik initialValues={formInitialValues} onSubmit={() => {}}>
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <div className="mb-5 flex space-x-5">
                  <SelectService setFieldValue={setFieldValue} />
                  <TextInput
                    Icon={CalendarIcon}
                    placeholder="Enter date"
                    name="date"
                    disableAutoComplete
                  />
                </div>
                <TextInput
                  Icon={EditIcon}
                  placeholder="Enter brief name"
                  name="briefName"
                  disableAutoComplete
                  className="mb-5"
                />
                <TextAreaInput
                  Icon={EditIcon}
                  placeholder="Enter content"
                  name="content"
                  className="mb-5"
                />
                <FileInput
                  label="Upload Assets"
                  name="assets"
                  setFieldValue={setFieldValue}
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

export default NewProjectBriefModal
