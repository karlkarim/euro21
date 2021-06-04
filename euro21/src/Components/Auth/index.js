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
        <button onClick={()=> history.push('/app')} class="mt-6 font-bold py-2 px-4 rounded-full tracking-wide bg-gradient-to-b bg-uefa-light text-white outline-none focus:outline-none hover:shadow-lg">Enter App</button>
      ): (
      <div class="flex space-x-4 my-4 text-sm">  
        <button onClick={()=> handleAuth('signup')} class="bg-uefa-light text-white font-bold py-2 px-4 rounded-full">
          Join the Game
        </button>        
        <button class="" onClick={()=> handleAuth('login')} >
          or Login     
        </button>                
      </div>
      )}
    </div>
  );
};

export default Auth;
