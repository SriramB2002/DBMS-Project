import React from "react";

import { useSelector } from "react-redux";
function Dashboard() {
  const user = useSelector((state) => state.userReducer.value);
  return (
    <div>
      Hello
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p>
    </div>
  );
}

export default Dashboard;
