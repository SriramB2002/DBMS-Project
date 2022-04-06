import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Form from "./Login/Form";
import Dashboard from "./Dashboard/Dashboard";
import { useSelector } from "react-redux";
import { login } from "./Reducers/UserReducer";
import { useDispatch } from "react-redux";
import { loadState } from "./LocalStorage/GetLocal";
const App = () => {
  const loggedIn = useSelector((state) => state.loginReducer.value.isloggedIn);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(login(loadState('user')));
  },[]);
  
  return (
    <Router>
      <Switch>

        <Route path="/Dashboard">

          {loggedIn == false && <Redirect to='/' />}
          {loggedIn == true && <Dashboard />}
        </Route>
        <Route path="/">
          {loggedIn == true && <Redirect to='/Dashboard' />}
          {loggedIn == false && <Form />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
