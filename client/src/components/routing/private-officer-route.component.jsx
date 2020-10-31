import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateOfficerRoute = ({
  component: Component,
  token,
  role,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) =>
      role !== "admin" && role !== "officer" ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} {...otherProps} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  role: state.user.role,
  token: state.user.token,
});

export default connect(mapStateToProps)(PrivateOfficerRoute);
