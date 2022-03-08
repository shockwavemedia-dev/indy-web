import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../../components/Common/Button.component'
import CaretRightIcon from '../../components/Common/Icons/CaretRight.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../_app'

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Daily Press - Forgot Password</title>
      </Head>
      <Formik initialValues={{ email: '' }} onSubmit={() => {}}>
        {({ isSubmitting }) => {
          return (
            <Form className="flex w-full flex-col items-center">
              <div className="mb-[32px] w-full">
                <TextInput
                  type="email"
                  name="email"
                  Icon={EmailIcon}
                  label="Email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-[20px] flex w-[312px]">
                <Button type="submit" ariaLabel="Restore Password" disabled={isSubmitting}>
                  <span>Restore Password</span>
                  <CaretRightIcon />
                </Button>
              </div>
              <Link href="/auth/login">Cancel</Link>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

ForgotPassword.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout
      title="Forgot password?"
      subtitle={
        <>
          Enter your email and we will send you
          <br />
          one-time link to reset password
        </>
      }
      className="w-[570px]"
    >
      {page}
    </AuthLayout>
  )
}

export default ForgotPassword
