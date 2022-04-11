import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import {
  computePasswordStrength,
  PasswordStrengthMeter,
} from '../../components/Auth/PasswordStrengthMeter.component'
import Button from '../../components/Common/Button.component'
import Checkbox from '../../components/Common/Checkbox.component'
import BriefcaseIcon from '../../components/Common/Icons/Briefcase.icon'
import CaretIcon from '../../components/Common/Icons/Caret.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import UserIcon from '../../components/Common/Icons/User.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth.layout'
import { SignUpFormSchema } from '../../schemas/SignUpFormSchema'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'
import { SignUpForm } from '../../types/SignUpForm.type'

const SignUp: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const [passwordStrength, setPasswordStrength] = useState(0)

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const formInitialValues: SignUpForm = {
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  const submitForm = async (
    signUpFormValues: SignUpForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const { status } = await axios.post('/signup/client-lead', signUpFormValues)

    if (status === 200) {
      replace('/auth/login')
    } else {
      setSubmitting(false)
    }
  }

  const validateForm = ({ password }: { password: string }) => updatePasswordStrength(password)

  return (
    <>
      <Head>
        <title>Daily Press - Sign Up</title>
      </Head>
      <Formik
        validationSchema={SignUpFormSchema}
        initialValues={formInitialValues}
        onSubmit={submitForm}
        validate={validateForm}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex w-130 flex-col items-center">
            <div className="mb-5 flex w-full space-x-5">
              <TextInput
                type="text"
                name="fullName"
                Icon={UserIcon}
                placeholder="Enter full name"
                disableAutoComplete
              />
              <TextInput
                type="text"
                name="companyName"
                Icon={BriefcaseIcon}
                placeholder="Enter company name"
                disableAutoComplete
              />
            </div>
            <TextInput
              type="email"
              name="email"
              Icon={EmailIcon}
              placeholder="Enter email"
              className="mb-5"
              disableAutoComplete
            />
            <div className="mb-3 flex w-full space-x-5">
              <TextInput
                type="password"
                name="password"
                Icon={LockIcon}
                placeholder="Enter password"
                disableAutoComplete
              />
              <TextInput
                type="password"
                name="passwordConfirmation"
                Icon={LockIcon}
                placeholder="Confirm password"
                disableAutoComplete
              />
            </div>
            <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
            <div className="mr-auto mb-3 font-urbanist text-xxs font-medium text-metallic-silver">
              Should be at least 8 symbols and contain one small
              <br />
              and one big character, special character and number
            </div>
            <Checkbox name="rememberMe" label="Remember me" className="mr-auto mb-8" />
            <Button
              type="submit"
              ariaLabel="Sign Up"
              disabled={isSubmitting}
              className="mb-5 max-w-75"
            >
              <div>Sign Up</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <div className="font-urbanist text-sm font-medium text-metallic-silver">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-sm font-semibold text-jungle-green">
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

SignUp.getLayout = (page: ReactElement) => (
  <AuthLayout title="Welcome to Daily Press" subtitle="Please sign up and start the adventure">
    {page}
  </AuthLayout>
)

export default SignUp
