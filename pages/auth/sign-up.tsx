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
import CaretRightIcon from '../../components/Common/Icons/CaretRight.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import UserIcon from '../../components/Common/Icons/User.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import { Authentication } from '../../interfaces/Authentication.interface'
import { SignUpForm } from '../../interfaces/SignUpForm.interface'
import AuthLayout from '../../layouts/Auth.layout'
import useStore from '../../store/store'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const SignUp: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const passwordStrength = useStore(({ passwordStrength }) => passwordStrength)
  const computePasswordStrength = useStore(({ computePasswordStrength }) => computePasswordStrength)

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
          <Form className="flex w-full flex-col items-center">
            <div className="mb-[18px] flex w-full space-x-[12px]">
              <TextInput
                type="text"
                name="fullName"
                Icon={UserIcon}
                label="Full Name"
                placeholder="Enter Full Name"
              />
              <ErrorMessage name="fullName" />
              <TextInput
                type="text"
                name="companyName"
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
                name="passwordConfirmation"
                Icon={LockIcon}
                label="Password"
                placeholder="Enter Password"
                disableAutoComplete
              />
            </div>
            <div className="mr-auto mb-[8px] w-[50%]">
              <PasswordStrengthMeter strength={passwordStrength} />
            </div>
            <div className="mr-auto mb-[24px]">
              <div className="word font-inter text-[10px] font-normal text-nevada">
                Should be at least 8 symbols and contain
                <br />
                one small and one big character, special
                <br />
                character and number
              </div>
            </div>
            <div className="mr-auto mb-[32px]">
              <Checkbox name="rememberMe" label="Remember me" />
            </div>
            <div className="mb-[24px] flex w-[312px]">
              <Button type="submit" ariaLabel="Sign Up" disabled={isSubmitting}>
                <span>Sign Up</span>
                <CaretRightIcon className="stroke-white" />
              </Button>
            </div>
            <div className="flex items-center space-x-[6px]">
              <div className="font-inter text-[14px] font-normal text-emperor">
                Already have an account?
              </div>
              <Link href="/auth/login">Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

SignUp.getLayout = (page: ReactElement) => (
  <AuthLayout
    title="Welcome to Daily Press"
    subtitle="Please sign up and start the adventure"
    className="w-[652px]"
  >
    {page}
  </AuthLayout>
)

export default SignUp
