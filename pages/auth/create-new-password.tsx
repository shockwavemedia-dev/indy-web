import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement } from 'react'
import { PasswordStrengthMeter } from '../../components/Auth/Auth.component'
import Button from '../../components/Common/Button.component'
import FloppyDiskIcon from '../../components/Common/Icons/FloppyDiskIcon'
import LockIcon from '../../components/Common/Icons/LockIcon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth/Auth.layout'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Daily Press - Create New Password</title>
      </Head>
      <Formik
        initialValues={{ email: '', password: '', 'password-confirm': '' }}
        onSubmit={() => {}}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex w-full flex-col items-center">
              <div className="mb-[8px] w-full">
                <TextInput
                  type="password"
                  name="password"
                  Icon={LockIcon}
                  label="Password"
                  placeholder="Enter Password"
                  disableAutoComplete
                />
              </div>
              <div className="mr-auto mb-[8px]">
                <PasswordStrengthMeter strength={0} />
              </div>
              <div className="mb-[18px] w-full">
                <div className="word select-none font-inter text-[10px] font-normal text-darksilver">
                  Should be at least 8 symbols and contain one small and one big character,
                  <br />
                  special character and number
                </div>
              </div>
              <div className="mb-[32px] w-full">
                <TextInput
                  type="password"
                  name="password-confirm"
                  Icon={LockIcon}
                  label="Confirm Password"
                  placeholder="Enter Password"
                  disableAutoComplete
                />
              </div>
              <div className="mb-[20px] flex w-[312px]">
                <Button type="submit" name="login" isSubmitting={isSubmitting}>
                  <FloppyDiskIcon />
                  <span>Save New Password</span>
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
    <AuthLayout title="Password reset" subtitle="Setup your new password" className="w-[570px]">
      {page}
    </AuthLayout>
  )
}

export default Page
