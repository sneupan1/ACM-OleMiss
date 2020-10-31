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
import MembersPage from "./pages/Members/membersPage.component";
import ApplicationsPage from "./pages/Applications/applicationsPage.component";
import ViewProfile from "./pages/ViewProfile/viewProfile.component";
import EventsPage from "./pages/Events/eventsPage.component";
import CreateEventPage from "./pages/CreateEvent/createEventPage.component";
import EditEventPage from "./pages/EditEvent/editEventPage.component";
import ViewEvent from "./pages/ViewEvent/viewEvent.component";
import PrivateRoute from "./components/routing/private-user-route.component";
import PrivateAdminRoute from "./components/routing/private-admin-route.component";
import PrivateOfficerRoute from "./components/routing/private-officer-route.component";

import { setTokenInHeader } from "./redux/user/user.utils";
import { loadUser } from "./redux/user/user.actions";
import { getCurrentProfile } from "./redux/profile/profile.actions";

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
        <Route path="/profile" component={ProfilePage} />
        <Route exact path="/members" component={MembersPage} />
        <PrivateRoute exact path="/members/:id" component={ViewProfile} />
        <PrivateAdminRoute
          exact
          path="/applications"
          component={ApplicationsPage}
        />
        <Route exact path="/events" component={EventsPage} />
        <PrivateOfficerRoute
          exact
          path="/events/create"
          component={CreateEventPage}
        />
        <PrivateRoute exact path="/events/:id" component={ViewEvent} />
        <PrivateOfficerRoute
          exact
          path="/events/:id/edit"
          component={EditEventPage}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps, { loadUser, getCurrentProfile })(App);
