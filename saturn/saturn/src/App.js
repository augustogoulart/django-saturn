import React, {Component} from 'react';
import {render} from 'react-dom';
import {User} from "./pages/user/user.jsx";
import HomePage from "./pages/homepage/homepage.jsx";
import SaturnLayout from "./layouts/layout.jsx";
import {
  Switch,
  Route
} from "react-router-dom";

import './App.scss';
import UserDetail from "./components/user-detail/user-detail.jsx";


class App extends Component {
  render() {
    return (
      <div className="App">
          <SaturnLayout>
            <Switch>
              <Route exact path={"/"}>
                <HomePage/>
              </Route>
              <Route exact path={"/saturn/saturn/dummyuser/"}>
                <User/>
              </Route>
              <Route exact path={"/saturn/saturn/dummyuser/:id"} component={UserDetail} />
            </Switch>
          </SaturnLayout>
      </div>
    );
  }
}

export default App;
