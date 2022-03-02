import styled from 'styled-components'

export const CheckboxWrapper = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  column-gap: 12px;
  font: 400 14px Inter;
  color: #1f1f1f;
  user-select: none;

  .checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid #1f1f1f;
    ${({ checked }) => {
      return checked && `background-color: #1f1f1f`
    }}
  }
`
