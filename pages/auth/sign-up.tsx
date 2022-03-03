import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import { PasswordStrengthMeter } from '../../components/Auth/Auth.component'
import Button from '../../components/Common/Button.component'
import Checkbox from '../../components/Common/Checkbox.component'
import BriefcaseIcon from '../../components/Common/Icons/BriefcaseIcon'
import CaretRightIcon from '../../components/Common/Icons/CaretRightIcon'
import EmailIcon from '../../components/Common/Icons/EmailIcon'
import LockIcon from '../../components/Common/Icons/LockIcon'
import UserIcon from '../../components/Common/Icons/UserIcon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth/Auth.layout'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Daily Press - Sign Up</title>
      </Head>
      <Formik
        initialValues={{
          'full-name': '',
          'company-name': '',
          email: '',
          password: '',
          'password-confirm': '',
          'remember-me': false,
        }}
        onSubmit={() => {}}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex w-full flex-col items-center">
              <div className="mb-[18px] flex w-full space-x-[12px]">
                <TextInput
                  type="text"
                  name="full-name"
                  Icon={UserIcon}
                  label="Full Name"
                  placeholder="Enter Full Name"
                />
                <TextInput
                  type="text"
                  name="company-name"
                  Icon={BriefcaseIcon}
                  label="Company Name"
                  placeholder="Enter Company Name"
                />
              </div>
              <div className="mb-[18px] w-full">
                <TextInput
                  type="email"
                  name="email"
                  Icon={EmailIcon}
                  label="Email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-[8px] flex w-full space-x-[12px]">
                <TextInput
                  type="password"
                  name="password"
                  Icon={LockIcon}
                  label="Password"
                  placeholder="Enter Password"
                  disableAutoComplete
                />
                <TextInput
                  type="password"
                  name="password-confirm"
                  Icon={LockIcon}
                  label="Password"
                  placeholder="Enter Password"
                  disableAutoComplete
                />
              </div>
              <div className="mr-auto mb-[8px] w-[50%]">
                <PasswordStrengthMeter strength={0} />
              </div>
              <div className="mr-auto mb-[24px]">
                <div className="word select-none font-inter text-[10px] font-normal text-darksilver">
                  Should be at least 8 symbols and contain
                  <br />
                  one small and one big character, special
                  <br />
                  character and number
                </div>
              </div>
              <div className="mr-auto mb-[32px]">
                <Checkbox name="remember-me" label="Remember me" />
              </div>
              <div className="mb-[24px] flex w-[312px]">
                <Button type="submit" name="sign-up" isSubmitting={isSubmitting}>
                  <span>Sign Up</span>
                  <CaretRightIcon />
                </Button>
              </div>
              <div className="flex select-none items-center space-x-[6px]">
                <div className="font-inter text-[14px] font-normal text-davysgrey">
                  Already have an account?
                </div>
                <Link href="/auth/login">Login</Link>
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
      subtitle="Please sign up and start the adventure"
      className="w-[652px]"
    >
      {page}
    </AuthLayout>
  )
}

export default Page
