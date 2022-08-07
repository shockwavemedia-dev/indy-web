import ReactSelect, {
  ClearIndicatorProps,
  components as Components,
  ContainerProps,
  ControlProps,
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
  Props,
} from 'react-select'
import { SelectOption } from '../types/SelectOption.type'
import { FormErrorMessage } from './FormErrorMessage'
import { CaretIcon } from './icons/CaretIcon'
import { ClearSelectIcon } from './icons/ClearSelectIcon'
import { RemoveMultiValueIcon } from './icons/RemoveMultiValueIcon'

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
      className={`stroke-waterloo ${props.selectProps.menuIsOpen ? 'rotate-0' : 'rotate-180'}`}
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

const MultiValueRemove = <Option, IsMulti extends boolean>(
  props: MultiValueRemoveProps<Option, IsMulti>
) => (
  <Components.MultiValueRemove {...props}>
    <RemoveMultiValueIcon className="stroke-waterloo hover:stroke-tart-orange" />
  </Components.MultiValueRemove>
)

const ClearIndicator = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: ClearIndicatorProps<Option, IsMulti, Group>
) => (
  <Components.ClearIndicator {...props} className="group">
    <ClearSelectIcon className="stroke-waterloo group-hover:stroke-tart-orange" />
  </Components.ClearIndicator>
)

export const SelectNoFormik = <
  T,
  IsMulti extends boolean = false,
  Group extends GroupBase<SelectOption<T>> = GroupBase<SelectOption<T>>
>({
  onChange,
  ...props
}: Props<SelectOption<T>, IsMulti, Group> & { twHeight?: string }) => (
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
      control: (base, { isFocused }) => ({
        ...base,
        minHeight: props.twHeight || '3.125rem',
        boxShadow: isFocused ? '0 0 0 2px #F25D23' : '0 0 0 1px #E8E8EF',
        border: 'none',
        borderRadius: '.75rem',
        padding: '0 1.5rem 0',
        backgroundColor: '#ffffff',
        transition: 'none',
      }),
      container: (base) => ({
        ...base,
        borderRadius: '0.75rem',
        width: '100%',
      }),
      input: (base) => ({
        ...base,
        color: '#32343D',
        font: '500 0.875rem/1.25rem Urbanist',
        margin: 0,
        padding: 0,
      }),
      singleValue: (base) => ({
        ...base,
        color: '#32343D',
        font: '500 0.875rem/1.25rem Urbanist',
      }),
      option: (base, { isSelected }) => ({
        ...base,
        color: isSelected ? '#FFFFFF' : '#32343D',
        font: '500 0.875rem/1.25rem Urbanist',
        backgroundColor: isSelected ? '#F25D23 !important' : '#FFFFFF',
        ':hover': {
          backgroundColor: '#F25D2333',
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
      dropdownIndicator: () => ({
        marginLeft: '.625rem',
      }),
      valueContainer: (base) => ({
        ...base,
        padding: '.25rem 0',
        gap: '.25rem',
      }),
      clearIndicator: (base) => ({
        ...base,
        cursor: 'pointer',
        padding: 0,
      }),
      multiValue: () => ({
        display: 'flex',
        border: '1px solid #E8E8EF',
        paddingLeft: '.625rem',
        paddingRight: '.625rem',
        borderRadius: 8,
      }),
      multiValueLabel: () => ({
        font: '500 0.875rem/1.25rem Urbanist',
        color: '#32343D',
      }),
      multiValueRemove: () => ({
        height: 'fit-content',
        margin: 'auto 0 auto .25rem',
      }),
    }}
    components={{
      SelectContainer,
      DropdownIndicator,
      Control,
      MultiValueRemove,
      ClearIndicator,
    }}
    onChange={onChange}
  />
)
