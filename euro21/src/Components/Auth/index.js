import { useStoreActions } from 'easy-peasy'
const Auth = () => {
  const { setAuthFormOpen } = useStoreActions(action => action.ui)
  /*
  Kui juba sisse logitud siis kuvab ainult nuppu ava rakendus
  Kui vajutab login siis avab login vormi 
  Kui vajutab singup siis avab signup vormi
  */

  const handleAuth = (authType) => {
    setAuthFormOpen(authType)
  }
  
  return (
    <div>
      <button onClick={()=> handleAuth('login')}>Login</button>
      <button onClick={()=> handleAuth('signup')}>Signup</button>
      {/* <AuthForm /> */}
    </div>
  );
};

export default Auth;
