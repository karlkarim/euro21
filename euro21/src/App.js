/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import { routes } from "./Routes";
import AuthForm from './Components/Auth/Form'

import { useStoreActions } from 'easy-peasy';
import Wrapper from './Components/Wrapper';
import { useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';


function App() {
  const { resumeLogin } = useStoreActions(action => action.user)
  const { isLoggedIn } = useStoreState(state => state.user)
  useEffect(() => {
    resumeLogin()
  }, []);

  
  return (
    <div>
      <AuthForm />
      <Suspense fallback='Loading'>
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
