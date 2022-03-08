import { Form, Formik } from 'formik'
import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import PasswordStrengthMeter from '../../components/Auth/PasswordStrengthMeter.component'
import Button from '../../components/Common/Button.component'
import FloppyDiskIcon from '../../components/Common/Icons/FloppyDisk.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth.layout'
import useStore from '../../store/store'
import { NextPageWithLayout } from '../_app'

const CreateNewPassword: NextPageWithLayout = () => {
  const passwordStrength = useStore(({ strength }) => strength)
  const computePasswordStrength = useStore(({ computePasswordStrength }) => computePasswordStrength)

  useEffect(() => {
    computePasswordStrength('')
  }, [])

  return (
    <>
      <Head>
        <title>Daily Press - Create New Password</title>
      </Head>
      <Formik
        initialValues={{ password: '', passwordConfirm: '' }}
        onSubmit={() => {}}
        validate={({ password }) => computePasswordStrength(password)}
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
                <PasswordStrengthMeter strength={passwordStrength} />
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
                  name="passwordConfirm"
                  Icon={LockIcon}
                  label="Confirm Password"
                  placeholder="Enter Password"
                  disableAutoComplete
                />
              </div>
              <div className="mb-[20px] flex w-[312px]">
                <Button type="submit" ariaLabel="Save New Password" disabled={isSubmitting}>
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

CreateNewPassword.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout title="Password reset" subtitle="Setup your new password" className="w-[570px]">
      {page}
    </AuthLayout>
  )
}

export default CreateNewPassword
