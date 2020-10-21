import React, { useEffect } from "react";
import { connect } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Profile from "../../components/profile/profile.component";
import EditProfile from "../../components/edit-profile/edit-profile.component";
import PrivateUserRoute from "../../components/routing/private-user-route.component";
import { getCurrentProfile } from "../../redux/profile/profile.actions";
import { setTokenInHeader } from "../../redux/user/user.utils";

import React from "react";

const ProfileByIdContainer = ({ match }) => {
  useEffect(() => {
    getProfileById;
  });
  return <div></div>;
};

export default connect(mapStateToProps, { getProfileById })(
  ProfileByIdContainer
);
