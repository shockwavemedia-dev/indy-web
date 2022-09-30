import axios from 'axios'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { CreatePrinterSchema } from '../../schemas/CreatePrinterFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { CreatePrinterForm } from '../../types/forms/CreatePrinterForm.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'
import { objectWithFileToFormData } from '../../utils/FormHelpers'
import { Button } from '../Button'
import { FileDropZone } from '../FileDropZone'
import { EditIcon } from '../icons/EditIcon'
import { LockIcon } from '../icons/LockIcon'
import { Modal } from '../Modal'
import { PasswordInput } from '../PasswordInput'
import { computePasswordStrength, PasswordStrengthMeter } from '../PasswordStrengthMeter'
import { RichTextInput } from '../RichTextInput'
import { TextInput } from '../TextInput'

export const CreatePrinterModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()

  const [passwordStrength, setPasswordStrength] = useState(0)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const submitForm = async (values: CreatePrinterForm) => {
    try {
      const { status } = await axios.post('/v1/printers', objectWithFileToFormData(values))

      if (status === 200) {
        queryClient.invalidateQueries('printers')
        onClose()
        showToast({
          type: 'success',
          message: 'New Printer successfully created!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get422And400ResponseError(e),
      })
    }
  }

  const validateForm = ({ password }: { password: string }) => updatePasswordStrength(password)

  return (
    <>
      {isVisible && (
        <Modal title="New Printer" onClose={onClose}>
          <Formik
            validationSchema={CreatePrinterSchema}
            initialValues={{
              companyName: '',
              email: '',
              password: '',
              passwordConfirmation: '',
              logo: null,
              contactName: null,
              phone: null,
              description: null,
            }}
            validate={validateForm}
            onSubmit={submitForm}
          >
            {({ isSubmitting }) => (
              <Form className="flex w-140 flex-col">
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Company Name"
                  name="companyName"
                  className="mb-5"
                />
                <RichTextInput
                  Icon={EditIcon}
                  placeholder="Enter Description"
                  name="description"
                  className="mb-5"
                />
                <FileDropZone
                  label="Upload Logo"
                  name="file"
                  className="mb-5"
                  maxSize={250}
                  mimeType="image/gif"
                  accept={['.gif', '.jpeg', '.png', '.jpg']}
                />
                <TextInput
                  type="text"
                  Icon={EditIcon}
                  placeholder="Enter Email"
                  name="email"
                  className="mb-5"
                />
                <div className="mb-5 flex space-x-5">
                  <TextInput
                    name="contactName"
                    type="text"
                    Icon={EditIcon}
                    placeholder="Enter Contact Name"
                  />
                  <TextInput type="text" Icon={EditIcon} placeholder="Enter Phone" name="phone" />
                </div>
                <div className="mb-5 flex space-x-5">
                  <PasswordInput name="password" Icon={LockIcon} placeholder="Enter password" />
                  <PasswordInput
                    name="passwordConfirmation"
                    Icon={LockIcon}
                    placeholder="Confirm password"
                  />
                </div>
                <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
                <div className="mr-auto mb-8 text-xxs font-medium text-metallic-silver">
                  Should be at least 8 symbols and contain one small
                  <br />
                  and one big character, special character and number
                </div>
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
