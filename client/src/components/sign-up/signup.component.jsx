import React, { useState } from "react";
import { connect } from "react-redux";
import "./signup.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { setAlert } from "../../redux/alert/alert.actions";

const Signup = ({ setAlert }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = userCredentials;

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password does not match", "danger");
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
      <h3 className="title">I do not have an account</h3>
      <span>Sign up with your email and password</span>
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
        <CustomButton type="submit">Sign Up</CustomButton>
      </form>
    </div>
  );
};

export default connect(null, { setAlert })(Signup);
