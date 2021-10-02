import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./style.scss";
import App from "./App.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
