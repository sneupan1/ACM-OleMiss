import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./signup.styles.scss";
import { FaUser } from "react-icons/fa";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { setAlert } from "../../redux/alert/alert.actions";
import { signupAdmin } from "../../redux/user/user.actions";

const SignupAdmin = ({ setAlert, signupAdmin, token }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    key: "",
  });

  const { name, email, password, confirmPassword, key } = userCredentials;

  if (token !== null) {
    return <Redirect to="/" />;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password does not match", "danger");
    } else {
      signupAdmin(name, email, password, key);
    }
  };
  const handleChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="signup">
      <h3 className="title">
        <FaUser /> I do not have an admin account
      </h3>
      <span>Sign up with your special key</span>
      <form className="signup-form" onSubmit={onSubmit}>
        <FormInput
          type="text"
          name="name"
          value={name}
          handleChange={handleChange}
          label="Name"
          required
        />
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
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="Confirm Password"
          required
        />
        <FormInput
          type="password"
          name="key"
          value={key}
          handleChange={handleChange}
          label="Special Key"
          required
        />
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});
export default connect(mapStateToProps, { setAlert, signupAdmin })(SignupAdmin);
