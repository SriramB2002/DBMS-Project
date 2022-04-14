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
      path:"/login"
    },
    {
      name:"Book",
      path:"/login"
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
