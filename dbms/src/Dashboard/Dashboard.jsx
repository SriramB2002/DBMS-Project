import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
function Dashboard(isloggedin) {
  // useEffect(() => {
  //   if (isloggedin) {
  //     return <Redirect to="/Dashboard" />;
  //   }
  // }, [isloggedin]);
  return (
    <div>
      {/* {console.log(isloggedin)}
      {!isloggedin && <Redirect to="/login" />} */}
      <p>Dashboard</p>
    </div>
  );
}

export default Dashboard;
