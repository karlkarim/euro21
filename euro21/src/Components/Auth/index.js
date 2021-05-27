import { useStoreActions, useStoreState } from 'easy-peasy'
import { useHistory } from 'react-router-dom';
const Auth = () => {
  const { setAuthForm } = useStoreActions(action => action.ui)
  const { isLoggedIn } = useStoreState(state => state.user)
  const history = useHistory()

  const handleAuth = (authType) => {
    setAuthForm([true, authType])
  }
  
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={()=> history.push('/app')}>Enter App</button>
      ): (
        <div>
          <button onClick={()=> handleAuth('login')}>Login</button>
          <button onClick={()=> handleAuth('signup')}>Signup</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
