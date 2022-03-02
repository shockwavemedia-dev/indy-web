import styled from 'styled-components'
import { PasswordStrengthMeterWrapper } from './Auth.wrapper'

export const AuthLayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1f2024;
`

export const AuthForm = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 60px 88px;
  margin: auto auto;
  ${({ width }) => `width: ${width};`}

  .logo {
    margin-bottom: 16px;
    user-select: none;
  }

  .title {
    font: 600 28px Inter;
    margin-bottom: 8px;
  }

  .subtitle {
    font: 400 16px Inter;
    color: #6b6e75;
    margin-bottom: 24px;
    text-align: center;
  }

  .query {
    font: 400 14px Inter;
    color: #545454;
  }

  .password-standards {
    font: 400 10px Inter;
    color: #6b6e75;
  }
`

export const PasswordStrengthMeter = ({ strength }: { strength: number }) => {
  function getStrengthText() {
    if (strength < 2) {
      return 'Very Weak'
    } else if (strength < 3) {
      return 'Weak'
    } else if (strength < 4) {
      return 'Medium'
    } else if (strength < 5) {
      return 'Strong'
    }

    return 'Very Strong'
  }

  return (
    <PasswordStrengthMeterWrapper strength={strength}>
      <div className="strength-progress">
        <div className="strength-bar" />
        <div className="strength-bar" />
        <div className="strength-bar" />
        <div className="strength-bar" />
        <div className="strength-bar" />
      </div>
      <div className="strength-text">{getStrengthText()}</div>
    </PasswordStrengthMeterWrapper>
  )
}
