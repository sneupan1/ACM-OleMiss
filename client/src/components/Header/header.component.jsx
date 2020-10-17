import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/user/user.actions";

import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/acm-logo.svg";

const Header = ({ logoutUser }) => (
  <div className="header">
    <div className="acm-logo">
      <Logo className="logo" />
    </div>
    <div className="header-items">
      <div className="header-item">
        <Link to="/profile/me">Profile</Link>
      </div>
      <div className="header-item">
        <Link to="/register/user">Register</Link>
      </div>
      <div className="header-item">
        <Link to="/login">Login</Link>
      </div>
      <div className="header-item">
        <a href="/" onClick={() => logoutUser()}>
          Logout
        </a>
      </div>
    </div>
  </div>
);
export default connect(null, { logoutUser })(Header);
