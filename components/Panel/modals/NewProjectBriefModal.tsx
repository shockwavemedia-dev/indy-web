import { Form, Formik } from 'formik'
import { NewProjectBriefFormSchema } from '../../../schemas/NewProjectBriefFormSchema'
import { NewProjectBriefForm } from '../../../types/forms/NewProjectBriefForm.type'
import Button from '../../Common/Button'
import DateInput from '../../Common/DateInput'
import FileInput from '../../Common/FileInput'
import EditIcon from '../../Common/icons/EditIcon'
import TextAreaInput from '../../Common/TextAreaInput'
import TextInput from '../../Common/TextInput'
import Modal from '../Modal'
import SelectService from '../SelectService'

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
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <div className="mb-5 flex space-x-5">
                  <SelectService name="services" />
                  <DateInput name="date" placeholder="Enter date" />
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
                <FileInput label="Upload Assets" name="assets" className="mb-8" />
                <div className="flex space-x-5">
                  <Button ariaLabel="Cancel" onClick={onClose} type="button" light>
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

export default NewProjectBriefModal
