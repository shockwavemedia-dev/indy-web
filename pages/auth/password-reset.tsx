import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import PasswordStrengthMeter from '../../components/Auth/PasswordStrengthMeter.component'
import Button from '../../components/Common/Button.component'
import FloppyDiskIcon from '../../components/Common/Icons/FloppyDisk.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import { CreateNewPasswordForm } from '../../interfaces/CreateNewPasswordForm.interface'
import AuthLayout from '../../layouts/Auth.layout'
import { usePasswordStrengthStore } from '../../stores/PasswordStrengthStore'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const CreateNewPassword: NextPageWithLayout = () => {
  const { passwordStrength, computePasswordStrength } = usePasswordStrengthStore()

  useEffect(() => computePasswordStrength(''), [])

  const formInitialValues: CreateNewPasswordForm = {
    password: '',
    passwordConfirm: '',
  }

  const validateForm = ({ password }: { password: string }) => computePasswordStrength(password)

  return (
    <>
      <Head>
        <title>Daily Press - Create New Password</title>
      </Head>
      <Formik initialValues={formInitialValues} onSubmit={() => {}} validate={validateForm}>
        {({ isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <TextInput
              type="password"
              name="password"
              Icon={LockIcon}
              placeholder="Enter Password"
              disableAutoComplete
              className="mb-3"
            />
            <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
            <div className="mr-auto mb-5 font-urbanist text-xxs font-medium text-metallic-silver">
              Should be at least 8 symbols and contain one small and one big character, special
              <br />
              character and number
            </div>
            <TextInput
              type="password"
              name="passwordConfirm"
              Icon={LockIcon}
              placeholder="Enter Password"
              disableAutoComplete
              className="mb-8"
            />
            <Button
              type="submit"
              ariaLabel="Save New Password"
              disabled={isSubmitting}
              className="mb-5 w-75"
            >
              <FloppyDiskIcon className="stroke-white" />
              <div>Save New Password</div>
            </Button>
            <Link href="/auth/login" className="text-sm font-medium text-metallic-silver">
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </>
  )
}

CreateNewPassword.getLayout = (page: ReactElement) => (
  <AuthLayout title="Create new password" subtitle="Setup your new password">
    {page}
  </AuthLayout>
)

export default CreateNewPassword
