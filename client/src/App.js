import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import WithSpinner from "./components/with-spinner/with-spinner.component";
import Header from "./components/Header/header.component";
import Alert from "./components/Alert/alert.component";
import Homepage from "./pages/Homepage/homepage.component";
import SignupPage from "./pages/Signup/signupPage.component";
import SigninPage from "./pages/Signin/signinPage.component";
import ProfilePage from "./pages/Profile/profilePage.component";

import { setTokenInHeader } from "./redux/user/user.utils";
import { loadUser } from "./redux/user/user.actions";
import { getCurrentProfile } from "./redux/profile/profile.actions";

const ProfilePageWithSpinner = WithSpinner(ProfilePage);

function App({ token, loadUser, getCurrentProfile, isFetching }) {
  useEffect(() => {
    setTokenInHeader(token);
    if (token) {
      loadUser();
      getCurrentProfile();
    }
  }, [token, loadUser, getCurrentProfile]);

  return (
    <div className="App">
      <Header />
      <Alert />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/register" component={SignupPage} />
        <Route path="/login" component={SigninPage} />
        <Route
          path="/profile/me"
          render={(props) => (
            <ProfilePageWithSpinner isFetching={isFetching} {...props} />
          )}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  isFetching: state.profile.isFetching,
});

export default connect(mapStateToProps, { loadUser, getCurrentProfile })(App);
