import { Files } from './Files.type'

export type Folder = Record<
  string,
  {
    id: number
    name: string
    files: Files
    folders: Array<Folder>
  }
>
