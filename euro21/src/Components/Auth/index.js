import AuthForm from "./Form"

const Auth = () => {
  /*
  Kui juba sisse logitud siis kuvab ainult nuppu ava rakendus
  Kui vajutab login siis avab login vormi 
  Kui vajutab singup siis avab signup vormi
  */
  return (
    <div>
      <button>Login</button>
      <button>Signup</button>
      <AuthForm />
    </div>
  );
};

export default Auth;
