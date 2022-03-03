import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../../components/Common/Button.component'
import CaretRightIcon from '../../components/Common/Icons/CaretRightIcon'
import EmailIcon from '../../components/Common/Icons/EmailIcon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth/Auth.layout'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
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
                <Button type="submit" name="login" isSubmitting={isSubmitting}>
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

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we will send you\none-time link to reset password"
      className="w-[570px]"
    >
      {page}
    </AuthLayout>
  )
}

export default Page
