import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
function Dashboard() {
  const navbarItems = [
    {
      name:"Home",
      path:"/login"
    },
    {
      name:"Profile",
      path:"/"
    },
    {
      name:"Book",
      path:"/Hello"
    }
  ];
  return (
    <div>
      <Navbar navbarItems={navbarItems}/>
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;
