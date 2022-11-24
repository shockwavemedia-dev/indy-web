import { Tooltip } from '@mui/material'
import { Field } from 'formik'
import { Icon } from '../types/Icon.type'
import { FormErrorMessage } from './FormErrorMessage'
import { InfoIcon } from './icons/InfoIcon'

export const TextInput = ({
  type,
  name,
  Icon,
  placeholder,
  className,
  readOnly = false,
  label,
  hint,
}: {
  type: 'text' | 'email' | 'url' | 'number'
  name: string
  Icon?: Icon
  placeholder: string
  className?: string
  readOnly?: boolean
  label?: string
  hint?: string
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
              <InfoIcon className="h-4 stroke-bleu-de-france transition-colors hover:stroke-halloween-orange" />
            </div>
          </Tooltip>
        )}
      </div>
    )}
    <div className="relative flex items-center">
      {Icon && <Icon className="pointer-events-none absolute left-6 stroke-lavender-gray" />}
      <Field
        className="h-12.5 w-full rounded-xl px-13 text-sm font-medium text-onyx placeholder-metallic-silver ring-1 ring-bright-gray read-only:cursor-auto focus:ring-2 focus:ring-halloween-orange read-only:focus:ring-1 read-only:focus:ring-bright-gray"
        type={type}
        name={name}
        id={name}
        spellCheck={false}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
    <FormErrorMessage name={name} />
  </div>
)
