import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Register from "./Register/Register";
import  AuthContext  from "./Shared/AuthContext";
import Home from "./Login/Home";

const App = () => {
  const { auth, setAuth } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/register">
          {!!auth.token ? <Redirect to="/Dashboard" /> : <Register />}
        </Route>
        <Route path="/Dashboard">
          {!!auth.token ? <Dashboard/> : <Redirect to="/" />}
        </Route>
        <Route path="/login" exact>
          {!!auth.token ? (
            <Redirect to="/Dashboard" />
          ) : (
            <Login/>
          )}
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        
      </Switch>
    </Router>
  );
};

export default App;
