import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./styleMainLayoutLogin.css"; // Assuming you have some CSS styling for the navbar
import { Button } from "antd";

function MainLayoutLogin() {
  return (
    <div>
      <div className="navbar1">
        <div className="nav-logo">
          <Link to="/">
            <h1>My Website</h1>
          </Link>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup">Sign Up</Link>
          </li>

          <li className="nav-item">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Button type="primary" className="logout-btn">Logout</Button>
          </li>
        </ul>
      </div>
        <Outlet />
    </div>
  );
}

export default MainLayoutLogin;
