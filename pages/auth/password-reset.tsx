import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { Button } from '../../components/Button'
import { FloppyDiskIcon } from '../../components/icons/FloppyDiskIcon'
import { LockIcon } from '../../components/icons/LockIcon'
import { PasswordInput } from '../../components/PasswordInput'
import {
  computePasswordStrength,
  PasswordStrengthMeter,
} from '../../components/PasswordStrengthMeter'
import AuthLayout from '../../layouts/AuthLayout'
import { useToastStore } from '../../store/ToastStore'
import { PasswordResetForm } from '../../types/forms/PasswordResetForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const PasswordResetPage: NextPageWithLayout = () => {
  const { query, replace } = useRouter()
  const { showToast } = useToastStore()
  const [passwordStrength, setPasswordStrength] = useState(0)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const validateForm = ({ password }: { password: string }) => updatePasswordStrength(password)

  const submitForm = async (values: PasswordResetForm) => {
    try {
      const { status } = await axios.put('/reset-password', values)

      if (status === 200) {
        replace('/auth/login')
        showToast({
          type: 'success',
          message: 'We have e-mailed your password reset link!',
        })
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: 'Something went wrong! 😵',
      })
    }
  }

  return (
    <>
      <Head>
        <title>Indy - Create New Password</title>
      </Head>
      <Formik
        initialValues={{
          password: '',
          passwordConfirmation: '',
          token: query.token?.toString(),
          email: query.email?.toString(),
        }}
        onSubmit={submitForm}
        validate={validateForm}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <PasswordInput
              name="password"
              Icon={LockIcon}
              placeholder="Enter new password"
              className="mb-3"
            />
            <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
            <div className="mr-auto mb-5 font-urbanist text-xxs font-medium text-metallic-silver">
              Should be at least 8 symbols and contain one small and one big character, special
              <br />
              character and number
            </div>
            <PasswordInput
              name="passwordConfirmation"
              Icon={LockIcon}
              placeholder="Confirm new password"
              className="mb-8"
            />
            <Button
              ariaLabel="Save New Password"
              disabled={isSubmitting}
              className="mb-5 w-75"
              type="submit"
            >
              <FloppyDiskIcon className="stroke-white" />
              <div>Save New Password</div>
            </Button>
            <Link href="/auth/login">
              <a className="font-urbanist text-sm font-medium text-metallic-silver underline-offset-1 hover:underline">
                Cancel
              </a>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  )
}

PasswordResetPage.getLayout = (page: ReactElement) => (
  <AuthLayout title="Create new password" subtitle="Setup your new password">
    {page}
  </AuthLayout>
)

export default PasswordResetPage
