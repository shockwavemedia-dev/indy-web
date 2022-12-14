import { File } from './File.type'

export type Screen = {
  id: number
  name: string
  slue: string
  logo?: File | null
  createdBy: string
}
