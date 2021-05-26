import { Suspense } from 'react'
import { Route, Switch } from "react-router-dom";
import { routes } from "./Routes";
import AuthForm from './Components/Auth/Form'
function App() {
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
