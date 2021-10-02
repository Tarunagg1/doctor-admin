import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './config/PrivateRoute'


function App() {
  // const {token,user} = useSelector(state => state.auth)

  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
