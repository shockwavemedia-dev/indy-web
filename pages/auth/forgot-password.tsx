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
          <Form className="flex w-full flex-col items-center">
            <div className="mb-8 w-full">
              <TextInput
                type="email"
                name="email"
                Icon={EmailIcon}
                label="Email"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-5 flex w-78">
              <Button type="submit" ariaLabel="Restore Password" disabled={isSubmitting}>
                <span>Restore Password</span>
                <CaretIcon className="stroke-white" />
              </Button>
            </div>
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
    className="w-142.5"
  >
    {page}
  </AuthLayout>
)

export default ForgotPassword
