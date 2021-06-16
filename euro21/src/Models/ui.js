// authTypes = [login, signup]
import { action, actionOn } from 'easy-peasy'
export const ui =  {
  authFormOpen: false,
  authType: 'login',
  authErrorMsg: null,
  newScoreFormOpen: false,
  initialNewScoreData: {},
  newGameFormOpen: false,
  fetchGamesAgain: false,
  otherPredictionsOpen: false,
  otherPredictions: null,
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
  }),
  setScoreFormOpen: action((state, newState) => {
    state.newScoreFormOpen = newState
  }),
  setNewGameFormOpen: action((state, newState) => {
    state.newGameFormOpen = newState
  }),
  setInitialNewScoreData: action((state, newState) => {
    state.initialNewScoreData = newState
  }),
  setFetchNewGamesAgain: action((state, newState) => {
    state.fetchGamesAgain = newState
  }),
  setOtherPredictions: action((state, newState) => {
    state.otherPredictions = newState
  }),
  setOtherPredictionsOpen: action((state, newState) => {
    state.otherPredictionsOpen = newState
  })
}