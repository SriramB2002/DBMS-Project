import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from './Home';
function Dashboard() {
  const navbarItems = [
    {
      name:"Home",
      path:"/Dashboard"
    },
    {
      name:"Profile",
      path:"/Dashboard"
    },
    {
      name:"Book",
      path:"/Dashboard"
    }
  ];
  return (
    <div>
      {console.log("Here")}
      <Navbar navbarItems={navbarItems}/>
      <Home />
    </div>
  );
}

export default Dashboard;
