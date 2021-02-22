import React from "react";
import { render } from "react-dom";

const App = () => (
  <div>
    <h1>React and Django!</h1>
  </div>
)

export default App;

const container = document.getElementById("app");
render(<App />, container);
