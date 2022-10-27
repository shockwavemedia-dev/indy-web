import ReactSelect, {
  components as Components,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  Props,
} from 'react-select'
import { SelectOption } from '../types/SelectOption.type'
import { FormErrorMessage } from './FormErrorMessage'
import { CaretIcon } from './icons/CaretIcon'

const SelectContainer = <Option, IsMulti extends boolean>({
  children,
  ...props
}: ContainerProps<Option, IsMulti>) => (
  <Components.SelectContainer {...props}>
    <label className="mb-2 inline-block text-xs font-medium text-metallic-silver empty:hidden">
      {props.selectProps.label}
    </label>
    {children}
    {props.selectProps.name && <FormErrorMessage name={props.selectProps.name} />}
  </Components.SelectContainer>
)

const DropdownIndicator = <Option, IsMulti extends boolean>(
  props: DropdownIndicatorProps<Option, IsMulti>
) => (
  <Components.DropdownIndicator {...props}>
    <CaretIcon
      className={`invisible stroke-waterloo transition-transform group-hover:visible ${
        props.selectProps.menuIsOpen ? 'rotate-0' : 'rotate-180'
      }`}
    />
  </Components.DropdownIndicator>
)

const Control = <Option, IsMulti extends boolean>({
  children,
  ...props
}: ControlProps<Option, IsMulti>) => (
  <Components.Control {...props}>
    {props.selectProps.Icon && <props.selectProps.Icon className="mr-2.5 stroke-lavender-gray" />}
    {children}
  </Components.Control>
)

export const MarketingStatusSelect = <
  MarketingStatusSelect,
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption<MarketingStatusSelect>> = GroupBase<
    SelectOption<MarketingStatusSelect>
  >
>({
  onChange,
  ...props
}: Props<SelectOption<MarketingStatusSelect>, IsMulti, Group> & {}) => (
  <ReactSelect
    {...props}
    styles={{
      indicatorSeparator: () => ({
        display: 'none',
      }),
      placeholder: (base) => ({
        ...base,
        font: '500 0.875rem/1.25rem Urbanist',
        color: '#ABABB9',
        margin: 0,
      }),
      control: (base, { isFocused, getValue }) => ({
        ...base,
        minHeight: '1.75rem',
        border: 'none',
        borderRadius: '.75rem',
        padding: '0 1.5rem 0',
        boxShadow: isFocused
          ? `0 0 0 2px #E8E8EF ${(() => {
              switch (getValue()[0].value as unknown as string) {
                case 'Todo':
                  return '#DC143C'
                case 'In Progress':
                  return '#DAA520'
                case 'Completed':
                  return '#228B22'
                default:
                  return '#F25D23'
              }
            })()}`
          : `none`,
        backgroundColor: (() => {
          switch (getValue()[0].value as unknown as string) {
            case 'Todo':
              return '#fbd0d9'
            case 'In Progress':
              return '#f8eed3'
            case 'Completed':
              return '#d6f5d6'
          }
        })(),
        transition: 'none',
      }),
      container: (base) => ({
        ...base,
        width: '100%',
      }),
      input: (base) => ({
        ...base,
        color: '#32343D',
        font: '500 0.875rem/1.25rem Urbanist',
        margin: 0,
        padding: 0,
        minHeight: '1.25rem',
        maxHeight: '1.25rem',
        width: 'fit-content',
      }),
      singleValue: (base, { data: { value } }) => ({
        ...base,
        font: '500 0.875rem/1.25rem Urbanist',
        color: (() => {
          switch (value as unknown as string) {
            case 'Urgent':
              return '#DC143C'
            case 'Standard':
              return '#DAA520'
            case 'Relaxed':
              return '#228B22'
            default:
              return '#F25D23'
          }
        })(),
      }),
      option: (base, { isSelected }) => ({
        ...base,
        color: isSelected ? '#FFFFFF' : '#32343D',
        font: '500 0.875rem/1.25rem Urbanist',
        backgroundColor: isSelected ? '#F25D23 !important' : '#FFFFFF',
        ':hover': {
          backgroundColor: '#F25D23',
        },
      }),
      menu: (base) => ({
        ...base,
        zIndex: 20,
        overflow: 'clip',
      }),
      noOptionsMessage: (base) => ({
        ...base,
        font: '500 0.875rem/1.25rem Urbanist',
      }),
      dropdownIndicator: (base) => ({
        ...base,
        cursor: 'pointer',
        padding: 0,
        margin: 0,
      }),
      valueContainer: (base) => ({
        ...base,
        padding: 0,
      }),
    }}
    components={{
      SelectContainer,
      DropdownIndicator,
      Control,
    }}
    onChange={onChange}
  />
)
