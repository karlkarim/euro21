/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import { routes } from "./Routes";
import AuthForm from './Components/Auth/Form'

import { useStoreActions } from 'easy-peasy';
import Wrapper from './Components/Wrapper';
import { useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import NewScore from './Components/Dialogs/AddScore/index';
import Loader from './Components/Loader';


function App() {
  const { resumeLogin } = useStoreActions(action => action.user)
  const { isLoggedIn } = useStoreState(state => state.user)
  useEffect(() => {
    resumeLogin()
  }, []);

  const WaitingForContent = () => (
    <div className='absolute inset-0 z-20 flex justify-center w-full h-full pt-40 bg-uefa-dark'>
        <Loader />
    </div>
  )
  return (
    <div>
      <AuthForm />
      <NewScore />
      <Suspense fallback={<WaitingForContent />}>
        <Switch>
          <Wrapper>
          {routes().map(({path, component}, i) => (
              <Route key={i} exact path={path} component={component} />  
            ))}
          </Wrapper>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
