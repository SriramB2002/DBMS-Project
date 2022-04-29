import React, { useContext, useEffect, useState,useReducer } from "react";
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
  //Fetch From Local Storage

  const [,forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    if(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).token!==undefined){
      setAuth(JSON.parse(localStorage.getItem('auth')));
    }
    else if(localStorage.getItem('admin') && JSON.parse(localStorage.getItem('admin')).token!==undefined){
      setAdmin(JSON.parse(localStorage.getItem('admin')));
    }
  }, []);
  return (
    <Router>
      <Switch>
      <Route path="/admin/login" exact>
          {!!admin.token ? (<Redirect to="/admin/Dashboard"></Redirect>) : (<AdminLogin/>)}
        </Route>
        <Route path="/admin/Dashboard" exact>
          {!!admin.token ? (<AdminDashboard/>) : (<Redirect to="/admin/login"></Redirect>)}
        </Route>
        <Route path="/Dashboard">
          {!!auth.token && <Dashboard/>}
        </Route>
        <Route path="/register">
          {!!auth.token ? <Redirect to="/Dashboard" /> : <Register />}
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
