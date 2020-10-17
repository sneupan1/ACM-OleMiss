import React from "react";
import { connect } from "react-redux";
import "./profilePage.styles.scss";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import Profile from "../../components/profile/profile.component";
import EditProfile from "../../components/edit-profile/edit-profile.component";
import PrivateUserRoute from "../../components/routing/private-user-route.component";

const ProfileWithSpinner = WithSpinner(Profile);
const EditProfileWithSpinner = WithSpinner(EditProfile);

const ProfilePage = ({ profile, isFetching, match }) => {
  return (
    <div className="profilePage">
      <PrivateUserRoute
        exact
        path={`${match.path}/me`}
        isFetching={isFetching}
        profile={profile}
        component={ProfileWithSpinner}
      />
      <PrivateUserRoute
        exact
        path={`${match.path}/me/edit`}
        isFetching={isFetching}
        profile={profile}
        component={EditProfileWithSpinner}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  isFetching: state.profile.isFetching,
});

export default connect(mapStateToProps)(ProfilePage);
