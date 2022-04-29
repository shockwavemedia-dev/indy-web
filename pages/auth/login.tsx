import { Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { done, start } from 'nprogress'
import { ReactElement } from 'react'
import Button from '../../components/common/Button'
import Checkbox from '../../components/common/Checkbox'
import CaretIcon from '../../components/common/icons/CaretIcon'
import LockIcon from '../../components/common/icons/LockIcon'
import UserIcon from '../../components/common/icons/UserIcon'
import PasswordInput from '../../components/common/PasswordInput'
import TextInput from '../../components/common/TextInput'
import AuthLayout from '../../layouts/AuthLayout'
import { LoginFormSchema } from '../../schemas/LoginFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { LoginForm } from '../../types/forms/LoginForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const Login: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { showToast } = useToastStore()

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

    if (res) {
      if (!res.error) {
        replace('/')
      } else {
        showToast({
          type: 'error',
          message: res.error,
        })
        setSubmitting(false)
      }
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
            />
            <PasswordInput
              name="password"
              Icon={LockIcon}
              placeholder="Enter password"
              className="mb-3"
            />
            <div className="mb-8 flex w-full justify-between">
              <Checkbox name="rememberMe" label="Remember me" />
              <Link href="/auth/forgot-password">
                <a className="font-urbanist text-sm font-semibold text-jungle-green underline-offset-1 hover:underline">
                  Forgot Password?
                </a>
              </Link>
            </div>
            <Button
              ariaLabel="Login"
              disabled={isSubmitting}
              className="mb-5 max-w-75"
              type="submit"
            >
              <div>Log In</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <div className="font-urbanist text-sm font-medium text-metallic-silver">
              Don{"'"}t have an account?{' '}
              <Link href="/auth/sign-up">
                <a className="font-urbanist text-sm font-semibold text-jungle-green underline-offset-1 hover:underline">
                  Sign Up
                </a>
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
  >
    {page}
  </AuthLayout>
)

export default Login
