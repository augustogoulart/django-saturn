import React from 'react';
import HomePage from "./pages/homepage/homepage.jsx";
import SaturnLayout from "./layouts/layout.jsx";
import {Route, Switch} from "react-router-dom";

import './App.scss';
import UserDetail from "./components/user-detail/user-detail.jsx";
import Change from "./components/change-form/change-form.jsx"
import ModelTable from "./components/model-table/model-table.jsx";

function App() {
  return (
    <div className="App">
      <SaturnLayout>
        <Switch>
          <Route exact path={"/saturn/"} render={() => <HomePage />}>
          </Route>
          <Route exact path={"/saturn/:appName/:modelName"} component={ModelTable}/>
          <Route exact path={"/saturn/sandbox/dummyuser/add"} component={Change}/>
          <Route exact path={"/saturn/sandbox/dummyuser/:id/change"} component={UserDetail}/>
        </Switch>
      </SaturnLayout>
    </div>
  );
}

export default App;
