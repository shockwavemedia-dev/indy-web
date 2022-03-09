import { Field } from 'formik'
import CheckIcon from './Icons/Check.icon'

const Checkbox = ({ name, label }: { name: string; label: string }) => {
  return (
    <label
      htmlFor={name}
      className="flex items-center space-x-[12px] font-inter text-[14px] font-normal"
    >
      <Field type="checkbox" name={name} id={name} hidden {...{ className: 'peer' }} />
      <div className="border-mineshaft peer-checked:bg-mineshaft flex min-h-[16px] min-w-[16px] items-center justify-center rounded-[4px] border border-solid">
        <CheckIcon />
      </div>
      <span className="select-none">{label}</span>
    </label>
  )
}

export default Checkbox
