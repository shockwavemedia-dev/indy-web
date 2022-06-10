import { Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { done, start } from 'nprogress'
import { ReactElement } from 'react'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { CaretIcon } from '../../components/icons/CaretIcon'
import { LockIcon } from '../../components/icons/LockIcon'
import { UserIcon } from '../../components/icons/UserIcon'
import { PasswordInput } from '../../components/PasswordInput'
import { TextInput } from '../../components/TextInput'
import AuthLayout from '../../layouts/AuthLayout'
import { LoginFormSchema } from '../../schemas/LoginFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { LoginForm } from '../../types/forms/LoginForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'

const LoginPage: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const { showToast } = useToastStore()

  const submitForm = async (signInFormValues: LoginForm) => {
    start()

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
        initialValues={{
          email: '',
          password: '',
        }}
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
                <a className="font-urbanist text-sm font-semibold text-halloween-orange underline-offset-1 hover:underline">
                  Forgot Password?
                </a>
              </Link>
            </div>
            <Button ariaLabel="Login" disabled={isSubmitting} className="mb-5 w-75" type="submit">
              <div>Log In</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <div className="font-urbanist text-sm font-medium text-metallic-silver">
              Don{"'"}t have an account?{' '}
              <Link href="/auth/sign-up">
                <a className="font-urbanist text-sm font-semibold text-halloween-orange underline-offset-1 hover:underline">
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

LoginPage.getLayout = (page: ReactElement) => (
  <AuthLayout
    title="Welcome to Daily Press"
    subtitle="Please log in to your account and start the adventure"
  >
    {page}
  </AuthLayout>
)

export default LoginPage
