import styled from 'styled-components'

export const Button = styled.button<{ isLight?: boolean }>`
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;
  flex: 1;
  height: 44px;
  border: 1px solid #33353c;
  cursor: pointer;
  border-radius: 4px;
  font: 500 14px Inter;
  ${({ isLight }) => `background-color: ${isLight ? '#ffffff' : '#1F1F1F'};`}
  ${({ isLight }) => `color: ${isLight ? ' #33353C' : '#ffffff'};`}
`
