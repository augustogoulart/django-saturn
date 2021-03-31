import React from 'react';
import IndexPage from "./pages/homepage/homepage.jsx";
import SaturnLayout from "./layouts/layout.jsx";
import {Route, Switch} from "react-router-dom";

import './App.scss';
import Detail from "./components/detail/detail.jsx";
import Change from "./components/change-form/change-form.jsx"
import ModelTable from "./components/model-table/model-table.jsx";

function App() {
  return (
    <div className="App">
      <SaturnLayout>
        <Switch>
          <Route exact path={"/saturn/"} render={() => <IndexPage />}>
          </Route>
          <Route exact path={"/saturn/:appName/:modelName"} component={ModelTable}/>
          <Route exact path={"/saturn/sandbox/dummyuser/add"} component={Change}/>
          <Route exact path={"/saturn/sandbox/dummyuser/:id/change"} component={Detail}/>
        </Switch>
      </SaturnLayout>
    </div>
  );
}

export default App;
