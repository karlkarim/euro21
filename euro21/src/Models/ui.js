// authTypes = [login, signup]
import { action, actionOn } from 'easy-peasy'
export const ui =  {
  authFormOpen: false,
  authType: 'login',
  authErrorMsg: null,
  setAuthForm: action((state, newState) => {
    state.authFormOpen = newState[0]
    state.authType = newState[1]
  }),
  clearAuthMsg: action((state, newState) => {
    state.authErrorMsg = null
  }),
  onAuthFailed: actionOn((action, storeActions) => storeActions.user.setAuthError, (state, target) => {
    state.authErrorMsg = target.payload
  }),
  onAuthSuccess: actionOn((action, storeActions) => storeActions.user.setIsLoggedIn, (state, target) => {
    state.authFormOpen = false
  })
}