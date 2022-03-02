import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useRef, useState } from 'react'
import { AuthForm, PasswordStrengthMeter } from '../../components/Auth'
import { Button } from '../../components/Common/Button'
import { Checkbox } from '../../components/Common/Checkbox'
import {
  BriefcaseIcon,
  CaretRightIcon,
  EmailIcon,
  LockIcon,
  UserIcon,
} from '../../components/Common/Icon'
import { Link } from '../../components/Common/Link'
import { Row } from '../../components/Common/Row'
import { TextInput, TextInputType } from '../../components/Common/TextInput'
import { AuthLayout } from '../../layouts/Auth'
import DailyPressLogo from '../../public/images/daily-press-logo.png'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { compute, passwordStrength } from '../../store/slices/PasswordStrength.slice'

const Page = () => {
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordCheckRef = useRef<HTMLInputElement>(null)
  const [isRememberMe, setRememberMe] = useState(false)

  const dispatch = useAppDispatch()
  const passwordStrengthValue = useAppSelector(passwordStrength)

  function onPasswordChange() {
    dispatch(compute(passwordRef.current!.value))
  }

  function toggleRememberMe() {
    setRememberMe(!isRememberMe)
  }

  useState(() => {
    dispatch(compute(''))
  })

  return (
    <AuthForm width="652px">
      <Head>
        <title>Daily Press - Sign Up</title>
      </Head>
      <div className="logo">
        <Image draggable={false} src={DailyPressLogo} alt="Daily Press" height={65} width={65} />
      </div>
      <div className="title">Welcome to Daily Press</div>
      <div className="subtitle">Please sign up and start the adventure</div>
      <Row columnGap="12px" marginBottom="18px">
        <TextInput Icon={UserIcon} label="Full Name" placeholder="Enter Full Name" />
        <TextInput Icon={BriefcaseIcon} label="Company Name" placeholder="Enter Company Name" />
      </Row>
      <Row columnGap="12px" marginBottom="18px">
        <TextInput
          Icon={EmailIcon}
          label="Email"
          placeholder="Enter Email"
          type={TextInputType.Email}
        />
      </Row>
      <Row columnGap="12px" marginBottom="8px">
        <TextInput
          Icon={LockIcon}
          label="Password"
          placeholder="Enter Password"
          type={TextInputType.Password}
          onChange={onPasswordChange}
          ref={passwordRef}
        />
        <TextInput
          Icon={LockIcon}
          label="Confirm Password"
          placeholder="Confirm Password"
          type={TextInputType.Password}
          ref={passwordCheckRef}
        />
      </Row>
      <Row marginBottom="8px" spaced>
        <PasswordStrengthMeter strength={passwordStrengthValue} />
      </Row>
      <Row marginBottom="24px" spaced className="password-standards">
        Should be at least 8 symbols and contain
        <br />
        one small and one big character, special
        <br />
        character and number
      </Row>
      <Row marginBottom="32px" spaced>
        <Checkbox label="Remember me" isChecked={isRememberMe} onTick={toggleRememberMe} />
      </Row>
      <Row marginBottom="24px" width="312px">
        <Button>
          Sign Up
          <CaretRightIcon />
        </Button>
      </Row>
      <Row columnGap="6px">
        <span className="query">Already have an account?</span>
        <Link href="/auth/login">Login</Link>
      </Row>
    </AuthForm>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Page
