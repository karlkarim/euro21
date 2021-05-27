import { action, thunk } from "easy-peasy";
import { auth, db } from "../firebase/config";

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
        const query = await db.collection('users').where('email', '==', email).get()
        const user = query.docs.map(user => ({
          username: user.id,
          ...user.data()
        }))
        action.setUserData(user[0])
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
      const usernameExists = await db.collection('users').doc(`${username}`).get()
      if(usernameExists.exists) {
        return action.setAuthError('Username already taken!')
      } else {
        const resp = await auth.createUserWithEmailAndPassword(email, password)
        if(resp.user) {
          await db.collection('users').doc(username).set({
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
          const query = await db.collection('users').where('email', '==', user.providerData[0].email).get()
          const userdata = query.docs.map(user => ({
            username: user.id,
            ...user.data()
          }))
          action.setUserData(userdata[0])
          action.setIsLoggedIn(true)
        }
      })
    } catch (error) {
      action.setIsLoggedIn(false)
      action.setUserData(null)
    }
  })
}