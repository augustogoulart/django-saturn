import React from 'react';
import IndexPage from "./pages/homepage/homepage.jsx";
import SaturnLayout from "./layouts/layout.jsx";
import {Route, Switch} from "react-router-dom";

import './App.scss';
import ChangeForm from "./components/change-form/change-form.jsx"
import ModelTable from "./components/model-table/model-table.jsx";

function App() {
  return (
    <div className="App">
      <SaturnLayout>
        <Switch>
          <Route exact path={"/saturn/"} render={() => <IndexPage/>}/>
          <Route exact path={"/saturn/:appName/:modelName"} component={ModelTable}/>
          <Route exact path={"/saturn/:appName/:modelName/add"} render={(props) => <ChangeForm {...props}/>}/>
          <Route exact path={"/saturn/:appName/:modelName/:id/change"} render={(props) => <ChangeForm {...props}/>}/>
        </Switch>
      </SaturnLayout>
    </div>
  );
}

export default App;
