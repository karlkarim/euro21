/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useHistory } from "react-router";
const AuthForm = () => {
  const { authFormOpen, authType, authErrorMsg } = useStoreState((state) => state.ui);
  const { setAuthForm, clearAuthMsg } = useStoreActions((action) => action.ui);
  const { isLoggedIn } = useStoreState((state) => state.user);
  const { userSignup, userLogin } = useStoreActions((action => action.user))
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory()
  const toggleForm = (authType) => {
    setAuthForm([true, authType])
    clearAuthMsg()
  }
  const formValid = () => {
    if(authType === 'login') {
      if(email === '' || password === '') return false
    }
    if(authType === 'signup') {
      if(username === '' || email === '' || password === '') return false
    }
    return true
  }
  const closeAuthForm = () => () => {
    setAuthForm([false, 'login'])
    clearAuthMsg()
    setUsername('')
    setEmail('')
    setPassword('')
  }
  const handleAuthFormSubmit = (e) => {
    e.preventDefault()
    if(!formValid()) return
    if(authType === 'login') {
      userLogin({email, password, username})
      if(isLoggedIn) return history.push('/app')
    } else {
      userSignup({email, password, username})
      if(isLoggedIn) return history.push('/app')
    }
  }
  useEffect(() => {
    setIsFormValid(!formValid())
  },[username, email, password])

  return (
    <>
      <Transition appear show={authFormOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeAuthForm()}
        >
          <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {authType === "login" ? "Sign in" : "Sign up"}
                </Dialog.Title>
                
                  <form className="mt-8 space-y-6" onSubmit={(e) => handleAuthFormSubmit(e)}>
                    <div className="-space-y-px rounded-md shadow-sm">
                      {authType === "signup" ? (
                        <div>
                          <label htmlFor="username" className="sr-only">
                            Username
                          </label>
                          <input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 ${authType === 'signup' ? 'rounded-t-md' : 'rounded-none'} appearance-none focus:outline-none focus:ring-uefa-light focus:border-uefa-light focus:z-10 sm:text-sm`}
                            placeholder="Username"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="email-address"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
                          className={`relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 ${authType === 'login' ? 'rounded-t-md' : 'rounded-none'} appearance-none focus:outline-none focus:ring-uefa-light focus:border-uefa-light focus:z-10 sm:text-sm`}
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type='password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-uefa-light focus:border-uefa-light focus:z-10 sm:text-sm"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                        {authErrorMsg ? (<div className='text-sm text-red-500'>{authErrorMsg}</div>) : ''}
                    <div>
                      <button
                        disabled={isFormValid}
                        type="submit"
                        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-uefa-dark group hover:bg-uefa-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uefa-light"
                      >
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <LockClosedIcon
                            className="w-5 h-5 text-uefa-light group-hover:text-uefa-dark "
                            aria-hidden="true"
                          />
                        </span>
                        Sign in
                      </button>
                      {/* <div className="flex justify-between my-4 text-sm">
                        <div className="">
                          {authType === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
                        </div>
                        <div
                          onClick={() => toggleForm(authType === 'login' ? 'signup': 'login')}
                          className='cursor-pointer text-uefa-dark hover:text-uefa-light'>
                            {authType === 'login' ? 'Signup' : 'Login'}
                        </div>
                      </div> */}
                    </div>
                  </form>
                
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AuthForm;
