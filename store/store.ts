import createStore from 'zustand'
import { StoreState } from '../types/StoreState.type'
import createPasswordStrengthSlice from './createPasswordStrengthSlice'

const useStore = createStore<StoreState>((set) => ({
  ...createPasswordStrengthSlice(set),
}))

export default useStore
