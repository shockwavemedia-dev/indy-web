import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, useRef, useState } from 'react'
import { AuthForm, PasswordStrengthMeter } from '../../components/Auth'
import { Button } from '../../components/Common/Button'
import { FloppyDiskIcon, LockIcon } from '../../components/Common/Icon'
import { Link } from '../../components/Common/Link'
import { Row } from '../../components/Common/Row'
import { TextInput, TextInputType } from '../../components/Common/TextInput'
import { AuthLayout } from '../../layouts/Auth'
import DailyPressLogo from '../../public/images/daily-press-logo.png'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { compute, passwordStrength } from '../../store/slices/PasswordStrength.slice'

const Page = () => {
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const passwordCheckRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const passwordStrengthValue = useAppSelector(passwordStrength)

  function onPasswordChange() {
    dispatch(compute(newPasswordRef.current!.value))
  }

  useState(() => {
    dispatch(compute(''))
  })

  return (
    <AuthForm width="570px">
      <Head>
        <title>Daily Press - Create New Password</title>
      </Head>
      <div className="logo">
        <Image draggable={false} src={DailyPressLogo} alt="Daily Press" height={65} width={65} />
      </div>
      <div className="title">Create New Password</div>
      <div className="subtitle">Setup your new password</div>
      <Row marginBottom="8px">
        <TextInput
          Icon={LockIcon}
          label="New Password"
          placeholder="Enter New Password"
          type={TextInputType.Password}
          onChange={onPasswordChange}
          ref={newPasswordRef}
        />
      </Row>
      <Row marginBottom="8px" spaced>
        <PasswordStrengthMeter strength={passwordStrengthValue} />
      </Row>
      <Row marginBottom="18px" spaced className="password-standards">
        Should be at least 8 symbols and contain one small and one big character,
        <br />
        special character and number
      </Row>
      <Row marginBottom="32px">
        <TextInput
          Icon={LockIcon}
          label="Confirm Password"
          placeholder="Enter New Password"
          type={TextInputType.Password}
          ref={passwordCheckRef}
        />
      </Row>
      <Row marginBottom="20px" width="312px">
        <Button name="save-new-password">
          <FloppyDiskIcon /> Save New Password
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
