import React from "react";
import { Link } from "react-router-dom";
import Burger from "./burger";

import "./header.styles.scss";
import Logo from "../../assets/acm-logo.js";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="acm-logo">
        <Logo className="logo" />
      </Link>
      <Burger />
    </div>
  );
};

export default Header;
