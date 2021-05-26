import { Suspense } from 'react'
import { Route, Switch } from "react-router-dom";
import { routes } from "./Routes";
function App() {
  return (
    <div>
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
