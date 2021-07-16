import { Route, Switch, BrowserRouter } from "react-router-dom";

import { Home } from "./views/Home/Home";
import { InstalledApps } from "./views/InstalledApps/InstalledApps";

import "./App.css";

const BASE_URL = "saturn";

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={`/${BASE_URL}`} render={() => <Home />} />
        <Route
          exact
          path={`/${BASE_URL}/:appName`}
          render={(props) => <InstalledApps {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
}
