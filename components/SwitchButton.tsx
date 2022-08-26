import { Switch } from '@mui/material'
import { Field, useFormikContext } from 'formik'

export const SwitchButton = ({
  name,
  label,
  className,
}: {
  name: string
  label: string
  className?: string
}) => {
  const { getFieldProps, setFieldValue } = useFormikContext()

  const status = getFieldProps<boolean>(name).value

  return (
    <div className={className}>
      <span className="font-bold text-onyx">{label}</span>
      <Field
        component={Switch}
        name={name}
        checked={status}
        onChange={() => setFieldValue(name, !status)}
      />
    </div>
  )
}
