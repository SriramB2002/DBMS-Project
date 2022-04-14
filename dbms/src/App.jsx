import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Register from "./Register/Register";
const App = () => {
  const [loggedIn, setloggedIn] = useState(null);

  function callbackFunction(childData) {
    setloggedIn(childData);
  }

  return (
    <Router>
      <Switch>
        <Route path="/register">
          {!!loggedIn ? <Redirect to="/Dashboard" /> : <Register />}
        </Route>
        <Route path="/Dashboard">
          {!!loggedIn ? <Dashboard/> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          {!!loggedIn ? (
            <Redirect to="/Dashboard" />
          ) : (
            <Login parentCallback={callbackFunction} />
          )}
        </Route>
        
      </Switch>
    </Router>
  );
};

export default App;
