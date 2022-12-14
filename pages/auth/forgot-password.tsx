import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { Button } from '../../components/Button'
import { CaretIcon } from '../../components/icons/CaretIcon'
import { EmailIcon } from '../../components/icons/EmailIcon'
import { TextInput } from '../../components/TextInput'
import AuthLayout from '../../layouts/AuthLayout'
import { ForgotPasswordFormSchema } from '../../schemas/ForgotPasswordFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { ForgotPasswordForm } from '../../types/forms/ForgotPasswordForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'
import { get422And400ResponseError } from '../../utils/ErrorHelpers'

const ForgotPasswordPage: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { showToast } = useToastStore()

  const submitForm = async (values: ForgotPasswordForm) => {
    try {
      const { status } = await axios.post('/forgot-password', values)

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
        message: get422And400ResponseError(e),
      })
    }
  }

  return (
    <>
      <Head>
        <title>Indy - Forgot Password</title>
      </Head>
      <Formik
        validationSchema={ForgotPasswordFormSchema}
        initialValues={{
          email: '',
        }}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <TextInput
              type="email"
              name="email"
              Icon={EmailIcon}
              placeholder="Enter email"
              className="mb-8"
            />
            <Button
              ariaLabel="Restore Password"
              disabled={isSubmitting}
              className="mb-5 w-75"
              type="submit"
            >
              <div>Restore Password</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <Link href="/auth/login">
              <a className=" text-sm font-medium text-metallic-silver underline-offset-1 hover:underline">
                Cancel
              </a>
            </Link>
          </Form>
        )}
      </Formik>
    </>
  )
}

ForgotPasswordPage.getLayout = (page: ReactElement) => (
  <AuthLayout
    title="Forgot password?"
    subtitle={
      <>
        Enter your email and we will send you
        <br />
        one-time link to reset password
      </>
    }
  >
    {page}
  </AuthLayout>
)

export default ForgotPasswordPage
