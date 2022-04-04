import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Button from '../../components/Common/Button.component'
import CaretIcon from '../../components/Common/Icons/Caret.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import { ForgotPasswordForm } from '../../interfaces/ForgotPasswordForm.interface'
import AuthLayout from '../../layouts/Auth.layout'
import { ForgotPasswordFormSchema } from '../../schemas/ForgotPasswordFormSchema'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const ForgotPassword: NextPageWithLayout = () => {
  const { replace } = useRouter()

  const formInitialValues: ForgotPasswordForm = {
    email: '',
  }

  const submitForm = async (
    values: ForgotPasswordForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/forgot-password', values)

    if (status === 200) {
      replace('/auth/login')
    } else {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Daily Press - Forgot Password</title>
      </Head>
      <Formik
        validationSchema={ForgotPasswordFormSchema}
        initialValues={formInitialValues}
        onSubmit={submitForm}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <TextInput
              type="email"
              name="email"
              Icon={EmailIcon}
              placeholder="Enter email"
              errorMessage={errors.email}
              touched={touched.email}
              className="mb-8"
              disableAutoComplete
            />
            <Button
              type="submit"
              ariaLabel="Restore Password"
              disabled={isSubmitting}
              className="mb-5 max-w-75"
            >
              <div>Restore Password</div>
              <CaretIcon className="rotate-90 stroke-white" />
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
