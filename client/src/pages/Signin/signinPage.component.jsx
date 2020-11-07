import React from "react";
import "./signinPage.styles.scss";
import Signin from "../../components/sign-in/sign-in.component";
import { motion } from "framer-motion";

const signInVariants = {
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

const SigninPage = () => {
  return (
    <div className="signin-page">
      <motion.div
        className="signin-component-container"
        variants={signInVariants}
        initial="initial"
        animate="animate"
      >
        <Signin />
      </motion.div>
    </div>
  );
};

export default SigninPage;
