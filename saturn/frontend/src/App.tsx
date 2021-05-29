import {Route, Switch} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";

import {Home} from "./views/Home/Home"
import {InstalledApps} from "./views/InstalledApps/InstalledApps";

import './App.css';

const BASE_URL = 'saturn'

export function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path={`/${BASE_URL}`} render={() => <Home />} />
      <Route exact path={`/${BASE_URL}/:appName`} render={() => <InstalledApps />} />
    </Switch>
    </BrowserRouter>
  )
}
