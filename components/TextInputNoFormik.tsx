import { Tooltip } from '@mui/material'
import { Icon } from '../types/Icon.type'
import { InfoIcon } from './icons/InfoIcon'

export const TextInputNoFormik = ({
  type,
  name,
  Icon,
  placeholder,
  className,
  readOnly = false,
  label,
  hint,
  slim = false,
  value,
  onChange,
  onEnter,
  onBlur,
}: {
  type: 'text' | 'email' | 'url'
  name: string
  Icon?: Icon
  placeholder: string
  className?: string
  readOnly?: boolean
  label?: string
  hint?: string
  slim?: boolean
  value?: string
  onChange?: (text: string) => void
  onEnter?: () => void
  onBlur?: () => void
}) => (
  <div className={`w-full ${className}`}>
    {(label || hint) && (
      <div className="mb-2 flex">
        <label
          htmlFor={name}
          className="inline-block text-xs font-medium text-metallic-silver empty:hidden"
        >
          {label}
        </label>
        {hint && (
          <Tooltip title={hint} placement="top-end" className="ml-auto">
            <div>
              <InfoIcon className="h-4 stroke-metallic-silver transition-colors hover:stroke-halloween-orange" />
            </div>
          </Tooltip>
        )}
      </div>
    )}
    <div className="relative flex items-center">
      {Icon && (
        <Icon
          className={`pointer-events-none absolute left-6 stroke-lavender-gray${
            slim ? ' h-5' : ''
          }`}
        />
      )}
      <input
        className={`w-full text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray ${
          slim ? 'h-8 rounded-md px-4' : 'h-12.5 rounded-xl px-13'
        }`}
        type={type}
        name={name}
        id={name}
        spellCheck={false}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange ? ({ currentTarget: { value } }) => onChange(value) : undefined}
        onKeyDown={
          onEnter
            ? ({ key }) => {
                if (key === 'Enter') onEnter()
              }
            : undefined
        }
        onBlur={onBlur ? () => onBlur() : undefined}
        value={value}
      />
    </div>
  </div>
)
