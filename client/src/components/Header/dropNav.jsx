import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/user/user.actions";

const DropNav = ({ logoutUser, role, open }) => {
  const userLinks = () => (
    <Fragment>
      <div className="header-item">
        <Link to="/profile/me">Profile</Link>
      </div>
      <div className="header-item">
        <Link to="/events">Events</Link>
      </div>
      <div className="header-item">
        <Link to="/members">Members</Link>
      </div>
      <div className="header-item">
        <a href="/" onClick={() => logoutUser()}>
          Logout
        </a>
      </div>
    </Fragment>
  );

  const guestLinks = () => (
    <Fragment>
      <div className="header-item">
        <Link to="/events">Events</Link>
      </div>
      <div className="header-item">
        <Link to="/register/user">Register</Link>
      </div>
      <div className="header-item">
        <Link to="/login">Login</Link>
      </div>
    </Fragment>
  );

  const adminLinks = () => (
    <Fragment>
      <div className="header-item">
        <Link to="/profile/me">Profile</Link>
      </div>
      <div className="header-item">
        <Link to="/events">Events</Link>
      </div>
      <div className="header-item">
        <Link to="/members">Members</Link>
      </div>
      <div className="header-item">
        <Link to="/applications">Applications</Link>
      </div>
      <div className="header-item">
        <a href="/" onClick={() => logoutUser()}>
          Logout
        </a>
      </div>
    </Fragment>
  );
  return (
    <div className={`header-items ${open ? "openNav" : ""}`}>
      {role === "admin" ? adminLinks() : role ? userLinks() : guestLinks()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  role: state.user.role,
});

export default connect(mapStateToProps, { logoutUser })(DropNav);
