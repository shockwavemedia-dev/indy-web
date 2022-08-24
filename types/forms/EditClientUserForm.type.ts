import { NewClientUserForm } from './NewClientUserForm.type'

export type EditClientUserForm = Pick<
  NewClientUserForm,
  'clientId' | 'firstName' | 'lastName' | 'email' | 'password'
>
