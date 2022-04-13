import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Form from "./Login/Form";
import Dashboard from "./Dashboard/Dashboard";

const App = () => {
  const [loggedIn, setloggedIn] = useState(null);

  function callbackFunction(childData) {
    setloggedIn(childData);
  }

  return (
    <Router>
      <Switch>
        <Route path="/Dashboard">
          {!!loggedIn ? <Dashboard /> : <Redirect to="/" />}
        </Route>
        <Route path="/">
          {!!loggedIn ? (
            <Redirect to="/Dashboard" />
          ) : (
            <Form parentCallback={callbackFunction} />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
