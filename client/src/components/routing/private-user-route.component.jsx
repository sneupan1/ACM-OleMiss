import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateUserRoute = ({
  component: Component,
  token,
  role,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) =>
      !token && !role ? (
        <Redirect to="/login" />
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

export default connect(mapStateToProps)(PrivateUserRoute);
