import React from "react";
import { render } from "react-dom";
import "./styles.scss"

const App = () => (
  <div>
    <h1>Cosmic Admin</h1>
  </div>
)

export default App;

const container = document.getElementById("app");
render(<App />, container);
