import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./sign-in.styles.scss";
import { FaUser } from "react-icons/fa";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { login } from "../../redux/user/user.actions";

const Signin = ({ login, token }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  if (token !== null) {
    return <Redirect to="/" />;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };
  const handleChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="signin">
      <h3 className="title">
        <FaUser /> I have an account
      </h3>
      <span>Sign in with your email and password</span>
      <form className="signin-form" onSubmit={onSubmit}>
        <FormInput
          type="text"
          name="email"
          value={email}
          handleChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <CustomButton type="submit">Sign in</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});
export default connect(mapStateToProps, { login })(Signin);
