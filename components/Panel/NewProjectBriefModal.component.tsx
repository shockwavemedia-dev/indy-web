import { Form, Formik } from 'formik'
import { NewProjectBriefFormSchema } from '../../schemas/NewProjectBriefFormSchema'
import { NewProjectBriefForm } from '../../types/forms/NewProjectBriefForm.type'
import Button from '../common/Button.component'
import DateInput from '../common/DateInput.component'
import FileInput from '../common/FileInput.component'
import EditIcon from '../common/Icons/Edit.icon'
import TextAreaInput from '../common/TextAreaInput.component'
import TextInput from '../common/TextInput.component'
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
                  <SelectService name="services" setFieldValue={setFieldValue} />
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
