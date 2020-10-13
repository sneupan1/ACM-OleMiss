import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/acm-logo.svg";

const Header = () => (
  <div className="header">
    <div className="acm-logo">
      <Logo className="logo" />
    </div>
    <div className="header-items">
      <div className="header-item">
        <Link to="/register">Register</Link>
      </div>
      <div className="header-item">
        <Link to="/login">Login</Link>
      </div>
      <div className="header-item">
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  </div>
);
export default Header;
