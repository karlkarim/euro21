import { Suspense, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
import { routes } from "./Routes";
import AuthForm from './Components/Auth/Form'

import { useStoreActions, useStoreState } from 'easy-peasy';

function App() {
  const { resumeLogin } = useStoreActions(action => action.user)
  useEffect(() => {
    resumeLogin()
  }, []);
  return (
    <div>
      <AuthForm />
      <Suspense fallback='Loading'>
        <Switch>
        {routes().map(({path, component}, i) => (
          <Route key={i} exact path={path} component={component} />
        ))}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
