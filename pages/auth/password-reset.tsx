import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import {
  computePasswordStrength,
  PasswordStrengthMeter,
} from '../../components/Auth/PasswordStrengthMeter.component'
import Button from '../../components/Common/Button.component'
import FloppyDiskIcon from '../../components/Common/Icons/FloppyDisk.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'
import { PasswordResetForm } from '../../types/PasswordResetForm.type'

const PasswordReset: NextPageWithLayout = () => {
  const { query, replace } = useRouter()
  const [passwordStrength, setPasswordStrength] = useState(0)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const formInitialValues: PasswordResetForm = {
    password: '',
    passwordConfirmation: '',
    token: query.token?.toString(),
    email: query.email?.toString(),
  }

  const validateForm = ({ password }: { password: string }) => updatePasswordStrength(password)

  const submitForm = async (
    values: PasswordResetForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.put('/reset-password', values)

    if (status === 200) {
      replace('/auth/login')
    } else {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Daily Press - Create New Password</title>
      </Head>
      <Formik initialValues={formInitialValues} onSubmit={submitForm} validate={validateForm}>
        {({ isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <TextInput
              type="password"
              name="password"
              Icon={LockIcon}
              placeholder="Enter new password"
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
              name="passwordConfirmation"
              Icon={LockIcon}
              placeholder="Confirm new password"
              disableAutoComplete
              className="mb-8"
            />
            <Button
              type="submit"
              ariaLabel="Save New Password"
              disabled={isSubmitting}
              className="mb-5 max-w-75"
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

PasswordReset.getLayout = (page: ReactElement) => (
  <AuthLayout
    title="Create new password"
    subtitle="Setup your new password"
    needsAuth
    pageName="PasswordReset"
  >
    {page}
  </AuthLayout>
)

export default PasswordReset
