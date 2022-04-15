import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from './Home';
function Dashboard() {
  const navbarItems = [
    {
      name:"Home",
      path:"/Dashboard/Home"
    },
    {
      name:"Profile",
      path:"/Dashboard/Profile"
    },
    {
      name:"Merch",
      path:"/Dashboard/Merch"
    }
  ];
  return (
    <div>
      {console.log("Here")}
      <Navbar navbarItems={navbarItems}/>
      <Switch>
        <Route to='/Dashboard/Home'>
           <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default Dashboard;
