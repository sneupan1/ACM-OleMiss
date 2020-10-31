import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./profilePage.styles.scss";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Profile from "../../components/profile/profile.component";
import EditProfile from "../../components/edit-profile/edit-profile.component";
import PrivateUserRoute from "../../components/routing/private-user-route.component";
import { getCurrentProfile } from "../../redux/profile/profile.actions";
import { setTokenInHeader } from "../../redux/user/user.utils";

const ProfileWithSpinner = WithSpinner(Profile);
const EditProfileWithSpinner = WithSpinner(EditProfile);

const ProfilePage = ({
  token,
  getCurrentProfile,
  profile,
  isFetching,
  match,
}) => {
  useEffect(() => {
    setTokenInHeader(token);
    getCurrentProfile();
  }, [token, getCurrentProfile]);

  return (
    <div className="profilePage">
      <PrivateUserRoute
        exact
        path={`${match.path}/me`}
        isFetching={isFetching}
        passItem={profile}
        component={ProfileWithSpinner}
      />
      <PrivateUserRoute
        path={`${match.path}/me/edit`}
        isFetching={isFetching}
        passItem={profile}
        component={EditProfileWithSpinner}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  isFetching: state.profile.isFetching,
  token: state.user.token,
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfilePage);
