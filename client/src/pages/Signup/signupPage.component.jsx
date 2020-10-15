import React from "react";
import { Route } from "react-router-dom";
import "./signupPage.styles.scss";
import Signup from "../../components/sign-up/signup.component";
import SignupAdmin from "../../components/sign-up/signupAdmin.component";

const SignupPage = ({ match }) => {
  return (
    <div className="signup-page">
      <div className="signup-component-container">
        <Route path={`${match.path}/user`} component={Signup} />
        <Route path={`${match.path}/admin`} component={SignupAdmin} />
      </div>
    </div>
  );
};

export default SignupPage;
