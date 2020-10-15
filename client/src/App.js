import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Header from "./components/Header/header.component";
import Alert from "./components/Alert/alert.component";
import Homepage from "./pages/Homepage/homepage.component";
import SignupPage from "./pages/Signup/signupPage.component";
import SigninPage from "./pages/Signin/signinPage.component";
import ProfilePage from "./pages/Profile/profilePage.component";
import { setTokenInHeader } from "./redux/user/user.utils";
import { loadUser } from "./redux/user/user.actions";

function App({ token, loadUser }) {
  useEffect(() => {
    setTokenInHeader(token);
    if (token) {
      loadUser();
    }
  }, [token, loadUser]);

  return (
    <div className="App">
      <Header />
      <Alert />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/register" component={SignupPage} />
        <Route path="/login" component={SigninPage} />
        <Route path="/profile/me" component={ProfilePage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, { loadUser })(App);
