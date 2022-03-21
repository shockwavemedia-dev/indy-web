import { Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Button from '../../components/Common/Button.component'
import Checkbox from '../../components/Common/Checkbox.component'
import CaretIcon from '../../components/Common/Icons/Caret.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import { SignInForm } from '../../interfaces/SignInForm.interface'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Login: NextPageWithLayout = () => {
  const { replace } = useRouter()

  const formInitialValues: SignInForm = {
    email: '',
    password: '',
    rememberMe: false,
  }

  const submitForm = async (
    signInFormValues: SignInForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true)

    const res = await signIn<'credentials'>('credentials', {
      email: signInFormValues.email,
      password: signInFormValues.password,
      redirect: false,
    })

    setSubmitting(false)

    if (!res?.error && res?.status === 200 && res.ok) {
      replace('/dashboard')
    }
  }

  return (
    <>
      <Head>
        <title>Daily Press - Login</title>
      </Head>
      <Formik initialValues={formInitialValues} onSubmit={submitForm}>
        {({ isSubmitting }) => (
          <Form className="flex w-full flex-col items-center">
            <div className="mb-4.5 flex w-full">
              <TextInput
                type="email"
                name="email"
                Icon={EmailIcon}
                label="Email"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-8 flex w-full">
              <TextInput
                type="password"
                name="password"
                Icon={LockIcon}
                label="Password"
                placeholder="Enter Password"
              />
            </div>
            <div className="mb-8 flex w-full justify-between">
              <Checkbox name="rememberMe" label="Remember me" />
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </div>
            <div className="mb-6 flex w-78">
              <Button type="submit" ariaLabel="Login" disabled={isSubmitting}>
                <span>Login</span>
                <CaretIcon className="stroke-white" />
              </Button>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="font-inter text-sm font-normal text-emperor">
                {"Don't have an account?"}
              </div>
              <Link href="/auth/sign-up">Sign Up</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

Login.getLayout = (page: ReactElement) => (
  <AuthLayout
    title="Welcome to Daily Press"
    subtitle="Please log in to your account and start the adventure"
    className="w-147"
    needsAuth
  >
    {page}
  </AuthLayout>
)

export default Login
