import React from "react";
import "./signinPage.styles.scss";
import Signin from "../../components/sign-in/sign-in.component";

const SigninPage = () => {
  return (
    <div className="signin-page">
      <div className="signin-component-container">
        <Signin />
      </div>
    </div>
  );
};

export default SigninPage;
