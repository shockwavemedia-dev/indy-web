import { Form, Formik } from 'formik'
import { NewProjectBriefForm } from '../../interfaces/NewProjectBriefForm.interface'
import { NewProjectBriefFormSchema } from '../../schemas/NewProjectBriefFormSchema'
import Button from '../Common/Button.component'
import DateInput from '../Common/DateInput.component'
import FileInput from '../Common/FileInput.component'
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
  onClose: () => void
}) => {
  const formInitialValues: NewProjectBriefForm = {
    services: [],
    date: null,
    briefName: '',
    content: '',
    assets: null,
  }

  return (
    <>
      {isVisible && (
        <Modal title="New Project Brief" onClose={onClose}>
          <Formik
            validationSchema={NewProjectBriefFormSchema}
            initialValues={formInitialValues}
            onSubmit={() => {}}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex w-140 flex-col">
                <div className="mb-5 flex space-x-5">
                  <SelectService setFieldValue={setFieldValue} />
                  <DateInput name="date" placeholder="Enter date" setFieldValue={setFieldValue} />
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
