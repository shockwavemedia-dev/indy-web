import { Form, Formik } from 'formik'
import { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Button from '../../components/Common/Button.component'
import Checkbox from '../../components/Common/Checkbox.component'
import CaretRightIcon from '../../components/Common/Icons/CaretRight.icon'
import EmailIcon from '../../components/Common/Icons/Email.icon'
import LockIcon from '../../components/Common/Icons/Lock.icon'
import Link from '../../components/Common/Link.component'
import TextInput from '../../components/Common/TextInput.component'
import AuthLayout from '../../layouts/Auth.layout'
import { NextPageWithLayout } from '../_app'

interface SignInFormValues {
  email: string
  password: string
  rememberMe: boolean
}

const Login: NextPageWithLayout = () => {
  const { replace } = useRouter()
  const formInitialValues: SignInFormValues = {
    email: '',
    password: '',
    rememberMe: false,
  }

  const login = async (
    signInFormValues: SignInFormValues,
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
      replace('/admin/dashboard')
    }
  }

  return (
    <>
      <Head>
        <title>Daily Press - Login</title>
      </Head>
      <Formik initialValues={formInitialValues} onSubmit={login}>
        {({ isSubmitting }) => {
          return (
            <Form className="flex w-full flex-col items-center">
              <div className="mb-[18px] flex w-full">
                <TextInput
                  type="email"
                  name="email"
                  Icon={EmailIcon}
                  label="Email"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-[32px] flex w-full">
                <TextInput
                  type="password"
                  name="password"
                  Icon={LockIcon}
                  label="Password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="mb-[32px] flex w-full justify-between">
                <Checkbox name="rememberMe" label="Remember me" />
                <Link href="/auth/forgot-password">Forgot Password?</Link>
              </div>
              <div className="mb-[24px] flex w-[312px]">
                <Button type="submit" ariaLabel="Login" disabled={isSubmitting}>
                  <span>Login</span>
                  <CaretRightIcon className="stroke-white" />
                </Button>
              </div>
              <div className="flex select-none items-center space-x-[6px]">
                <div className="font-inter text-[14px] font-normal text-emperor">
                  {"Don't have an account?"}
                </div>
                <Link href="/auth/sign-up">Sign Up</Link>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

Login.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout
      title="Welcome to Daily Press"
      subtitle="Please log in to your account and start the adventure"
      className="w-[588px]"
    >
      {page}
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (await getSession(context)) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/dashboard',
      },
    }
  }

  return {
    props: {},
  }
}

export default Login
