import { Options } from 'react-select'
import { SelectOption } from '../../types/SelectOption.type'
import { SocialMediaCampaignType } from '../../types/SocialMediaCampaignType'

export const SocialMediaCampaignTypeOptions: Options<SelectOption<SocialMediaCampaignType>> = [
  { label: 'Paid', value: 'Paid' },
  { label: 'Organic', value: 'Organic' },
]
