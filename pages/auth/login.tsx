import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import Button from '../../components/Common/Button.component'
import Checkbox from '../../components/Common/Checkbox.component'
import CaretRightIcon from '../../components/Common/Icons/CaretRight.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Daily Press - Login</title>
      </Head>
      <Formik initialValues={{ email: '', password: '', rememberMe: false }} onSubmit={() => {}}>
        {({ isSubmitting }) => {
          return (
            <Form className="flex w-full flex-col items-center">
              <div className="mb-[18px] flex w-full">
                <TextInput
                  type="email"
                  name="email"
                  Icon={EmailIcon}
                  label="Email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-[32px] flex w-full">
                <TextInput
                  type="password"
                  name="password"
                  Icon={LockIcon}
                  label="Password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="mb-[32px] flex w-full justify-between">
                <Checkbox name="rememberMe" label="Remember me" />
                <Link href="/auth/forgot-password">Forgot Password?</Link>
              </div>
              <div className="mb-[24px] flex w-[312px]">
                <Button type="submit" ariaLabel="Login" isSubmitting={isSubmitting}>
                  <span>Login</span>
                  <CaretRightIcon />
                </Button>
              </div>
              <div className="flex select-none items-center space-x-[6px]">
                <div className="font-inter text-[14px] font-normal text-davysgrey">
                  {"Don't have an account?"}
                </div>
                <Link href="/auth/sign-up">Sign Up</Link>
              </div>
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
      title="Welcome to Daily Press"
      subtitle="Please log in to your account and start the adventure"
      className="w-[588px]"
    >
      {page}
    </AuthLayout>
  )
}

export default Page
