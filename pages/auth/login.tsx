import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useState } from 'react'
import { AuthForm } from '../../components/Auth'
import { Button } from '../../components/Common/Button'
import { Checkbox } from '../../components/Common/Checkbox'
import { LockIcon, UserIcon, CaretRightIcon } from '../../components/Common/Icon'
import { Link } from '../../components/Common/Link'
import { Row } from '../../components/Common/Row'
import { TextInput, TextInputType } from '../../components/Common/TextInput'
import { AuthLayout } from '../../layouts/Auth'
import DailyPressLogo from '../../public/images/daily-press-logo.png'

const Page = () => {
  const [isRememberMe, setRememberMe] = useState(false)

  return (
    <AuthForm width="588px">
      <Head>
        <title>Daily Press - Login</title>
      </Head>
      <div className="logo">
        <Image draggable={false} src={DailyPressLogo} alt="Daily Press" height={65} width={65} />
      </div>
      <div className="title">Welcome to Daily Press</div>
      <div className="subtitle">Please log in to your account and start the adventure</div>
      <Row marginBottom="18px">
        <TextInput Icon={UserIcon} label="Username" placeholder="Enter Username" />
      </Row>
      <Row marginBottom="32px">
        <TextInput
          type={TextInputType.Password}
          Icon={LockIcon}
          label="Password"
          placeholder="Enter Password"
        />
      </Row>
      <Row marginBottom="32px" spaced>
        <Checkbox
          label="Remember me"
          isChecked={isRememberMe}
          onTick={() => setRememberMe(!isRememberMe)}
        />
        <Link href="/auth/forgot-password">Forgot Password?</Link>
      </Row>
      <Row marginBottom="24px" width="312px">
        <Button>
          Login
          <CaretRightIcon />
        </Button>
      </Row>
      <Row columnGap="6px">
        <span className="query">Don&apos;t have an account?</span>
        <Link href="/auth/sign-up">Sign Up</Link>
      </Row>
    </AuthForm>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Page
