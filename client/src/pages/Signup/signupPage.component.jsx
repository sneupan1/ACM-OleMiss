import React from "react";
import { Route } from "react-router-dom";
import "./signupPage.styles.scss";
import Signup from "../../components/sign-up/signup.component";
import SignupAdmin from "../../components/sign-up/signupAdmin.component";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.5,
    },
  },
};
const SignupPage = ({ match }) => {
  return (
    <div className="signup-page">
      <motion.div
        className="signup-component-container"
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <Route path={`${match.path}/user`} component={Signup} />
        <Route path={`${match.path}/admin`} component={SignupAdmin} />
      </motion.div>
    </div>
  );
};

export default SignupPage;
