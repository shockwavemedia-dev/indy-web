import styled from 'styled-components'

export const Row = styled.div<{
  marginBottom?: string
  width?: string
  spaced?: boolean
  columnGap?: string
}>`
  display: flex;
  ${({ spaced }) => `justify-content: ${spaced ? 'space-between' : 'center'};`}
  ${({ width }) => `width: ${width || '100%'};`}
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom};`}
  ${({ columnGap }) => columnGap && `column-gap: ${columnGap};`}
`
