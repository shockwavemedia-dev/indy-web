import { SelectOption } from './SelectOption.type'
import { ServiceOptionExtraValue } from './ServiceOptionExtraValue.type'
import { ServiceOptionValue } from './ServiceOptionValue.type'

export type ServiceOption = SelectOption<ServiceOptionValue | ServiceOptionExtraValue>
