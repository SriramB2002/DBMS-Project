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
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";

const App = () => {
  const { auth, setAuth,admin,setAdmin } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
      <Route path="/admin/login" exact>
          {!!admin.token ? (<Redirect to="/admin/Dashboard"></Redirect>) : (<AdminLogin/>)}
        </Route>
        <Route path="/admin/Dashboard" exact>
          {!!admin.token ? (<AdminDashboard/>) : (<Redirect to="/admin/login"></Redirect>)}
        </Route>
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
