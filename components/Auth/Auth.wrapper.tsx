import styled from 'styled-components'

export const PasswordStrengthMeterWrapper = styled.div<{ strength: number }>`
  display: flex;
  column-gap: 12px;
  align-items: center;
  margin-bottom: 8px;

  .strength-progress {
    display: flex;
    column-gap: 8px;
  }

  .strength-bar {
    height: 6px;
    width: 24px;
    border-radius: 12px;
    background-color: #ececec;

    ${({ strength }) => {
      return `:nth-child(-n + ${strength}) {
          background-color: ${(() => {
            if (strength < 3) {
              return '#E40808'
            } else if (strength < 4) {
              return '#FFD800'
            }

            return '#2CB117'
          })()};
        }`
    }}
  }

  .strength-text {
    font: 400 10px Inter;
  }
`
