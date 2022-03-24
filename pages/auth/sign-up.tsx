import axios from 'axios'
import { ErrorMessage, Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import PasswordStrengthMeter from '../../components/Auth/PasswordStrengthMeter.component'
import Button from '../../components/Common/Button.component'
import Checkbox from '../../components/Common/Checkbox.component'
import BriefcaseIcon from '../../components/Common/Icons/Briefcase.icon'
import CaretIcon from '../../components/Common/Icons/Caret.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import UserIcon from '../../components/Common/Icons/User.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import { Authentication } from '../../interfaces/Authentication.interface'
import { SignUpForm } from '../../interfaces/SignUpForm.interface'
import AuthLayout from '../../layouts/Auth.layout'
import { usePasswordStrengthStore } from '../../stores/PasswordStrengthStore'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const SignUp: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { passwordStrength, computePasswordStrength } = usePasswordStrengthStore()

  useEffect(() => computePasswordStrength(''), [])

  const formInitialValues: SignUpForm = {
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rememberMe: false,
  }

  const submitForm = async (
    signUpFormValues: SignUpForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)
    // Temp Start
    // Just here to make sign up work because it needs access token
    const {
      data: { accessToken },
    } = await axios.post<Authentication>('/authenticate', {
      email: 'superadmin@dailypress.com',
      password: 'letmein',
    })
    // Temp End

    const { data } = await axios.post(
      '/v1/users/client',
      {
        email: signUpFormValues.email,
        password: signUpFormValues.password,
        birthDate: '1993/02/02',
        passwordConfirmation: signUpFormValues.passwordConfirmation,
        contactNumber: '0906 345 6123',
        firstName: 'Jake',
        lastName: 'Havakian',
        middleName: 'Something',
        gender: 'Male',
        role: 'marketing',
        clientId: 6,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    if (data) {
      const res = await signIn<'credentials'>('credentials', {
        email: signUpFormValues.email,
        password: signUpFormValues.password,
        redirect: false,
      })

      if (!res?.error && res?.status === 200 && res.ok) {
        replace('/dashboard')
      }
    }

    setSubmitting(false)
  }

  const validateForm = ({ password }: { password: string }) => computePasswordStrength(password)

  return (
    <>
      <Head>
        <title>Daily Press - Sign Up</title>
      </Head>
      <Formik initialValues={formInitialValues} onSubmit={submitForm} validate={validateForm}>
        {({ isSubmitting }) => (
          <Form className="flex w-130 flex-col items-center">
            <div className="mb-5 flex w-full space-x-5">
              <TextInput
                type="text"
                name="fullName"
                Icon={UserIcon}
                placeholder="Enter full name"
              />
              <ErrorMessage name="fullName" />
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
            <Button type="submit" ariaLabel="Sign Up" disabled={isSubmitting} className="mb-5 w-75">
              <div>Sign Up</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <div className="flex font-urbanist text-sm font-medium text-metallic-silver">
              Already have an account?&nbsp;
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
