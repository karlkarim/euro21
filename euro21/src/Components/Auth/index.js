import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase/config';
const Auth = () => {
  const { setAuthForm } = useStoreActions(action => action.ui)
  const { isLoggedIn, userdata } = useStoreState(state => state.user)
  const { setUserData, setIsLoggedIn } = useStoreActions(action => action.user)
  const history = useHistory()

  const handleAuth = (authType) => {
    setAuthForm([true, authType])
  }
  const logout = () => {
    setIsLoggedIn(false)
    setUserData(null)
    auth.signOut()
  }
  return (
    <div>
      {isLoggedIn ? (
        <div className='space-x-4'>
          <button onClick={()=> history.push('/app')} className="px-4 py-2 mt-6 font-bold tracking-wide text-white rounded-full outline-none bg-gradient-to-b bg-uefa-light focus:outline-none hover:shadow-lg">Enter App</button>
          <button className="" onClick={() => logout()} >
            Logout     
          </button>
        </div>
      ): (
      <div className="flex my-4 space-x-4 text-sm">  
        <button onClick={()=> handleAuth('login')} className="px-4 py-2 font-bold text-white rounded-full bg-uefa-light">
          Join the Game
        </button>                     
      </div>
      )}
    </div>
  );
};

export default Auth;
