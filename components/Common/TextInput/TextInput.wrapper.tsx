import styled from 'styled-components'

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .label {
    font: 400 12px Inter;
    color: #1f1f1f;
    margin-bottom: 8px;
    user-select: none;
  }

  .input {
    height: 46px;
    border: 1px solid #1d212b1a;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    column-gap: 8px;
    overflow: hidden;

    input {
      font: 400 14px Inter;
      outline: none;
      border: none;
      width: 100%;
      height: 100%;
      padding-right: 10px;

      ::placeholder {
        color: #8f8f8f;
      }
    }

    .toggle-show-password {
      outline: none;
      border: none;
      display: flex;
      justify-content: center;
      background-color: transparent;
      cursor: pointer;
      padding: 0;
      margin-right: 10px;
    }
  }
`
