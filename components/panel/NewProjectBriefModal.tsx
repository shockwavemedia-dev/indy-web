import { Form, Formik } from 'formik'
import { NewProjectBriefFormSchema } from '../../schemas/NewProjectBriefFormSchema'
import { NewProjectBriefForm } from '../../types/forms/NewProjectBriefForm.type'
import Button from '../common/Button'
import DateInput from '../common/DateInput'
import FileInput from '../common/FileInput'
import EditIcon from '../common/icons/EditIcon'
import TextAreaInput from '../common/TextAreaInput'
import TextInput from '../common/TextInput'
import Modal from './Modal'
import SelectService from './SelectService'

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
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter brief name"
                  name="briefName"
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
                  <Button ariaLabel="Submit" disabled={isSubmitting} submit>
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
