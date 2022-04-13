import { useFormikContext } from 'formik'
import { useState } from 'react'
import ReactSelect, {
  components as Components,
  ControlProps,
  DropdownIndicatorProps,
  Options,
  SingleValue,
  StylesConfig,
} from 'react-select'
import { Icon } from '../../types/Icon.type'
import { Option } from '../../types/Option.type'
import CaretIcon from './icons/CaretIcon'

const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => (
  <Components.DropdownIndicator {...props}>
    <CaretIcon
      className={`stroke-waterloo ${props.selectProps.menuIsOpen ? 'rotate-0' : 'rotate-180'}`}
    />
  </Components.DropdownIndicator>
)

const Control = ({ children, ...props }: ControlProps<Option, false>) => (
  <Components.Control {...props}>
    <props.selectProps.Icon className="mr-2.5 stroke-lavender-gray" />
    {children}
  </Components.Control>
)

const styles: StylesConfig<Option, false> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: (base) => ({
    ...base,
    font: '500 0.875rem Urbanist',
    color: '#ABABB9',
    margin: 0,
  }),
  control: (base, { isFocused }) => ({
    ...base,
    minHeight: '3.125rem',
    boxShadow: isFocused ? '0 0 0 2px #AAE2CB' : '0 0 0 1px #E8E8EF',
    border: 'none',
    borderRadius: '.75rem',
    padding: '0 1.5rem 0',
    backgroundColor: '#ffffff',
  }),
  container: (base) => ({
    ...base,
    borderRadius: '0.75rem',
  }),
  input: (base) => ({
    ...base,
    color: '#32343D',
    font: '500 0.875rem Urbanist',
    margin: 0,
    padding: 0,
  }),
  singleValue: (base) => ({
    ...base,
    color: '#32343D',
    font: '500 0.875rem Urbanist',
  }),
  option: (base) => ({
    ...base,
    color: '#32343D',
    font: '500 0.875rem Urbanist',
  }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
  }),
  noOptionsMessage: (base) => ({
    ...base,
    font: '500 0.875rem Urbanist',
  }),
  dropdownIndicator: () => ({
    width: 'fit-content',
    marginLeft: '.625rem',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),
}

const Select = ({
  name,
  Icon,
  placeholder,
  options,
  className,
  disabled = false,
  defaultValue = null,
  readOnly = false,
  label,
}: {
  name: string
  Icon: Icon
  placeholder: string
  options: Options<Option>
  disabled?: boolean
  className?: string
  defaultValue?: Option | null
  readOnly?: boolean
  label?: string
}) => {
  const { setFieldValue } = useFormikContext()
  const [selectedOption, setSelectedOption] = useState<Option | null>(defaultValue)

  const selectOption = (option: SingleValue<Option>) => {
    setSelectedOption(option)
    setFieldValue(name, option?.value)
  }

  return (
    <div>
      <label className="mb-2 font-urbanist text-xs font-medium text-metallic-silver">{label}</label>
      <ReactSelect
        styles={styles}
        placeholder={placeholder}
        value={selectedOption}
        onChange={selectOption}
        options={options}
        components={{ DropdownIndicator, Control }}
        inputId={name}
        isDisabled={disabled || readOnly}
        className={`selection:bg-jungle-green selection:text-white ${className}`}
        Icon={Icon}
      />
    </div>
  )
}

export default Select
