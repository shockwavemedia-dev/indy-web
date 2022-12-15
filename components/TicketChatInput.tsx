import { SetStateAction } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

export const TicketChatInput = ({
  placeholder,
  className,
  data,
  value,
  defaultValue,
  onChange,
}: {
  placeholder: string
  className?: string
  data: Array<{ id: string; display: string }>
  value: string
  defaultValue?: string
  onChange?: (event: { target: { value: SetStateAction<string> } }) => void
}) => {
  const defaultStyle = {
    control: {
      color: '#32343D',
      font: '500 0.875rem/1.25rem Urbanist',
      margin: 0,
      padding: 0,
      minHeight: '3.125rem',
      boxShadow: '0 0 0 1px #E8E8EF',
      border: 'none',
      borderRadius: '.75rem',
      backgroundColor: '#ffffff',
      transition: 'none',
    },

    '&multiLine': {
      control: {
        font: '500 0.875rem/1.25rem Urbanist',
        minHeight: 63,
      },
      highlighter: {
        padding: 9,
        border: 'none',
        borderRadius: '.75rem',
        '&focused': {
          backgroundColor: '0 0 0 2px #F25D23',
        },
      },
      input: {
        padding: 9,
        border: 'none',
        borderRadius: '.75rem',
      },
    },

    '&singleLine': {
      display: 'inline-block',
      width: 180,

      highlighter: {
        padding: 1,
        border: '2px inset transparent',
      },
      input: {
        padding: 1,
        border: '2px inset',
      },
    },

    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid rgba(0,0,0,0.15)',
        font: '500 0.875rem/1.25rem Urbanist',
      },
      item: {
        padding: '5px 15px',
        borderBottom: '1px solid rgba(0,0,0,0.15)',
        '&focused': {
          backgroundColor: '#F25D2333',
        },
      },
    },
  }

  return (
    <div className={`w-full ${className}`}>
      <MentionsInput
        className="mt-5"
        style={defaultStyle}
        placeholder={placeholder}
        allowSuggestionsAboveCursor={true}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <Mention
          trigger="@"
          data={data}
          style={{
            backgroundColor: '#ccccff',
          }}
        />
      </MentionsInput>
    </div>
  )
}
