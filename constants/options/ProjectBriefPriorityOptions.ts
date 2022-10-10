import { Options } from 'react-select'
import { ProjectBriefPriority } from '../../types/ProjectBriefPriority.type'
import { SelectOption } from '../../types/SelectOption.type'

export const ProjectBriefPriorityOptions: Options<SelectOption<ProjectBriefPriority>> = [
  { label: 'Urgent', value: 'Urgent' },
  { label: 'Standard', value: 'Standard' },
  { label: 'Relaxed', value: 'Relaxed' },
]
