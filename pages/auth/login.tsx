import { Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { done, start } from 'nprogress'
import { ReactElement } from 'react'
import Button from '../../components/Common/Button.component'
import Checkbox from '../../components/Common/Checkbox.component'
import CaretIcon from '../../components/Common/Icons/Caret.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import UserIcon from '../../components/Common/Icons/User.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import { LoginForm } from '../../interfaces/LoginForm.interface'
import AuthLayout from '../../layouts/Auth.layout'
import { LoginFormSchema } from '../../schemas/LoginFormSchema'
import { NextPageWithLayout } from '../../types/NextPageWithLayout.type'

const Login: NextPageWithLayout = () => {
  const { replace } = useRouter()

  const formInitialValues: LoginForm = {
    email: '',
    password: '',
  }

  const submitForm = async (
    signInFormValues: LoginForm,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    start()

    setSubmitting(true)

    const res = await signIn<'credentials'>('credentials', {
      email: signInFormValues.email,
      password: signInFormValues.password,
      redirect: false,
    })

    if (!res?.error && res?.ok) {
      replace('/dashboard')
    } else {
      setSubmitting(false)
    }

    done()
  }

  return (
    <>
      <Head>
        <title>Daily Press - Login</title>
      </Head>
      <Formik
        validationSchema={LoginFormSchema}
        initialValues={formInitialValues}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <TextInput
              type="email"
              name="email"
              Icon={UserIcon}
              placeholder="Enter username"
              className="mb-5"
              disableAutoComplete
            />
            <TextInput
              type="password"
              name="password"
              Icon={LockIcon}
              placeholder="Enter password"
              className="mb-3"
            />
            <div className="mb-8 flex w-full justify-between">
              <Checkbox name="rememberMe" label="Remember me" />
              <Link
                href="/auth/forgot-password"
                className="text-sm font-semibold text-jungle-green"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              ariaLabel="Login"
              disabled={isSubmitting}
              className="mb-5 max-w-75"
            >
              <div>Log In</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <div className="font-urbanist text-sm font-medium text-metallic-silver">
              Don{"'"}t have an account?{' '}
              <Link href="/auth/sign-up" className="text-sm font-semibold text-jungle-green">
                Sign Up
              </Link>
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
    needsAuth
    pageName="Login"
  >
    {page}
  </AuthLayout>
)

export default Login
