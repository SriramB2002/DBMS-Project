import React, { useEffect,useContext } from "react";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from './Home';
import SeatsLayout from "../Components/SeatsLayout";
import Profile from '../Profile/Profile'
import MerchFood from "../Components/MerchFood";
import { CurrentBookings } from "../CurrentBookings/CurrentBookings";
import  BillBreakout  from "../Bill/BillBreakout";
import  AuthContext  from '../Shared/AuthContext';
function Dashboard() {
  const { auth, setAuth,admin,setAdmin } = useContext(AuthContext);
  useEffect(() => {
    if(localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).token!==undefined){
      setAuth(JSON.parse(localStorage.getItem('auth')));
    }
  }, []);
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
        <Route path='/Dashboard/Seats/:id/:sid' exact component={SeatsLayout} />
        <Route path='/Dashboard/Profile' exact>
          <Profile />
        </Route>
        <Route path='/Dashboard/Profile' exact>
          <Profile />
        </Route>
        <Route path='/Dashboard/MerchFood' exact component={MerchFood} />
        <Route path='/Dashboard/CurrentBookings' exact component={CurrentBookings} />
        <Route path='/Dashboard/Bill' exact component={BillBreakout} />
      </Switch>
    </div>
    </Router>
  );
}

export default Dashboard;