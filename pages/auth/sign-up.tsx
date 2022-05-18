import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import Button from '../../components/Button'
import Checkbox from '../../components/Checkbox'
import BriefcaseIcon from '../../components/icons/BriefcaseIcon'
import CaretIcon from '../../components/icons/CaretIcon'
import EmailIcon from '../../components/icons/EmailIcon'
import LockIcon from '../../components/icons/LockIcon'
import UserIcon from '../../components/icons/UserIcon'
import PasswordInput from '../../components/PasswordInput'
import {
  computePasswordStrength,
  PasswordStrengthMeter,
} from '../../components/PasswordStrengthMeter'
import TextInput from '../../components/TextInput'
import AuthLayout from '../../layouts/AuthLayout'
import { SignUpFormSchema } from '../../schemas/SignUpFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { SignUpForm } from '../../types/forms/SignUpForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const SignUp: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { showToast } = useToastStore()

  const updatePasswordStrength = (password: string) =>
    setPasswordStrength(computePasswordStrength(password))

  const submitForm = async (
    signUpFormValues: SignUpForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    try {
      const { status } = await axios.post('/signup/client-lead', signUpFormValues)

      if (status === 200) {
        replace('/auth/login')
        showToast({
          type: 'success',
          message: 'Registration completed successfully!',
        })
      }
    } catch (e) {
      setSubmitting(false)
      showToast({
        type: 'error',
        message: 'Something went wrong',
      })
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
        initialValues={{
          fullName: '',
          companyName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={submitForm}
        validate={validateForm}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-130 flex-col items-center">
            <div className="mb-5 flex w-full space-x-5">
              <TextInput
                type="text"
                name="fullName"
                Icon={UserIcon}
                placeholder="Enter full name"
              />
              <TextInput
                type="text"
                name="companyName"
                Icon={BriefcaseIcon}
                placeholder="Enter company name"
              />
            </div>
            <TextInput
              type="email"
              name="email"
              Icon={EmailIcon}
              placeholder="Enter email"
              className="mb-5"
            />
            <div className="mb-3 flex w-full space-x-5">
              <PasswordInput name="password" Icon={LockIcon} placeholder="Enter password" />
              <PasswordInput
                name="passwordConfirmation"
                Icon={LockIcon}
                placeholder="Confirm password"
              />
            </div>
            <PasswordStrengthMeter strength={passwordStrength} className="mr-auto mb-2" />
            <div className="mr-auto mb-3 font-urbanist text-xxs font-medium text-metallic-silver">
              Should be at least 8 symbols and contain one small
              <br />
              and one big character, special character and number
            </div>
            <Checkbox name="rememberMe" label="Remember me" className="mr-auto mb-8" />
            <Button ariaLabel="Sign Up" disabled={isSubmitting} className="mb-5 w-75" type="submit">
              <div>Sign Up</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <div className="font-urbanist text-sm font-medium text-metallic-silver">
              Already have an account?{' '}
              <Link href="/auth/login">
                <a className="font-urbanist text-sm font-semibold text-jungle-green underline-offset-1 hover:underline">
                  Login
                </a>
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
