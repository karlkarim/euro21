
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useGetTurnaName } from '../../hooks/useGetTurnaName';

const Invite = () => {
  const { id } = useParams()
  const { authErrorMsg } = useStoreState((state) => state.ui);
  const { isLoggedIn } = useStoreState((state) => state.user);
  const { userSignupWithInvite } = useStoreActions((action => action.user))
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory()
  const turnaName = useGetTurnaName(id)  
  const formValid = () => {
      if(username === '' || email === '' || password === '') return false
    return true
  }

  const handleAuthFormSubmit = (e) => {
    e.preventDefault()
    if(!formValid()) return
    userSignupWithInvite({email, password, username, gameId: id})
      return history.push('/app')
  }
  useEffect(() => {
    setIsFormValid(!formValid())
  },[username, email, password])
  useEffect(() => {
    if(isLoggedIn) {
      history.push('/')
    }
  }, [isLoggedIn]);
  return ( 
    <div className='flex justify-center'>
      {turnaName ? (
        <form className="mt-8 space-y-6 w-96" onSubmit={(e) => handleAuthFormSubmit(e)}>
        <div className="-space-y-px rounded-md shadow-sm">
          <div className='my-2 text-lg text-center'>You've been invited to join <span className='italic font-semibold'>{turnaName}</span></div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-uefa-light focus:border-uefa-light focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none focus:outline-none focus:ring-uefa-light focus:border-uefa-light focus:z-10 sm:text-sm"
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
              value={password}
              type='password'
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
            className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-uefa-light group hover:bg-uefa-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uefa-light"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="w-5 h-5 text-uefa-dark group-hover:text-uefa-light"
                aria-hidden="true"
              />
            </span>
            Create account and join
          </button>
        </div>
      </form>
      ): (
        <div>Ups! This tournament doesn't exist</div>
      )}
    </div>
   );
}
 
export default Invite;