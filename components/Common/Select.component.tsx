import { ComponentType, useState } from 'react'
import ReactSelect, {
  components as Components,
  DropdownIndicatorProps,
  Options,
  SingleValue,
  StylesConfig,
  ValueContainerProps,
} from 'react-select'
import { Option } from '../../interfaces/Option.interface'
import CaretIcon from './Icons/Caret.icon'

const Select = ({
  label,
  name,
  Icon,
  placeholder,
  options,
  isDisabled = false,
  setFieldValue,
}: {
  label: string
  name: string
  Icon: ComponentType
  placeholder: string
  options: Options<Option>
  isDisabled: boolean
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleChange = (option: SingleValue<Option>) => {
    setSelectedOption(option)
    setFieldValue(name, option?.value)
  }

  const style: StylesConfig<Option, false> = {
    indicatorSeparator: () => ({
      display: 'none',
    }),
    placeholder: (base) => ({
      ...base,
      font: '400 14px Inter',
      color: '#717583',
      margin: '0 0 0 8px',
    }),
    control: (base) => ({
      ...base,
      height: '100%',
      boxShadow: 'none',
      border: 'none',
    }),
    container: (base) => ({
      ...base,
      height: '100%',
      border: '1px solid #1D212B1A',
      borderRadius: '4px',
    }),
    valueContainer: (base) => ({
      ...base,
      display: 'flex',
    }),
    input: (base) => ({
      ...base,
      margin: '0 0 0 8px',
      font: '400 14px Inter',
    }),
    singleValue: (base) => ({
      ...base,
      margin: '0 0 0 8px',
      color: '#000000',
      font: '400 14px Inter',
    }),
    option: (base) => ({
      ...base,
      color: '#000000',
      font: '400 14px Inter',
    }),
  }

  const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => (
    <Components.DropdownIndicator {...props}>
      <CaretIcon className={`stroke-black ${props.selectProps.menuIsOpen && 'rotate-180'}`} />
    </Components.DropdownIndicator>
  )

  const ValueContainer = ({ children, ...props }: ValueContainerProps<Option, false>) => (
    <Components.ValueContainer {...props}>
      <Icon />
      <div className="grid items-center">{children}</div>
    </Components.ValueContainer>
  )

  return (
    <div className="flex w-full flex-col">
      <label className="mb-2 font-inter text-xs font-normal text-mineshaft" htmlFor={name}>
        {label}
      </label>
      <ReactSelect
        styles={style}
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        components={{ DropdownIndicator, ValueContainer }}
        inputId={name}
        isDisabled={isDisabled}
        menuIsOpen={true}
      />
    </div>
  )
}

export default Select
