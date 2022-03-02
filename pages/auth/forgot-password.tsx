import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import { AuthForm } from '../../components/Auth'
import { Button } from '../../components/Common/Button'
import { EmailIcon, CaretRightIcon } from '../../components/Common/Icon'
import { Link } from '../../components/Common/Link'
import { Row } from '../../components/Common/Row'
import { TextInput, TextInputType } from '../../components/Common/TextInput'
import { AuthLayout } from '../../layouts/Auth'
import DailyPressLogo from '../../public/images/daily-press-logo.png'

const Page = () => {
  return (
    <AuthForm width="570px">
      <Head>
        <title>Daily Press - Forgot Password</title>
      </Head>
      <div className="logo">
        <Image draggable={false} src={DailyPressLogo} alt="Daily Press" height={65} width={65} />
      </div>
      <div className="title">Forgot password?</div>
      <div className="subtitle">
        Enter your email and we will send you
        <br />
        one-time link to reset password
      </div>
      <Row marginBottom="32px">
        <TextInput
          Icon={EmailIcon}
          label="Email"
          placeholder="Enter Email"
          type={TextInputType.Email}
        />
      </Row>
      <Row marginBottom="20px" width="312px">
        <Button>
          Restore Password
          <CaretRightIcon />
        </Button>
      </Row>
      <Row>
        <Link href="/auth/login">Cancel</Link>
      </Row>
    </AuthForm>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Page
