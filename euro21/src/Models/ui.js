// authTypes = [login, signup]
import { action } from 'easy-peasy'
export const ui =  {
  authFormOpen: false,
  authType: 'login',
  setAuthFormOpen: action((state, newState) => {
    state.authFormOpen = !state.authFormOpen
    state.authType = newState
  })
}