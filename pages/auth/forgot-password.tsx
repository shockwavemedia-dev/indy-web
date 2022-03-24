import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../../components/Common/Button.component'
import CaretIcon from '../../components/Common/Icons/Caret.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import { ForgotPasswordForm } from '../../interfaces/ForgotPasswordForm.interface'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const ForgotPassword: NextPageWithLayout = () => {
  const formInitialValues: ForgotPasswordForm = {
    email: '',
  }

  return (
    <>
      <Head>
        <title>Daily Press - Forgot Password</title>
      </Head>
      <Formik initialValues={formInitialValues} onSubmit={() => {}}>
        {({ isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <TextInput
              type="email"
              name="email"
              Icon={EmailIcon}
              placeholder="Enter Email"
              className="mb-8"
            />
            <Button
              type="submit"
              ariaLabel="Restore Password"
              disabled={isSubmitting}
              className="mb-5 w-75"
            >
              <span>Restore Password</span>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <Link href="/auth/login">Cancel</Link>
          </Form>
        )}
      </Formik>
    </>
  )
}

ForgotPassword.getLayout = (page: ReactElement) => (
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

export default ForgotPassword
