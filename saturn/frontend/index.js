import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from "react-router-dom";

const context = JSON.parse(window.context)

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App context={context}/>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
