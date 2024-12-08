import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./styleMainLayoutLogin.css"; // Assuming you have some CSS styling for the navbar
import { Button } from "antd";

function MainLayoutLogin() {
  return (
    <div>
        <Outlet />
    </div>
  );
}

export default MainLayoutLogin;
