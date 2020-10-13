import React, { useState } from "react";
import "./signupPage.styles.scss";

import FormInput from "../../components/form-input/form-input.component";

const SignupPage = () => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = userCredentials;

  const handleChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="signup-page">
      <form className="signup-form">
        <FormInput
          text="text"
          name="name"
          value={name}
          handleChange={handleChange}
          label="Name"
          required
        />
      </form>
    </div>
  );
};

export default SignupPage;
