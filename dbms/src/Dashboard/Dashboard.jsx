import React, { useEffect } from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from './Home';
import SeatsLayout from "../Components/SeatsLayout";
import Profile from '../Profile/Profile'
function Dashboard() {
  const navbarItems = [
    {
      name:"Home",
      path:"/Dashboard/Home"
    },
    {
      name:"Profile",
      path:"/Dashboard/Profile"
    },{
      name:"Current Bookings",
      path:"/Dashboard/CurrentBookings"
    }
  ];
  return (
    <Router>
    <div>
      {console.log("Here")}
      <Navbar navbarItems={navbarItems}/>
      <Switch>
        <Route path="/Dashboard" exact>
          <Redirect to="/Dashboard/Home" />
        </Route>
        <Route path='/Dashboard/Home' exact component={Home} />
        <Route path='/Dashboard/Seats/:id' exact component={SeatsLayout} />
        <Route path='/Dashboard/Profile' exact>
          <Profile />
        </Route>
        
 
      </Switch>
    </div>
    </Router>
  );
}

export default Dashboard;