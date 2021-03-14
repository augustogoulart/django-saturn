import React from 'react';
import {User} from "./pages/user/user.jsx";
import HomePage from "./pages/homepage/homepage.jsx";
import SaturnLayout from "./layouts/layout.jsx";
import {Route, Switch} from "react-router-dom";

import './App.scss';
import UserDetail from "./components/user-detail/user-detail.jsx";
import Add from "./components/add/add.jsx";

function App({context}) {
  return (
    <div className="App">
      <SaturnLayout>
        <Switch>
          <Route exact path={"/saturn/"} render={() => <HomePage context={context}/>}>
          </Route>
          <Route path={"/saturn/sandbox/dummyuser/"}>
            <User/>
          </Route>
          <Route path={"/saturn/sandbox/dummyuser/add"} component={Add}/>
          <Route path={"/saturn/sandbox/dummyuser/:id/change"} component={UserDetail}/>
        </Switch>
      </SaturnLayout>
    </div>
  );
}

export default App;
