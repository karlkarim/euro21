import { action, thunk } from "easy-peasy";
import { auth } from "../firebase/config";
import http from "../http";

export const user = {
  userdata: null,
  isLoggedIn: false,
  authError: null,
  setUserData: action((state, newState) => {
    state.userdata = newState
  }),
  setIsLoggedIn: action((state, newState) => {
    state.isLoggedIn = newState
  }),
  setAuthError: action((state, newState) => {
    state.authError = newState
  }),
  userLogin: thunk(async (action, payload) => {
    const { email, password } = payload
    try {
      const resp = await auth.signInWithEmailAndPassword(email, password)
      if(resp.user) {
        const query = await http.get('/users', { params: {jsonata: `[$[data.email="${email}"]]`}})
        action.setUserData(query.data[0])
        action.setIsLoggedIn(true)
      }
    } catch (error) {
      const { message } = error
      action.setAuthError(message)
    }
  }),
  userSignup: thunk(async (action, payload) => {
    const { email, password, username } = payload
    try {
      const usernameExists = await http.get('/users', {params:{jsonata: `[$[data.username="${username}"]]`}})
      console.log(usernameExists)
      if(usernameExists.data.length) {
        return action.setAuthError('Username already taken!')
      } else {
        const resp = await auth.createUserWithEmailAndPassword(email, password)
        if(resp.user) {
          await http.post('/users', {
            username,
            email,
            avatar: null,
            createdAt: new Date()
          })
        action.setUserData({username, email, avatar: null})
        action.setIsLoggedIn(true)
        }
      }
    } catch (error) {
      const { message } = error
      action.setAuthError(message)
    }
  }),
  resumeLogin: thunk(async (action, payload) => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if(user) {
          const email = user.email
          const query = await http.get('/users', {params: { jsonata: `[$[data.email="${email}"]]`} })
          action.setUserData(query.data[0])
          action.setIsLoggedIn(true)
        }
      })
    } catch (error) {
      action.setIsLoggedIn(false)
      action.setUserData(null)
    }
  })
}