import axios from 'axios'
import { Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { done, start } from 'nprogress'
import { ReactElement } from 'react'
import { Button } from '../../components/Button'
import { CaretIcon } from '../../components/icons/CaretIcon'
import { LockIcon } from '../../components/icons/LockIcon'
import { PasswordInput } from '../../components/PasswordInput'
import AuthLayout from '../../layouts/AuthLayout'
import { NewUserSetPasswordFormSchema } from '../../schemas/NewUserSetPasswordFormSchema'
import { useToastStore } from '../../store/ToastStore'
import { UserPasswordForm } from '../../types/forms/UserPasswordForm.type'
import { NextPageWithLayout } from '../../types/pages/NextPageWithLayout.type'
import { get400ResponseError } from '../../utils/ErrorHelpers'

const AccountVerifiedPage: NextPageWithLayout = () => {
  const {
    query: { email },
  } = useRouter()

  const router = useRouter()
  const { showToast } = useToastStore()

  const submitForm = async (signInFormValues: UserPasswordForm) => {
    start()

    const values = {
      email: router.query.email,
      token: router.query.token,
      password: signInFormValues.password,
      passwordConfirmation: signInFormValues.passwordConfirmation,
    }

    try {
      const { status } = await axios.post('/new-user-password', values)

      if (status === 200) {
        showToast({
          type: 'success',
          message: 'Succesfully set a password!',
        })

        router.replace('/auth/login')
      }
    } catch (e) {
      showToast({
        type: 'error',
        message: get400ResponseError(e),
      })
    }

    done()
  }

  return (
    <>
      <Head>
        <title>Indy - Verification</title>
      </Head>

      <Formik
        validationSchema={NewUserSetPasswordFormSchema}
        initialValues={{
          email: '',
          token: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-103 flex-col items-center">
            <div className="mb-5 text-center font-medium text-halloween-orange">{email}</div>
            <PasswordInput
              name="password"
              Icon={LockIcon}
              placeholder="Enter password"
              className="mb-3"
            />
            <PasswordInput
              name="passwordConfirmation"
              Icon={LockIcon}
              placeholder="Enter Password Confirmation"
              className="mb-3"
            />
            <div className="mb-8 flex w-full justify-between"></div>
            <Button ariaLabel="Login" disabled={isSubmitting} className="mb-5 w-75" type="submit">
              <div>Log In</div>
              <CaretIcon className="rotate-90 stroke-white" />
            </Button>
            <div className=" text-sm font-medium text-metallic-silver">
              Don{"'"}t have an account?{' '}
              <Link href="/auth/sign-up">
                <a className=" text-sm font-semibold text-halloween-orange underline-offset-1 hover:underline">
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

AccountVerifiedPage.getLayout = (page: ReactElement) => (
  <AuthLayout title="User invitation registration" subtitle="">
    {page}
  </AuthLayout>
)

export default AccountVerifiedPage
